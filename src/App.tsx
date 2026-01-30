import './App.css';
import { useState } from "react";
import { TabularData } from './components/TabularData';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";

const snapshots = [
  {
    lastUpdated: new Date("2026-01-01T10:00:00"),
    tables: [
      {
        priority: 1,
        code: "31",
        tableName: "Grant-in-aid General",
        data: [
          { code: "31.01", title: "Pension & Pensionary Benefits", col1: 45000, col2: 1250000, col3: 32000000 },
          { code: "31.02", title: "Scholarships/Fellowships", col1: 38000, col2: 975000, col3: 21000000 },
          { code: "31.03", title: "Foreign/Domestic Travels", col1: 52000, col2: 1540000, col3: 40500000 },
          { code: "31.04", title: "Security/Housekeeping", col1: 29000, col2: 860000, col3: 17500000 },
          { code: "31.05", title: "Exp. on Contractual Employees [Teaching and Non-Teaching]", col1: 63000, col2: 1820000, col3: 51000000 },
          { code: "31.06", title: "Other Expenses", col1: 22000, col2: 630000, col3: 12500000 },
          { code: "31.07", title: "Repayment of HEFA Loan - Principal Portion", col1: 75000, col2: 2500000, col3: 84000000 },
          { code: "31.08", title: "Repayment of HEFA Loan - Interest Portion", col1: 48000, col2: 1410000, col3: 38500000 }
        ]
      },
      {
        priority: 2,
        code: "35",
        tableName: "Grants for creation of Capital Assets",
        data: [
          { code: "35.01", title: "Building", col1: 90000, col2: 3200000, col3: 125000000 },
          { code: "35.02", title: "Equipments", col1: 58000, col2: 2075000, col3: 66000000 },
          { code: "35.03", title: "Library", col1: 26000, col2: 740000, col3: 19000000 },
          { code: "35.04", title: "Furniture", col1: 34000, col2: 1025000, col3: 27500000 }
        ]
      },
      {
        priority: 3,
        code: "36",
        tableName: "Grant-in-Aid Salary",
        data: [
          { code: "36.01", title: "Expenditure on salary on Regular Faculty", col1: 68000, col2: 2280000, col3: 79500000 },
          { code: "36.02", title: "Expenditure on salary on Regular Non-Faculty", col1: 54000, col2: 1690000, col3: 48500000 },
          { code: "36.03", title: "Medical Expenses", col1: 19000, col2: 560000, col3: 11000000 },
          { code: "36.04", title: "Leave Encashment", col1: 31000, col2: 910000, col3: 20500000 },
          { code: "36.05", title: "LTC", col1: 27000, col2: 785000, col3: 16000000 },
          { code: "36.06", title: "Professional Development Allowance (PDA)", col1: 23000, col2: 675000, col3: 13500000 },
          { code: "36.07", title: "Retirement Benefits", col1: 82000, col2: 2840000, col3: 96000000 },
          { code: "36.08", title: "Other Expenses", col1: 21000, col2: 610000, col3: 12000000 }
        ]
      }
    ]
  },
  {
    lastUpdated: new Date("2026-01-02T10:00:00"),
    tables: [
      {
        priority: 1,
        code: "31",
        tableName: "Grant-in-aid General",
        data: [
          { code: "31.01", title: "Pension & Pensionary Benefits", col1: 45000, col2: 1250000, col3: 33000000 },
          { code: "31.02", title: "Scholarships/Fellowships", col1: 38000, col2: 975000, col3: 21000000 },
          { code: "31.03", title: "Foreign/Domestic Travels", col1: 52000, col2: 1540000, col3: 40500000 },
          { code: "31.04", title: "Security/Housekeeping", col1: 29000, col2: 860000, col3: 17500000 },
          { code: "31.05", title: "Exp. on Contractual Employees [Teaching and Non-Teaching]", col1: 63000, col2: 1820000, col3: 51000000 },
          { code: "31.06", title: "Other Expenses", col1: 22000, col2: 630000, col3: 12500000 },
          { code: "31.07", title: "Repayment of HEFA Loan - Principal Portion", col1: 75000, col2: 2500000, col3: 84000000 },
          { code: "31.08", title: "Repayment of HEFA Loan - Interest Portion", col1: 48000, col2: 1410000, col3: 38500000 }
        ]
      },
      {
        priority: 2,
        code: "35",
        tableName: "Grants for creation of Capital Assets",
        data: [
          { code: "35.01", title: "Building", col1: 90000, col2: 3200000, col3: 125000000 },
          { code: "35.02", title: "Equipments", col1: 58000, col2: 2075000, col3: 66000000 },
          { code: "35.03", title: "Library", col1: 26000, col2: 740000, col3: 19000000 },
          { code: "35.04", title: "Furniture", col1: 34000, col2: 1025000, col3: 27500000 }
        ]
      },
      {
        priority: 3,
        code: "36",
        tableName: "Grant-in-Aid Salary",
        data: [
          { code: "36.01", title: "Expenditure on salary on Regular Faculty", col1: 68000, col2: 2280000, col3: 79500000 },
          { code: "36.02", title: "Expenditure on salary on Regular Non-Faculty", col1: 54000, col2: 1690000, col3: 48500000 },
          { code: "36.03", title: "Medical Expenses", col1: 19000, col2: 560000, col3: 11000000 },
          { code: "36.04", title: "Leave Encashment", col1: 31000, col2: 910000, col3: 20500000 },
          { code: "36.05", title: "LTC", col1: 27000, col2: 785000, col3: 16000000 },
          { code: "36.06", title: "Professional Development Allowance (PDA)", col1: 23000, col2: 675000, col3: 13500000 },
          { code: "36.07", title: "Retirement Benefits", col1: 82000, col2: 2840000, col3: 96000000 },
          { code: "36.08", title: "Other Expenses", col1: 21000, col2: 610000, col3: 12000000 }
        ]
      }
    ]
  },
  {
    lastUpdated: new Date("2026-01-03T10:00:00"),
    tables: [
      {
        priority: 1,
        code: "31",
        tableName: "Grant-in-aid General",
        data: [
          { code: "31.01", title: "Pension & Pensionary Benefits", col1: 45000, col2: 1250000, col3: 34000000 },
          { code: "31.02", title: "Scholarships/Fellowships", col1: 38000, col2: 975000, col3: 21000000 },
          { code: "31.03", title: "Foreign/Domestic Travels", col1: 52000, col2: 1540000, col3: 40500000 },
          { code: "31.04", title: "Security/Housekeeping", col1: 29000, col2: 860000, col3: 17500000 },
          { code: "31.05", title: "Exp. on Contractual Employees [Teaching and Non-Teaching]", col1: 63000, col2: 1820000, col3: 51000000 },
          { code: "31.06", title: "Other Expenses", col1: 22000, col2: 630000, col3: 12500000 },
          { code: "31.07", title: "Repayment of HEFA Loan - Principal Portion", col1: 75000, col2: 2500000, col3: 84000000 },
          { code: "31.08", title: "Repayment of HEFA Loan - Interest Portion", col1: 48000, col2: 1410000, col3: 38500000 }
        ]
      },
      {
        priority: 2,
        code: "35",
        tableName: "Grants for creation of Capital Assets",
        data: [
          { code: "35.01", title: "Building", col1: 90000, col2: 3200000, col3: 125000000 },
          { code: "35.02", title: "Equipments", col1: 58000, col2: 2075000, col3: 66000000 },
          { code: "35.03", title: "Library", col1: 26000, col2: 740000, col3: 19000000 },
          { code: "35.04", title: "Furniture", col1: 34000, col2: 1025000, col3: 27500000 }
        ]
      },
      {
        priority: 3,
        code: "36",
        tableName: "Grant-in-Aid Salary",
        data: [
          { code: "36.01", title: "Expenditure on salary on Regular Faculty", col1: 68000, col2: 2280000, col3: 79500000 },
          { code: "36.02", title: "Expenditure on salary on Regular Non-Faculty", col1: 54000, col2: 1690000, col3: 48500000 },
          { code: "36.03", title: "Medical Expenses", col1: 19000, col2: 560000, col3: 11000000 },
          { code: "36.04", title: "Leave Encashment", col1: 31000, col2: 910000, col3: 20500000 },
          { code: "36.05", title: "LTC", col1: 27000, col2: 785000, col3: 16000000 },
          { code: "36.06", title: "Professional Development Allowance (PDA)", col1: 23000, col2: 675000, col3: 13500000 },
          { code: "36.07", title: "Retirement Benefits", col1: 82000, col2: 2840000, col3: 96000000 },
          { code: "36.08", title: "Other Expenses", col1: 21000, col2: 610000, col3: 12000000 }
        ]
      }
    ]
  }
];

function App() {
  const latestSnapshot = snapshots.reduce((latest, snapshot) =>
    snapshot.lastUpdated > latest.lastUpdated ? snapshot : latest,
    snapshots[0]
  );

  const [selectedSnapshot] = useState(latestSnapshot);

  return (
    <main className="px-16 py-8">
      <div className="flex flex-col items-center space-y-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold">Title</h1>
        <h2 className="text-2xl font-bold">Subtitle</h2>
      </div>
      <h3 className="text-gray-700">
        Last Updated: { selectedSnapshot.lastUpdated.toLocaleString() }
      </h3>
      </div>

      <Accordion type="single" collapsible>
        {selectedSnapshot.tables
          .sort((a, b) => a.priority - b.priority)
          .map((table, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                {table.code} - {table.tableName}
              </AccordionTrigger>
              <AccordionContent>
                <TabularData data={table.data} />
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </main>
  );
}

export default App;
