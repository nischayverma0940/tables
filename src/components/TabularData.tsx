import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"

export const TabularData = ({ data } : { data : { code: string, title: string, col1: string | number, col2: string | number, col3: string | number }[] }) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof data[0] | null, direction: "asc" | "desc" }>({ key: null, direction: "asc" })

    const requestSort = (key: keyof typeof data[0]) => {
        let direction: "asc" | "desc" = "asc"

        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc"
        }

        setSortConfig({ key, direction })
    }

    const getArrow = (key: keyof typeof data[0]) => {
        if (sortConfig.key !== key) return ""
        return sortConfig.direction === "asc" ? "↑" : "↓"
    }

    const sortedData = useMemo(() => {
        if (!sortConfig.key) return data

        const key = sortConfig.key 

        return [...data].sort((a, b) => {
            let v1 = a[key]
            let v2 = b[key]

            if (!isNaN(Number(v1)) && !isNaN(Number(v2))) {
                v1 = Number(v1)
                v2 = Number(v2)
            } else {
                v1 = v1.toString().toLowerCase()
                v2 = v2.toString().toLowerCase()
            }

            if (v1 < v2) return sortConfig.direction === "asc" ? -1 : 1
            if (v1 > v2) return sortConfig.direction === "asc" ? 1 : -1
            return 0
        })
    }, [data, sortConfig])

    const totalCol1 = data.reduce((sum, row) => sum + Number(row.col1), 0)
    const totalCol2 = data.reduce((sum, row) => sum + Number(row.col2), 0)
    const totalCol3 = data.reduce((sum, row) => sum + Number(row.col3), 0)

    return (
        <Table>
        <TableHeader>
            <TableRow className="font-bold">
            <TableHead onClick={() => requestSort("code")} className="cursor-pointer">
                Code { getArrow("code") }
            </TableHead>
            <TableHead onClick={() => requestSort("title")} className="cursor-pointer">
                Title { getArrow("title") }
            </TableHead>
            <TableHead onClick={() => requestSort("col1")} className="cursor-pointer">
                Column 1 { getArrow("col1") }
            </TableHead>
            <TableHead onClick={() => requestSort("col2")} className="cursor-pointer">
                Column 2 { getArrow("col2") }
            </TableHead>
            <TableHead onClick={() => requestSort("col3")} className="cursor-pointer">
                Column 3 { getArrow("col3") }
            </TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {sortedData.map((row, index_) => (
            <TableRow key={ index_ }>
                <TableCell>{ row.code }</TableCell>
                <TableCell>{ row.title }</TableCell>
                <TableCell> ₹ { Number(row.col1).toLocaleString("en-IN") }</TableCell>
                <TableCell> ₹ { Number(row.col2).toLocaleString("en-IN") }</TableCell>
                <TableCell> ₹ { Number(row.col3).toLocaleString("en-IN") }</TableCell>
            </TableRow>
            ))}
        </TableBody>

        <TableFooter className="font-bold bg-gray-100">
            <TableRow>
                <TableCell></TableCell>
                <TableCell>Total</TableCell>
                <TableCell>₹ { totalCol1.toLocaleString("en-IN") }</TableCell>
                <TableCell>₹ { totalCol2.toLocaleString("en-IN") }</TableCell>
                <TableCell>₹ { totalCol3.toLocaleString("en-IN") }</TableCell>
            </TableRow>
        </TableFooter>
        </Table>
    )
}
