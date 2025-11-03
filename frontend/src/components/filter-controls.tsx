import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterControlsProps {
  selectedState: string;
  selectedStatus: string;
  searchQuery: string;
  onStateChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

const states = [
  'All States',
  'California',
  'Colorado',
  'Florida',
  'Illinois',
  'Massachusetts',
  'New York',
  'Texas',
  'Washington'
];

const statuses = [
  'All Statuses',
  'Introduced',
  'In Committee',
  'Passed House',
  'Passed Senate',
  'Enacted',
  'Failed'
];

export const FilterControls = ({
  selectedState,
  selectedStatus,
  searchQuery,
  onStateChange,
  onStatusChange,
  onSearchChange
}: FilterControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search bills..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select value={selectedState} onValueChange={onStateChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Select state" />
        </SelectTrigger>
        <SelectContent>
          {states.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};