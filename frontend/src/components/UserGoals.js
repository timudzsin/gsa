import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function UserGoals() {
	const { userGoals, loading } = useContext(UserContext);
	console.log(userGoals);

	if (loading) return <div></div>;
	return (
		<div className="UserGoals">
			{userGoals
				.filter((goal) => !goal.is_completed)
				.map((goal, index) => (
					<div key={index} className={`goal ${goal.color}`}>
						<img
							className="goal-icon"
							src={`/goal_icons/orbit.svg`}
							alt="icon"
							width={50}
						/>
						<p className="goal-title">{goal.title}</p>
						<p className="goal-deadline">{goal.deadline}</p>
					</div>
				))}
		</div>
	);
}
