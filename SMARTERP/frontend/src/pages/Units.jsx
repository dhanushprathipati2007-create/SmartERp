import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config";
function Units() {

    const [units, setUnits] = useState([]);
    const [search, setSearch] = useState("");

    const [form, setForm] = useState({
        unit_name: "",
        symbol: "",
        description: ""
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchUnits();
    }, []);

    const fetchUnits = async () => {

        try {

            const res = await axios.get(
                `${API}/api/units`
            );

            setUnits(res.data);

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

                    `${API}/api/units/${editingId}`,

                    form

                );

            }

            else {

                await axios.post(

                    `${API}/api/units`,

                    form

                );

            }

            setForm({

                unit_name: "",

                symbol: "",

                description: ""

            });

            setEditingId(null);

            fetchUnits();

        }

        catch (err) {

            console.log(err);

        }

    };

    const editUnit = (unit) => {

        setEditingId(unit.id);

        setForm({

            unit_name: unit.unit_name,

            symbol: unit.symbol,

            description: unit.description || ""

        });

    };

    const deleteUnit = async (id) => {

        if (!window.confirm("Delete this Unit?")) return;

        try {

            await axios.delete(

                `${API}/api/units/${id}`

            );

            fetchUnits();

        }

        catch (err) {

            console.log(err);

        }

    };

    const searchUnit = async (keyword) => {

        if (keyword === "") {

            fetchUnits();

            return;

        }

        const filtered = units.filter(unit =>

            unit.unit_name.toLowerCase().includes(

                keyword.toLowerCase()

            )

        );

        setUnits(filtered);

    };

    return (

        <div className="page-container">

            <div className="page-title">

                <h2>Units of Measure</h2>

                <p>Create and Manage Measurement Units</p>

            </div>

            <div className="form-card">

                <h3>

                    {

                        editingId

                            ? "Update Unit"

                            : "Create Unit"

                    }

                </h3>

                <form

                    className="erp-form"

                    onSubmit={handleSubmit}

                >

                    <input

                        type="text"

                        name="unit_name"

                        placeholder="Unit Name"

                        value={form.unit_name}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="text"

                        name="symbol"

                        placeholder="Symbol (PCS, KG...)"

                        value={form.symbol}

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

                                ? "Update Unit"

                                : "Save Unit"

                        }

                    </button>

                </form>

            </div>

            <div className="table-card">

                <div className="table-header">

                    <h3>Unit List</h3>

                    <input

                        placeholder="Search..."

                        value={search}

                        onChange={(e) => {

                            setSearch(e.target.value);

                            searchUnit(e.target.value);

                        }}

                    />

                </div>

                <table className="erp-table">

                    <thead>

                        <tr>

                            <th>Unit Name</th>

                            <th>Symbol</th>

                            <th>Description</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            units.map(unit => (

                                <tr key={unit.id}>

                                    <td>

                                        {unit.unit_name}

                                    </td>

                                    <td>

                                        {unit.symbol}

                                    </td>

                                    <td>

                                        {

                                            unit.description || "--"

                                        }

                                    </td>

                                    <td>

                                        <button

                                            className="edit-btn"

                                            onClick={() => editUnit(unit)}

                                        >

                                            Edit

                                        </button>

                                        <button

                                            className="delete-btn"

                                            onClick={() => deleteUnit(unit.id)}

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

export default Units;