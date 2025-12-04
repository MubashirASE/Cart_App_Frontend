import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";



const MainLayout=()=>{

    return(
        <>
        <div className="m-10">
          <Navbar/>
          <Outlet/>
        </div>
        
        
        </>
    )
}

export default MainLayout