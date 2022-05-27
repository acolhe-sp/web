import React from "react";

import "./Dashboard.css";

import Navbar from "../../components/navbar/Navbar";

function Dashboard() {
    document.title = 'Dashboard';

    return(
        <>
            <Navbar ong={true} />

        </>
    )
}

export default Dashboard;