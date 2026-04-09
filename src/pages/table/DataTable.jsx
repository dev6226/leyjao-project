import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Table() {
    const [rows, setRows] = React.useState([
        { id: 1, date: new Date(), name: "Ali", age: 22, status: "Active", items: "" },
        { id: 2, date: new Date(), name: "Ahmed", age: 25, status: "Inactive" },
    ]);

    const handleDelete = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleEdit = (row) => {
        alert("Edit: " + row.name);
    };

    const handleView = (row) => {
        alert("View: " + row.name);
    };

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 130 },
        { field: "age", headerName: "Age", width: 90 },

        // ✅ STATUS COLUMN
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={params.value === "Active" ? "success" : "default"}
                />
            ),
        },

        // ✅ ACTIONS COLUMN
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => handleView(params.row)}>
                        <VisibilityIcon />
                    </IconButton>

                    <IconButton onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
    );
}