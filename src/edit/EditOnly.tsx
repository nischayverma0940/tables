import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type RowData = {
  code: string
  title: string
  col1: number
  col2: number
  col3: number
}

type TableData = {
  priority: number
  code: string
  tableName: string
  data: RowData[]
}

type Snapshot = {
  lastUpdated: Date
  tables: TableData[]
}

export const EditOnly = ({ snapshot }: { snapshot: Snapshot }) => {
  const navigate = useNavigate()
  const [editableSnapshot, setEditableSnapshot] = useState<Snapshot>(
    JSON.parse(JSON.stringify(snapshot))
  )
  const [isSaving, setIsSaving] = useState(false)

  const handleFieldChange = (
    tableCode: string,
    rowIndex: number,
    field: "col1" | "col2" | "col3",
    value: string
  ) => {
    const numValue = value === "" ? 0 : Number(value)
    if (isNaN(numValue)) return

    setEditableSnapshot(prev => ({
      ...prev,
      tables: prev.tables.map((table) =>
        table.code !== tableCode
          ? table
          : {
              ...table,
              data: table.data.map((row, rIdx) =>
                rIdx !== rowIndex ? row : { ...row, [field]: numValue }
              ),
            }
      ),
    }))
  }

  const handleSave = () => {
    setIsSaving(true)
  
    const newSnapshot = {
      ...editableSnapshot,
      lastUpdated: new Date()
    }
    
    console.log("Saving snapshot:", newSnapshot)
    
    setTimeout(() => {
      setIsSaving(false)
      alert("Snapshot saved successfully!")
    }, 1000)
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all changes?")) {
      setEditableSnapshot(JSON.parse(JSON.stringify(snapshot)))
    }
  }

  return (
    <div className="space-y-8 mt-8">
       <div className="flex justify-between items-center">
        <Button
          onClick={() => navigate("/")}
        >
          ← Back
        </Button>

        <div className="space-x-4">
          <Button
            onClick={handleReset}
            className="bg-red-500 text-white hover:bg-red-600"
            disabled={isSaving}
          >
            Reset
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-500 text-white hover:bg-green-600"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Snapshot"}
          </Button>
        </div>
      </div>

      {[...editableSnapshot.tables]
        .sort((a, b) => a.priority - b.priority)
        .map((table) => (
          <div key={table.code} className="space-y-4">
            <h3 className="text-xl font-semibold">
              {table.code} - {table.tableName}
            </h3>

            <Table>
              <TableHeader>
                <TableRow className="text-sm">
                  <TableHead>Code</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Column 1</TableHead>
                  <TableHead>Column 2</TableHead>
                  <TableHead>Column 3</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {table.data.map((row, rowIndex) => (
                  <TableRow key={row.code}>
                    <TableCell className="font-medium">
                      {row.code}
                    </TableCell>
                    <TableCell className="font-medium">
                      {row.title}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.col1}
                        onChange={(e) =>
                          handleFieldChange(table.code, rowIndex, "col1", e.target.value)
                        }
                        className="w-full no-spin"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.col2}
                        onChange={(e) =>
                          handleFieldChange(table.code, rowIndex, "col2", e.target.value)
                        }
                        className="w-full no-spin"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={row.col3}
                        onChange={(e) =>
                          handleFieldChange(table.code, rowIndex, "col3", e.target.value)
                        }
                        className="w-full no-spin"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
    </div>
  )
}