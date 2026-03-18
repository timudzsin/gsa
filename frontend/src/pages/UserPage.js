import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import "./UserPage.css";

export default function UserPage() {
	return (
		<div className="UserPage">
			<Outlet></Outlet>
			<UserNavbar></UserNavbar>
		</div>
	);
}
