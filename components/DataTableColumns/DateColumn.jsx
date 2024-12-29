import React from 'react'

export default function DateColumn({row,accessorKey}) {
    const createdAt = row.getValue(`${accessorKey}`);
    const orginalDate = new Date(createdAt);
    const day = orginalDate.getDate();
    const month = orginalDate.toLocaleString("default", { month: "short" });
    const year = orginalDate.getFullYear();
    const formatted = `${day}th ${month} ${year}`;
    return <div className="">{formatted}</div>;
}
