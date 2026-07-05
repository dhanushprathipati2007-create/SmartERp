📊 SmartERP – Smart Enterprise Resource Planning System

SmartERP is a full-stack Enterprise Resource Planning (ERP) system built using the MERN Stack (PostgreSQL, Express.js, React.js, Node.js).
It is designed to help small and medium businesses manage billing, inventory, customers, ledgers, and stock operations in one centralized platform.

🚀 Features
🧾 Billing System
Create and manage invoices
Auto-calculation of totals & taxes
Invoice history tracking
📦 Inventory Management
Stock In / Stock Out
Stock Transfer between warehouses
Inventory adjustment & valuation
Real-time stock tracking
👥 Customer & Supplier Management
Add and manage customers & suppliers
Maintain transaction history
Ledger-wise tracking
📒 Ledger System
Customer Ledger
Supplier Ledger
Expense & Income Ledger
Bank & Cash Ledger
Stock Item Ledger
🏷️ Stock Management
Stock item creation
SKU-based tracking
Purchase price & selling price management
Stock grouping (Electronics, Furniture, etc.)
🔐 Authentication System
Secure login & registration (JWT-based)
Role-based access control
Protected API routes
📊 Dashboard
Total customers, companies, and ledgers overview
Quick business insights
Real-time statistics
🛠️ Tech Stack

Frontend

React.js
React Router
Axios
CSS / Tailwind (if used)

Backend

Node.js
Express.js
JWT Authentication
REST APIs

Database

PostgreSQL
📁 Project Structure
SMARTERP/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│
└── README.md
⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/smarterp.git
cd smarterp
2. Backend setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm run dev
3. Frontend setup
cd frontend
npm install
npm start
🔐 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for authentication
PORT	Backend server port
📌 API Overview
/api/auth – Login/Register
/api/customers – Customer management
/api/suppliers – Supplier management
/api/stock – Stock management
/api/ledger – Ledger operations
/api/billing – Invoice system
🧠 Future Improvements
GST invoice support
Barcode scanning for stock
PDF invoice generation
Multi-branch support
Role-based dashboards (Admin, Accountant, Staff)
🤝 Contributing

Contributions are welcome!

Fork the repo
Create a new branch
Commit changes
Push and create a PR
📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Dhanush Prathipati
Full Stack Developer (MERN)
