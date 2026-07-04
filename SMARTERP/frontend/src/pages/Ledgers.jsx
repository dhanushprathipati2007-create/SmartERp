import { useEffect, useState } from "react";
import axios from "axios";

import LedgerForm from "../components/LedgerForm";
import LedgerTable from "../components/LedgerTable";

function Ledgers() {

    const [ledgers, setLedgers] = useState([]);

    const [editingLedger, setEditingLedger] = useState(null);

    const [search, setSearch] = useState("");

    useEffect(() => {

    fetchLedgers();

    }, []);

    const fetchLedgers = async () => {

const token = localStorage.getItem("token");

const res = await axios.get(
    "http://localhost:5000/api/ledgers",
    {
        headers: {
            Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
    }
);

    setLedgers(res.data);

    };

    const handleDelete = async (id) => {

    if (!window.confirm("Delete Ledger?")) return;

const token = localStorage.getItem("token");

await axios.delete(
    `http://localhost:5000/api/ledgers/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
);

    fetchLedgers();

    };

    return (

    <div className="ledger-page">

        <LedgerForm
        fetchLedgers={fetchLedgers}
        editingLedger={editingLedger}
        clearEdit={() => setEditingLedger(null)}
        />

        <LedgerTable
        ledgers={ledgers}
        handleEdit={setEditingLedger}
        handleDelete={handleDelete}
        search={search}
        setSearch={setSearch}
        />

    </div>

    );

}

export default Ledgers;