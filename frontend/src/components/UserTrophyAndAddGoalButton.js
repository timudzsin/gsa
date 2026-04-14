import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./UserTrophyAndAddGoalButton.css";
import { UserContext } from "../contexts/UserContext";
import InlineSVG from "./InlineSVG";

// Cél létrehozásához való dolgok
import ICONS from "../icons.json";
const COLORS = [
	"RED",
	"CORAL",
	"ORANGE",
	"YELLOW",
	"GREEN",
	"CYAN",
	"LIGHT-BLUE",
	"BLUE",
	"INDIGO",
	"PURPLE",
	"MAGENTA",
	"PINK",
	"GRAY",
	"SAGE",
	"BEIGE",
];
const days = [
	{ key: "is_on_monday", label: "H" },
	{ key: "is_on_tuesday", label: "K" },
	{ key: "is_on_wednesday", label: "Sze" },
	{ key: "is_on_thursday", label: "Cs" },
	{ key: "is_on_friday", label: "P" },
	{ key: "is_on_saturday", label: "Szo" },
	{ key: "is_on_sunday", label: "V" },
];

export default function UserTrophyAndAddGoalButton() {
	const { userCompletedGoals } = useContext(UserContext);

	const [showTrophy, setShowTrophy] = useState(false);
	const [closingTrophy, setClosingTrophy] = useState(false);

	function handleTrophyAnimationEnd() {
		if (closingTrophy) {
			setShowTrophy(false);
			setClosingTrophy(false);
		}
	}

	function formatCompletedDate(dateString) {
		const date = new Date(dateString);

		const months = [
			"január",
			"február",
			"március",
			"április",
			"május",
			"június",
			"július",
			"augusztus",
			"szeptember",
			"október",
			"november",
			"december",
		];

		const year = date.getFullYear();
		const month = months[date.getMonth()];
		const day = date.getDate();

		return `${year} ${month} ${day}`;
	}

	// ======================================== Cél létrehozásához való dolgok ========================================
	const { postUserNotCompletedGoal } = useContext(UserContext);

	const [title, setTitle] = useState("");
	const [deadline, setDeadline] = useState("");
	const [color, setColor] = useState("GRAY");
	const [iconUrl, setIconUrl] = useState("target.svg");
	const [rank, setRank] = useState(1);
	const [motivations, setMotivations] = useState([{ description: "" }]);
	const [tasks, setTasks] = useState([]);

	const [showAddGoal, setShowAddGoal] = useState(false);
	const [closingAddGoal, setClosingAddGoal] = useState(false);

	const [showBannerPopup, setShowBannerPopup] = useState(false);
	const [closingBannerPopup, setClosingBannerPopup] = useState(false);

	const formRef = useRef(null);

	const shuffledIcons = useMemo(() => {
		const arr = [...ICONS];
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}, []);

	function resetAddGoalForm() {
		setTitle("");

		// deadline (1 hónap múlva)
		const date = new Date();
		date.setMonth(date.getMonth() + 1);
		setDeadline(date.toISOString().split("T")[0]);

		// random color
		setColor(COLORS[Math.floor(Math.random() * COLORS.length)]);

		// random icon
		setIconUrl(ICONS[Math.floor(Math.random() * ICONS.length)]);

		setRank(1);
		setMotivations([{ description: "" }]);
		setTasks([]);
		setShowBannerPopup(false);
		setClosingBannerPopup(false);
	}

	function openAddGoal() {
		resetAddGoalForm();
		setShowAddGoal(true);
	}
	function closeAddGoal() {
		setClosingAddGoal(true);
	}
	function handleAddGoalAnimationEnd() {
		if (closingAddGoal) {
			setShowAddGoal(false);
			setClosingAddGoal(false);
			resetAddGoalForm();
		}
	}
	function handleBannerPopupAnimationEnd() {
		if (closingBannerPopup) {
			setShowBannerPopup(false);
			setClosingBannerPopup(false);
		}
	}

	useLayoutEffect(() => {
		if (!formRef.current) return;

		const textareas = formRef.current.querySelectorAll("textarea");
		textareas.forEach((el) => {
			el.style.height = "auto";
			el.style.height = el.scrollHeight + "px";
		});
	}, [title, motivations, tasks, showAddGoal]);

	// ===== MOTIVATIONS =====
	function addMotivation() {
		setMotivations((prev) => [...prev, { description: "" }]);
	}
	function updateMotivation(index, value) {
		setMotivations((prev) => prev.map((item, i) => (i === index ? { ...item, description: value } : item)));
	}
	function removeMotivation(index) {
		setMotivations((prev) => prev.filter((_, i) => i !== index));
	}

	// ===== TASKS =====
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

	// ===== VALIDATION =====
	const isFormValid = useMemo(() => {
		const hasTitle = title.trim() !== "";
		const hasValidMotivation = motivations.length > 0 && motivations.every((m) => m.description.trim() !== "");
		const hasValidTask = tasks.length > 0 && tasks.every((t) => t.description.trim() !== "");

		return hasTitle && hasValidMotivation && hasValidTask;
	}, [title, motivations, tasks]);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!isFormValid) return;

		try {
			await postUserNotCompletedGoal({
				title,
				deadline,
				color,
				icon_url: iconUrl,
				rank,
				motivations: motivations.map((m) => ({
					description: m.description,
				})),
				tasks: tasks.map((t) => ({
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

			closeAddGoal();
		} catch (err) {
			console.error("Hiba a cél létrehozásánál:", err);
		}
	}

	return (
		<>
			<div className="UserTrophyAndAddGoalButton">
				<button onClick={() => setShowTrophy(true)}>
					<svg viewBox="0 -960 960 960">
						<path d="M280-528v-152h-80v40q0 38 22 68.5t58 43.5Zm400 0q36-13 58-43.5t22-68.5v-40h-80v152ZM440-200v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80q0-33 23.5-56.5T360-840h240q33 0 56.5 23.5T680-760h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h120q17 0 28.5 11.5T680-160q0 17-11.5 28.5T640-120H320q-17 0-28.5-11.5T280-160q0-17 11.5-28.5T320-200h120Z" />
					</svg>
				</button>
				<button onClick={openAddGoal}>
					<svg viewBox="0 -960 960 960">
						<path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
					</svg>
				</button>
			</div>

			{/* Trophy popup */}
			{showTrophy &&
				createPortal(
					<div
						className={`UserTrophyAndAddGoalButton-trophyPopup ${closingTrophy ? "closing" : ""}`}
						onAnimationEnd={handleTrophyAnimationEnd}
					>
						<div className="UserTrophyAndAddGoalButton-trophyPopup-content">
							<div className="UserTrophyAndAddGoalButton-trophyPopup-content-scrollable">
								<div className="UserTrophyAndAddGoalButton-trophyPopup-content-scrollable-overlay"></div>
								<button
									className="UserTrophyAndAddGoalButton-trophyPopup-content-back"
									onClick={() => setClosingTrophy(true)}
								>
									<svg viewBox="70 -960 960 960">
										<path d="m382-480 294 294q15 15 14.5 35T675-116q-15 15-35 15t-35-15L297-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T676-844q15 15 15 35t-15 35L382-480Z" />
									</svg>
								</button>
								<h2 className="UserTrophyAndAddGoalButton-trophyPopup-content-completedGoalsText">
									Teljesített Célok
								</h2>
								<div className="UserCompletedGoals">
									{[...userCompletedGoals]
										.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
										.map((goal) => (
											<div key={goal.id} className={`completedGoal ${goal.color}`}>
												<p className="completedGoal-completionDate">{formatCompletedDate(goal.updated_at)}</p>
												<InlineSVG className="completedGoal-icon" src={`/goal_icons/${goal.icon_url}`} />
												<p className="completedGoal-title">{goal.title}</p>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>,
					document.body,
				)}

			{/* Add Goal popup */}
			{showAddGoal &&
				createPortal(
					<div
						className={`UserTrophyAndAddGoalButton-addGoalPopup ${closingAddGoal ? "closing" : ""}`}
						onAnimationEnd={handleAddGoalAnimationEnd}
					>
						<div className="UserTrophyAndAddGoalButton-addGoalPopup-content">
							<div className="UserTrophyAndAddGoalButton-addGoalPopup-content-scrollable">
								<form onSubmit={handleSubmit} ref={formRef}>
									{/* HEADER */}
									<div className="addGoalPopup-headerOverlay">
										<button className="addGoalPopup-headerOverlay-x" type="button" onClick={closeAddGoal}>
											<svg viewBox="0 -960 960 960">
												<path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
											</svg>
										</button>
										<h2 className="addGoalPopup-headerOverlay-addGoalText">Cél Létrehozása</h2>
										<button className="addGoalPopup-headerOverlay-v" type="submit" disabled={!isFormValid}>
											<svg viewBox="0 -960 960 960">
												<path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
											</svg>
										</button>
									</div>

									{/* BANNER és TITLE */}
									<div className={`addGoalPopup-bannerAndTitle ${color}`}>
										<div className="addGoalPopup-banner" onClick={() => setShowBannerPopup(true)}>
											<InlineSVG className="addGoalPopup-banner-icon" src={`/goal_icons/${iconUrl}`} />
										</div>

										<textarea
											className="addGoalPopup-title"
											value={title}
											onChange={(e) => {
												setTitle(e.target.value);
												e.target.style.height = "auto";
												e.target.style.height = e.target.scrollHeight + "px";
											}}
											rows={1}
											spellCheck={false}
											placeholder="Pontosan mit akarok elérni?"
										/>
									</div>

									{/* ===== BANNER POPUP ===== */}
									{showBannerPopup && (
										<div
											className={`addGoalPopup-bannerPopup ${closingBannerPopup ? "closing" : ""}`}
											onAnimationEnd={handleBannerPopupAnimationEnd}
										>
											<div className="addGoalPopup-bannerPopup-content">
												<div className="addGoalPopup-bannerPopup-content-scrollable">
													<div className="addGoalPopup-bannerPopup-overlay"></div>

													<div className={`preview ${color}`}>
														<InlineSVG className="preview-icon" src={`/goal_icons/${iconUrl}`} />
													</div>

													<button
														className="doneButton"
														type="button"
														onClick={() => setClosingBannerPopup(true)}
													>
														<svg viewBox="0 -960 960 960">
															<path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
														</svg>
													</button>

													<div className="colorList">
														{COLORS.map((c) => (
															<div
																key={c}
																className={`colorItem ${c} ${color === c ? "selected" : ""}`}
																onClick={() => setColor(c)}
															/>
														))}
													</div>

													<div className="iconList">
														{shuffledIcons.map((icon) => (
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
										</div>
									)}

									{/* DEADLINE */}
									<div className="addGoalPopup-deadline">
										<label>Határidő</label>
										<input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
									</div>

									{/* MOTIVATIONS */}
									<h3 className="addGoalPopup-motivations-label">Motivációk</h3>
									<div className="addGoalPopup-motivations">
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
														placeholder="Miért akarom elérni a célt?"
													/>
													{motivations.length >= 2 && (
														<button onClick={() => removeMotivation(i)} type="button">
															<svg viewBox="0 -960 960 960">
																<path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm148.5-171.5Q440-303 440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280q17 0 28.5-11.5Zm160 0Q600-303 600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280q17 0 28.5-11.5Z" />
															</svg>
														</button>
													)}
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
									<h3 className="addGoalPopup-tasks-label">Feladatok</h3>
									<div className="addGoalPopup-tasks">
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
														placeholder="Mit kell csinálnom?"
													/>
												</div>

												<hr className="task-divider" />

												<div className="task-type">
													<label>Mikor</label>
													<select value={t.type} onChange={(e) => updateTask(i, "type", e.target.value)}>
														<option value="daily">Minden nap</option>
														<option value="x_times_per_week">Heti X-szer</option>
														<option value="on_certain_days_of_the_week">A hét bizonyos napjain</option>
													</select>
												</div>

												<div className="task-typeOptions">
													{t.type === "x_times_per_week" && (
														<>
															<hr className="task-divider" />
															<div className="task-typeOptions-x_times_per_week">
																<label>X</label>
																<input
																	type="number"
																	min={1}
																	max={6}
																	step={1}
																	value={t.times_per_week ?? ""}
																	onChange={(e) => {
																		let value = parseInt(e.target.value);

																		if (isNaN(value)) {
																			updateTask(i, "times_per_week", "");
																			return;
																		}

																		if (value > 6) value = 6;
																		if (value < 1) value = 1;

																		updateTask(i, "times_per_week", value);
																	}}
																	placeholder="X"
																/>
															</div>
														</>
													)}

													{t.type === "on_certain_days_of_the_week" && (
														<div>
															<hr className="task-divider" />
															<div className="task-typeOptions-on_certain_days_of_the_week-checkboxes">
																{days.map((day) => (
																	<label key={day.key} className="day-checkbox">
																		<input
																			type="checkbox"
																			checked={t[day.key] === true}
																			onChange={(e) => updateTask(i, day.key, e.target.checked)}
																		/>
																		<span>{day.label}</span>
																	</label>
																))}
															</div>
														</div>
													)}
												</div>

												{tasks.length >= 2 && (
													<button className="removeTaskButton" onClick={() => removeTask(i)} type="button">
														<svg viewBox="0 -960 960 960">
															<path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm148.5-171.5Q440-303 440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280q17 0 28.5-11.5Zm160 0Q600-303 600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280q17 0 28.5-11.5Z" />
														</svg>
													</button>
												)}
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
						</div>
					</div>,
					document.body,
				)}
		</>
	);
}
