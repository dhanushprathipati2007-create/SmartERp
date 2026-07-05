import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config";
function CompanyForm({
    fetchCompanies,
    editingCompany,
    clearEdit
}) {

    const initialState = {

        company_name: "",

        address: "",

        gst_number: "",

        financial_year: "",

        state: "",

        contact_number: "",

        email: ""

    };

    const [company, setCompany] = useState(initialState);

    useEffect(() => {

        if (editingCompany) {

            setCompany(editingCompany);

        }

    }, [editingCompany]);

    const handleChange = (e) => {

        setCompany({

            ...company,

            [e.target.name]: e.target.value

        });

    };
const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        let res;

        if (editingCompany) {

            res = await axios.put(
                `${API}/api/companies/${editingCompany.id}`,
                company,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            clearEdit();

        } else {

            res = await axios.post(
                `${API}/api/companies`,
                company,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

        }

        console.log("Company Saved:", res.data);

        setCompany(initialState);

        fetchCompanies();

    } catch (err) {

        console.log("ERROR:", err);

        if (err.response) {
            console.log(err.response.data);
        }

    }

};

    return (

        <div className="company-form">

            <h2>

                {editingCompany

                    ? "Update Company"

                    : "Create Company"}

            </h2>

            <form onSubmit={handleSubmit}>

                <input

                    name="company_name"

                    placeholder="Company Name"

                    value={company.company_name}

                    onChange={handleChange}

                    required

                />

                <input

                    name="gst_number"

                    placeholder="GST Number"

                    value={company.gst_number}

                    onChange={handleChange}

                    required

                />

                <input

                    name="financial_year"

                    placeholder="Financial Year"

                    value={company.financial_year}

                    onChange={handleChange}

                />

                <input

                    name="state"

                    placeholder="State"

                    value={company.state}

                    onChange={handleChange}

                />

                <input

                    name="contact_number"

                    placeholder="Contact Number"

                    value={company.contact_number}

                    onChange={handleChange}

                />

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={company.email}

                    onChange={handleChange}

                />

                <textarea

                    rows="4"

                    name="address"

                    placeholder="Address"

                    value={company.address}

                    onChange={handleChange}

                />

                <button>

                    {editingCompany

                        ? "Update Company"

                        : "Save Company"}

                </button>

            </form>

        </div>

    );

}

export default CompanyForm;