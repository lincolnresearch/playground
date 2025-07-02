import DefaultLayout from "@/layouts/default.tsx";
import {useParams} from "react-router-dom";

export default function InputStreamPage(){
    const { handle } = useParams()
    return (
        <DefaultLayout>
            <div className="min-h-screen flex flex-col bg-cover bg-center"
                 style={{
                     backgroundImage: `url('/backgrounds/2713.jpg')`
                 }}
            >
                <main className="w-full max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white mb-8">Input Stream</h1>
                    <div className="h-8 md:h-12">

                    </div>
                    {/* Spacer */}
                    <h4>{handle}</h4>
                    <p>&nbsp;</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl">
                       AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                    </div>
                </main>
            </div>
        </DefaultLayout>
    );
}
