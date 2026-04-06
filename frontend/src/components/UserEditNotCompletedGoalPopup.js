import React, { useEffect, useState } from "react";
import "./UserEditNotCompletedGoalPopup.css";
import InlineSVG from "./InlineSVG";

const COLORS = [
	"RED",
	"CORAL",
	"ORANGE",
	"YELLOW",
	"GREEN",
	"CYAN",
	"LIGHT_BLUE",
	"BLUE",
	"INDIGO",
	"PURPLE",
	"MAGENTA",
	"PINK",
	"GRAY",
	"SAGE",
	"BEIGE",
];
const ICONS = ["target.svg", "directions_car.svg", "orbit.svg", "person_celebrate.svg"];

export default function UserEditNotCompletedGoalPopup({ goal, onClose, onSave }) {
	const [title, setTitle] = useState("");
	const [deadline, setDeadline] = useState("");
	const [color, setColor] = useState("GRAY");
	const [iconUrl, setIconUrl] = useState("target.svg");
	const [rank, setRank] = useState(100);

	const [motivations, setMotivations] = useState([]);
	const [tasks, setTasks] = useState([]);

	const [showBannerPopup, setShowBannerPopup] = useState(false);
	const [closingBannerPopup, setClosingBannerPopup] = useState(false);

	useEffect(() => {
		setTitle(goal.title || "");
		setDeadline(goal.deadline || "");
		setColor(goal.color || "GRAY");
		setIconUrl(goal.icon_url || "target.svg");
		setRank(goal.rank ?? 100);
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
			color,
			icon_url: iconUrl,
			rank,
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
			<form onSubmit={handleSubmit}>
				{/* HEADER */}
				<div className="UserEditNotCompletedGoalPopup-header">
					<button className="UserEditNotCompletedGoalPopup-x" type="button" onClick={onClose}>
						<svg viewBox="0 -960 960 960">
							<path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
						</svg>
					</button>
					<h2 className="UserEditNotCompletedGoalPopup-editGoalText">Cél Szerkesztése</h2>
					<button className="UserEditNotCompletedGoalPopup-v" type="submit">
						<svg viewBox="0 -960 960 960">
							<path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
						</svg>
					</button>
				</div>

				{/* BANNER és TITLE */}
				<div className={`UserEditNotCompletedGoalPopup-bannerAndTitle ${color}`}>
					<div className="UserEditNotCompletedGoalPopup-banner" onClick={() => setShowBannerPopup(true)}>
						<InlineSVG className="UserEditNotCompletedGoalPopup-banner-icon" src={`/goal_icons/${iconUrl}`} />
					</div>
					<textarea
						className="UserEditNotCompletedGoalPopup-title"
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
							e.target.style.height = "auto";
							e.target.style.height = e.target.scrollHeight + "px";
						}}
						rows={1}
						spellCheck={false}
                        placeholder={"Pontosan mit akarok elérni?"}
					/>
				</div>

				{/* ===== BANNER POPUP ===== */}
				{showBannerPopup && (
					<div className="UserEditNotCompletedGoalPopup-bannerPopup">
						<div className="UserEditNotCompletedGoalPopup-bannerPopup-content">
							<div className={`preview ${color}`}>
								<InlineSVG className="preview-icon" src={`/goal_icons/${iconUrl}`} />
							</div>

							<button className="doneButton" type="button" onClick={() => setShowBannerPopup(false)}>
								Kész
							</button>

							<h3>Szín kiválasztása</h3>
							<div className="colorList">
								{COLORS.map((c) => (
									<div
										key={c}
										className={`colorItem ${c} ${color === c ? "selected" : ""}`}
										onClick={() => setColor(c)}
									/>
								))}
							</div>

							<h3>Ikon kiválasztása</h3>
							<div className="iconList">
								{ICONS.map((icon) => (
									<InlineSVG
										key={icon}
										className={`iconItem ${iconUrl === icon ? "selected" : ""}`}
										src={`/goal_icons/${icon}`}
										onClick={() => setIconUrl(icon)}
									/>
								))}
							</div>
						</div>
					</div>
				)}

				{/* DEADLINE */}
				<div className="UserEditNotCompletedGoalPopup-deadline">
					<label>Határidő</label>
					<input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
				</div>

				{/* MOTIVATIONS */}
				<h3 className="UserEditNotCompletedGoalPopup-motivations-label">Motivációk</h3>
				<div className="UserEditNotCompletedGoalPopup-motivations">
					{motivations.map((m, i) => (
						<React.Fragment key={i}>
							<div className="row">
								<textarea
									value={m.description}
									onChange={(e) => {
										updateMotivation(i, e.target.value);
										e.target.style.height = "auto";
										e.target.style.height = e.target.scrollHeight + "px";
									}}
									rows={1}
									spellCheck={false}
                                    placeholder={"Miért akarom elérni a célt?"}
								/>
								<button onClick={() => removeMotivation(i)} type="button">
									<svg viewBox="0 -960 960 960">
										<path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm148.5-171.5Q440-303 440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280q17 0 28.5-11.5Zm160 0Q600-303 600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280q17 0 28.5-11.5Z" />
									</svg>
								</button>
							</div>
							{i < motivations.length - 1 && <hr className="motivation-divider" />}
						</React.Fragment>
					))}
					{motivations.length < 3 && (
						<>
							{motivations.length >= 1 && <hr className="motivation-divider" />}
							<button onClick={addMotivation} type="button">
								<svg viewBox="0 -960 960 960">
									<path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
								</svg>
							</button>
						</>
					)}
				</div>

				{/* TASKS */}
				<h3 className="UserEditNotCompletedGoalPopup-tasks-label">Feladatok</h3>
				<div className="UserEditNotCompletedGoalPopup-tasks">
					{tasks.map((t, i) => (
						<div key={i} className="task">
							<div className="task-description">
								<textarea
									value={t.description}
									onChange={(e) => {
										updateTask(i, "description", e.target.value);
										e.target.style.height = "auto";
										e.target.style.height = e.target.scrollHeight + "px";
									}}
									rows={1}
									spellCheck={false}
                                    placeholder={"Mit kell csinálnom?"}
								/>
							</div>
							<hr className="task-divider" />
							<div className="task-type">
								<label>Típus</label>
								<select value={t.type} onChange={(e) => updateTask(i, "type", e.target.value)}>
									<option value="daily">Minden nap</option>
									<option value="on_certain_days_of_the_week">A hét bizonyos napjain</option>
									<option value="x_times_per_week">Heti X-szer</option>
								</select>
							</div>
							<hr className="task-divider" />
							<div className="task-typeOptions">
								{t.type === "x_times_per_week" && (
									<input
										type="number"
										min={1}
										max={7}
										step={1}
										value={t.times_per_week ?? ""}
										onChange={(e) => updateTask(i, "times_per_week", parseInt(e.target.value))}
									/>
								)}
								{t.type === "on_certain_days_of_the_week" && (
									<div>
										<label>
											<input
												type="checkbox"
												checked={!!t.is_on_monday}
												onChange={(e) => updateTask(i, "is_on_monday", e.target.checked)}
											/>
											Hétfő
										</label>

										<label>
											<input
												type="checkbox"
												checked={!!t.is_on_tuesday}
												onChange={(e) => updateTask(i, "is_on_tuesday", e.target.checked)}
											/>
											Kedd
										</label>

										{/* stb... */}
									</div>
								)}
							</div>
							<button onClick={() => removeTask(i)} type="button">
								X
							</button>
						</div>
					))}

					<button className="addTaskButton" onClick={addTask} type="button">
						<svg viewBox="0 -960 960 960">
							<path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
						</svg>
					</button>
				</div>
			</form>
		</div>
	);
}
