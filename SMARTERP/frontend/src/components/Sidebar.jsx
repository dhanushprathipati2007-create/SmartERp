import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    const menu = [
    { name: "Dashboard", icon: "🏠", path: "/" },
    { name: "Company Management", icon: "🏢", path: "/companies" },
    { name: "Customer Management", icon: "👥", path: "/customers" },
    { name: "Ledger Management", icon: "📒", path: "/ledgers" },
    { name: "Group Management", icon: "📂", path: "/groups" },
    { name: "Stock Groups", icon: "📦", path: "/stock-groups" },
    { name: "Stock Items", icon: "📋", path: "/stock-items" },
    { name: "Units of Measure", icon: "📏", path: "/units" },
    { name: "Billing", icon: "🧾", path: "/billing" },
    { name: "Reports", icon: "📊", path: "/reports" },
    ];

    return (
    <aside className="sidebar">
      {/* Logo Section */}
        <div className="sidebar-header">
        <h2 className="logo">SmartERP</h2>
        <p className="logo-subtitle">Business Management System</p>
        </div>

      {/* Navigation */}
        <nav className="sidebar-menu">
        {menu.map((item) => (
            <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
            >
            <span className="menu-icon">{item.icon}</span>
            <span>{item.name}</span>
            </Link>
        ))}
        </nav>

      {/* Footer */}
        <div className="sidebar-footer">
        <p>SmartERP v1.0</p>
        <small>© 2026</small>
        </div>
    </aside>
    );
}

export default Sidebar;