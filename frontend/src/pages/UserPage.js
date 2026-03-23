import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import "./UserPage.css";
import { UserProvider } from "../contexts/UserContext";

export default function UserPage() {
	//const { loading } = useContext(UserContext);

	//if (loading) return <div></div>;
	return (
		<div className="UserPage">
			<UserProvider>
				<Outlet></Outlet>
				<UserNavbar></UserNavbar>
			</UserProvider>
		</div>
	);
}
