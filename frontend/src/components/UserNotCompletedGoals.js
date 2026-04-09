import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import "./UserNotCompletedGoals.css";
import InlineSVG from "./InlineSVG";
import UserEditNotCompletedGoalPopup from "./UserEditNotCompletedGoalPopup";
import { createPortal } from "react-dom";

export default function UserNotCompletedGoals() {
	const { loading, userNotCompletedGoals, patchUserNotCompletedGoal } = useContext(UserContext);

	const [selectedNotCompletedGoal, setSelectedNotCompletedGoal] = useState(null);
	const [showEditNotCompletedGoal, setShowEditNotCompletedGoal] = useState(false);
	const [closingEditNotCompletedGoal, setClosingEditNotCompletedGoal] = useState(false);

	function truncateTitle(title) {
		const maxLength = 32;
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

	// 👉 megnyitás
	function openEditGoal(goal) {
		setSelectedNotCompletedGoal(goal);
		setShowEditNotCompletedGoal(true);
	}

	// 👉 bezárás (animáció indul)
	function closeEditGoal() {
		setClosingEditNotCompletedGoal(true);
	}

	// 👉 animáció vége
	function handleEditGoalAnimationEnd() {
		if (closingEditNotCompletedGoal) {
			setShowEditNotCompletedGoal(false);
			setClosingEditNotCompletedGoal(false);
			setSelectedNotCompletedGoal(null);
		}
	}

	// 👉 mentés
	async function handleSave(updatedGoal) {
		await patchUserNotCompletedGoal(selectedNotCompletedGoal.id, updatedGoal);
		closeEditGoal();
	}

	if (loading) return <div></div>;
	return (
		<>
			<div className="UserNotCompletedGoals">
				{userNotCompletedGoals.map((goal) => (
					<div key={goal.id} className={`notCompletedGoal ${goal.color}`} onClick={() => openEditGoal(goal)}>
						<p className="notCompletedGoal-title">{truncateTitle(goal.title)}</p>
						<InlineSVG className="notCompletedGoal-icon" src={`/goal_icons/${goal.icon_url}`} />
						<p className="notCompletedGoal-deadline">
							<span className="notCompletedGoal-deadline-days">{getDaysLeft(goal.deadline)}</span>
							<br></br>nap maradt
						</p>
					</div>
				))}
			</div>

			{showEditNotCompletedGoal &&
				createPortal(
					<div
						className={`UserNotCompletedGoals-editGoalPopup ${closingEditNotCompletedGoal ? "closing" : ""}`}
						onAnimationEnd={handleEditGoalAnimationEnd}
					>
						<UserEditNotCompletedGoalPopup
							goal={selectedNotCompletedGoal}
							onClose={closeEditGoal}
							onSave={handleSave}
						></UserEditNotCompletedGoalPopup>
					</div>,
					document.body,
				)}
		</>
	);
}
