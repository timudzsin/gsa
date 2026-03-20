import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import "./UserPage.css";
import axios from "axios";

export default function UserPage() {
	// Ki van bejelentkezve?
	useEffect(() => {
		axios
			.get("http://localhost:8000/api/me", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then(function (response) {
				console.log("Bejelentkezve: " + response.data.user.name);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<div className="UserPage">
			<Outlet></Outlet>
			<UserNavbar></UserNavbar>
		</div>
	);
}
