import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//import "../styles/invoice.css";

const API = "http://localhost:5000/api";

function formatCurrency(value) {
    return Number(value || 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function formatDate(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-IN");
}

function InvoicePreview({ invoiceId }) {
    const navigate = useNavigate();
    const  id  = invoiceId;

    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchInvoice();
    }, [id]);

    const fetchInvoice = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${API}/billing/${id}`);

            setInvoice(res.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to load invoice.");
        } finally {
            setLoading(false);
        }
    };

    const totals = useMemo(() => {
        if (!invoice)
            return {
                subtotal: 0,
                gst: 0,
                grandTotal: 0,
            };

        let subtotal = 0;
        let gst = 0;

        invoice.items.forEach((item) => {
            const qty = Number(item.quantity);
            const price = Number(item.price);

            const amount = qty * price;

            subtotal += amount;

            gst += amount * (Number(item.gst) / 100);
        });

        return {
            subtotal,
            gst,
            grandTotal: subtotal + gst,
        };
    }, [invoice]);

    const printInvoice = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="invoice-loading">
                Loading Invoice...
            </div>
        );
    }

    if (error) {
        return (
            <div className="invoice-error">
                <h3>{error}</h3>

                <button onClick={() => navigate(-1)}>
                    Go Back
                </button>
            </div>
        );
    }

    if (!invoice) return null;

    return (
        <div className="invoice-wrapper">

            <div className="invoice-actions">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <button
                    className="print-btn"
                    onClick={printInvoice}
                >
                    Print Invoice
                </button>

            </div>

            <div className="invoice-container">

                <div className="invoice-header">

                    <div>

                        <h1>SMART ERP</h1>

                        <p>
                            Business Management System
                        </p>

                        <p>
                            Hyderabad
                        </p>

                    </div>

                    <div className="invoice-number">

                        <h2>TAX INVOICE</h2>

                        <p>
                            Invoice No :
                            <strong>
                                {" "}
                                {invoice.invoiceNumber}
                            </strong>
                        </p>

                        <p>
                            Date :
                            <strong>
                                {" "}
                                {formatDate(invoice.invoiceDate)}
                            </strong>
                        </p>

                    </div>

                </div>

                <hr />

                <div className="customer-section">

                    <div>

                        <h3>Bill To</h3>

                        <p>
                            <strong>
                                {invoice.customerName}
                            </strong>
                        </p>

                        <p>{invoice.customerAddress}</p>

                        <p>
                            GSTIN :
                            {invoice.customerGST}
                        </p>

                        <p>
                            Phone :
                            {invoice.customerPhone}
                        </p>

                    </div>

                    <div>

                        <h3>Payment</h3>

                        <p>
                            Mode :
                            {invoice.paymentMode}
                        </p>

                        <p>
                            Status :
                            {invoice.paymentStatus}
                        </p>

                    </div>

                </div>

                <table className="invoice-table">

                    <thead>

                        <tr>

                            <th>#</th>

                            <th>Item</th>

                            <th>Qty</th>

                            <th>Price</th>

                            <th>GST%</th>

                            <th>Amount</th>

                        </tr>

                    </thead>

                    <tbody>

                        {invoice.items.map((item, index) => {

                            const qty = Number(item.quantity);

                            const price = Number(item.price);

                            const amount = qty * price;

                            return (
                                <tr key={index}>

                                    <td>{index + 1}</td>

                                    <td>{item.itemName}</td>

                                    <td>{qty}</td>

                                    <td>
                                        ₹ {formatCurrency(price)}
                                    </td>

                                    <td>{item.gst}%</td>

                                    <td>
                                        ₹ {formatCurrency(amount)}
                                    </td>

                                </tr>
                            );
                        })}

                                            </tbody>

                </table>

                <div className="invoice-summary">

                    <div className="terms">

                        <h3>Terms & Conditions</h3>

                        <ul>

                            <li>Goods once sold will not be taken back.</li>

                            <li>Payment should be made within the due date.</li>

                            <li>Interest may be charged on overdue payments.</li>

                            <li>Please verify the invoice before leaving.</li>

                        </ul>

                    </div>

                    <div className="totals">

                        <table>

                            <tbody>

                                <tr>

                                    <td>Subtotal</td>

                                    <td>
                                        ₹ {formatCurrency(totals.subtotal)}
                                    </td>

                                </tr>

                                <tr>

                                    <td>GST</td>

                                    <td>
                                        ₹ {formatCurrency(totals.gst)}
                                    </td>

                                </tr>

                                <tr className="grand-total">

                                    <td>Grand Total</td>

                                    <td>
                                        ₹ {formatCurrency(totals.grandTotal)}
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="amount-words">

                    <strong>Amount in Words :</strong>

                    <p>
                        Rupees ______________________________________________ Only
                    </p>

                </div>

                <div className="signature-section">

                    <div>

                        <p>
                            Customer Signature
                        </p>

                    </div>

                    <div>

                        <p>
                            Authorized Signatory
                        </p>

                        <strong>
                            SMART ERP
                        </strong>

                    </div>

                </div>

                <div className="invoice-footer">

                    <p>
                        This is a computer generated invoice.
                    </p>

                    <p>
                        Thank you for your business.
                    </p>

                </div>

            </div>

        </div>

    );

}

export default InvoicePreview;