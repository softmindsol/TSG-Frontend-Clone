// options.js

// Residential Property Types
export const residentialPropertyOptions = [
  { value: "Detached House", label: "Detached House" },
  { value: "Semi-Detached House", label: "Semi-Detached House" },
  { value: "Terraced House", label: "Terraced House" },
  { value: "End-Terrace House", label: "End-Terrace House" },
  { value: "Bungalow", label: "Bungalow" },
  { value: "Cottage", label: "Cottage" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Country House / Estate", label: "Country House / Estate" },
  { value: "Farmhouse", label: "Farmhouse" },
  { value: "Barn Conversion", label: "Barn Conversion" },
  { value: "Apartment / Flat", label: "Apartment / Flat" },
  { value: "Land", label: "Land" },
  { value: "Other", label: "Other" },
];

// Client Types
export const clientTypeOptions = [
  { value: "Residential Sales", label: "Residential Sales" },
  { value: "Residential Lettings", label: "Residential Lettings" },
  { value: "Commercial Sales", label: "Commercial Sales" },
  { value: "Commercial Lettings", label: "Commercial Lettings" },
  { value: "Investor", label: "Investor" },
];

// Commercial Property Types
export const commercialPropertyOptions = [
  { value: "Office Space", label: "Office Space" },
  { value: "Retail Unit", label: "Retail Unit" },
  { value: "Industrial / Warehouse", label: "Industrial / Warehouse" },
  { value: "Mixed-Use Development", label: "Mixed-Use Development" },
  {
    value: "Hospitality (Hotel, B&B, Pub)",
    label: "Hospitality (Hotel, B&B, Pub)",
  },
  { value: "Leisure (Gym, Spa)", label: "Leisure (Gym, Spa)" },
  {
    value: "Healthcare (Clinic, Care Home)",
    label: "Healthcare (Clinic, Care Home)",
  },
  { value: "Land", label: "Land" },
  { value: "Other", label: "Other" },
];

// Residential Reasons
export const residentialReasons = [
  { value: "Upsizing", label: "Upsizing" },
  { value: "Investment Property", label: "Investment Property" },
  { value: "Second Home / Holiday Home", label: "Second Home / Holiday Home" },
  { value: "Relocation", label: "Relocation" },
  { value: "Retirement Move", label: "Retirement Move" },
  { value: "Other", label: "Other" },
];

// Commercial Reasons
export const commercialReasons = [
  { value: "Owner-Occupier", label: "Owner-Occupier" },
  { value: "Investment Acquisition", label: "Investment Acquisition" },
  { value: "Development Opportunity", label: "Development Opportunity" },
  { value: "Business Expansion", label: "Business Expansion" },
  { value: "Portfolio Diversification", label: "Portfolio Diversification" },
  { value: "Other", label: "Other" },
];

// Timeframe Options
export const timeframeOptions = [
  { value: "Immediate (0–1 month)", label: "Immediate (0–1 month)" },
  { value: "Short-Term (1–3 months)", label: "Short-Term (1–3 months)" },
  { value: "Medium-Term (3–6 months)", label: "Medium-Term (3–6 months)" },
  { value: "Long-Term (6–12 months)", label: "Long-Term (6–12 months)" },
  { value: "Flexible / No Fixed Date", label: "Flexible / No Fixed Date" },
  { value: "Other", label: "Other" },
];

// Must-Have Options
export const mustHaveOptions = [
  { value: "Swimming Pool", label: "Swimming Pool" },
  {
    value: "Garage / Off-Street Parking",
    label: "Garage / Off-Street Parking",
  },
  { value: "Garden / Outdoor Space", label: "Garden / Outdoor Space" },
  { value: "Home Office", label: "Home Office" },
  { value: "Modern Kitchen", label: "Modern Kitchen" },
  { value: "Open-Plan Layout", label: "Open-Plan Layout" },
  { value: "High-Speed Internet", label: "High-Speed Internet" },
  { value: "Other", label: "Other" },
];

// Avoid Options
export const avoidOptions = [
  { value: "Poor Location", label: "Poor Location" },
  { value: "High Noise Levels", label: "High Noise Levels" },
  { value: "Requires Major Renovation", label: "Requires Major Renovation" },
  {
    value: "Flood Risk or Structural Issues",
    label: "Flood Risk or Structural Issues",
  },
  {
    value: "Leasehold (if Freehold Preferred)",
    label: "Leasehold (if Freehold Preferred)",
  },
  { value: "Short Lease Term", label: "Short Lease Term" },
  { value: "Other", label: "Other" },
];

// Design Style
export const designStyleOptions = [
  { value: "Modern / Contemporary", label: "Modern / Contemporary" },
  { value: "Traditional", label: "Traditional" },
  {
    value: "Period Property (Victorian, Georgian, Edwardian)",
    label: "Period Property (Victorian, Georgian, Edwardian)",
  },
  { value: "Cottage Style", label: "Cottage Style" },
  { value: "Barn Conversion", label: "Barn Conversion" },
  { value: "Minimalist", label: "Minimalist" },
  { value: "Luxury / High-End", label: "Luxury / High-End" },
  { value: "Eco-Home / Sustainable", label: "Eco-Home / Sustainable" },
  { value: "Coastal / Waterfront", label: "Coastal / Waterfront" },
  { value: "Urban Loft / Industrial", label: "Urban Loft / Industrial" },
  { value: "Other", label: "Other" },
];

// Purchase Method
export const purchaseMethodOptions = [
  { value: "Cash", label: "Cash" },
  { value: "Mortgage", label: "Mortgage" },
  { value: "Cash from Sale", label: "Cash from Sale" },
  { value: "Porting Mortgage", label: "Porting Mortgage" },
  { value: "Mortgage + Sale", label: "Mortgage + Sale" },
  { value: "Bridging Finance", label: "Bridging Finance" },
  { value: "Rental (Short-Term)", label: "Rental (Short-Term)" },
  { value: "Rental (Long-Term)", label: "Rental (Long-Term)" },
  { value: "Other", label: "Other" },
];

// Current Position
export const currentPositionOptions = [
  { value: "First-Time Buyer", label: "First-Time Buyer" },
  {
    value: "Property on Market (For Sale)",
    label: "Property on Market (For Sale)",
  },
  { value: "Under Offer (Selling)", label: "Under Offer (Selling)" },
  { value: "Property Sold (STC)", label: "Property Sold (STC)" },
  { value: "Living in Rental", label: "Living in Rental" },
  {
    value: "Living with Family / Friends",
    label: "Living with Family / Friends",
  },
  { value: "Investor (No Chain)", label: "Investor (No Chain)" },
  { value: "Other", label: "Other" },
];

// Preferred Area
export const preferredAreaOptions = [
  { value: "City Centre / Urban", label: "City Centre / Urban" },
  { value: "Suburban Area", label: "Suburban Area" },
  { value: "Countryside / Rural", label: "Countryside / Rural" },
  { value: "Coastal / Seaside", label: "Coastal / Seaside" },
  { value: "Waterfront (Lake / River)", label: "Waterfront (Lake / River)" },
  {
    value: "Near Transport Links (e.g., station, airport)",
    label: "Near Transport Links (e.g., station, airport)",
  },
  {
    value: "Close to Schools / Education Hubs",
    label: "Close to Schools / Education Hubs",
  },
  { value: "Other", label: "Other" },
];
