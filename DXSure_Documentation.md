# DXSure Operations - Project Documentation

## 1. Overview
DXSure Operations is a Full-Stack Customer Relationship Management (CRM) and Operational Workflow platform designed to streamline business processes. It separates logic between administrative control and employee task execution, providing tailored dashboards and access control for both roles.

The primary goals of this platform are to track client acquisition pipelines, manage internal ticketing/tasks, keep strict records of day-to-day employee activities (Day Plans), and log operational financials like Petty Cash and Payments.

---

## 2. Technology Stack

### Frontend (Client Core)
* **Framework:** React + Vite
* **Routing:** React Router v7
* **Styling Framework:** Tailwind CSS v4 (Custom Dark-Emerald Theme configuration)
* **State Management/API Client:** React Hooks, Axios (for HTTP interceptors and server communication)
* **Key Components:** Fully customized dark theme UI components featuring backdrop blurring, seamless dark backgrounds (`neutral`), and vibrant highlights (`emerald`). Components include standardized Data Tables, Interactive Forms, layered layout constructs, and a fully polished secure login experience.

### Backend (Server Core)
* **Runtime/Framework:** Node.js, Express.js
* **Database:** MongoDB configured natively with Mongoose schemas
* **Authentication:** JSON Web Tokens (JWT) for stateless sessions with strictly separated role-based access.
* **Security:** `bcryptjs` for secure password hashing.

---

## 3. Architecture & Data Flow

The architecture follows a standard client-server model over REST APIs.

### The Flow
1. **Authentication Flow:** 
   Users land on the new dual-pane login screen. They log in with their corporate email and password. The Express backend verifies this against the MongoDB `User` collection. If successful, it issues a signed JWT containing their Role (`admin` or `employee`).
2. **Authorization & Navigation Flow:**
   The React app stores the JWT in local storage. `ProtectedRoute` wrapper components read the role and navigate users strictly to either `/admin/*` or `/employee/*`.
3. **Action Flow (CRUD Operations):**
   When an employee acts (e.g., submits a "Petty Cash" record), the `SimpleForm` component gathers the data, Axios packages it with the JWT Authorization header, and POSTs it to the Express route. Express uses a custom middleware to verify the JWT token, then saves the Data to MongoDB via a Mongoose model (e.g., `Expense.js`).

---

## 4. User Roles and Key Features

The system intrinsically segregates functionality by `Role`. Here are the features explained for each portal:

### 4.1 Employee Workspace (`/employee`)
Designed for data entry, daily operational logs, and pipeline tracking.
* **Client Pipeline Management:**
  * **Client Enquiry:** Initial data entry point for prospective clients.
  * **Client Follow:** Tracks follow-up calls, notes, and communications with prospects.
  * **Client Lead:** Qualified prospects that are actively being converted.
  * **Client Registration:** Once closed, the prospect is fully registered as a Client in the database.
* **Financial Data Entry:**
  * **Petty Cash Entry:** Logs day-to-day miscellaneous operational expenses natively mapped to the `Expense` model.
  * **Payments:** Dedicated interfaces to log receipts of **Client Payments** and disbursements for **Employee Payments**.
* **Vendor Operations:**
  * **Vendor Registration:** Management list for adding approved third-party vendors.
* **Time Management:**
  * **Day Plan Entry:** A daily reporting tool where employees log their daily intended/completed tasks (`DayPlan` schema).

### 4.2 Admin Panel (`/admin`)
Designed for oversight, review, support, and access control.
* **Dashboard Overview:** Macro-level metrics aggregate of total registered clients, expenditures, and running activities.
* **Track Record:** A master view of all CRM data. Admins can track the lifecycle of any client across the funnel (from Enquiry to Registration).
* **Ticketing System (Raise Ticket):** Internal support and management ticketing interface mapped to the `Ticket` model.
* **Day Plan View:** Admins can oversee all submitted `Day Plans` by employees to supervise productivity.
* **Day Book:** A comprehensive master ledger view that reconciles the daily incomes (Payments) and outflows (Petty Cash/Expenses) in one view.
* **Create User:** The administrative interface for securely onboarding new employees into the `User` database.

---

## 5. Schema Structures (MongoDB Models)
Behind the scenes, the data interacts across the following Mongoose schemas:
1. **User.js:** Schema for auth (Email, Hashed Password, Role, Name).
2. **Client.js:** Flexible schema for CRM subjects (Contact info, Pipeline status: Enquiry `->` Follow `->` Lead `->` Registered).
3. **Expense.js:** Tied to the petty cash system. Requires Amount, Date, Reason, and User ID.
4. **Payment.js:** Tracks financial movement (Inwards/Outwards).
5. **Vendor.js:** Profiles of approved suppliers.
6. **DayPlan.js:** Links an employee User ID with strings of tasks, statuses, and timestamps.
7. **Ticket.js:** An internal issue tracker with priorities and Open/Closed statuses.

---

## 6. UI / UX Design Implementation
The platform employs a custom, "proprietary-feeling" **Dark-mode aesthetic**.
* **Palette:** Deep `neutral-900` / `neutral-950` backgrounds preventing harsh eye strain, offset by deep `emerald` glowing accents for buttons, focus rings, and status badges.
* **Interface:** Layout structures are built with grid flexibilities, ensuring responsive adaptation to diverse screen sizes. Navigations are persistently styled on the far left or top relying on standard UX paradigms, leveraging glass-morphism (backdrop-blur) to establish depth without clutter. 

---
**Maintained by DXSure Systems Engineering**
