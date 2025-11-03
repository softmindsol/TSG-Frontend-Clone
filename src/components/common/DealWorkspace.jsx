import React from "react";
import AccordionItem from "../DealWordspaceComponents/AccordianItem";
import KeyDates from "../DealWordspaceComponents/KeyDates";
import BuyerSideDetails from "../DealWordspaceComponents/BuyerSideDetails";
import SellerSideDetails from "../DealWordspaceComponents/SellerSideDetails";
import FinancialDetails from "../DealWordspaceComponents/FinancialDetails";
import QuickNotesDeal from "../DealWordspaceComponents/QuickNotesDeal";
import PropertyDetails from "../DealWordspaceComponents/PropertyDetails";
import Offers from "../DealWordspaceComponents/Offers";
import Documents from "./Documents";
import DuiDiligence from "../DealWordspaceComponents/DueDiligence";
import ConveyancingMilestone from "../DealWordspaceComponents/ConveyancingMilestone";
import OptionalMilestones from "../DealWordspaceComponents/OptionalMilestones";
import DealDocument from "./DealDocument";
import DealProgressTracker from "../DealWordspaceComponents/DealProgressTracker";
import Icons from "../../assets/icons/Icons";

const DealWorkspace = ({ singleDeal, onBack }) => {
  return (
    <>
      <div
        className="my-4 flex item-center gap-3 cursor-pointer"
        onClick={onBack}
      >
        <Icons.ArrowLeft size={22} />
        Back
      </div>
      <AccordionItem title="Key Dates">
        <KeyDates singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Buyer Side Details">
        <BuyerSideDetails singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Seller Side Details">
        <SellerSideDetails singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Financial Details">
        <FinancialDetails singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Quick Notes">
        <QuickNotesDeal singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Property Details">
        <PropertyDetails singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Offer (Deal Details)">
        <Offers singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Documents">
        <DealDocument singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Due Diligence & Surveys">
        <DuiDiligence singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Conveyancing Milestones (Timeline Tracker)">
        <ConveyancingMilestone singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Optional Milestones">
        <OptionalMilestones singleDeal={singleDeal} />
      </AccordionItem>
      <AccordionItem title="Deal Progress Tracker">
        <DealProgressTracker singleDeal={singleDeal} />
      </AccordionItem>
    </>
  );
};

export default DealWorkspace;
