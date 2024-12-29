"use client";

import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import Status from "@/components/DataTableColumns/Status";
import OrderStatus from "@/components/DataTableColumns/OrderStatus";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (<SortableColumn column={column} title="Name" />)
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "orderStatus",
    header: "OrderStatus",
    cell: ({ row }) => <OrderStatus row={row} accessorKey="orderStatus" />

  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (<DateColumn row={row} accessorKey="createdAt" />)
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <ActionColumn
          row={row}
          title="Orders"
          editEndpoint={`orders/${order.id}/invoice`}
          endpoint={`orders/${order.id}`}
        />
      );
    },
  },
];
