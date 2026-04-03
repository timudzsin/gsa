import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserLogoutAndInfoButton.css";
import { UserContext } from "../contexts/UserContext";
import { createPortal } from "react-dom";

export default function UserLogoutAndInfoButton() {
	const navigate = useNavigate();
	const { userName } = useContext(UserContext);

	const [showLogout, setShowLogout] = useState(false);
	const [showInfo, setShowInfo] = useState(false);

	function handleLogout() {
		localStorage.removeItem("token");
		navigate("/");
	}

	return (
		<>
			<div className="UserLogoutAndInfoButton">
				<button onClick={() => setShowLogout(true)}>
					<svg viewBox="0 -960 960 960">
						<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z" />
					</svg>
				</button>

				<button onClick={() => setShowInfo(true)}>
					<svg viewBox="0 -960 960 960">
						<path d="M508.5-291.5Q520-303 520-320v-160q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280q17 0 28.5-11.5Zm0-320Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
					</svg>
				</button>
			</div>

			{/* Logout popup */}
			{showLogout && createPortal(
				<div className="UserLogoutAndInfoButton-logoutPopup">
					<div className="UserLogoutAndInfoButton-logoutPopup-content">
						<p>Biztosan ki akarsz lépni?</p>
						<button onClick={handleLogout}>Igen</button>
						<button onClick={() => setShowLogout(false)}>Nem</button>
					</div>
				</div>,
                document.body
			)}

			{/* Info popup */}
			{showInfo && createPortal(
				<div className="UserLogoutAndInfoButton-infoPopup">
					<div className="UserLogoutAndInfoButton-infoPopup-content">
						<p>Itt lesz majd a hosszabb leírásod...</p>
						<button onClick={() => setShowInfo(false)}>Bezárás</button>
					</div>
				</div>,
                document.body
			)}
		</>
	);
}
