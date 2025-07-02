import {Card, CardBody, Button} from "@heroui/react";
import {Icon} from "@iconify/react";
import DefaultLayout from "@/layouts/default";
import {Link} from "@heroui/link";

export default function DashboardPage() {
    return (
        <DefaultLayout>
            <div className="min-h-screen flex flex-col bg-cover bg-center"
                 style={{
                     backgroundImage: `url('/backgrounds/2713.jpg')`
                 }}
            >
                <main className="w-full max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white mb-8">Welcome to Nano Portfolio Dashboard</h1>
                    <div className="h-8 md:h-12">

                    </div>
                    {/* Spacer */}
                    <h4>[Members only entertainment]</h4>
                    <p>&nbsp;</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">
                        <Card className="bg-background/70 backdrop-blur-md">
                            <CardBody className="flex flex-col items-center text-center">
                                <Icon icon="lucide:user" className="text-primary text-4xl mb-2"/>
                                <Link href="/inputstream/streamA" color="primary">
                                    <h2 className="text-xl font-semibold mb-2">Revenue Stream A</h2>
                                </Link>
                            </CardBody>
                        </Card>
                        <Card className="bg-background/70 backdrop-blur-md">
                            <CardBody className="flex flex-col items-center text-center">
                                <Icon icon="lucide:settings" className="text-primary text-4xl mb-2"/>
                                <h2 className="text-xl font-semibold mb-2">Revenue Stream B</h2>
                                <Link href="/inputstream/streamB"color="primary">Enter</Link>
                            </CardBody>
                        </Card>
                        <Card className="bg-background/70 backdrop-blur-md">
                            <CardBody className="flex flex-col items-center text-center">
                                <Icon icon="lucide:help-circle" className="text-primary text-4xl mb-2"/>
                                <h2 className="text-xl font-semibold mb-2">Shareholder distribution</h2>
                                <Button color="primary">Enter</Button>
                            </CardBody>
                        </Card>
                        <Card className="bg-background/70 backdrop-blur-md">
                            <CardBody className="flex flex-col items-center text-center">
                                <Icon icon="lucide:help-circle" className="text-primary text-4xl mb-2"/>
                                <h2 className="text-xl font-semibold mb-2">Exchange Rates</h2>
                                <Link href="/exchange" color="primary">Enter</Link>
                            </CardBody>
                        </Card>
                    </div>
                </main>
            </div>
        </DefaultLayout>
    );
}
