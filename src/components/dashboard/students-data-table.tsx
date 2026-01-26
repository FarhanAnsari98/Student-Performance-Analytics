"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Student } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { useData } from "@/context/data-context"
import { MoreHorizontal, Pencil } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth-context"
import { EditStudentDialog } from "./edit-student-dialog"

const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    }
    return name.substring(0, 2);
};

const riskVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
  LOW: "default",
  MEDIUM: "secondary",
  HIGH: "destructive",
};

interface StudentsDataTableProps {
  students: Student[];
}

export function StudentsDataTable({ students }: StudentsDataTableProps) {
  const { parents } = useData();
  const { role } = useAuth();
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);

  const columns = React.useMemo<ColumnDef<Student>[]>(() => {
    const baseColumns: ColumnDef<Student>[] = [
        {
          accessorKey: "name",
          header: "Name",
          cell: ({ row }) => {
            const student = row.original
            return (
              <div className="flex items-center gap-3">
                  <Avatar>
                      <AvatarImage src={student.avatarUrl} alt={student.name} />
                      <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">{student.email}</div>
                  </div>
              </div>
            )
          },
        },
        {
          accessorKey: "parentId",
          header: "Parent",
          cell: ({ row }) => {
            const parentId = row.getValue("parentId") as string;
            const parent = parents.find(p => p.id === parentId);
            return <div>{parent ? parent.name : "N/A"}</div>
          },
        },
        {
          accessorKey: "attendancePercentage",
          header: "Attendance",
          cell: ({ row }) => <div className="text-center">{row.getValue("attendancePercentage")}%</div>,
        },
        {
          accessorKey: "averageScore",
          header: "Avg. Score",
          cell: ({ row }) => <div className="text-center">{row.getValue("averageScore")}%</div>,
        },
        {
          accessorKey: "riskLevel",
          header: "Risk Level",
          cell: ({ row }) => {
              const riskLevel = row.getValue("riskLevel") as string;
              return <Badge variant={riskVariantMap[riskLevel]}>{riskLevel}</Badge>
          },
        },
      ];

      if (role === 'ADMIN') {
        baseColumns.push({
            id: "actions",
            cell: ({ row }) => {
              const student = row.original
          
              return (
                <div className="text-right">
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setEditingStudent(student)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Name
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              )
            },
          })
      }

      return baseColumns;
  }, [parents, role]);


  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data: students,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by student name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} student(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {editingStudent && (
        <EditStudentDialog
            student={editingStudent}
            open={!!editingStudent}
            onOpenChange={(open) => !open && setEditingStudent(null)}
        />
      )}
    </div>
  )
}
