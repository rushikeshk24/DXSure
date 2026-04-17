import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

// Admin Imports
import AdminDashboard from "./pages/admin/AdminDashboard";
import TrackRecordPage from "./pages/admin/TrackRecordPage";
import RaiseTicketPage from "./pages/admin/RaiseTicketPage";
import DayPlanViewPage from "./pages/admin/DayPlanViewPage";
import DayBookPage from "./pages/admin/DayBookPage";

// Employee Imports
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ClientEnquiryPage from "./pages/employee/ClientEnquiryPage";
import ClientFollowPage from "./pages/employee/ClientFollowPage";
import ClientLeadPage from "./pages/employee/ClientLeadPage";
import ClientRegistrationPage from "./pages/employee/ClientRegistrationPage";
import PettyCashPage from "./pages/employee/PettyCashPage";
import ClientPaymentPage from "./pages/employee/ClientPaymentPage";
import DayPlanEntryPage from "./pages/employee/DayPlanEntryPage";

const operationalLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/enquiry", label: "Enquiry" },
  { to: "/follow", label: "Follow-up" },
  { to: "/lead", label: "Lead" },
  { to: "/registration", label: "Registration" },
  { to: "/tickets", label: "Ticketing" },
  { to: "/day-plan", label: "DayPlan" },
  { to: "/day-book", label: "Day Book" },
  { to: "/petty-cash", label: "Pettycash" },
  { to: "/payments", label: "Payments" },
  { to: "/records", label: "Track Record" },
];

function RoleBasedDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user?.role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />;
}

function RoleBasedDayPlan() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user?.role === "admin" ? <DayPlanViewPage /> : <DayPlanEntryPage />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Unified Operational Portal */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout title="Operational" links={operationalLinks} />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<RoleBasedDashboard />} />
          <Route path="enquiry" element={<ClientEnquiryPage />} />
          <Route path="follow" element={<ClientFollowPage />} />
          <Route path="lead" element={<ClientLeadPage />} />
          <Route path="registration" element={<ClientRegistrationPage />} />
          <Route path="tickets" element={<RaiseTicketPage />} />
          <Route path="day-plan" element={<RoleBasedDayPlan />} />
          <Route path="day-book" element={<DayBookPage />} />
          <Route path="petty-cash" element={<PettyCashPage />} />
          <Route path="payments" element={<ClientPaymentPage />} />
          <Route path="records" element={<TrackRecordPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
