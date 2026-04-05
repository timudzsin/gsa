import React, { useEffect, useState } from "react";
import "./UserEditNotCompletedGoalPopup.css";

export default function UserEditNotCompletedGoalPopup({ goal, onClose, onSave }) {
	const [title, setTitle] = useState("");
	const [deadline, setDeadline] = useState("");
	const [rank, setRank] = useState(100);
	const [color, setColor] = useState("GRAY");
	const [iconUrl, setIconUrl] = useState("target.svg");
	const [motivations, setMotivations] = useState([]);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		setTitle(goal.title || "");
		setDeadline(goal.deadline || "");
		setRank(goal.rank ?? 100);
		setColor(goal.color || "GRAY");
		setIconUrl(goal.icon_url || "target.svg");
		setMotivations(goal.motivations || []);
		setTasks(goal.tasks || []);
	}, [goal]);

	function addMotivation() {
		setMotivations((prev) => [...prev, { description: "" }]);
	}
	function updateMotivation(index, value) {
		setMotivations((prev) => prev.map((item, i) => (i === index ? { ...item, description: value } : item)));
	}
	function removeMotivation(index) {
		setMotivations((prev) => prev.filter((_, i) => i !== index));
	}

	function addTask() {
		setTasks((prev) => [
			...prev,
			{
				description: "",
				type: "daily",
				rank: 100,
				is_on_monday: null,
				is_on_tuesday: null,
				is_on_wednesday: null,
				is_on_thursday: null,
				is_on_friday: null,
				is_on_saturday: null,
				is_on_sunday: null,
				times_per_week: null,
			},
		]);
	}
	function updateTask(index, field, value) {
		setTasks((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
	}
	function removeTask(index) {
		setTasks((prev) => prev.filter((_, i) => i !== index));
	}

	function handleSubmit(e) {
		e.preventDefault();

		onSave({
			title,
			deadline,
			rank,
			color,
			icon_url: iconUrl,
			motivations: motivations.map((m) => ({
				id: m.id,
				description: m.description,
			})),
			tasks: tasks.map((t) => ({
				id: t.id,
				description: t.description,
				type: t.type,
				rank: t.rank,
				is_on_monday: t.is_on_monday,
				is_on_tuesday: t.is_on_tuesday,
				is_on_wednesday: t.is_on_wednesday,
				is_on_thursday: t.is_on_thursday,
				is_on_friday: t.is_on_friday,
				is_on_saturday: t.is_on_saturday,
				is_on_sunday: t.is_on_sunday,
				times_per_week: t.times_per_week,
			})),
		});
	}

	return (
		<div className="UserEditNotCompletedGoalPopup">
			<h2>Cél szerkesztése</h2>
			<form onSubmit={handleSubmit}>
				<label>Cím</label>
				<input value={title} onChange={(e) => setTitle(e.target.value)} />

				<label>Határidő</label>
				<input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

				<label>Rank</label>
				<input type="number" value={rank} onChange={(e) => setRank(parseInt(e.target.value, 10))} />

				<label>Szín</label>
				<input value={color} onChange={(e) => setColor(e.target.value)} />

				<label>Ikon fájl neve</label>
				<input value={iconUrl} onChange={(e) => setIconUrl(e.target.value)} />

				<hr />

				<h3>Motivációk</h3>
				{motivations.map((motivation, index) => (
					<div key={motivation.id ?? index}>
						<input value={motivation.description} onChange={(e) => updateMotivation(index, e.target.value)} />
						<button type="button" onClick={() => removeMotivation(index)}>
							Törlés
						</button>
					</div>
				))}
				<button type="button" onClick={addMotivation}>
					+ Motiváció
				</button>

				<hr />

				<h3>Taskok</h3>
				{tasks.map((task, index) => (
					<div key={task.id ?? index} style={{ marginBottom: "16px" }}>
						<input
							placeholder="Leírás"
							value={task.description}
							onChange={(e) => updateTask(index, "description", e.target.value)}
						/>

						<select value={task.type} onChange={(e) => updateTask(index, "type", e.target.value)}>
							<option value="daily">daily</option>
							<option value="on_certain_days_of_the_week">on_certain_days_of_the_week</option>
							<option value="x_times_per_week">x_times_per_week</option>
						</select>

						<input
							type="number"
							value={task.rank}
							onChange={(e) => updateTask(index, "rank", parseInt(e.target.value, 10))}
						/>

						{task.type === "on_certain_days_of_the_week" && (
							<div>
								<label>
									<input
										type="checkbox"
										checked={!!task.is_on_monday}
										onChange={(e) => updateTask(index, "is_on_monday", e.target.checked)}
									/>
									Hétfő
								</label>

								<label>
									<input
										type="checkbox"
										checked={!!task.is_on_friday}
										onChange={(e) => updateTask(index, "is_on_friday", e.target.checked)}
									/>
									Péntek
								</label>
							</div>
						)}

						{task.type === "x_times_per_week" && (
							<input
								type="number"
								placeholder="Hányszor egy héten"
								value={task.times_per_week ?? ""}
								onChange={(e) => updateTask(index, "times_per_week", parseInt(e.target.value, 10))}
							/>
						)}

						<button type="button" onClick={() => removeTask(index)}>
							Task törlése
						</button>
					</div>
				))}
				<button type="button" onClick={addTask}>
					+ Task
				</button>

				<hr />

				<div style={{ display: "flex", gap: "8px" }}>
					<button type="button" onClick={onClose}>
						Mégse
					</button>
					<button type="submit">Mentés</button>
				</div>
			</form>
		</div>
	);
}
