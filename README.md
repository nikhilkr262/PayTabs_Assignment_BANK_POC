Banking POC System
==================

Overview
--------
This project demonstrates a simplified, secure banking system composed of three main components:
1.  **System 1 (Transaction Router)**: An API Gateway that validates transaction requests and routes them to the Core Banking system. It runs on port 8081.
2.  **System 2 (Core Banking)**: The core system that manages user accounts, cards, balances, and processes transactions. It uses an in-memory H2 database and runs on port 8082.
3.  **Frontend**: A React.js web application that provides a user interface for Customers (to manage cards and transactions) and Administrators (to monitor system activity).

Technology Stack
----------------
-   **Frontend**: React.js (Vite), CSS
-   **Backend**: Java, Spring Boot (Web, JPA)
-   **Database**: H2 (In-Memory)
-   **Build Tools**: Maven (Backend), npm (Frontend)
-   **Security**: SHA-256 PIN Hashing, Custom Header-based Inter-service Authentication

Database Credentials (H2)
-------------------------
-   **URL**: `jdbc:h2:mem:bankingdb`
-   **Driver Class**: `org.h2.Driver`
-   **Username**: `sa`
-   **Password**: `password`
-   **Console URL**: `http://localhost:8082/h2-console`
  
Prerequisites
-------------
-   Java Development Kit (JDK) 17 or higher
-   Maven
-   Node.js (v14 or higher) and npm

Setup & Installation
--------------------
1.  **Start System 1 (Transaction Router)**
    -   Navigate to the `system1` directory.
    -   Run: `mvn spring-boot:run`
    -   Server will start on `http://localhost:8081`
	
2.  **Start System 2 (Core Banking)**
    -   Navigate to the `system2` directory.
    -   Run: `mvn spring-boot:run`
    -   Server will start on `http://localhost:8082`

3.  **Start Frontend Application**
    -   Navigate to the `frontend` directory.
    -   Install dependencies: `npm install`
    -   Start the development server: `npm run dev`
    -   Access the UI at `http://localhost:5173`

Usage Instructions
------------------

### Roles & Credentials
-   **Super Admin**:
    -   Username: `admin`
    -   Password: `admin@123`
-   **Customer**:
    -   Username: `nikhil`
    -   Password: `nikhil@123`
    -   *Note*: New customers must register a card after logging in.

### Common Scenarios

1.  **Register a Card (Customer)**
    -   Login as `nikhil`.
    -   Go to "Register Card".
    -   Enter Card Number (must start with '4', e.g., `4000000000000001`), PIN, and Initial Balance.
    -   Submit to link the card to your account.

2.  **Perform a Transaction**
    -   Go to "Transaction".
    -   Enter your Card Number, PIN, Amount, and Type (TopUp or Withdraw).
    -   Submit. The request is sent to System 1, which securely routes it to System 2.

3.  **View History**
    -   Go to "History".
    -   View your linked cards, current balances, and transaction logs.

4.  **Super Admin Monitoring**
    -   Login as `admin`.
    -   View the "Super Admin Dashboard".
    -   Monitor a real-time list of ALL transactions across the system, including status and failure reasons.

### API Endpoints (Curl)
### System 1 Transaction:
curl -X POST http://localhost:8081/transaction \
  -H "Content-Type: application/json" \
  -d '{"cardNumber":"4000000000000001", "pin":"1234", "amount":100, "type":"withdraw"}'
