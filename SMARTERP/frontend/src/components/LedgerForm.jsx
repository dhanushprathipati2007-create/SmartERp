import { useEffect, useState } from "react";
import axios from "axios";

function LedgerForm({ fetchLedgers, editingLedger, clearEdit }) {

    const [ledger, setLedger] = useState({

        ledger_name: "",

        ledger_type: "Customer",

        opening_balance: "",

        company_id: "",


    });

    const [companies, setCompanies] = useState([]);

    useEffect(() => {

        loadCompanies();


    }, []);

    useEffect(() => {

        if (editingLedger) {

            setLedger(editingLedger);

        }

    }, [editingLedger]);

const loadCompanies = async () => {
    try {
        const res = await axios.get(
            "http://localhost:5000/api/companies"
        );

        console.log(res.data);

        setCompanies(res.data);

    } catch (err) {
        console.log(err);
    }
};



    const handleChange = (e) => {

        setLedger({

            ...ledger,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (editingLedger) {

const token = localStorage.getItem("token");

await axios.put(
    `http://localhost:5000/api/ledgers/${editingLedger.id}`,
    ledger,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
);

            clearEdit();

        }

        else {

const token = localStorage.getItem("token");

await axios.post(
    "http://localhost:5000/api/ledgers",
    ledger,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
);
        }

        setLedger({

            ledger_name: "",

            ledger_type: "Customer",

            opening_balance: "",

            company_id: ""

        });

        fetchLedgers();

    };

    return (

        <form onSubmit={handleSubmit} className="ledger-form">

            <h2>

                {editingLedger ?

                    "Update Ledger"

                    :

                    "Create Ledger"}

            </h2>

            <input

                name="ledger_name"

                placeholder="Ledger Name"

                value={ledger.ledger_name}

                onChange={handleChange}

                required

            />

            <select

                name="ledger_type"

                value={ledger.ledger_type}

                onChange={handleChange}

            >

                <option>Customer</option>

                <option>Supplier</option>

                <option>Expense</option>

                <option>Income</option>

                <option>Bank</option>

                <option>Cash</option>

                <option>Stock Item</option>

            </select>

            <input

                type="number"

                name="opening_balance"

                placeholder="Opening Balance"

                value={ledger.opening_balance}

                onChange={handleChange}

            />

            <select

                name="company_id"

                value={ledger.company_id}

                onChange={handleChange}

                required

            >

                <option value="">Select Company</option>

                {

                    companies.map(company => (

                        <option

                            key={company.id}

                            value={company.id}

                        >

                            {company.company_name}

                        </option>

                    ))

                }

            </select>



            <button>

                Save Ledger

            </button>

        </form>

    );

}

export default LedgerForm;