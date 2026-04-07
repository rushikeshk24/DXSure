import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TrackRecordPage from "./pages/admin/TrackRecordPage";
import RaiseTicketPage from "./pages/admin/RaiseTicketPage";
import DayPlanViewPage from "./pages/admin/DayPlanViewPage";
import CreateUserPage from "./pages/admin/CreateUserPage";
import DayBookPage from "./pages/admin/DayBookPage";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ClientEnquiryPage from "./pages/employee/ClientEnquiryPage";
import ClientFollowPage from "./pages/employee/ClientFollowPage";
import ClientLeadPage from "./pages/employee/ClientLeadPage";
import ClientRegistrationPage from "./pages/employee/ClientRegistrationPage";
import PettyCashPage from "./pages/employee/PettyCashPage";
import VendorRegistrationPage from "./pages/employee/VendorRegistrationPage";
import EmployeePaymentPage from "./pages/employee/EmployeePaymentPage";
import ClientPaymentPage from "./pages/employee/ClientPaymentPage";
import DayPlanEntryPage from "./pages/employee/DayPlanEntryPage";

const adminLinks = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/records", label: "Track Record" },
  { to: "/admin/tickets", label: "Raise Ticket" },
  { to: "/admin/day-plan", label: "Day Plan View" },
  { to: "/admin/users", label: "Create User" },
  { to: "/admin/day-book", label: "Day Book" },
];

const employeeLinks = [
  { to: "/employee", label: "Dashboard" },
  { to: "/employee/enquiry", label: "Client Enquiry" },
  { to: "/employee/follow", label: "Client Follow" },
  { to: "/employee/lead", label: "Client Lead" },
  { to: "/employee/registration", label: "Client Registration" },
  { to: "/employee/petty-cash", label: "Petty Cash Entry" },
  { to: "/employee/vendor", label: "Vendor Registration" },
  { to: "/employee/employee-payment", label: "Employee Payment" },
  { to: "/employee/client-payment", label: "Client Payment" },
  { to: "/employee/day-plan", label: "Day Plan Entry" },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Layout title="Admin" links={adminLinks} />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="records" element={<TrackRecordPage />} />
          <Route path="tickets" element={<RaiseTicketPage />} />
          <Route path="day-plan" element={<DayPlanViewPage />} />
          <Route path="users" element={<CreateUserPage />} />
          <Route path="day-book" element={<DayBookPage />} />
        </Route>

        <Route
          path="/employee"
          element={
            <ProtectedRoute role="employee">
              <Layout title="Employee" links={employeeLinks} />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeDashboard />} />
          <Route path="enquiry" element={<ClientEnquiryPage />} />
          <Route path="follow" element={<ClientFollowPage />} />
          <Route path="lead" element={<ClientLeadPage />} />
          <Route path="registration" element={<ClientRegistrationPage />} />
          <Route path="petty-cash" element={<PettyCashPage />} />
          <Route path="vendor" element={<VendorRegistrationPage />} />
          <Route path="employee-payment" element={<EmployeePaymentPage />} />
          <Route path="client-payment" element={<ClientPaymentPage />} />
          <Route path="day-plan" element={<DayPlanEntryPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
