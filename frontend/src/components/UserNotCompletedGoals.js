import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "./UserNotCompletedGoals.css";

export default function UserNotCompletedGoals() {
	const { loading, userNotCompletedGoals } = useContext(UserContext);

	function getDaysLeft(deadline) {
		const today = new Date();
		const endDate = new Date(deadline);

		const diffTime = endDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 0) return "Lejárt";

		return diffDays;
	}

	if (loading) return <div></div>;
	return (
		<div className="UserNotCompletedGoals">
			{userNotCompletedGoals.map((goal, index) => (
				<div key={index} className={`goal ${goal.color}`}>
					<img
						className="goal-icon"
						src={`/goal_icons/${goal.icon_url}`}
						alt={`${goal.icon_url}`}
					/>
					<p className="goal-title">{goal.title}</p>
					<p className="goal-deadline">
						{getDaysLeft(goal.deadline)}
						<br></br>nap maradt
					</p>
				</div>
			))}
		</div>
	);
}
