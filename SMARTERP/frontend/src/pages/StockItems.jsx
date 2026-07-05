import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config";
function StockItems() {

    const [items, setItems] = useState([]);

    const [stockGroups, setStockGroups] = useState([]);

    const [units, setUnits] = useState([]);

    const [search, setSearch] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({

        item_name: "",

        sku: "",

        stock_group_id: "",

        unit_id: "",

        purchase_price: "",

        selling_price: "",

        quantity: "",

        gst_percentage: "",

        opening_stock: "",

        low_stock_alert: ""

    });

    useEffect(() => {

        fetchItems();

        fetchStockGroups();

        fetchStockGroups();

    }, []);

    const fetchItems = async () => {

        try {

            const res = await axios.get(

                "${API}/api/stock-items"

            );

            setItems(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const fetchStockGroups = async () => {

        try {

            const res = await axios.get(

                "${API}/api/stock-groups"

            );

            setStockGroups(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const fetchUnits = async () => {

        try {

            const res = await axios.get(

                "${API}/api/units"

            );

            setUnits(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    const generateSKU = () => {

        const random = Math.floor(

            1000 + Math.random() * 9000

        );

        return `SKU-${random}`;

    };

const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
        ...prev,
        [name]: value,
    }));
};  

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = {

                ...form,

                sku:

                    form.sku === ""

                        ? generateSKU()

                        : form.sku

            };

            if (editingId) {

                await axios.put(

                    `${API}/api/stock-items/${editingId}`,

                    payload

                );

            }

            else {

                await axios.post(

                    "${API}/api/stock-items",

                    payload

                );

            }

            setEditingId(null);

            setForm({

                item_name: "",

                sku: "",

                stock_group_id: "",

                unit_id: "",

                purchase_price: "",

                selling_price: "",

                quantity: "",

                gst_percentage: "",

                opening_stock: "",

                low_stock_alert: ""

            });

            fetchItems();

        }

        catch (err) {

            console.log(err);

        }

    };

    const editItem = (item) => {

        setEditingId(item.id);

        setForm({

            item_name: item.item_name,

            sku: item.sku,

            stock_group_id: item.stock_group_id,

            unit_id: item.unit_id,

            purchase_price: item.purchase_price,

            selling_price: item.selling_price,

            quantity: item.quantity,

            gst_percentage: item.gst_percentage,

            opening_stock: item.opening_stock,

            low_stock_alert: item.low_stock_alert

        });

    };

    const deleteItem = async (id) => {

        if (!window.confirm(

            "Delete this Stock Item?"

        )) return;

        try {

            await axios.delete(

                `${API}/api/stock-items/${id}`

            );

            fetchItems();

        }

        catch (err) {

            console.log(err);

        }

    };

    const searchItem = async (keyword) => {

        if (keyword === "") {

            fetchItems();

            return;

        }

        const filtered = items.filter(item =>

            item.item_name

                .toLowerCase()

                .includes(

                    keyword.toLowerCase()

                )

        );

        setItems(filtered);

    };
console.log(form);
console.log("Stock Groups:", stockGroups);
console.log("Units:", units);
    return (

        <div className="page-container">

            <div className="page-title">

                <h2>Stock Items</h2>

                <p>

                    Inventory Management

                </p>

            </div>

            <div className="form-card">

            <h3>
                {editingId ? "Update Stock Item" : "Create Stock Item"}
            </h3>

    <form className="erp-form" 
            onSubmit={handleSubmit}>
        <div className="form-grid">


    <input
        type="text"
        name="item_name"
        placeholder="Item Name"
        value={form.item_name}
        onChange={handleChange}
        required
    />

    <input
        type="text"
        name="sku"
        placeholder="SKU (Leave blank for Auto)"
        value={form.sku}
        onChange={handleChange}
    />

<select
    name="stock_group_id"
    value={form.stock_group_id}
    onChange={handleChange}
    required
>
    <option value="">Select Stock Group</option>

    {stockGroups.map((group) => (
        <option
            key={group.id}
            value={group.id}
        >
            {group.group_name}
        </option>
    ))}
</select>

<select
    name="unit_id"
    value={form.unit_id}
    onChange={handleChange}
    required
>
    <option value="">Select Unit</option>

    {units.map((unit) => (
        <option
            key={unit.id}
            value={unit.id}
        >
            {unit.unit_name} ({unit.symbol})
        </option>
    ))}
</select>

    <input
        type="number"
        step="0.01"
        name="purchase_price"
        placeholder="Purchase Price"
        value={form.purchase_price}
        onChange={handleChange}
    />

    <input
        type="number"
        step="0.01"
        name="selling_price"
        placeholder="Selling Price"
        value={form.selling_price}
        onChange={handleChange}
    />

    <input
        type="number"
        step="0.01"
        name="quantity"
        placeholder="Quantity"
        value={form.quantity}
        onChange={handleChange}
    />

    <input
        type="number"
        step="0.01"
        name="gst_percentage"
        placeholder="GST %"
        value={form.gst_percentage}
        onChange={handleChange}
    />

    <input
        type="number"
        step="0.01"
        name="opening_stock"
        placeholder="Opening Stock"
        value={form.opening_stock}
        onChange={handleChange}
    />

    <input
        type="number"
        step="0.01"
        name="low_stock_alert"
        placeholder="Low Stock Alert"
        value={form.low_stock_alert}
        onChange={handleChange}
    />

</div>

<div className="form-actions">

    <button
        type="submit"
        className="btn btn-primary"
    >
        {editingId ? "Update Item" : "Save Item"}
    </button>

        </div>

    </form>

</div>
    <div className="table-card">

    <div className="table-header">

        <h3>Stock Item List</h3>

        <input
            type="text"
            placeholder="Search Item..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                searchItem(e.target.value);
            }}
        />

    </div>

    <table className="erp-table">

        <thead>

            <tr>

                <th>Item</th>

                <th>SKU</th>

                <th>Group</th>

                <th>Unit</th>

                <th>Purchase</th>

                <th>Selling</th>

                <th>Quantity</th>

                <th>GST %</th>

                <th>Actions</th>

            </tr>

        </thead>

        <tbody>

            {
                items.length === 0 ?

                (

                    <tr>

                        <td
                            colSpan="9"
                            style={{
                                textAlign: "center",
                                padding: "30px"
                            }}
                        >

                            No Stock Items Found

                        </td>

                    </tr>

                )

                :

                (

                    items.map(item => (

                        <tr key={item.id}>

                            <td>{item.item_name}</td>

                            <td>{item.sku}</td>

                            <td>{item.group_name || "--"}</td>

                            <td>

                                {
                                    item.symbol
                                        ? `${item.unit_name} (${item.symbol})`
                                        : "--"
                                }

                            </td>

                            <td>₹ {item.purchase_price}</td>

                            <td>₹ {item.selling_price}</td>

                            <td>{item.quantity}</td>

                            <td>{item.gst_percentage}%</td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() => editItem(item)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                )

            }

        </tbody>

    </table>

</div>

</div>

);

}

export default StockItems;  