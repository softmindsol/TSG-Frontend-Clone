import React, { useEffect, useState } from "react";
import ViewButton from "./ViewButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllDeals } from "../../store/features/deal/service";

const ListOfDeals = ({ setViewMode, clientId, setSingleDeal }) => {
  const dispatch = useDispatch();
  const { deals, deal, loading, error } = useSelector((state) => state.deal);

  console.log("🚀 ~ ListOfDeals ~ deals:", deals);

  useEffect(() => {
    if (clientId) dispatch(getAllDeals(clientId));
  }, [clientId, dispatch]);

  if (loading) return <p>Loading...</p>;

  const allDeals = [
    {
      dealName: "Property for office space",
      propertyAddress: "123 street, 456b house, UK",
      status: "Viewing",
    },
    {
      dealName: "Plot for house built",
      propertyAddress: "123 street, 456b house, UK",
      status: "Viewing",
    },
  ];
  const handleView = (item) => {
    setSingleDeal(item);
    setViewMode("dealView");
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-[#081722]">
        List of Properties
      </h2>
      {deals.length !== 0 ? (
        <div className="grid grid-cols-[1.5fr_1fr_1.5fr_1fr] items-center gap-3 mt-3">
          <p className="text-sm font-medium text-[#081722]">Deal Type</p>
          <p className="text-sm font-medium text-[#081722]">Status</p>
          <p className="text-sm font-medium text-[#081722]">Property Address</p>
          <p className="text-sm font-medium text-[#081722]">Action</p>
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-500 text-sm bg-gray-50 py-6 rounded-lg border border-dashed border-gray-300">
          No properties available yet.
        </p>
      )}
      <div>
        {deals?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1.5fr_1fr_1.5fr_1fr] items-center gap-3 mt-3"
          >
            <p className="font-medium text-sm text-[#6B7280]">
              {item?.dealType}
            </p>
            <p className="font-medium p-1 rounded-2xl text-center w-35 bg-[#F6B31D1A] text-[#F6B31D] text-sm">
              {item?.stage}
            </p>
            <p className="font-medium text-sm text-[#6B7280]">
              {item?.propertyAddress}
            </p>
            <ViewButton onClick={() => handleView(item)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfDeals;
