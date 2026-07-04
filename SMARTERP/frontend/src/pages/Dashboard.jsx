import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalCompanies: 0,
    totalCustomers: 0,
    totalLedgers: 0,
    totalStockItems: 0,
  });

  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    fetchDashboard();

    const company = JSON.parse(localStorage.getItem("selectedCompany"));

    if (company) {
      setSelectedCompany(company);
    }
  }, []);

  useEffect(() => {
  const handleKeyDown = (event) => {

    // Global Shortcuts
    if (event.key === "F1") {
      event.preventDefault();
      alert("Company Selection (F1)");
    }

    if (event.key === "F2") {
      event.preventDefault();
      alert("Change Financial Year (F2)");
    }

    if (event.key === "F3") {
      event.preventDefault();
      alert("Company Information (F3)");
    }

    if (event.key === "F4") {
      event.preventDefault();
      alert("Calculator (F4)");
    }

    if (event.key === "F5") {
      event.preventDefault();
      window.location.reload();
    }

    if (event.key === "Escape") {
      alert("Back Navigation (ESC)");
    }

    // CTRL shortcuts
    if (event.ctrlKey && event.key === "q") {
      event.preventDefault();
      alert("Logout (CTRL + Q)");
    }

    if (event.ctrlKey && event.key === "h") {
      event.preventDefault();
      alert("Home (CTRL + H)");
    }

    if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      alert("Command Search (CTRL + K)");
    }

    // ALT shortcuts
    if (event.altKey && event.key === "l") {
      event.preventDefault();
      alert("Create Ledger (ALT + L)");
    }

    if (event.altKey && event.key === "a") {
      event.preventDefault();
      alert("Alter Ledger (ALT + A)");
    }

    if (event.altKey && event.key === "g") {
      event.preventDefault();
      alert("Create Group (ALT + G)");
    }

    if (event.altKey && event.key === "s") {
      event.preventDefault();
      alert("Create Stock Item (ALT + S)");
    }

    if (event.altKey && event.key === "u") {
      event.preventDefault();
      alert("Unit Creation (ALT + U)");
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");

      setDashboard({
        totalCompanies: res.data.totalCompanies || 0,
        totalCustomers: res.data.totalCustomers || 0,
        totalLedgers: res.data.totalLedgers || 0,
        totalStockItems: res.data.totalStockItems || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      {/* Dashboard Title */}

      <div className="dashboard-title">
        <h1>Dashboard</h1>
        <p>Welcome to SmartERP Business Management System</p>
      </div>

      <div className="dashboard-card" style={{
  marginTop: "15px",
  background: "#111827",
  color: "white"
}}>

  <h3>⌨ Keyboard Shortcuts</h3>

  <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>

    <div>
      <h4>⚡ Global</h4>
      <ul>
        <li>F1 = Company Selection</li>
        <li>F2 = Financial Year</li>
        <li>F3 = Company Info</li>
        <li>F4 = Calculator</li>
        <li>F5 = Refresh</li>
        <li>ESC = Back</li>
        <li>CTRL + Q = Logout</li>
        <li>CTRL + K = Search</li>
      </ul>
    </div>

    <div>
      <h4>📦 Masters</h4>
      <ul>
        <li>ALT + L = Ledger</li>
        <li>ALT + A = Alter</li>
        <li>ALT + G = Group</li>
        <li>ALT + S = Stock Item</li>
        <li>ALT + U = Unit</li>
      </ul>
    </div>

  </div>
</div>

      {/* KPI Cards */}

      <div className="kpi-grid">

        <div className="kpi-card">
          <div className="kpi-title">Companies</div>
          <div className="kpi-value">{dashboard.totalCompanies}</div>
          <div className="kpi-subtitle">Registered Companies</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Customers</div>
          <div className="kpi-value">{dashboard.totalCustomers}</div>
          <div className="kpi-subtitle">Registered Customers</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Ledgers</div>
          <div className="kpi-value">{dashboard.totalLedgers}</div>
          <div className="kpi-subtitle">Ledger Accounts</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Stock Items</div>
          <div className="kpi-value">{dashboard.totalStockItems}</div>
          <div className="kpi-subtitle">Inventory Items</div>
        </div>

      </div>

      {/* Information Grid */}

      <div className="dashboard-grid">

        {/* Company Information */}

        <div className="dashboard-card">

          <h3>Company Information</h3>

          <div className="info-grid">

            <div className="info-item">
              <label>Company Name</label>
              <span>
                {selectedCompany?.company_name || "--"}
              </span>
            </div>

            <div className="info-item">
              <label>Financial Year</label>
              <span>
                {selectedCompany?.financial_year || "--"}
              </span>
            </div>

            <div className="info-item">
              <label>GST Number</label>
              <span>
                {selectedCompany?.gst_number || "--"}
              </span>
            </div>

            <div className="info-item">
              <label>State</label>
              <span>
                {selectedCompany?.state || "--"}
              </span>
            </div>

            <div className="info-item">
              <label>Contact Number</label>
              <span>
                {selectedCompany?.contact_number || "--"}
              </span>
            </div>

            <div className="info-item">
              <label>Email</label>
              <span>
                {selectedCompany?.email || "--"}
              </span>
            </div>

            <div className="info-item full-width">
              <label>Address</label>
              <span>
                {selectedCompany?.address || "--"}
              </span>
            </div>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="dashboard-card">

          <h3>Recent Activity</h3>

          <div className="activity-list">

            <div className="activity">
              <span>Dashboard Loaded</span>
              <strong>Now</strong>
            </div>

            <div className="activity">
              <span>Company Selected</span>
              <strong>
                {selectedCompany ? "Available" : "None"}
              </strong>
            </div>

            <div className="activity">
              <span>Total Customers</span>
              <strong>{dashboard.totalCustomers}</strong>
            </div>

            <div className="activity">
              <span>Total Ledgers</span>
              <strong>{dashboard.totalLedgers}</strong>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Grid */}

      <div className="dashboard-grid" style={{ marginTop: "25px" }}>

        <div className="dashboard-card">

          <h3>Quick Statistics</h3>

          <div className="stats-grid">

            <div className="stat-box">
              <h2>{dashboard.totalCompanies}</h2>
              <p>Companies</p>
            </div>

            <div className="stat-box">
              <h2>{dashboard.totalCustomers}</h2>
              <p>Customers</p>
            </div>

            <div className="stat-box">
              <h2>{dashboard.totalLedgers}</h2>
              <p>Ledgers</p>
            </div>

            <div className="stat-box">
              <h2>{dashboard.totalStockItems}</h2>
              <p>Stock Items</p>
            </div>

          </div>

        </div>

        <div className="dashboard-card">

          <h3>Quick Actions</h3>

          <div className="button-group" style={{ flexDirection: "column" }}>

            <Link to="/companies">
              <button className="btn btn-primary">
                Create Company
              </button>
            </Link>

            <Link to="/customers">
              <button className="btn btn-success">
                Add Customer
              </button>
            </Link>

            <Link to="/ledgers">
              <button className="btn btn-warning">
                Create Ledger
              </button>
            </Link>

            <Link to="/stock-items">
              <button className="btn btn-primary">
                Add Stock Item
              </button>
            </Link>

          </div>

        </div>

        

      </div>

    </div>
  );
}

export default Dashboard;