import DefaultLayout from "@/layouts/default.tsx";
import Rates from "@/components/Rates.tsx";

export default function RatesPage(){
    return(
        <DefaultLayout>
            <div className="min-h-screen flex flex-col bg-cover bg-center"
                 style={{
                     backgroundImage: `url('/backgrounds/2713.jpg')`
                 }}
            >
                <main>
                    <Rates/>
                </main>
            </div>
        </DefaultLayout>
    );
}
