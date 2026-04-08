import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./UserTrophyAndAddGoalButton.css";

export default function UserTrophyAndAddGoalButton() {
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

	/*
    
    
    
    
    
    */

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
								<button
									className="UserTrophyAndAddGoalButton-trophyPopup-content-back"
									onClick={() => setClosingTrophy(true)}
								>
									<svg viewBox="70 -960 960 960">
										<path d="m382-480 294 294q15 15 14.5 35T675-116q-15 15-35 15t-35-15L297-423q-12-12-18-27t-6-30q0-15 6-30t18-27l308-308q15-15 35.5-14.5T676-844q15 15 15 35t-15 35L382-480Z" />
									</svg>
								</button>
								<h1>
									User Trophy And AddGoal Button - trophy Popup User Trophy And AddGoal Button - trophy Popup User
									Trophy And AddGoal Button - trophy Popup User Trophy And AddGoal Button - trophy Popup User Trophy
									And AddGoal Button - trophy Popup User Trophy And AddGoal Button - trophy Popup User Trophy And
									AddGoal Button - trophy Popup User Trophy And AddGoal Button - trophy Popup User Trophy And AddGoal
									Button - trophy Popup User Trophy And AddGoal Button - trophy Popup
								</h1>
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
									UserTrophyAndAddGoalButton-addGoalPopup UserTrophyAndAddGoalButton-addGoalPopup
									UserTrophyAndAddGoalButton-addGoalPopup UserTrophyAndAddGoalButton-addGoalPopup
									UserTrophyAndAddGoalButton-addGoalPopup UserTrophyAndAddGoalButton-addGoalPopup
								</h1>
							</div>
						</div>
					</div>,
					document.body,
				)}
		</>
	);
}
