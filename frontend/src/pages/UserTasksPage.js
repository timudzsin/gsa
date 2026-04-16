import React from "react";
import UserTodaysChecklist from "../components/UserTodaysChecklist";
import "./UserTasksPage.css";

export default function UserTasksPage() {
	return (
		<div className="UserTasksPage">
			<UserTodaysChecklist></UserTodaysChecklist>
		</div>
	);
}
