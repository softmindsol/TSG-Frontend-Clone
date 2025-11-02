import { lazy, Suspense } from "react";
import { PATH } from "./paths";
import { ROLES } from "../constants/role";
import { withLayout } from "./withLayout";
import CalendarPage from "../components/common/CalendarPage";
import ProfileSettings from "../pages/agent_dashboard/ProfileSettings";
import ManageTeams from "../pages/agent_dashboard/ManageTeams";
import SubscriptionBilling from "../pages/agent_dashboard/SubscriptionBilling";
import Documents from "../pages/agent_dashboard/Documents";
import AMLCompliance from "../pages/agent_dashboard/AMLCompliance";
import AIAssistant from "../pages/agent_dashboard/AIAssistant";
import ClientDetailsPage from "../pages/agent_dashboard/ClientDetailsPage";

// 🔹 Lazy Imports
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ApplicationSubmitted = lazy(() =>
  import("../pages/auth/ApplicationSubmitted")
);
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const VerificationCode = lazy(() => import("../pages/auth/VerificationCode"));
const SetPassword = lazy(() => import("../pages/auth/SetPassword"));
const PasswordResetSuccess = lazy(() =>
  import("../pages/auth/PasswordResetSuccess")
); // Layouts
const AuthLayout = lazy(() => import("../layouts/Auth_Layout/AuthLayout"));
const DashboardLayout = lazy(() =>
  import("../layouts/Dashboard_Layout/DashboardLayout")
);
const AgentDashboard = lazy(() =>
  import("../pages/agent_dashboard/AgentDashboard")
);
const AgentClients = lazy(() =>
  import("../pages/agent_dashboard/AgentClients")
);
// 🔹 Public Routes
export const publicRoutes = [
  {
    path: PATH.noPermission,
    element: <div>No Permission</div>,
  },
];

// 🔹 Auth Routes
export const authRoutes = [
  {
    path: PATH.login,
    element: withLayout(AuthLayout, Login),
    title: "Login",
  },
  {
    path: PATH.register,
    element: withLayout(AuthLayout, Register, { maxWidth: "1180px" }),
    title: "Register",
  },
  {
    path: PATH.applicationSubmitted,
    element: withLayout(AuthLayout, ApplicationSubmitted, {
      maxWidth: "1180px",
    }),
    title: "Login",
  },
  {
    path: PATH.forgotPassword,
    element: withLayout(AuthLayout, ForgotPassword),
    title: "Forgot Password",
  },
  {
    path: PATH.verifyCode,
    element: withLayout(AuthLayout, VerificationCode),
    title: "Verification Code",
  },
  {
    path: PATH.resetPassword,
    element: withLayout(AuthLayout, SetPassword),
    title: "Reset Password",
  },
  {
    path: PATH.passwordResetSuccess,
    element: withLayout(AuthLayout, PasswordResetSuccess, {
      maxHeight: "824px",
    }),
    title: "Success",
  },
];

// 🔹 Protected Routes
export const protectedRoutes = [
  // Agent routes
  {
    path: PATH.agentDashboard,
    element: withLayout(DashboardLayout, AgentDashboard),
    title: "Agent Dashboard",
    requiredRoles: [ROLES.AGENT],
  },
  {
    path: PATH.agentClients,
    element: withLayout(DashboardLayout, AgentClients),
    title: "Agent Clients",
    requiredRoles: [ROLES.AGENT],
  },
  {
    path: PATH.agentClientsDetail,
    element: withLayout(DashboardLayout, ClientDetailsPage),
    title: "Client Details",
    requiredRoles: [ROLES.AGENT],
  },
  {
    path: PATH.agentCalendar,
    element: withLayout(DashboardLayout, CalendarPage),
    title: "Agent Clients",
    requiredRoles: [ROLES.AGENT],
  },
  {
    path: PATH.agentProfileSettings,
    element: withLayout(DashboardLayout, ProfileSettings),
    title: "Profile Settings",
    requiredRoles: [ROLES.AGENT],
  },
  {
    path: PATH.agentManageTeams,
    element: withLayout(DashboardLayout, ManageTeams),
    title: "Manage Teams",
    requiredRoles: [ROLES.AGENT],
  },
  {
    path: PATH.agentSubscriptionBilling,
    element: withLayout(DashboardLayout, SubscriptionBilling),
    title: "Subscription & Billing",
    requiredRoles: [ROLES.AGENT],
  },
  {
    path: PATH.agentDocument,
    element: withLayout(DashboardLayout, Documents),
    title: "Documents",
    requiredRoles: [ROLES.AGENT],
  },
  {
    path: PATH.agentAMLCompliance,
    element: withLayout(DashboardLayout, AMLCompliance),
    title: "AML Compliance",
    requiredRoles: [ROLES.AGENT],
  },
  {
    path: PATH.agentAMLAIAssistant,
    element: withLayout(DashboardLayout, AIAssistant),
    title: "AI Assistant",
    requiredRoles: [ROLES.AGENT],
  },
];
