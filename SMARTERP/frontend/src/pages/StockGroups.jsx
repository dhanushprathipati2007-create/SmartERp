import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config";
function StockGroups() {

    const [stockGroups, setStockGroups] = useState([]);
    const [search, setSearch] = useState("");

    const [form, setForm] = useState({
        group_name: "",
        description: ""
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchStockGroups();
    }, []);

    const fetchStockGroups = async () => {

        try {

            const res = await axios.get(
                `${API}/api/stock-groups`
            );

            setStockGroups(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await axios.put(

                    `${API}/api/stock-groups/${editingId}`,

                    form

                );

            }

            else {

                await axios.post(

                    `${API}/api/stock-groups`,

                    form

                );

            }

            setForm({
                group_name: "",
                description: ""
            });

            setEditingId(null);

            fetchStockGroups();

        }

        catch (err) {

            console.log(err);

        }

    };

    const editStockGroup = (group) => {

        setEditingId(group.id);

        setForm({

            group_name: group.group_name,

            description: group.description || ""

        });

    };

    const deleteStockGroup = async (id) => {

        if (!window.confirm("Delete this Unit?")) return;

        try {

            await axios.delete(

                `${API}/api/stock-groups/${id}`

            );

            fetchStockGroups();

        }

        catch (err) {

            console.log(err);

        }

    };

    const searchStockGroups = (keyword) => {

        if (keyword === "") {

            fetchStockGroups();

            return;

        }

        const filtered = StockGroups.filter(group =>

            group.group_name.toLowerCase().includes(

                keyword.toLowerCase()

            )

        );

        setStockGroups(filtered);

    };

    return (

        <div className="page-container">

            <div className="page-title">

                <h2>Stock Groups</h2>

                <p>Create and Manage Stock Groups</p>

            </div>

            <div className="form-card">

                <h3>

                    {

                        editingId

                            ? "Update Stock Group"

                            : "Create Stock Group"

                    }

                </h3>

                <form

                    className="erp-form"

                    onSubmit={handleSubmit}

                >

                    <input

                        type="text"

                        name="group_name"

                        placeholder="Group Name"

                        value={form.group_name}

                        onChange={handleChange}

                        required

                    />


                    <textarea

                        name="description"

                        placeholder="Description"

                        value={form.description}

                        onChange={handleChange}

                    />

                    <button

                        className="btn btn-primary"

                    >

                        {

                            editingId

                                ? "Update Group"

                                : "Save Group"

                        }

                    </button>

                </form>

            </div>

            <div className="table-card">

                <div className="table-header">

                    <h3>Group List</h3>

                    <input

                        placeholder="Search..."

                        value={search}

                        onChange={(e) => {

                            setSearch(e.target.value);

                            searchStockGroups(e.target.value);

                        }}

                    />

                </div>

                <table className="erp-table">

                    <thead>

                        <tr>

                            <th>Group Name</th>

                            <th>Description</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

{
    stockGroups.map(group => (

        <tr key={group.id}>

            <td>{group.group_name}</td>

            <td>{group.description || "--"}</td>

            <td>

                <button
                    className="edit-btn"
                    onClick={() => editStockGroup(group)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => deleteStockGroup(group.id)}
                >
                    Delete
                </button>

            </td>

        </tr>

    ))
}

</tbody>

                </table>

            </div>

        </div>

    );

}

export default StockGroups;