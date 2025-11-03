import { useMemo } from "react";
import { mockBills } from "@/data/mockBills";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, TrendingUp, FileText, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Analytics = () => {
  const navigate = useNavigate();

  const analytics = useMemo(() => {
    // Count bills by state
    const stateCount: Record<string, number> = {};
    mockBills.forEach(bill => {
      stateCount[bill.state] = (stateCount[bill.state] || 0) + 1;
    });
    const topStates = Object.entries(stateCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Count bills by status
    const statusCount: Record<string, number> = {};
    mockBills.forEach(bill => {
      statusCount[bill.status] = (statusCount[bill.status] || 0) + 1;
    });

    // Extract and count common requirements
    const requirementCounts: Record<string, number> = {};
    mockBills.forEach(bill => {
      bill.keyRequirements.forEach(req => {
        // Normalize requirements to find common themes
        const normalized = req.toLowerCase();
        
        if (normalized.includes('bias') || normalized.includes('discriminat') || normalized.includes('fairness')) {
          requirementCounts['Bias Testing & Fairness Audits'] = (requirementCounts['Bias Testing & Fairness Audits'] || 0) + 1;
        }
        if (normalized.includes('human') && (normalized.includes('oversight') || normalized.includes('review') || normalized.includes('supervision'))) {
          requirementCounts['Human Oversight'] = (requirementCounts['Human Oversight'] || 0) + 1;
        }
        if (normalized.includes('disclose') || normalized.includes('transparency') || normalized.includes('notice')) {
          requirementCounts['Disclosure & Transparency'] = (requirementCounts['Disclosure & Transparency'] || 0) + 1;
        }
        if (normalized.includes('impact assessment') || normalized.includes('risk assessment')) {
          requirementCounts['Impact/Risk Assessments'] = (requirementCounts['Impact/Risk Assessments'] || 0) + 1;
        }
        if (normalized.includes('documentation') || normalized.includes('record') || normalized.includes('maintain')) {
          requirementCounts['Documentation & Record-Keeping'] = (requirementCounts['Documentation & Record-Keeping'] || 0) + 1;
        }
        if (normalized.includes('report') && !normalized.includes('transparency report')) {
          requirementCounts['Regulatory Reporting'] = (requirementCounts['Regulatory Reporting'] || 0) + 1;
        }
        if (normalized.includes('consent') || normalized.includes('opt-out') || normalized.includes('opt out')) {
          requirementCounts['User Consent & Control'] = (requirementCounts['User Consent & Control'] || 0) + 1;
        }
        if (normalized.includes('security') || normalized.includes('cybersecurity')) {
          requirementCounts['Security Measures'] = (requirementCounts['Security Measures'] || 0) + 1;
        }
        if (normalized.includes('data') && (normalized.includes('privacy') || normalized.includes('protection') || normalized.includes('deletion'))) {
          requirementCounts['Data Privacy & Protection'] = (requirementCounts['Data Privacy & Protection'] || 0) + 1;
        }
        if (normalized.includes('explanation') || normalized.includes('explainability')) {
          requirementCounts['Explainability'] = (requirementCounts['Explainability'] || 0) + 1;
        }
      });
    });

    const topRequirements = Object.entries(requirementCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    return {
      topStates,
      statusCount,
      topRequirements,
      totalBills: mockBills.length
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Legislative Analytics</h1>
                <p className="text-sm text-gray-600">Trends and insights across AI legislation</p>
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
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Total Bills</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalBills}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Active Bills</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{analytics.statusCount['In Committee'] || 0}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Enacted Laws</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{analytics.statusCount['Enacted'] || 0}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">States Covered</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{analytics.topStates.length}+</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Most Common Compliance Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-6">
              These are the most frequently appearing requirements across all tracked bills. Companies should prioritize these areas for compliance readiness.
            </p>
            <div className="space-y-4">
              {analytics.topRequirements.map(([requirement, count], index) => {
                const percentage = Math.round((count / analytics.totalBills) * 100);
                return (
                  <div key={requirement}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900">{requirement}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {count} bills ({percentage}%)
                      </span>
                    </div>
                    <div className="ml-11">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top States */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-600" />
                Most Active States
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topStates.map(([state, count], index) => {
                  const percentage = Math.round((count / analytics.totalBills) * 100);
                  return (
                    <div key={state}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </span>
                          <span className="font-medium text-gray-900">{state}</span>
                        </div>
                        <span className="text-sm text-gray-600">{count} bills</span>
                      </div>
                      <div className="ml-11">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Bill Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Bill Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.statusCount)
                  .sort(([, a], [, b]) => b - a)
                  .map(([status, count]) => {
                    const percentage = Math.round((count / analytics.totalBills) * 100);
                    const colors: Record<string, string> = {
                      'Introduced': 'bg-blue-600',
                      'In Committee': 'bg-yellow-600',
                      'Passed House': 'bg-purple-600',
                      'Passed Senate': 'bg-indigo-600',
                      'Enacted': 'bg-green-600',
                      'Failed': 'bg-red-600'
                    };
                    return (
                      <div key={status}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{status}</span>
                          <span className="text-sm text-gray-600">
                            {count} bills ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${colors[status]} h-2 rounded-full transition-all`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <p className="text-gray-700">
                  <strong>Bias testing and fairness audits</strong> are the most common requirement, appearing in {analytics.topRequirements[0]?.[1] || 0} bills. 
                  This reflects widespread concern about algorithmic discrimination.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <p className="text-gray-700">
                  <strong>Human oversight</strong> is mandated in {analytics.topRequirements.find(([name]) => name === 'Human Oversight')?.[1] || 0} bills, 
                  indicating legislators want to ensure humans remain in control of critical AI decisions.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <p className="text-gray-700">
                  <strong>Transparency and disclosure</strong> requirements appear in {analytics.topRequirements.find(([name]) => name === 'Disclosure & Transparency')?.[1] || 0} bills, 
                  showing a strong push for companies to be open about their AI use.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <p className="text-gray-700">
                  California leads with the most AI-related bills, followed by other tech-forward states. 
                  However, AI regulation is becoming a nationwide concern with {analytics.topStates.length}+ states actively legislating.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;