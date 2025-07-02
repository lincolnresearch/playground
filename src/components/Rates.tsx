import React, {useEffect, useState} from 'react';
import {Button, Form, Link} from '@heroui/react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@heroui/react";
import {RatesData} from '@/types';

const Rates = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [currentRates, setCurrentRates] = useState<RatesData>() || null;

    const columns = [
        {key: "currency", label: "Currency"},
        {key: "rate", label: "Rate"}
    ];

    useEffect(() => {
        fetchApiRates().then(null);
    }, [])

    async function fetchApiRates() {
        try {
            const res = await fetch(import.meta.env.VITE_FXRATES_URL + '/latest?api_key=' + import.meta.env.VITE_FXRATES_TOKEN + '&base=EUR&currencies=EUR,GBP,JPY&resolution=1m&amount=1&places=6&format=json', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_FXRATES_TOKEN}`,
                },
            });

            if (!res.ok) {
                //Load fallback
                const err = await res.json();
                setErrorMsg(err.error || 'Rates api failed');
                return;
            } else {
                //Save fallback
                const data: RatesData = await res.json();
                console.log(data);
                setCurrentRates(data);
                console.log(data.rates["JPY"]);
                setSuccessMsg('Rates api updated');
                return;
            }

        } catch (error) {
            setErrorMsg('Something went wrong.');
            console.error(error);
        }
    }

    const getRates = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetchApiRates();
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <Form onSubmit={getRates}>
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">Currency rates</h1>
                    {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
                    {successMsg && <p className="text-sm text-green-500">{successMsg}</p>}
                    {successMsg && <p className="text-sm text-green-500">Date updated: {currentRates?.date || ''}</p>}
                    {successMsg && <p className="text-sm text-green-500">Base Currency: {currentRates?.base || ''}</p>}
                    {successMsg &&
                        <Link isExternal={true} className="text-sm text-green-500" href={currentRates?.terms || ''}>
                            <span className="text-xs text-gray-100">FXRates API T&C</span></Link>}
                </div>
            </Form>
            <div className="space-y-4">
                <p className="text-default-50">&nbsp;</p>
            </div>
            <Table aria-label="Exchange Rates">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    items={
                        currentRates?.rates
                            ? Object.entries(currentRates.rates).map(([currency, rate]) => ({currency, rate}))
                            : []
                    }
                >
                    {(item) => (
                        <TableRow key={item.currency}>
                            <TableCell>{item.currency}</TableCell>
                            <TableCell>{item.rate}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="space-y-4">
                <p className="text-default-50">&nbsp;</p>
                <Button type="submit" color="primary" fullWidth>
                    Refresh
                </Button>
            </div>
        </div>
    );
};

export default Rates;
