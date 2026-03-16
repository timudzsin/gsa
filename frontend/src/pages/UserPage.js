import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

export default function UserPage() {
	return (
		<div className="UserPage">
			<main>
				<Outlet></Outlet>
			</main>

			<UserNavbar></UserNavbar>
		</div>
	);
}
