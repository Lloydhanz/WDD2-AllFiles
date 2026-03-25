🛒 Retail Hub


📖 Overview
Retail Hub is a web-based platform designed to simplify and streamline retail operations while providing a smooth shopping experience for users. It allows customers to browse products, manage their cart, and place orders, while ensuring secure access through user authentication.


To access the full features of the platform, users must first create an account and log in.


🚀 Features
🔐 User Authentication (Register & Login required)
🛍️ Product browsing and selection
🛒 Shopping cart functionality
📦 Order management system
💾 Persistent cart functionality
📱 Responsive and user-friendly interface
👤 User Access

To use the user-side features of Retail Hub:

Register a new account
Log in using your credentials
Browse products and add items to your cart
Place orders securely

Users who are not logged in cannot place orders.

🔑 Admin Access

Retail Hub does not include a built-in admin registration system in the interface. Admin access is assigned manually through the database.

How to Create an Admin Account
Register a new account through the website
Open your database in MongoDB
Navigate to the users collection
Find the user document you created

Change the role field to:

"role": "Admin"
Save the changes
Admin Capabilities
📦 Manage products (add, edit, delete)
📊 Monitor and manage orders
👥 Manage users (if implemented)
🛠️ Access administrative controls
🛠️ Technologies Used
HTML5
CSS3
JavaScript
React
Node.js / Express
MongoDB
📁 Project Structure
RetailHub/
│── frontend/
│── backend/
│── components/
│── pages/
│── assets/
│── styles/
⚙️ How to Run

Clone the repository:

git clone https://github.com/Lloydhanz/WDD2-AllFiles.git
Open the project folder in your code editor

Install dependencies:

npm install

Run the development server:

npm start

Open your browser and go to:

http://localhost:3000
🎯 Purpose

Retail Hub aims to provide a simple and efficient retail management system while helping improve full-stack development skills through practical implementation.

👨‍💻 Author

Lloyd Hanz Lorenzo
https://github.com/Lloydhanz
