import React, { useContext, useRef, useState } from "react";
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

	const [showAddGoal, setShowAddGoal] = useState(false);
	const [closingAddGoal, setClosingAddGoal] = useState(false);

	function handleTrophyAnimationEnd() {
		if (closingTrophy) {
			setShowTrophy(false);
			setClosingTrophy(false);
		}
	}
	function handleAddGoalAnimationEnd() {
		if (closingAddGoal) {
			setShowAddGoal(false);
			setClosingAddGoal(false);
		}
	}

	function formatCompletedDate(dateString) {
		const date = new Date(dateString);

		const months = [
			"Január",
			"Február",
			"Március",
			"Április",
			"Május",
			"Június",
			"Július",
			"Augusztus",
			"Szeptember",
			"Október",
			"November",
			"December",
		];

		const year = date.getFullYear();
		const month = months[date.getMonth()];
		const day = date.getDate();

		return `${year} ${month} ${day}`;
	}

	// Cél létrehozásához való dolgok
	const [title, setTitle] = useState("");
	const [deadline, setDeadline] = useState(() => {
		const date = new Date();
		date.setMonth(date.getMonth() + 1);

		return date.toISOString().split("T")[0];
	});
	const [color, setColor] = useState(COLORS[Math.floor(Math.random() * COLORS.length)]);
	const [iconUrl, setIconUrl] = useState(ICONS[Math.floor(Math.random() * COLORS.length)]);
	const [rank, setRank] = useState(1);

	const [motivations, setMotivations] = useState([]);
	const [tasks, setTasks] = useState([]);

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

	return (
		<>
			<div className="UserTrophyAndAddGoalButton">
				<button onClick={() => setShowTrophy(true)}>
					<svg viewBox="0 -960 960 960">
						<path d="M280-528v-152h-80v40q0 38 22 68.5t58 43.5Zm400 0q36-13 58-43.5t22-68.5v-40h-80v152ZM440-200v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80q0-33 23.5-56.5T360-840h240q33 0 56.5 23.5T680-760h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h120q17 0 28.5 11.5T680-160q0 17-11.5 28.5T640-120H320q-17 0-28.5-11.5T280-160q0-17 11.5-28.5T320-200h120Z" />
					</svg>
				</button>
				<button onClick={() => setShowAddGoal(true)}>
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
												<p className="completedGoal-completionDate">
													{formatCompletedDate(goal.updated_at)}
												</p>
												<InlineSVG
													className="completedGoal-icon"
													src={`/goal_icons/${goal.icon_url}`}
												/>
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
								<h1>
									UserTrophyAndAddGoalButton-addGoalPopup
									UserTrophyAndAddGoalButton-addGoalPopup
									UserTrophyAndAddGoalButton-addGoalPopup
									UserTrophyAndAddGoalButton-addGoalPopup
									UserTrophyAndAddGoalButton-addGoalPopup
									UserTrophyAndAddGoalButton-addGoalPopup
								</h1>
							</div>
						</div>
					</div>,
					document.body,
				)}
		</>
	);
}
