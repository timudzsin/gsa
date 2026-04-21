import React, { useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { UserContext } from "../frontend/src/contexts/UserContext";
import "./UserGoalIndependentTasksButton.css";

const days = [
	{ key: "is_on_monday", label: "H" },
	{ key: "is_on_tuesday", label: "K" },
	{ key: "is_on_wednesday", label: "Sze" },
	{ key: "is_on_thursday", label: "Cs" },
	{ key: "is_on_friday", label: "P" },
	{ key: "is_on_saturday", label: "Szo" },
	{ key: "is_on_sunday", label: "V" },
];

function createDraftTask(task = {}) {
	return {
		localKey: task.id ?? `${Date.now()}-${Math.random()}`,
		id: task.id ?? null,
		description: task.description ?? "",
		type: task.type ?? "daily",
		rank: task.rank ?? 100,
		is_on_monday: task.is_on_monday ?? null,
		is_on_tuesday: task.is_on_tuesday ?? null,
		is_on_wednesday: task.is_on_wednesday ?? null,
		is_on_thursday: task.is_on_thursday ?? null,
		is_on_friday: task.is_on_friday ?? null,
		is_on_saturday: task.is_on_saturday ?? null,
		is_on_sunday: task.is_on_sunday ?? null,
		times_per_week: task.times_per_week ?? null,
	};
}

export default function UserGoalIndependentTasksButton() {
	const { userGoalIndependentTasks, patchUserGoalIndependentTasks } = useContext(UserContext);

	const [showEditor, setShowEditor] = useState(false);
	const [closingEditor, setClosingEditor] = useState(false);
	const [draftTasks, setDraftTasks] = useState([]);

	const formRef = useRef(null);

	function openEditor() {
		const initialTasks =
			userGoalIndependentTasks.length > 0
				? userGoalIndependentTasks.map((task) => createDraftTask(task))
				: [createDraftTask()];

		setDraftTasks(initialTasks);
		setShowEditor(true);
	}

	function closeEditor() {
		setClosingEditor(true);
	}

	function handleEditorAnimationEnd() {
		if (closingEditor) {
			setShowEditor(false);
			setClosingEditor(false);
			setDraftTasks([]);
		}
	}

	useLayoutEffect(() => {
		if (!formRef.current) return;

		const textareas = formRef.current.querySelectorAll("textarea");
		textareas.forEach((el) => {
			el.style.height = "auto";
			el.style.height = el.scrollHeight + "px";
		});
	}, [draftTasks, showEditor]);

	// ===== TASKS =====
	function addTask() {
		setDraftTasks((prev) => [...prev, createDraftTask()]);
	}

	function updateTask(localKey, field, value) {
		setDraftTasks((prev) =>
			prev.map((task) => (task.localKey === localKey ? { ...task, [field]: value } : task)),
		);
	}

	function removeTask(localKey) {
		setDraftTasks((prev) => prev.filter((task) => task.localKey !== localKey));
	}

	function handleTypeChange(localKey, nextType) {
		setDraftTasks((prev) =>
			prev.map((task) => {
				if (task.localKey !== localKey) return task;

				const base = {
					...task,
					type: nextType,
				};

				if (nextType === "daily") {
					return {
						...base,
						is_on_monday: null,
						is_on_tuesday: null,
						is_on_wednesday: null,
						is_on_thursday: null,
						is_on_friday: null,
						is_on_saturday: null,
						is_on_sunday: null,
						times_per_week: null,
					};
				}

				if (nextType === "x_times_per_week") {
					return {
						...base,
						is_on_monday: null,
						is_on_tuesday: null,
						is_on_wednesday: null,
						is_on_thursday: null,
						is_on_friday: null,
						is_on_saturday: null,
						is_on_sunday: null,
						times_per_week: base.times_per_week ?? 1,
					};
				}

				return {
					...base,
					times_per_week: null,
					is_on_monday: base.is_on_monday ?? false,
					is_on_tuesday: base.is_on_tuesday ?? false,
					is_on_wednesday: base.is_on_wednesday ?? false,
					is_on_thursday: base.is_on_thursday ?? false,
					is_on_friday: base.is_on_friday ?? false,
					is_on_saturday: base.is_on_saturday ?? false,
					is_on_sunday: base.is_on_sunday ?? false,
				};
			}),
		);
	}

	function hasAnySelectedDay(task) {
		return [
			task.is_on_monday,
			task.is_on_tuesday,
			task.is_on_wednesday,
			task.is_on_thursday,
			task.is_on_friday,
			task.is_on_saturday,
			task.is_on_sunday,
		].some((value) => value === true);
	}

	const isFormValid = useMemo(() => {
		return draftTasks.every((task) => {
			if (task.description.trim() === "") return false;

			if (task.type === "x_times_per_week") {
				const times = Number(task.times_per_week);
				if (!Number.isInteger(times) || times < 1) return false;
			}

			if (task.type === "on_certain_days_of_the_week" && !hasAnySelectedDay(task)) {
				return false;
			}

			return true;
		});
	}, [draftTasks]);

	async function handleSubmit(e) {
		e.preventDefault();
		if (!isFormValid) return;

		try {
			await patchUserGoalIndependentTasks(
				draftTasks.map((task) => ({
					id: task.id ?? undefined,
					description: task.description,
					type: task.type,
					rank: task.rank,
					is_on_monday: task.is_on_monday,
					is_on_tuesday: task.is_on_tuesday,
					is_on_wednesday: task.is_on_wednesday,
					is_on_thursday: task.is_on_thursday,
					is_on_friday: task.is_on_friday,
					is_on_saturday: task.is_on_saturday,
					is_on_sunday: task.is_on_sunday,
					times_per_week: task.times_per_week,
				})),
			);

			closeEditor();
		} catch (err) {
			console.error("Hiba a céltól független taskok mentésénél:", err);
		}
	}

	return (
		<>
			<div className="UserGoalIndependentTasksButton">
				<button type="button" onClick={openEditor}>
					<svg viewBox="0 -960 960 960">
						<path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
					</svg>
				</button>
			</div>

			{showEditor &&
				createPortal(
					<div
						className={`UserGoalIndependentTasksButton-popup ${closingEditor ? "closing" : ""}`}
						onAnimationEnd={handleEditorAnimationEnd}
					>
						<div className="UserGoalIndependentTasksButton-popup-content">
							<div className="UserGoalIndependentTasksButton-popup-content-scrollable">
								<form ref={formRef} onSubmit={handleSubmit}>
									<div className="popup-headerOverlay">
										<button className="popup-headerOverlay-x" type="button" onClick={closeEditor}>
											<svg viewBox="0 -960 960 960">
												<path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
											</svg>
										</button>

										<h2 className="popup-headerOverlay-title">Céltól független feladatok</h2>

										<button className="popup-headerOverlay-v" type="submit" disabled={!isFormValid}>
											<svg viewBox="0 -960 960 960">
												<path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
											</svg>
										</button>
									</div>

									<div className="goalIndependentTasks">
										{draftTasks.map((task) => (
											<div key={task.localKey} className="task">
												<div className="task-description">
													<textarea
														value={task.description}
														onChange={(e) => {
															updateTask(task.localKey, "description", e.target.value);
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
													<select
														value={task.type}
														onChange={(e) => handleTypeChange(task.localKey, e.target.value)}
													>
														<option value="daily">Minden nap</option>
														<option value="x_times_per_week">Heti X-szer</option>
														<option value="on_certain_days_of_the_week">A hét bizonyos napjain</option>
													</select>
												</div>

												<div className="task-typeOptions">
													{task.type === "x_times_per_week" && (
														<>
															<hr className="task-divider" />
															<div className="task-typeOptions-x_times_per_week">
																<label>X</label>
																<input
																	type="number"
																	min={1}
																	max={6}
																	step={1}
																	value={task.times_per_week ?? ""}
																	onChange={(e) => {
																		let value = parseInt(e.target.value);

																		if (isNaN(value)) {
																			updateTask(task.localKey, "times_per_week", "");
																			return;
																		}

																		if (value > 6) value = 6;
																		if (value < 1) value = 1;

																		updateTask(task.localKey, "times_per_week", value);
																	}}
																	placeholder="X"
																/>
															</div>
														</>
													)}

													{task.type === "on_certain_days_of_the_week" && (
														<div>
															<hr className="task-divider" />
															<div className="task-typeOptions-on_certain_days_of_the_week-checkboxes">
																{days.map((day) => (
																	<label key={day.key} className="day-checkbox">
																		<input
																			type="checkbox"
																			checked={task[day.key] === true}
																			onChange={(e) =>
																				updateTask(task.localKey, day.key, e.target.checked)
																			}
																		/>
																		<span>{day.label}</span>
																	</label>
																))}
															</div>
														</div>
													)}
												</div>

												<div className="task-meta">
													<label>Sorrend</label>
													<input
														type="number"
														min={1}
														step={1}
														value={task.rank}
														onChange={(e) => {
															let value = parseInt(e.target.value);
															if (isNaN(value)) value = 100;
															updateTask(task.localKey, "rank", value);
														}}
													/>
												</div>

												<button className="removeTaskButton" type="button" onClick={() => removeTask(task.localKey)}>
													<svg viewBox="0 -960 960 960">
														<path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm148.5-171.5Q440-303 440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280q17 0 28.5-11.5Zm160 0Q600-303 600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280q17 0 28.5-11.5Z" />
													</svg>
												</button>
											</div>
										))}

										<button className="addTaskButton" type="button" onClick={addTask}>
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