import './App.css';
import { useEffect, useState } from 'react';
import { ViewOnly } from './view/ViewOnly.tsx';
import { EditOnly } from './edit/EditOnly.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

type TableRow = {
  code: string;
  title: string;
  col1: number;
  col2: number;
  col3: number;
};

type BudgetTable = {
  priority: number;
  code: string;
  tableName: string;
  data: TableRow[];
};

type Snapshot = {
  lastUpdated: Date;
  tables: BudgetTable[];
};

function App() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/snapshots")
      .then(res => res.json())
      .then((data) => {
        const parsed: Snapshot[] = data.map((s: any) => ({
          ...s,
          lastUpdated: new Date(s.lastUpdated)
        }));

        const latestByCode: Record<string, BudgetTable & { _date: Date }> = {};
        let maxDate = new Date(0);

        parsed.forEach(snapshot => {
          snapshot.tables.forEach(table => {
            if (table.data.length === 0) return;

            const existing = latestByCode[table.code];
            if (!existing || snapshot.lastUpdated > existing._date) {
              latestByCode[table.code] = {
                ...table,
                _date: snapshot.lastUpdated
              };
            }

            if (snapshot.lastUpdated > maxDate) {
              maxDate = snapshot.lastUpdated;
            }
          });
        });

        const combinedSnapshot: Snapshot = {
          lastUpdated: maxDate,
          tables: Object.values(latestByCode)
            .sort((a, b) => a.priority - b.priority)
            .map(({ _date, ...table }) => table)
        };

        setSnapshots(parsed);
        setSelectedSnapshot(combinedSnapshot);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch snapshots", err);
        setLoading(false);
      });
  }, []);

  if (loading || !selectedSnapshot) {
    return (
      <main className="px-16 py-8 text-center">
        <h2 className="text-2xl font-semibold">Loading data…</h2>
      </main>
    );
  }

  return (      
    <main className="px-16 py-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold">Title</h1>
          <h2 className="text-2xl font-bold">Subtitle</h2>
        </div>

        <h3 className="text-gray-700">
          Last Updated: {selectedSnapshot.lastUpdated.toLocaleString()}
        </h3>
      </div>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ViewOnly snapshot={selectedSnapshot} />}
          />
          <Route
            path="/edit"
            element={<EditOnly snapshot={selectedSnapshot} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
