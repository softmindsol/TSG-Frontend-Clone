import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeals } from "../../store/features/deal/service";
import { fillTemplateData } from "../../store/features/documents/service";
import { getAllClients } from "../../store/features/client/service";

const TemplateSection = ({ singleTemplate, allClients }) => {
  const dispatch = useDispatch();
  const { deals, loading } = useSelector((state) => state.deal);

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedDeal, setSelectedDeal] = useState("");

  // Editable states
  const [subject, setSubject] = useState(singleTemplate?.subject || "");
  const [body, setBody] = useState(singleTemplate?.body || "");

  // ✅ Update pre-filled data when `singleTemplate` changes
  useEffect(() => {
    if (singleTemplate) {
      setSubject(singleTemplate.subject || "");
      setBody(singleTemplate.body || "");
    }
  }, [singleTemplate]);

  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  const handleClientChange = (e) => {
    const clientId = e.target.value;
    setSelectedClient(clientId);
    setSelectedDeal("");
    if (clientId) dispatch(getAllDeals(clientId));
  };

  const handleDealChange = (e) => {
    const dealId = e.target.value;
    setSelectedDeal(dealId);
  };

  // ✅ Fill Template Data API call
  const handleSave = async () => {
    if (!selectedDeal) {
      alert("Please select a deal first!");
      return;
    }

    try {
      const res = await dispatch(
        fillTemplateData({
          templateId: singleTemplate?._id,
          dealId: selectedDeal,
        })
      ).unwrap();

      if (res?.data) {
        setSubject(res.data.subject);
        setBody(res.data.body);
       
      }
    } catch (error) {
      console.error("❌ Failed to fill template:", error);
    }
  };

  // ✅ Open Gmail with prefilled subject & body
  const handleSendGmail = () => {
    if (!subject && !body) {
      alert("Please fill the template first!");
      return;
    }

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank");
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-b pb-2">
        Templates
      </h2>

      {/* --- Dropdown Filters --- */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex flex-col w-full sm:w-1/2">
          <label className="text-sm text-gray-600 mb-1">Client</label>
          <select
            value={selectedClient}
            onChange={handleClientChange}
            className="border border-gray-300 rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select a Client</option>
            {Array.isArray(allClients?.data?.clients) &&
              allClients.data.clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.clientName}
                </option>
              ))}
          </select>
        </div>

        {selectedClient && (
          <div className="flex flex-col w-full sm:w-1/2">
            <label className="text-sm text-gray-600 mb-1">Deal</label>
            <select
              value={selectedDeal}
              onChange={handleDealChange}
              disabled={loading}
              className="border border-gray-300 rounded-xl p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">
                {loading ? "Loading deals..." : "Select a Deal"}
              </option>
              {Array.isArray(deals) &&
                deals.map((deal) => (
                  <option key={deal._id} value={deal._id}>
                    {deal.dealName || deal.title || `Deal ${deal._id}`}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      {/* --- Template Editable Section --- */}
      {singleTemplate ? (
        <section className="space-y-6">
          {/* Subject Editor */}
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              ✉️ Subject
            </h3>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter email subject..."
            />
          </div>

          {/* Body Editor */}
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📝 Body
            </h3>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="Write your email body here..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 active:scale-95 transition"
            >
              Fill Template Data
            </button>

            <button
              onClick={handleSendGmail}
              className="px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 active:scale-95 transition"
            >
              Send via Gmail
            </button>
          </div>
        </section>
      ) : (
        <p className="text-gray-600 text-sm">
          Select a template from the sidebar to view details.
        </p>
      )}
    </div>
  );
};

export default TemplateSection;
