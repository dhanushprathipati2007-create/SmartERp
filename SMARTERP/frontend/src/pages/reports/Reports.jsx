import React from "react";

const Reports = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Reports Module</h2>

      {/* Financial Reports */}
      <section>
        <h3>💰 Financial Reports</h3>
        <ul>
          <li>Balance Sheet: Assets = 50000 | Liabilities = 20000</li>
          <li>Profit & Loss: Profit = 15000</li>
          <li>Trial Balance: Matched ✔</li>
          <li>Cash Flow: Positive</li>
        </ul>
      </section>

      {/* Inventory */}
      <section>
        <h3>📦 Inventory Reports</h3>
        <ul>
          <li>Stock Summary: 120 Items</li>
          <li>Low Stock: 5 Items</li>
          <li>Item Movement: Normal</li>
        </ul>
      </section>

      {/* Sales */}
      <section>
        <h3>💸 Sales Reports</h3>
        <ul>
          <li>Daily Sales: ₹10,000</li>
          <li>Monthly Sales: ₹2,50,000</li>
          <li>Top Customer: ABC Traders</li>
        </ul>
      </section>

      {/* Purchase */}
      <section>
        <h3>🛒 Purchase Reports</h3>
        <ul>
          <li>Purchase Register: 35 Entries</li>
          <li>Supplier Summary: 10 Suppliers</li>
        </ul>
      </section>

      {/* GST */}
      <section>
        <h3>🧾 GST Reports</h3>
        <ul>
          <li>Tax Summary: ₹18,000 GST</li>
          <li>GST Register: Generated ✔</li>
        </ul>
      </section>
    </div>
  );
};

export default Reports;