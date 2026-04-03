import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import "./UserPage.css";
import { UserProvider } from "../contexts/UserContext";
import UserLogoutAndInfoButton from "../components/UserLogoutAndInfoButton";

export default function UserPage() {
	//const { loading } = useContext(UserContext);

	//if (loading) return <div></div>;
	return (
		<div className="UserPage">
			<UserProvider>
				<UserLogoutAndInfoButton></UserLogoutAndInfoButton>
				<Outlet></Outlet>
				<UserNavbar></UserNavbar>
			</UserProvider>
		</div>
	);
}
