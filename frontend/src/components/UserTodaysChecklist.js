import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "./UserTodaysChecklist.css";

export default function UserTodaysChecklist() {
	const { todaysChecklist, toggleTodaysChecklistItem } = useContext(UserContext);
	console.log(todaysChecklist);
	if (!todaysChecklist) return null;

	// dátum formázás (pl: ápr 16., csütörtök)
	const formattedDate = new Date(todaysChecklist.date)
		.toLocaleDateString("hu-HU", {
			month: "short",
			day: "numeric",
			weekday: "long",
		})
		.replaceAll(".", "")
		.replaceAll(",", "");

	const todaysItems = todaysChecklist.checklist_items.filter((item) => item.when === "today");
	const thisWeeksItems = todaysChecklist.checklist_items.filter((item) => item.when === "this_week");

	return (
		<div className="UserTodaysChecklist">
			<h1>{formattedDate}</h1>
			<div className="UserTodaysChecklist-todaysTasks">
				{todaysItems.map((item) => (
					<label className="ChecklistItem" key={item.id}>
						<input
							type="checkbox"
							checked={item.is_completed}
							onChange={() => toggleTodaysChecklistItem(item.id)}
						/>
                        <span className="checkmark"></span>
						{item.description}
					</label>
				))}
			</div>
			<h2>Ezen a héten</h2>
			<div className="UserTodaysChecklist-thisWeeksTasks">
				{thisWeeksItems.map((item) => (
					<label className="ChecklistItem" key={item.id}>
						<input
							type="checkbox"
							checked={item.is_completed}
							onChange={() => toggleTodaysChecklistItem(item.id)}
						/>
                        <span className="checkmark"></span>
						{item.description}
					</label>
				))}
			</div>
		</div>
	);
}
