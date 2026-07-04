import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Customers from "./pages/Customers";
import Ledgers from "./pages/Ledgers";
import Groups from "./pages/Groups";
import Units from "./pages/Units";
import Billing from "./pages/Billing";
import StockGroups from "./pages/StockGroups";
import StockItems from "./pages/StockItems";
import InvoicePreview from "./pages/InvoicePreview";
import Reports from "./pages/reports/Reports";

function App() {

    return (

        <BrowserRouter>

            <MainLayout>

                <Routes>

                    <Route
                        path="/"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/companies"
                        element={<Companies />}
                    />

                    <Route
                        path="/customers"
                        element={<Customers />}
                    />

                    <Route
                        path="/ledgers"
                        element={<Ledgers />}
                    />

                    <Route
                        path="/groups"
                        element={<Groups />}
                    />

                    <Route
                        path="/units"
                        element={<Units />}
                    />

                    <Route 
                        path="/billing" 
                        element={<Billing />} 
                    />

                    <Route
                        path="/stock-groups"
                        element={<StockGroups />}
                    />

                    <Route
                        path="/stock-items"
                        element={<StockItems />}
                    />

                    <Route 
                        path="/invoice/:id" 
                        element={<InvoicePreview />} 
                    />

                    <Route path="/reports" element={<Reports />} />

                </Routes>

            </MainLayout>

        </BrowserRouter>

    );

}

export default App;