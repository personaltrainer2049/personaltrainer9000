import React, {useEffect, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";

import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import {CustomerInterface} from "./Interface/CustomerInterface";
import {CustomerDeleteInterface} from "./Interface/CustomerDeleteInterface";
import AddTraining from "../trainings/AddTraining";
import {CustomerDataInterface} from "./Interface/CustomerDataInterface";

const CUSTOMERS = "https://customerrest.herokuapp.com/api/customers";
const TRAININGS = "https://customerrest.herokuapp.com/api/trainings/";

export interface CustomerTrainingInterface {
    data: {
        activity: string;
        date: string;
        duration: string;
        links: {
            href: string;
        }[];
    };

    addTraining(training: CustomerTrainingI): void;
}

export interface CustomerTrainingI {
        activity: string;
        date: string;
        duration: string;
        customer: string

}

function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const gridRef = React.useRef() as React.LegacyRef<AgGridReact>;

    useEffect(() => {
        getCustomers();
    }, []);

    const columns = [
        {
            headerName: "EDIT", field: "links[0].href", sortable: false, filter: false, width: 100,
            cellRendererFramework: (customer: CustomerDataInterface) => (
                <EditCustomer updateCustomer={updateCustomer} customer={customer.data}/>),
        },

        {
            headerName: "DELETE", field: "links[0].href", sortable: false, filter: false, width: 100,
            cellRendererFramework: (customer: CustomerDeleteInterface) => (
                <Button size="small" color="secondary"
                        onClick={(_) => deleteCustomer(customer)}>X</Button>),
        },

        {
            headerName: "ADD", field: "links[0].href",
            cellRendererFramework: (training: CustomerTrainingInterface) => (
                <AddTraining addTraining={addTraining} data={training.data}/>),
        },

        {headerName: "First Name", field: "firstname", sortable: true, filter: true},
        {headerName: "Last Name", field: "lastname", sortable: true, filter: true},
        {headerName: "Street Address", field: "streetaddress", sortable: true, filter: true},
        {headerName: "PostCode", field: "postcode", sortable: true, filter: true},
        {headerName: "City", field: "city", sortable: true, filter: true},
        {headerName: "Email", field: "email", sortable: true, filter: true},
        {headerName: "Phone", field: "phone", sortable: true, filter: true},
    ];

    const getCustomers = async () => {
        fetch(CUSTOMERS)
            .then((response) => response.json())
            .then((data) => setCustomers(data.content))
            .catch((err) => console.error(err));
    };
    const deleteCustomer = async (link: CustomerDeleteInterface) => {
        if (window.confirm("DELETE CUSTOMER?")) {
            fetch(link.data.links[0].href, {method: "DELETE"})
                .then((_) => getCustomers())
                .then((_) => setMsg("CUSTOMER DELETED!"))
                .then((_) => setOpen(true))
                .catch((e) => console.error(e));
        }
    };
    const saveCustomer = async (customer: CustomerInterface) => {
        fetch(CUSTOMERS, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customer),
        })
            .then((_) => getCustomers()
            ).catch((err) => console.error(err));
    };

    const updateCustomer = async (customer: CustomerInterface, link: RequestInfo) => {
        fetch(link, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(customer),
        })
            .then((_) => getCustomers())
            .catch((err) => console.error(err));
    };

    const addTraining = async (training: CustomerTrainingI) => {

        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(training),
        }).then((_) => {
            setMsg("TRAINING ADDED");
            setOpen(true);
        }).catch((err) => console.error(err));
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer}/>
            <div className="ag-theme-alpine" style={{height: "900px", width: "100%", margin: "auto"}}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={customers}
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

export default CustomerList;