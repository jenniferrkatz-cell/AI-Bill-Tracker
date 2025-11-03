import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, FileText } from "lucide-react";
import { Bill } from "@/data/mockBills";
import { useNavigate } from "react-router-dom";

interface BillCardProps {
  bill: Bill;
}

const statusColors = {
  'Introduced': 'bg-blue-100 text-blue-800 border-blue-200',
  'In Committee': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Passed House': 'bg-purple-100 text-purple-800 border-purple-200',
  'Passed Senate': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Enacted': 'bg-green-100 text-green-800 border-green-200',
  'Failed': 'bg-red-100 text-red-800 border-red-200'
};

export const BillCard = ({ bill }: BillCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/bill/${bill.id}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{bill.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span className="font-medium">{bill.billNumber}</span>
            </div>
          </div>
          <Badge className={statusColors[bill.status]}>
            {bill.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {bill.summary}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{bill.state}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Updated {new Date(bill.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};