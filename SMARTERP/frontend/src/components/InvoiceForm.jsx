import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config";
function InvoiceForm({ fetchInvoices }) {

    const [companies, setCompanies] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [items, setItems] = useState([]);

    const [invoice, setInvoice] = useState({
        company_id: "",
        customer_id: "",
        invoice_date: "",
        payment_mode: "Cash",
        items: []
    });

    const [currentItem, setCurrentItem] = useState({
        item_id: "",
        quantity: 1,
        price: "",
        gst: 18
    });

    useEffect(() => {
        loadData();
    }, []);

const loadData = async () => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const companyRes = await axios.get(
        "${API}/api/companies",
        config
    );

    const customerRes = await axios.get(
        "${API}/api/customers",
        config
    );

    const itemRes = await axios.get(
        "${API}/api/stock-items");
        setItems(itemRes.data);
    

    setCompanies(companyRes.data);
    setCustomers(customerRes.data);
    setItems(itemRes.data);
};

    const addItem = () => {

        if (!currentItem.item_id) return;

        setInvoice({
            ...invoice,
            items: [...invoice.items, currentItem]
        });

        setCurrentItem({
            item_id: "",
            quantity: 1,
            price: "",
            gst: 18
        });

    };

const submitInvoice = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
        "${API}/api/billing",
        invoice,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    alert("Invoice Created");

    setInvoice({
        company_id: "",
        customer_id: "",
        invoice_date: "",
        payment_mode: "Cash",
        items: []
    });

    fetchInvoices();
};

    return (

        <div className="form-card">

            <h2>Create Invoice</h2>

            <form onSubmit={submitInvoice}>

                <select
                    value={invoice.company_id}
                    onChange={(e)=>setInvoice({...invoice,company_id:e.target.value})}
                >
                    <option>Select Company</option>

                    {companies.map(c=>(
                        <option key={c.id} value={c.id}>
                            {c.company_name}
                        </option>
                    ))}

                </select>

                <select
                    value={invoice.customer_id}
                    onChange={(e)=>setInvoice({...invoice,customer_id:e.target.value})}
                >

                    <option>Select Customer</option>

                    {customers.map(c=>(
                        <option key={c.id} value={c.id}>
                            {c.customer_name}
                        </option>
                    ))}

                </select>

                <input
                    type="date"
                    value={invoice.invoice_date}
                    onChange={(e)=>setInvoice({...invoice,invoice_date:e.target.value})}
                />

                <select
                    value={invoice.payment_mode}
                    onChange={(e)=>setInvoice({...invoice,payment_mode:e.target.value})}
                >

                    <option>Cash</option>
                    <option>UPI</option>
                    <option>Card</option>

                </select>

                <hr/>

                <h3>Add Item</h3>

                <select
                    value={currentItem.item_id}
                    onChange={(e)=>setCurrentItem({...currentItem,item_id:e.target.value})}
                >

                    <option>Select Item</option>

                    {items.map(i=>(
                        <option key={i.id} value={i.id}>
                            {i.item_name}
                        </option>
                    ))}

                </select>

                <input
                    type="number"
                    placeholder="Qty"
                    value={currentItem.quantity}
                    onChange={(e)=>setCurrentItem({...currentItem,quantity:e.target.value})}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={currentItem.price}
                    onChange={(e)=>setCurrentItem({...currentItem,price:e.target.value})}
                />

                <input
                    type="number"
                    placeholder="GST %"
                    value={currentItem.gst}
                    onChange={(e)=>setCurrentItem({...currentItem,gst:e.target.value})}
                />

                <button
                    type="button"
                    onClick={addItem}
                >
                    Add Item
                </button>

                <br/><br/>

                <button>
                    Save Invoice
                </button>

            </form>

        </div>

    );

}

export default InvoiceForm;