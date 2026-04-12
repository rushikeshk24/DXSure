---
name: dx-sure-development
description: Use this skill when developing, debugging, or managing the DXSure Full-Stack CRM and Operational Workflow application.
---

# Instructions

## Overview
DXSure is a Full-Stack Customer Relationship Management (CRM) platform separated into two main directories:
- `client/`: A React + Vite frontend with Tailwind CSS (Custom Dark-Emerald theme).
- `server/`: A Node.js + Express backend using MongoDB and JWT authentication.

## 1. Running the Project Locally
To run the full-stack application, you must start both servers:
**Frontend:**
```bash
cd client
npm install
npm run dev
```

**Backend:**
```bash
cd server
npm install
npm run dev
```

## 2. Frontend Development Guidelines (Client)
- **Styling**: Always adhere to the established "proprietary-feeling" Dark-mode aesthetic. Use `neutral-900`/`neutral-950` backgrounds and `emerald` accents for buttons and highlights.
- **Components**: Utilize reusable UI components where possible and maintain glass-morphism (backdrop-blur) effects to establish visual depth.
- **Routing**: Ensure new routes fall cleanly into the `/admin/*` or `/employee/*` ProtectedRoute wrappers based on the intended access level.

## 3. Backend Development Guidelines (Server)
- **Schemas**: Mongoose models are the single source of truth. The core schemas are `User`, `Client`, `Expense`, `Payment`, `Vendor`, `DayPlan`, and `Ticket`.
- **Authentication**: All endpoints handling sensitive CRM data must verify JWT tokens. Ensure role-based access checks (`admin` vs `employee`) are implemented correctly in routes.
- **Best Practices**: Maintain the RESTful architecture and ensure all database additions are correctly integrated into the existing Mongoose schemas.
