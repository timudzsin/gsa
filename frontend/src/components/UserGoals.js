import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "./UserGoals.css";

export default function UserGoals() {
	const { userGoals, loading } = useContext(UserContext);
	console.log(userGoals);

	function getDaysLeft(deadline) {
		const today = new Date();
		const endDate = new Date(deadline);

		const diffTime = endDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 0) return "Lejárt";
		//if (diffDays === 0) return "Ma jár le";

		return diffDays;
	}

	if (loading) return <div></div>;
	return (
		<div className="UserGoals">
			{userGoals
				.filter((goal) => !goal.is_completed)
				.map((goal, index) => (
					<div key={index} className={`goal ${goal.color}`}>
						<img className="goal-icon" src={`/goal_icons/${goal.icon_url}`} alt={`${goal.icon_url}`} />
						<p className="goal-title">{goal.title}</p>
						<p className="goal-deadline">{getDaysLeft(goal.deadline)}<br></br>nap maradt</p>
					</div>
				))}
		</div>
	);
}
