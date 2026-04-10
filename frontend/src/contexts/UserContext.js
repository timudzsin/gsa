import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userName, setUserName] = useState(null);
	const [userDontWantEssay, setUserDontWantEssay] = useState("");
	const [userWantEssay, setUserWantEssay] = useState("");
	const [userNotCompletedGoals, setUserNotCompletedGoals] = useState([]);
	const [userCompletedGoals, setUserCompletedGoals] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchAllUserData();
	}, []);

	// Felhasználó összes adatának lekérése.
	function fetchAllUserData() {
		setLoading(true);
		Promise.all([getMe(), getUserDontWantEssay(), getUserWantEssay(), getUserNotCompletedGoals(), getUserCompletedGoals()])
			.then(([userData, dontWantEssayData, wantEssayData, notCompletedGoalsData, completedGoalsData]) => {
				setUserName(userData.name);
				setUserDontWantEssay(dontWantEssayData);
				setUserWantEssay(wantEssayData);
				setUserNotCompletedGoals(notCompletedGoalsData);
				setUserCompletedGoals(completedGoalsData);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}

	// User
	function getMe() {
		return axios
			.get("http://localhost:8000/api/me", {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((res) => res.data.user)
			.catch((err) => {
				console.error("Hiba a bejelentkezett felhasználó lekérésénél:", err);
				return null;
			});
	}

	// Don't want essay
	function getUserDontWantEssay() {
		return axios
			.get("http://localhost:8000/api/user-dont-want-essay", {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((res) => res.data.dont_want_essay);
	}
	function putUserDontWantEssay(x) {
		return axios.put(
			"http://localhost:8000/api/user-dont-want-essay",
			{ dont_want_essay: x },
			{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
		);
	}

	// Want essay
	function getUserWantEssay() {
		return axios
			.get("http://localhost:8000/api/user-want-essay", {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((res) => res.data.want_essay);
	}
	function putUserWantEssay(x) {
		return axios.put(
			"http://localhost:8000/api/user-want-essay",
			{ want_essay: x },
			{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
		);
	}

	// Not completed goals
	function getUserNotCompletedGoals() {
		return axios
			.get("http://localhost:8000/api/user-not-completed-goals", {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((res) => res.data.goals);
	}
	function patchUserNotCompletedGoal(goalId, payload) {
		return axios
			.patch(`http://localhost:8000/api/user-not-completed-goals/${goalId}`, payload, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((res) => {
				const updatedGoal = res.data.goal;
				// lokális állapot (userNotCompletedGoals state) szinkronizálása
				setUserNotCompletedGoals((prev) => prev.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)));

				return updatedGoal;
			});
	}

	// Completed goals
	function getUserCompletedGoals() {
		return axios
			.get("http://localhost:8000/api/user-completed-goals", {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((res) => res.data.goals);
	}

	return (
		<UserContext.Provider
			value={{
				loading, // kell a töltés spinnerhez
				userName, // kell a logout popuphoz

				userDontWantEssay, // kell a DontWantEssay komponenshez
				setUserDontWantEssay, // kell a DontWantEssay komponenshez

				userWantEssay, // kell a WantEssay komponenshez
				setUserWantEssay, // kell a WantEssay komponenshez

				userNotCompletedGoals, // kell a nem teljesített célok kilistázásához

                userCompletedGoals, // kell a teljesített célok kilistázásához

				putUserDontWantEssay, // kell a DontWantEssay komponenshez
				putUserWantEssay, // kell a WantEssay komponenshez
				patchUserNotCompletedGoal, // kell a cél szerkesztéséhez
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
