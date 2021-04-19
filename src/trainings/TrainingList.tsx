import React, {useEffect, useState} from "react";

import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import Snackbar from "@material-ui/core/Snackbar";
import {ITraining} from "./Interface/TrainingInterface";
import {DateFormatterInterface} from "./Interface/DateFormatterInterface";
import {Button} from "@material-ui/core";
import {DeleteTrainingInterface} from "./Interface/DeleteTrainingInterface";

// NOT API
const GET_TRAININGS = "https://customerrest.herokuapp.com/gettrainings";
// API
const TRAININGS     = "https://customerrest.herokuapp.com/api/trainings/";
const CUSTOMERS     = "https://customerrest.herokuapp.com/api/customers";

function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const gridRef = React.useRef() as React.LegacyRef<AgGridReact>;

    useEffect(() => {
        getTrainings();
    }, []);

    function dateFormatter(params: DateFormatterInterface) {
        return new Date(params.data.date).toLocaleDateString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
    }

    const columns = [
        {
            headerName: "DELETE",
            field: "id",
            sortable: false,
            filter: false,
            width: 100,
            cellRendererFramework: (training: DeleteTrainingInterface) => (
                <Button
                    size="small"
                    color="secondary"
                    onClick={(_) => deleteTraining(training.value)}>
                    X
                </Button>
            ),
        },

        {
            headerName: "Activity",
            field: "activity",
            sortable: true,
            filter: true,
        },
        {
            headerName: "Date",
            field: "date",
            valueGetter: dateFormatter,
            sortable: true,
            filter: "agDateColumnFilter",
        },
        {
            headerName: "Duration",
            field: "duration",
            sortable: true,
            filter: true,
        },
        {
            headerName: "Customer",
            field: "customer.lastname",
            sortable: true,
            filter: true,
        },
    ];

    const getTrainings = async () => {
        fetch(GET_TRAININGS)
            .then((response) => response.json())
            .then((data) => setTrainings(data))
            .catch((err) => console.error(err));
    };

    const deleteTraining = (id: string) => {
        if (window.confirm("DELETE TRAINING?")) {
            fetch(TRAININGS + id, {method: "DELETE"})
                .then((_) => getTrainings())
                .then(() => setMsg("TRAINING DELETED!"))
                .then(() => setOpen(true))
                .catch((e) => console.error(e));
        }
    };

    const saveTraining = (training: ITraining) => {
        fetch(CUSTOMERS, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(training),
        })
            .then((_) => getTrainings())
            .catch((err) => console.error(err));
    };

    const updateTraining = (training: any, link: RequestInfo) => {
        fetch(link, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(training),
        })
            .then((_) => getTrainings())
            .catch((err) => console.error(err));
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div
                className="ag-theme-alpine"
                style={{height: "900px", width: "100%", margin: "auto"}}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={trainings}
                    ref={gridRef}
                    rowSelection="single"
                    pagination={true}
                    paginationPageSize={100}
                />
            </div>

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                message={msg}
            />
        </div>
    );
}

export default TrainingList;