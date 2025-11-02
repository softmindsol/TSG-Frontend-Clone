// Agents
const selectAgentState = (state) => state.agent;
const selectAgentLogin = (state) => state.agent.AgentLogin;
const selectAgentRegister = (state) => state.agent.AgentRegister;

// Clients
const selectAllClients = (state) => state.client.allClients;
const selectSingleClient = (state) => state.client.singleClient;

export {
  selectAgentState,
  selectAgentLogin,
  selectAgentRegister,
  selectAllClients,
  selectSingleClient,
};
