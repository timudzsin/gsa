import React from "react";
import UserTodaysChecklist from "../components/UserTodaysChecklist";
import "./UserTasksPage.css";
import UserGoalIndependentTasksButton from "../components/UserGoalIndependentTasksButton";

export default function UserTasksPage() {
	return (
		<div className="UserTasksPage">
            <UserGoalIndependentTasksButton></UserGoalIndependentTasksButton>
			<UserTodaysChecklist></UserTodaysChecklist>
		</div>
	);
}
