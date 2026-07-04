import { useEffect, useState } from "react";
import axios from "axios";

function CustomerForm({
    fetchCustomers,
    editingCustomer,
    clearEdit
}) {

    const initialState = {

        customer_name: "",

        mobile: "",

        email: "",

        gst_number: "",

        state: "",

        address: "",

        company_id: ""

    };

    const [customer, setCustomer] = useState(initialState);

    const [companies, setCompanies] = useState([]);

    useEffect(() => {

        loadCompanies();

    }, []);

    useEffect(() => {

        if (editingCustomer) {

            setCustomer(editingCustomer);

        }

    }, [editingCustomer]);

const loadCompanies = async () => {

    try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
            "http://localhost:5000/api/companies/my-companies",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setCompanies(res.data);

    } catch (err) {

        console.log(err.response?.data || err);

    }

};

    const handleChange = (e) => {

        setCustomer({

            ...customer,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingCustomer) {

const token = localStorage.getItem("token");

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

await axios.post(
    "http://localhost:5000/api/customers",
    customer,
    config
);

                clearEdit();

            }

            else {

                await axios.post(

                    "http://localhost:5000/api/customers",

                    customer,
                    config

                );

            }

            setCustomer(initialState);

            fetchCustomers();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="customer-form">

            <h2>

                {

                    editingCustomer ?

                    "Update Customer"

                    :

                    "Add Customer"

                }

            </h2>

<form onSubmit={handleSubmit} className="customer-grid">

    <input
        name="customer_name"
        placeholder="Customer Name"
        value={customer.customer_name}
        onChange={handleChange}
        required
    />

    <input
        name="mobile"
        placeholder="mobile Number"
        value={customer.mobile}
        onChange={handleChange}
    />

    <input
        name="email"
        placeholder="Email"
        value={customer.email}
        onChange={handleChange}
    />

    <input
        name="gst_number"
        placeholder="GST Number"
        value={customer.gst_number}
        onChange={handleChange}
    />

    <input
        name="state"
        placeholder="State"
        value={customer.state}
        onChange={handleChange}
    />

    <select
        name="company_id"
        value={customer.company_id}
        onChange={handleChange}
    >
        <option value="">Select Company</option>

        {companies.map(company=>(
            <option
                key={company.id}
                value={company.id}
            >
                {company.company_name}
            </option>
        ))}

    </select>

    <textarea
        rows="4"
        name="address"
        placeholder="Address"
        value={customer.address}
        onChange={handleChange}
    />

    <button>
        {editingCustomer ? "Update Customer" : "Save Customer"}
    </button>

</form>

        </div>

    );

}

export default CustomerForm;