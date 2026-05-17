import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface AdminDataTableProps<T> {
  columns: { header: string; accessor: (item: T) => React.ReactNode; className?: string }[];
  data: T[];
  keyExtractor: (item: T) => string;
  renderMobileCard?: (item: T) => React.ReactNode;
  emptyMessage?: React.ReactNode;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
}

export function AdminDataTable<T>({ columns, data, keyExtractor, renderMobileCard, emptyMessage }: AdminDataTableProps<T>) {
  if (data.length === 0 && emptyMessage) {
    return (
      <div className="text-center p-8 bg-white border border-slate-200 border-dashed rounded-lg text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      {/* Mobile Render */}
      {renderMobileCard && (
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {data.map((item) => (
            <div key={keyExtractor(item)} className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-sm">
              {renderMobileCard(item)}
            </div>
          ))}
        </div>
      )}

      {/* Desktop Render */}
      <div className={renderMobileCard ? "hidden md:block overflow-x-auto" : "overflow-x-auto"}>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              {columns.map((col, index) => (
                <TableHead key={index} className={col.className}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={keyExtractor(item)}>
                {columns.map((col, index) => (
                  <TableCell key={index} className={col.className}>
                    {col.accessor(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
