import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainLayout({ children }) {
    return (
    <div className="app-layout">
      {/* Fixed Sidebar */}
        <Sidebar />

      {/* Main Content */}
        <main className="main-content">
        {/* Fixed Header */}
        <Header />

        {/* Page Content */}
        <section className="page-content">
            {children}
        </section>
        </main>
    </div>
    );
}

export default MainLayout;