import {Route, Routes} from "react-router-dom";

import IndexPage from "@/pages/index";
import DashboardPage from "@/pages/dashboard";
import InputStreamPage from "@/pages/inputstream.tsx";
import RatesPage from "@/pages/rates.tsx";
import RevenuePage from "@/pages/payments.tsx";

function App() {
    return (
        <Routes>
            <Route element={<IndexPage/>} path="/"/>
            <Route element={<DashboardPage/>} path="/dashboard"/>
            <Route element={<RatesPage/>} path="/exchange"/>
            <Route element={<RevenuePage/>} path="/revenue"/>
            <Route element={<InputStreamPage/>} path="/inputstream/:handle"/>
        </Routes>
    );
}

export default App;
