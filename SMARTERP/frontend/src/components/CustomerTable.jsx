import { useState } from "react";
import axios from "axios";
import API from "../config";
function CustomerTable({
    customers,
    fetchCustomers,
    setEditingCustomer
}) {

    const [search, setSearch] = useState("");

    const filteredCustomers = customers.filter((customer) => {

        const keyword = search.toLowerCase();

        return (
            customer.customer_name?.toLowerCase().includes(keyword) ||
            customer.phone?.toLowerCase().includes(keyword) ||
            customer.email?.toLowerCase().includes(keyword) ||
            customer.state?.toLowerCase().includes(keyword)
        );

    });

    const deleteCustomer = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this customer?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `${API}/api/customers/${id}`

            );

            fetchCustomers();

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="customer-table-container">

            <div className="table-header">

                <h2>Customer List</h2>

                <input
                    type="text"
                    placeholder="Search Customer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <table className="customer-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Phone</th>

                        <th>Email</th>

                        <th>GST</th>

                        <th>State</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredCustomers.length > 0 ?

                        filteredCustomers.map(customer => (

                            <tr key={customer.id}>

                                <td>{customer.id}</td>

                                <td>{customer.customer_name}</td>

                                <td>{customer.mobile}</td>

                                <td>{customer.email}</td>

                                <td>{customer.gst_number}</td>

                                <td>{customer.state}</td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            setEditingCustomer(customer)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteCustomer(customer.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td colSpan="7">

                                No Customers Found

                            </td>

                        </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default CustomerTable;