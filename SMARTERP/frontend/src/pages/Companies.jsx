import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config";
import CompanyForm from "../components/CompanyForm";
import CompanyTable from "../components/CompanyTable";

function Companies() {

    const [companies, setCompanies] = useState([]);

    const [editingCompany, setEditingCompany] = useState(null);

    useEffect(() => {

        fetchCompanies();

    }, []);

    const fetchCompanies = async () => {

        try {

const res = await axios.get(
    `${API}/api/companies`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
);

setCompanies(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="company-page">

            <CompanyForm

                fetchCompanies={fetchCompanies}

                editingCompany={editingCompany}

                clearEdit={() => setEditingCompany(null)}

            />

            <CompanyTable

                companies={companies}

                fetchCompanies={fetchCompanies}

                setEditingCompany={setEditingCompany}

            />

        </div>

    );

}

export default Companies;