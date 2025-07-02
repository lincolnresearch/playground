import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

export default function DefaultLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col h-screen">
            <Header/>
            <main>
                    {children}
            </main>
            <Footer/>
        </div>
);
}
