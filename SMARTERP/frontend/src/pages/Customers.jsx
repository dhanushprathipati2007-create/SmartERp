import { useEffect, useState } from "react";
import axios from "axios";

import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";

function Customers() {

    const [customers, setCustomers] = useState([]);

    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {

        fetchCustomers();

    }, []);

const fetchCustomers = async () => {

    try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
            "http://localhost:5000/api/customers",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        setCustomers(res.data);

    }

    catch (err) {

        console.log(err.response?.data || err);

    }

};

    return (

        <div className="customer-page">

            <CustomerForm

                fetchCustomers={fetchCustomers}

                editingCustomer={editingCustomer}

                clearEdit={() => setEditingCustomer(null)}

            />

            <CustomerTable

                customers={customers}

                fetchCustomers={fetchCustomers}

                setEditingCustomer={setEditingCustomer}

            />

        </div>

    );

}

export default Customers;