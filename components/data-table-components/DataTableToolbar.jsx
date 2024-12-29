"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";

export function DataTableToolbar({ table, filterKeys = [] }) {
  const availableColumns = table.getAllColumns().map((col) => col.id);
  const validFilterKeys = filterKeys.filter((key) =>
    availableColumns.includes(key)
  );

  const isFiltered = validFilterKeys.some(
    (key) => table.getState().columnFilters[key]?.length > 0
  );

  const handleInputChange = (key, value) => {
    table.getColumn(key)?.setFilterValue(value);
  };

  const handleResetClick = () => {
    validFilterKeys.forEach((key) => {
      table.getColumn(key)?.setFilterValue("");
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {validFilterKeys.map((key) => (
          <Input
            key={key}
            placeholder={`Filter ${key}...`}
            value={table.getColumn(key)?.getFilterValue() ?? ""}
            onChange={(event) => handleInputChange(key, event.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />
        ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleResetClick}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
