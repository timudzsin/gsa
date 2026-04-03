import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "./UserNotCompletedGoals.css";
import InlineSVG from "./InlineSVG";

export default function UserNotCompletedGoals() {
	const { loading, userNotCompletedGoals } = useContext(UserContext);

	function truncateTitle(title) {
		const maxLength = 40;
		if (title.length > maxLength) {
			return title.slice(0, maxLength - 3) + "...";
		}
		return title;
	}

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
					<p className="goal-title">{truncateTitle(goal.title)}</p>
					<InlineSVG className="goal-icon" src={`/goal_icons/${goal.icon_url}`} />
					<p className="goal-deadline">
						<span className="goal-deadline-days">{getDaysLeft(goal.deadline)}</span>
						<br></br>nap maradt
					</p>
				</div>
			))}
		</div>
	);
}
