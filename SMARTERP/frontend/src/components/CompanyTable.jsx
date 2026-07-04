import { useState } from "react";
import axios from "axios";

function CompanyTable({
    companies,
    fetchCompanies,
    setEditingCompany
}) {

    const [search, setSearch] = useState("");

    const [selectedCompany, setSelectedCompany] = useState(null);

    const filteredCompanies = companies.filter((company) =>

        company.company_name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this company?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
    `http://localhost:5000/api/companies/${id}`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
);

            fetchCompanies();

        }

        catch (err) {

            console.log(err);

        }

    };

    const handleSelect = (company) => {

        setSelectedCompany(company);

        localStorage.setItem(
            "selectedCompany",
            JSON.stringify(company)
        );

        alert(`${company.company_name} selected successfully`);

    };

    return (

        <div className="company-table-container">

            <div className="table-header">

                <h2>Company List</h2>

                <input

                    type="text"

                    placeholder="Search Company..."

                    value={search}

                    onChange={(e) =>
                        setSearch(e.target.value)
                    }

                />

            </div>

            <table className="company-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Company</th>

                        <th>GST</th>

                        <th>Financial Year</th>

                        <th>State</th>

                        <th>Contact</th>

                        <th>Email</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredCompanies.length > 0 ?

                        filteredCompanies.map((company) => (

                            <tr key={company.id}>

                                <td>{company.id}</td>

                                <td>{company.company_name}</td>

                                <td>{company.gst_number}</td>

                                <td>{company.financial_year}</td>

                                <td>{company.state}</td>

                                <td>{company.contact_number}</td>

                                <td>{company.email}</td>

                                <td>

                                    <button
                                        className="select-btn"
                                        onClick={() =>
                                            handleSelect(company)
                                        }
                                    >
                                        Select
                                    </button>

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            setEditingCompany(company)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(company.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td colSpan="8">

                                No Companies Found

                            </td>

                        </tr>

                    }

                </tbody>

            </table>

            {

                selectedCompany && (

                    <div className="selected-company">

                        <h3>Active Company</h3>

                        <p>

                            <strong>Name :</strong>

                            {selectedCompany.company_name}

                        </p>

                        <p>

                            <strong>GST :</strong>

                            {selectedCompany.gst_number}

                        </p>

                        <p>

                            <strong>Financial Year :</strong>

                            {selectedCompany.financial_year}

                        </p>

                    </div>

                )

            }

        </div>

    );

}

export default CompanyTable;