import React from "react";
import UserNotCompletedGoals from "../components/UserNotCompletedGoals";
import UserTrophyAndAddGoalButton from "../components/UserTrophyAndAddGoalButton";

export default function UserGoalsPage() {
	return (
		<div className="UserGoalsPage">
            <UserTrophyAndAddGoalButton></UserTrophyAndAddGoalButton>
			<UserNotCompletedGoals></UserNotCompletedGoals>
		</div>
	);
}
