import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import "./UserTodaysChecklist.css";

export default function UserTodaysChecklist() {
	const { todaysChecklist, toggleTodaysChecklistItem } = useContext(UserContext);
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
						<svg className="checkmark" viewBox="0 -960 960 960">
							<path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
						</svg>
						{item.description}
					</label>
				))}
			</div>
			<h2>ezen a héten</h2>
			<div className="UserTodaysChecklist-thisWeeksTasks">
				{thisWeeksItems.map((item) => (
					<label className="ChecklistItem" key={item.id}>
						<input
							type="checkbox"
							checked={item.is_completed}
							onChange={() => toggleTodaysChecklistItem(item.id)}
						/>
						<svg className="checkmark" viewBox="0 -960 960 960">
							<path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
						</svg>
						{item.description}
					</label>
				))}
			</div>
		</div>
	);
}
