import DefaultLayout from "@/layouts/default.tsx";
import Revenue from "@/components/Revenue.tsx";

export default function PaymentsPage() {
    return (
        <DefaultLayout>
            <div className="min-h-screen flex flex-col bg-cover bg-center"
                 style={{
                     backgroundImage: `url('/backgrounds/2713.jpg')`
                 }}
            >
                <div className="w-full max-w-7xl mx-auto px-4">
                    <Revenue/>
                </div>
            </div>
        </DefaultLayout>
    );
}
