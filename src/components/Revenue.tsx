import {useState, useEffect} from 'react'
import {supabase} from '..//config/supabase.ts'
import {Button, Form, Table, TableBody, TableColumn, TableHeader, TableRow, TableCell, Spinner} from "@heroui/react";
import {useConfirm} from "@/hooks/useConfirm.tsx";


const Revenue = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const { confirm, ConfirmModal } = useConfirm();

    const [ledger, setLedger] = useState([])
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({
        id: 0,
        type: '',
        amount: '',
        currency: 'GBP',
        client_id: ''
    }); // Future - Inject from site config

    const columns = [
        {key: "type", label: "Entry Type"},
        {key: "amount", label: "Amount"},
        {key: "currency", label: "Currency"},
        {key: "client", label: "Client"},
        {key: "actions", label: "Actions"},
    ]; // Future - Inject from site config

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            await Promise.all([fetchLedger(), fetchClients()]);
            setLoading(false);
        };

        fetchAll().then(null);
    }, []);

    async function fetchLedger() {
        // Future note: later add filter .eq('created_by', user.id) option (to view users own ledger entries    )
        setLoading(true);
        let {data: ledger, error} = await supabase
            .from('ledger')
            .select(`
                    id,
                    client_id,
                    type,
                    amount,
                    currency,
                    created_at,
                    clients (
                      id,
                      first_name,
                      last_name,
                      company_name
                    )
                  `);

        if (ledger?.length) {
            setLedger(ledger)
            setSuccessMsg('Ledger loaded');
            console.table(ledger);
        }
        if (error) {
            setErrorMsg('Something went wrong.');
            console.error(error);
        }
        setLoading(false);
    }

    /**
     * Tested this. It works, loading spinner is OK
     */
    // @ts-ignore
    async function simulateDelay(){
        setLoading(true);
        await new Promise((r) => setTimeout(r, 2048)); // TEMP delay
        await fetchLedger();
        setLoading(false);
    }

    /**
     * Add of update entry from form data
     * @param formData
     */
    async function addOrUpdateEntry(formData) {
        const { user } = (await supabase.auth.getUser()).data;
        const { type, amount, currency, client_id } = formData;

        const { data: app_user, error: userFetchError } = await supabase
            .from('users')
            .select('*')
            .eq('auth_user_id', user.id);
        if (userFetchError) {
            setErrorMsg(`Failed to look up app user ${userFetchError}`);
        }

        if (formData.id) {

            const { error: updateError } = await supabase
                .from('ledger')
                .update({ type, amount, currency, client_id })
                .eq('id', formData.id);

            if (updateError) {
                setErrorMsg(updateError.message);
            } else {
                setSuccessMsg('Entry updated!');
                await fetchLedger();
                setFormData({
                    id: 0,
                    type: '',
                    amount: '',
                    currency: 'GBP',
                    client_id: ''
                });
            }

            setSuccessMsg('Entry updated!');
        } else {
            const {data:result, error: insertError} = await supabase.from('ledger')
                .insert([
                    {
                        type,
                        amount,
                        currency,
                        created_by: app_user?.[0]?.id,
                        client_id
                    }
                ]);
            if (insertError) {
                setErrorMsg(insertError.message);
            } else {
                setSuccessMsg(`Entry added! ${result ? JSON.stringify(result) : ''}`);
                console.log(result)
                await fetchLedger(); // refresh list
            }
            setFormData({
                id: 0,
                type: '',
                amount: '',
                currency: 'GBP', // Future: wire this to the auth users preferred default
                client_id: ''
            });
        }
    }

    /**
     * Loads the client list for display in the form and table
     */
    async function fetchClients() {
        setLoading(true);
        const { data, error } = await supabase
            .from('clients')
            .select('id, company_name, first_name, last_name');

        if (data) {
            setClients(data);
        } else {
            console.error(error);
            setErrorMsg('Failed to load clients');
        }
    }

    /**
     * Format the currency display
     * @param amount
     * @param currency
     */
    const formatCurrency = (amount: number, currency: string = "GBP") => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency,
            currencyDisplay: 'symbol',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    };

    /**
     * Deletes a record from ledger
     * @param id
     */
    const handleDelete = async (id: string) => {
        const approved = await confirm();
        if (!approved) return;

        setLoading(true);
        await supabase.from('ledger').delete().eq('id', id);
        await fetchLedger();
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-3xl font-bold">Revenue Entries</h1>
            <div className="space-y-4">
                <div className="space-y-4">
                    <p className="text-default-50">&nbsp;</p>
                </div>
            </div>
            <Table aria-label="Exchange Rates">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    items={
                        ledger
                    }
                >
                    {(item) => (

                        <TableRow
                            key = {String(item.id)}
                            onClick={() => {
                                setFormData({ ...item, id: item.id });
                                console.log(formData.id +' '+String(item.id));
                            }}
                            className={formData.id === item.id ? 'bg-gray-100 dark:bg-gray-800' : ''}
                        >
                            <TableCell>{String(item.type)}</TableCell>
                            <TableCell>{String(item.currency)}</TableCell>
                            <TableCell>{formatCurrency(item.amount, item.currency)}</TableCell>
                            <TableCell>
                                {item.clients?.company_name || `${item.clients?.first_name} ${item.clients?.last_name}`}
                            </TableCell>
                            <TableCell className="text-right">

                                {String(formData.id) === String(item.id) && (
                                    <Button
                                        size="sm"
                                        variant="light"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(item.id);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </TableCell>

                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="space-y-4">
                <div className="space-y-4">
                    <p className="text-default-50">&nbsp;</p>
                </div>
            </div>
            <div className="space-y-4">
                <Button onSubmit={fetchLedger} type="submit" color="primary" fullWidth>
                    Refresh
                </Button>
            </div>
            <div className="space-y-4">
                <p className="text-default-50">&nbsp;</p>
            </div>
            <Form onSubmit={(e) => {
                e.preventDefault();
                addOrUpdateEntry(formData).then(null);
            }}>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        className="w-full border p-2 rounded"
                    />

                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Select Type</option>
                        <option value="income">Income</option>
                        <option value="expenditure">Expenditure</option>
                    </select>

                    <select
                        value={formData.currency}
                        onChange={(e) => setFormData({...formData, currency: e.target.value})}
                        className="w-full border p-2 rounded"
                    >
                        <option value="GBP">GBP</option>
                        <option value="EUR">EUR</option>
                        <option value="JPY">JPY</option>
                    </select>

                    <select
                        value={formData.client_id}
                        onChange={(e) => setFormData({...formData, client_id: e.target.value})}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Select Client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.company_name || `${client.first_name} ${client.last_name}`}
                            </option>
                        ))}
                    </select>

                    <Button type="submit" color="primary" fullWidth>
                        {formData.id ? 'Update Entry' : 'Add Entry'}
                    </Button>

                </div>
            </Form>
            <div className="space-y-4">
                <div className="space-y-4">
                    <p className="text-default-50">&nbsp;</p>
                    {loading && (
                        <div className="flex items-center justify-center gap-2 text-sm text-blue-500">
                            <Spinner size="lg" />
                            Working on it...
                        </div>
                    )}
                    {errorMsg && <p className="text-blue-500 animate-pulse">{errorMsg}</p>}
                    {successMsg && <p className="text-blue-500 animate-pulse">{successMsg}</p>}
                </div>
            </div>
            <ConfirmModal/>
        </div>
    );
};

export default Revenue;
