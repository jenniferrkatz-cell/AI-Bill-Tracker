import extractedBillsData from './extracted_bills.json';

export interface Bill {
  id: string;
  billNumber: string;
  title: string;
  state: string;
  status: 'Introduced' | 'In Committee' | 'Passed House' | 'Passed Senate' | 'Enacted' | 'Failed';
  dateIntroduced: string;
  lastUpdated: string;
  summary: string;
  scope: string;
  modelsCovered: string;
  keyRequirements: string[];
  sponsor: string;
  originalLink: string;
}

// Use real data from extracted_bills.json
export const mockBills: Bill[] = extractedBillsData as Bill[];
