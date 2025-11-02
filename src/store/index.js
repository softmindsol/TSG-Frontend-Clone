import { configureStore } from "@reduxjs/toolkit";
import agentReducer from "./features/agent/slice";
import clientReducer from "./features/client/slice";
import amlReducer from "./features/amlCompliance/slice";
import amlReportReducer from "./features/report/slice";
import dealReducer from "./features/deal/slice";
import journalReducer from "./features/journal/slice";
import extraContactReducer from "./features/extraContact/slice";
import clientDocumentReducer from "./features/clientDocument/slice";
import eventReducer from "./features/event/slice";
import documentsReducer from "./features/documents/slice";
import commissionReducer from "./features/commission/slice";

import subscriptionReducer from "./features/stripe/slice"
import teamReducer from "./features/member/slice"
const store = configureStore({
  reducer: {
    agent: agentReducer,
    client: clientReducer,
    amlCompliance: amlReducer,
    amlReport: amlReportReducer,
    deal: dealReducer,
    journal: journalReducer,
    extraContact: extraContactReducer,
    clientDocument: clientDocumentReducer,
    event: eventReducer,
    documents: documentsReducer,
    commission: commissionReducer,
    subscription: subscriptionReducer,
    team: teamReducer,
  },
});

export default store;
