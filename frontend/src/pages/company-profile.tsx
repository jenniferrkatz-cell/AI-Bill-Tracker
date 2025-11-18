import { useState } from "react";
import { mockBills, Bill } from "@/data/mockBills";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface CompanyProfile {
  name: string;
  revenue: string;
  employeeCount: string;
  states: string[];
  industries: string[];
  aiUseCases: string[];
}

interface ApplicableBill {
  bill: Bill;
  reasons: string[];
  confidence: 'High' | 'Medium' | 'Low';
}

const CompanyProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CompanyProfile>({
    name: '',
    revenue: '',
    employeeCount: '',
    states: [],
    industries: [],
    aiUseCases: []
  });
  const [showResults, setShowResults] = useState(false);
  const [applicableBills, setApplicableBills] = useState<ApplicableBill[]>([]);

  const revenueOptions = [
    'Under $1M',
    '$1M - $10M',
    '$10M - $25M',
    '$25M - $50M',
    '$50M - $100M',
    'Over $100M'
  ];

  const employeeOptions = [
    'Under 15',
    '15-50',
    '51-100',
    '101-500',
    '501-1000',
    'Over 1000'
  ];

  const stateOptions = [
    'Alabama', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Florida', 'Georgia', 'Hawaii', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
    'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Nebraska', 'Nevada', 'New Jersey',
    'New York', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin'
  ];

  const industryOptions = [
    'Technology/Software',
    'Healthcare',
    'Financial Services',
    'Education',
    'Retail/E-commerce',
    'Manufacturing',
    'Agriculture',
    'Energy/Utilities',
    'Transportation',
    'Real Estate',
    'Insurance',
    'Media/Entertainment',
    'Government/Public Sector',
    'Gaming/Hospitality',
    'Mining/Natural Resources'
  ];

  const aiUseCaseOptions = [
    'Employment/HR (hiring, screening, performance)',
    'Credit/Lending decisions',
    'Healthcare diagnosis/treatment',
    'Content generation (text, images, video)',
    'Customer service chatbots',
    'Recommendation systems',
    'Fraud detection',
    'Pricing/dynamic pricing',
    'Facial recognition',
    'Predictive analytics',
    'Automated decision-making',
    'Biometric data processing',
    'Tenant/housing screening',
    'Insurance underwriting',
    'Educational technology',
    'Content moderation'
  ];

  const toggleState = (state: string) => {
    setProfile(prev => ({
      ...prev,
      states: prev.states.includes(state)
        ? prev.states.filter(s => s !== state)
        : [...prev.states, state]
    }));
  };

  const toggleAllStates = () => {
    setProfile(prev => ({
      ...prev,
      states: prev.states.length === stateOptions.length ? [] : [...stateOptions]
    }));
  };

  const toggleIndustry = (industry: string) => {
    setProfile(prev => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry]
    }));
  };

  const toggleAllIndustries = () => {
    setProfile(prev => ({
      ...prev,
      industries: prev.industries.length === industryOptions.length ? [] : [...industryOptions]
    }));
  };

  const toggleUseCase = (useCase: string) => {
    setProfile(prev => ({
      ...prev,
      aiUseCases: prev.aiUseCases.includes(useCase)
        ? prev.aiUseCases.filter(u => u !== useCase)
        : [...prev.aiUseCases, useCase]
    }));
  };

  const toggleAllUseCases = () => {
    setProfile(prev => ({
      ...prev,
      aiUseCases: prev.aiUseCases.length === aiUseCaseOptions.length ? [] : [...aiUseCaseOptions]
    }));
  };

  const meetsRevenueThreshold = (threshold: string): boolean => {
    const revenueMap: Record<string, number> = {
      'Under $1M': 0.5,
      '$1M - $10M': 5,
      '$10M - $25M': 17.5,
      '$25M - $50M': 37.5,
      '$50M - $100M': 75,
      'Over $100M': 150
    };
    
    const companyRevenue = revenueMap[profile.revenue] || 0;
    
    if (threshold.includes('$100 million') || threshold.includes('$100m')) {
      return companyRevenue >= 100;
    }
    if (threshold.includes('$50 million') || threshold.includes('$50m')) {
      return companyRevenue >= 50;
    }
    if (threshold.includes('$25 million') || threshold.includes('$25m')) {
      return companyRevenue >= 25;
    }
    if (threshold.includes('$10 million') || threshold.includes('$10m')) {
      return companyRevenue >= 10;
    }
    if (threshold.includes('$1 million') || threshold.includes('$1m')) {
      return companyRevenue >= 1;
    }
    
    return false;
  };

  const meetsEmployeeThreshold = (threshold: string): boolean => {
    const employeeMap: Record<string, number> = {
      'Under 15': 10,
      '15-50': 32,
      '51-100': 75,
      '101-500': 300,
      '501-1000': 750,
      'Over 1000': 2000
    };
    
    const companyEmployees = employeeMap[profile.employeeCount] || 0;
    
    if (threshold.includes('1000 employees') || threshold.includes('1,000 employees')) {
      return companyEmployees >= 1000;
    }
    if (threshold.includes('500 employees')) {
      return companyEmployees >= 500;
    }
    if (threshold.includes('100 employees')) {
      return companyEmployees >= 100;
    }
    if (threshold.includes('50 employees')) {
      return companyEmployees >= 50;
    }
    if (threshold.includes('15 employees')) {
      return companyEmployees >= 15;
    }
    
    return false;
  };

  const analyzeApplicability = () => {
    const results: ApplicableBill[] = [];

    mockBills.forEach(bill => {
      const reasons: string[] = [];
      let confidence: 'High' | 'Medium' | 'Low' = 'Low';

      // Check state match
      const stateMatch = profile.states.includes(bill.state);
      if (stateMatch) {
        reasons.push(`Your company operates in ${bill.state}`);
        confidence = 'Medium';
      }

      // Check revenue thresholds in scope
      const scope = bill.scope.toLowerCase();
      
      if (meetsRevenueThreshold(scope)) {
        if (scope.includes('$100 million') || scope.includes('$100m')) {
          reasons.push('Your revenue exceeds the $100M threshold mentioned in the bill');
          confidence = 'High';
        } else if (scope.includes('$50 million') || scope.includes('$50m')) {
          reasons.push('Your revenue exceeds the $50M threshold mentioned in the bill');
          confidence = 'High';
        } else if (scope.includes('$25 million') || scope.includes('$25m')) {
          reasons.push('Your revenue exceeds the $25M threshold mentioned in the bill');
          confidence = 'High';
        } else if (scope.includes('$10 million') || scope.includes('$10m')) {
          reasons.push('Your revenue exceeds the $10M threshold mentioned in the bill');
          confidence = 'High';
        } else if (scope.includes('$1 million') || scope.includes('$1m')) {
          reasons.push('Your revenue exceeds the $1M threshold mentioned in the bill');
          confidence = 'High';
        }
      }

      // Check employee thresholds
      if (meetsEmployeeThreshold(scope)) {
        if (scope.includes('1000 employees') || scope.includes('1,000 employees')) {
          reasons.push('Your employee count exceeds the 1,000 employee threshold');
          confidence = 'High';
        } else if (scope.includes('500 employees')) {
          reasons.push('Your employee count exceeds the 500 employee threshold');
          confidence = 'High';
        } else if (scope.includes('100 employees')) {
          reasons.push('Your employee count exceeds the 100 employee threshold');
          confidence = 'High';
        } else if (scope.includes('50 employees')) {
          reasons.push('Your employee count exceeds the 50 employee threshold');
          confidence = 'High';
        } else if (scope.includes('15 employees')) {
          reasons.push('Your employee count exceeds the 15 employee threshold');
          confidence = 'High';
        }
      }

      // Check use case matches
      const billText = `${bill.title} ${bill.summary} ${bill.scope} ${bill.modelsCovered}`.toLowerCase();
      
      profile.aiUseCases.forEach(useCase => {
        if (useCase.includes('Employment') && (billText.includes('employment') || billText.includes('hiring') || billText.includes('worker'))) {
          reasons.push('Bill covers employment/hiring AI systems');
          confidence = 'High';
        }
        if (useCase.includes('Credit') && (billText.includes('credit') || billText.includes('lending') || billText.includes('loan'))) {
          reasons.push('Bill covers credit/lending AI systems');
          confidence = 'High';
        }
        if (useCase.includes('Healthcare') && (billText.includes('healthcare') || billText.includes('medical') || billText.includes('clinical'))) {
          reasons.push('Bill covers healthcare AI systems');
          confidence = 'High';
        }
        if (useCase.includes('Content generation') && (billText.includes('generative') || billText.includes('deepfake') || billText.includes('synthetic media'))) {
          reasons.push('Bill covers generative AI/content creation');
          confidence = 'High';
        }
        if (useCase.includes('Facial recognition') && billText.includes('facial recognition')) {
          reasons.push('Bill specifically regulates facial recognition');
          confidence = 'High';
        }
        if (useCase.includes('Biometric') && billText.includes('biometric')) {
          reasons.push('Bill covers biometric data processing');
          confidence = 'High';
        }
        if (useCase.includes('Automated decision') && (billText.includes('automated decision') || billText.includes('algorithmic'))) {
          reasons.push('Bill covers automated decision-making systems');
          confidence = 'High';
        }
        if (useCase.includes('Tenant') && (billText.includes('tenant') || billText.includes('housing') || billText.includes('rental'))) {
          reasons.push('Bill covers tenant screening and housing decisions');
          confidence = 'High';
        }
        if (useCase.includes('Insurance') && (billText.includes('insurance') || billText.includes('underwriting'))) {
          reasons.push('Bill covers insurance underwriting algorithms');
          confidence = 'High';
        }
        if (useCase.includes('Educational') && (billText.includes('education') || billText.includes('student'))) {
          reasons.push('Bill covers educational technology and student data');
          confidence = 'High';
        }
        if (useCase.includes('Content moderation') && billText.includes('content moderation')) {
          reasons.push('Bill covers automated content moderation');
          confidence = 'High';
        }
        if (useCase.includes('Pricing') && (billText.includes('pricing') || billText.includes('dynamic pricing'))) {
          reasons.push('Bill covers pricing algorithms');
          confidence = 'High';
        }
      });

      // Check industry matches
      profile.industries.forEach(industry => {
        if (industry.includes('Healthcare') && billText.includes('healthcare')) {
          reasons.push('Bill targets healthcare industry');
          confidence = 'High';
        }
        if (industry.includes('Financial') && (billText.includes('financial') || billText.includes('credit') || billText.includes('insurance'))) {
          reasons.push('Bill targets financial services industry');
          confidence = 'High';
        }
        if (industry.includes('Education') && billText.includes('education')) {
          reasons.push('Bill targets education sector');
          confidence = 'High';
        }
        if (industry.includes('Agriculture') && (billText.includes('agriculture') || billText.includes('farming') || billText.includes('farm'))) {
          reasons.push('Bill targets agricultural sector');
          confidence = 'High';
        }
        if (industry.includes('Manufacturing') && billText.includes('manufacturing')) {
          reasons.push('Bill targets manufacturing industry');
          confidence = 'High';
        }
        if (industry.includes('Energy') && (billText.includes('energy') || billText.includes('grid') || billText.includes('utility'))) {
          reasons.push('Bill targets energy/utilities sector');
          confidence = 'High';
        }
        if (industry.includes('Transportation') && (billText.includes('vehicle') || billText.includes('autonomous') || billText.includes('transportation'))) {
          reasons.push('Bill targets transportation/autonomous vehicles');
          confidence = 'High';
        }
        if (industry.includes('Real Estate') && (billText.includes('housing') || billText.includes('tenant') || billText.includes('rental'))) {
          reasons.push('Bill targets real estate/housing sector');
          confidence = 'High';
        }
        if (industry.includes('Gaming') && (billText.includes('gaming') || billText.includes('casino') || billText.includes('hospitality'))) {
          reasons.push('Bill targets gaming/hospitality industry');
          confidence = 'High';
        }
        if (industry.includes('Mining') && (billText.includes('mining') || billText.includes('coal') || billText.includes('oil and gas'))) {
          reasons.push('Bill targets mining/natural resources sector');
          confidence = 'High';
        }
      });

      // If we found reasons, add to results
      if (reasons.length > 0) {
        results.push({ bill, reasons, confidence });
      }
    });

    // Sort by confidence
    results.sort((a, b) => {
      const confidenceOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return confidenceOrder[b.confidence] - confidenceOrder[a.confidence];
    });

    setApplicableBills(results);
    setShowResults(true);
  };

  const generateComplianceChecklist = () => {
    const checklist: Record<string, Set<string>> = {
      'Bias Testing & Fairness': new Set(),
      'Human Oversight': new Set(),
      'Disclosure & Transparency': new Set(),
      'Impact Assessments': new Set(),
      'Documentation': new Set(),
      'Regulatory Reporting': new Set(),
      'User Rights': new Set(),
      'Security': new Set(),
      'Data Privacy': new Set()
    };

    applicableBills.forEach(({ bill }) => {
      bill.keyRequirements.forEach(req => {
        const normalized = req.toLowerCase();
        
        if (normalized.includes('bias') || normalized.includes('discriminat') || normalized.includes('fairness')) {
          checklist['Bias Testing & Fairness'].add(req);
        }
        if (normalized.includes('human') && (normalized.includes('oversight') || normalized.includes('review'))) {
          checklist['Human Oversight'].add(req);
        }
        if (normalized.includes('disclose') || normalized.includes('transparency') || normalized.includes('notice')) {
          checklist['Disclosure & Transparency'].add(req);
        }
        if (normalized.includes('impact assessment') || normalized.includes('risk assessment')) {
          checklist['Impact Assessments'].add(req);
        }
        if (normalized.includes('documentation') || normalized.includes('record')) {
          checklist['Documentation'].add(req);
        }
        if (normalized.includes('report') && !normalized.includes('transparency report')) {
          checklist['Regulatory Reporting'].add(req);
        }
        if (normalized.includes('consent') || normalized.includes('opt-out')) {
          checklist['User Rights'].add(req);
        }
        if (normalized.includes('security') || normalized.includes('cybersecurity')) {
          checklist['Security'].add(req);
        }
        if (normalized.includes('data') && (normalized.includes('privacy') || normalized.includes('protection'))) {
          checklist['Data Privacy'].add(req);
        }
      });
    });

    return checklist;
  };

  const confidenceColors = {
    'High': 'bg-red-100 text-red-800 border-red-200',
    'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Low': 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Company Compliance Profile</h1>
                <p className="text-sm text-gray-600">Identify applicable bills and generate compliance checklist</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <Card>
            <CardHeader>
              <CardTitle>Enter Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Company Name */}
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  placeholder="Acme AI Corp"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              {/* Revenue and Employees in a grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue */}
                <div>
                  <Label htmlFor="revenue">Annual Revenue</Label>
                  <Select value={profile.revenue} onValueChange={(value) => setProfile({ ...profile, revenue: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select revenue range" />
                    </SelectTrigger>
                    <SelectContent>
                      {revenueOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Employee Count */}
                <div>
                  <Label htmlFor="employees">Number of Employees</Label>
                  <Select value={profile.employeeCount} onValueChange={(value) => setProfile({ ...profile, employeeCount: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select employee count" />
                    </SelectTrigger>
                    <SelectContent>
                      {employeeOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* States */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>States Where You Operate</Label>
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={toggleAllStates}
                    className="h-auto p-0 text-blue-600"
                  >
                    {profile.states.length === stateOptions.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto border rounded-md p-4">
                  {stateOptions.map(state => (
                    <div key={state} className="flex items-center space-x-2">
                      <Checkbox
                        id={`state-${state}`}
                        checked={profile.states.includes(state)}
                        onCheckedChange={() => toggleState(state)}
                      />
                      <label
                        htmlFor={`state-${state}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {state}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industries */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Industries</Label>
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={toggleAllIndustries}
                    className="h-auto p-0 text-blue-600"
                  >
                    {profile.industries.length === industryOptions.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {industryOptions.map(industry => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox
                        id={`industry-${industry}`}
                        checked={profile.industries.includes(industry)}
                        onCheckedChange={() => toggleIndustry(industry)}
                      />
                      <label
                        htmlFor={`industry-${industry}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {industry}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Use Cases */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>AI Use Cases</Label>
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={toggleAllUseCases}
                    className="h-auto p-0 text-blue-600"
                  >
                    {profile.aiUseCases.length === aiUseCaseOptions.length ? 'Deselect All' : 'Select All'}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">Select all AI systems you deploy</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aiUseCaseOptions.map(useCase => (
                    <div key={useCase} className="flex items-center space-x-2">
                      <Checkbox
                        id={`usecase-${useCase}`}
                        checked={profile.aiUseCases.includes(useCase)}
                        onCheckedChange={() => toggleUseCase(useCase)}
                      />
                      <label
                        htmlFor={`usecase-${useCase}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {useCase}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={analyzeApplicability} 
                className="w-full"
                disabled={profile.states.length === 0 || profile.aiUseCases.length === 0}
              >
                Analyze Applicable Bills
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Analysis Results for {profile.name || 'Your Company'}</CardTitle>
                  <Button variant="outline" onClick={() => setShowResults(false)}>
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">Applicable Bills</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">{applicableBills.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">High Confidence</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">
                      {applicableBills.filter(b => b.confidence === 'High').length}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">States Affected</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                      {new Set(applicableBills.map(b => b.bill.state)).size}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Consolidated Compliance Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-6">
                  Based on the {applicableBills.length} applicable bills, here are the key compliance actions your company should take:
                </p>
                {Object.entries(generateComplianceChecklist()).map(([category, requirements]) => {
                  if (requirements.size === 0) return null;
                  return (
                    <div key={category} className="mb-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-3">{category}</h3>
                      <ul className="space-y-2">
                        {Array.from(requirements).map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 border-2 border-gray-300 rounded mt-0.5" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Applicable Bills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Applicable Bills ({applicableBills.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicableBills.map(({ bill, reasons, confidence }) => (
                    <div key={bill.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{bill.billNumber}</h3>
                            <Badge className={confidenceColors[confidence]}>
                              {confidence} Confidence
                            </Badge>
                            <Badge variant="outline">{bill.state}</Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{bill.title}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-900 mb-2">Why this applies to you:</p>
                        <ul className="space-y-1">
                          {reasons.map((reason, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                              <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator className="my-3" />

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Status: {bill.status}</span>
                        <Button 
                          variant="link" 
                          size="sm"
                          onClick={() => navigate(`/bill/${bill.id}`)}
                        >
                          View Full Details →
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanyProfile;