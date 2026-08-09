export interface MoabiApiResponse {
  response: string;
  content: ProjectContent;
  content2?: any;
  content3?: any;
  pagination?: any;
}

export interface ProjectContent {
  projectName: string;
  currency: string;
  countryCode: string;
  phoneNo: string;
  tenure: string;
  propertyCategory: string;
  propertyType: string[];
  sizeUnit: string;
  address1: string;
  address2: string;
  address3?: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  longitude: string;
  latitude: string;
  descriptionTitle: string;
  descriptionSubTitle: string;
  descriptionOverview: string;
  logo: string;
  sitePlan: string;
  video: string;
  landSize: number;
  metricUnit: string;
  bookingFees: number;
  totalUnit: number;
  totalUnitByBlock: { name: string; totalUnit: number }[];
  projectDetails: ProjectFacility[];
  additionalFee: AdditionalFee[];
  layouts: UnitLayout[];
  documents: ProjectDocument[];
  map: ProjectDocument[];
  companyInfo: CompanyInfo;
  imageList: string[];
}

export interface ProjectFacility {
  type: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface AdditionalFee {
  type: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface UnitLayout {
  name: string;
  buildUpArea: string;
  landArea: string;
  unit: any;
  desc: string;
  specification: any;
  url: string[];
  totalUnit: number;
  layoutData: {
    description: { type: string; value: string[]; attachments?: any };
    layoutSpecification: ProjectFacility[];
    gallery: { type: string; value: string[]; attachments: { value: string; fileName: string }[] };
    document: { type: string; value: string[]; attachments: { value: string; fileName: string }[] };
    interior: { type: string; value: string[] };
    exterior: { type: string; value: string[] };
    floorPlan: { type: string; value: string[]; attachments: { value: string; fileName: string }[] };
  };
}

export interface ProjectDocument {
  fileType: string;
  value: string;
  tags: any;
  url: string;
}

export interface CompanyInfo {
  name: string;
  registrationNo: string;
  newRegistrationNo: string;
  developerCode: string;
  address1: string;
  address2: string;
  address3: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  countryCode: string;
  phoneNo: string;
  email: string;
  others: string;
}
