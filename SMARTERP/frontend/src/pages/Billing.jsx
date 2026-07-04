import { useState } from "react";

import InvoiceForm from "../components/InvoiceForm";

import InvoiceTable from "../components/InvoiceTable";

import InvoicePreview from "../pages/InvoicePreview";

function Billing() {

    const [refresh, setRefresh] = useState(false);

    const [invoiceId, setInvoiceId] = useState(null);

    return (

        <div className="billing-page">

            <InvoiceForm

                fetchInvoices={()=>

                    setRefresh(!refresh)

                }

            />

            <InvoiceTable

                refresh={refresh}

                onView={setInvoiceId}

            />

            {

                invoiceId &&

                <InvoicePreview

                    invoiceId={invoiceId}

                />

            }

        </div>

    );

}

export default Billing;