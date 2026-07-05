import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config";
function InvoiceTable({ refresh, onView }) {

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        loadInvoices();
    }, [refresh]);

    const loadInvoices = async () => {

        const res = await axios.get(
            `${API}/api/billing`
        );

        setInvoices(res.data);

    };

    return (

        <div className="table-card">

            <h2>Invoices</h2>

            <table className="erp-table">

                <thead>

                    <tr>

                        <th>No</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {invoices.map(inv=>(

                        <tr key={inv.id}>

                            <td>{inv.invoice_number}</td>
                            <td>{inv.invoice_date}</td>
                            <td>{inv.total_amount}</td>
                            <td>{inv.status}</td>

                            <td>

                                <button
                                    onClick={()=>onView(inv.id)}
                                >
                                    View
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default InvoiceTable;