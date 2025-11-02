// src/constants/paths.js
export const PATH = {
  // Auth
  login: "/login",
  register: "/register",
  applicationSubmitted: "/application-submitted",

  forgotPassword: "/forgot-password",
  verifyCode: "/verify-code",
  resetPassword: "/reset-password",
  passwordResetSuccess: "/password-reset-success",

  noPermission: "/no-permission",

  // Agent
  agentDashboard: "/agent/dashboard",
  agentClients: "/agent/clients",
  agentClientsDetail: "/agent/clients/:clientId",
  agentCalendar: "/agent/calendar",
  agentDocument: "/agent/documents",
  agentAMLCompliance: "/agent/AML",
  agentAMLAIAssistant: "/agent/AI-assistant",

  agentProfileSettings: "/agent/profile-settings",
  agentManageTeams: "/agent/manage-team",
  agentSubscriptionBilling: "/agent/subscription",

  // Sub-Agent
  subAgentDashboard: "/subagent/dashboard",

  // Admin
  adminDashboard: "/admin/dashboard",
  approvals: "/admin/approvals",

  // Root
  root: "/",
};
