function LedgerTable({
    ledgers,
    handleEdit,
    handleDelete,
    search,
    setSearch,
}) {
    const filteredLedgers = ledgers.filter((ledger) =>
    ledger.ledger_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
    <div className="ledger-table-container">

        <div className="table-header">
        <h2>Ledger List</h2>

        <input
            type="text"
            placeholder="Search Ledger..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        </div>

        <table className="ledger-table">

        <thead>
            <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Company</th>
            <th>Customer</th>
            <th>Opening Balance</th>
            <th>Actions</th>
            </tr>
        </thead>

        <tbody>

            {filteredLedgers.map((ledger) => (

            <tr key={ledger.id}>

                <td>{ledger.ledger_name}</td>

                <td>{ledger.ledger_type}</td>

                <td>{ledger.company_name}</td>

                <td>{ledger.customer_name || "-"}</td>

                <td>₹ {ledger.opening_balance}</td>

                <td>

                <button
                    className="edit-btn"
                    onClick={() => handleEdit(ledger)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => handleDelete(ledger.id)}
                >
                    Delete
                </button>

                </td>

            </tr>

            ))}

        </tbody>

        </table>

    </div>
    );
}

export default LedgerTable;