import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () =>{

    return (
        <div>
          <h1>This Is User</h1>
          <Outlet />
        </div>
    );
}

export default Dashboard;