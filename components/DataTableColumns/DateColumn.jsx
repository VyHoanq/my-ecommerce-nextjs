'use client'

export default function DateColumn({ row, accessorKey }) {
    const createdAt = row.getValue(`${accessorKey}`);
    const orginalDate = new Date(createdAt);

    // Force English locale for consistent formatting
    const options = { month: "short" };
    const month = orginalDate.toLocaleString("en-US", options);
    const day = orginalDate.getDate();
    const year = orginalDate.getFullYear();

    const formatted = `${day}th ${month} ${year}`;
    return <div className="">{formatted}</div>;
}
