import { useState, useMemo } from "react";
import { mockBills } from "@/data/mockBills";
import { BillCard } from "@/components/bill-card";
import { FilterControls } from "@/components/filter-controls";
import { Scale, TrendingUp, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBills = useMemo(() => {
    return mockBills.filter(bill => {
      const matchesState = selectedState === 'All States' || bill.state === selectedState;
      const matchesStatus = selectedStatus === 'All Statuses' || bill.status === selectedStatus;
      const matchesSearch = searchQuery === '' || 
        bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.billNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bill.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesState && matchesStatus && matchesSearch;
    });
  }, [selectedState, selectedStatus, searchQuery]);

  const stats = useMemo(() => {
    const total = mockBills.length;
    const active = mockBills.filter(b => 
      b.status === 'In Committee' || b.status === 'Passed House' || b.status === 'Passed Senate'
    ).length;
    const enacted = mockBills.filter(b => b.status === 'Enacted').length;
    
    return { total, active, enacted };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">LegiTrack AI</h1>
                <p className="text-sm text-gray-600">Real-time AI legislation tracking and analysis</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/analytics')}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button onClick={() => navigate('/company-profile')}>
                <Building2 className="h-4 w-4 mr-2" />
                Company Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bills Tracked</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Scale className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bills</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.active}</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enacted Laws</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.enacted}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <Scale className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterControls
          selectedState={selectedState}
          selectedStatus={selectedStatus}
          searchQuery={searchQuery}
          onStateChange={setSelectedState}
          onStatusChange={setSelectedStatus}
          onSearchChange={setSearchQuery}
        />

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredBills.length}</span> of <span className="font-semibold">{mockBills.length}</span> bills
          </p>
        </div>

        {/* Bills Grid */}
        {filteredBills.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBills.map((bill) => (
              <BillCard key={bill.id} bill={bill} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">No bills found matching your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;