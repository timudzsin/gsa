import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [userName, setUserName] = useState(null);

	const [userDontWantEssay, setUserDontWantEssay] = useState("");
	const [userWantEssay, setUserWantEssay] = useState("");

	const [userNotCompletedGoals, setUserNotCompletedGoals] = useState([]);
	const [userCompletedGoals, setUserCompletedGoals] = useState([]);

	const [todaysChecklist, setTodaysChecklist] = useState(null);

	useEffect(() => {
		fetchAllUserData();
	}, []);

	// Felhasználó összes adatának lekérése.
	function fetchAllUserData() {
		setLoading(true);
		Promise.all([
			getMe(),
			getUserDontWantEssay(),
			getUserWantEssay(),
			getUserNotCompletedGoals(),
			getUserCompletedGoals(),
			getOrCreateTodaysChecklist(),
		])
			.then(([userData, dontWantEssayData, wantEssayData, notCompletedGoalsData, completedGoalsData, todaysChecklistData]) => {
				setUserName(userData.name);
				setUserDontWantEssay(dontWantEssayData);
				setUserWantEssay(wantEssayData);
				setUserNotCompletedGoals(notCompletedGoalsData);
				setUserCompletedGoals(completedGoalsData);
				setTodaysChecklist(todaysChecklistData);
                console.log(todaysChecklistData);
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
	function postUserNotCompletedGoal(payload) {
		return axios
			.post("http://localhost:8000/api/user-not-completed-goals", payload, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((res) => {
				const createdGoal = res.data.goal;
				// lokális állapot (userNotCompletedGoals state) szinkronizálása
				setUserNotCompletedGoals((prev) => [createdGoal, ...prev]);
				return createdGoal;
			});
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
	function completeUserNotCompletedGoal(goalId) {
		return axios
			.patch(
				`http://localhost:8000/api/user-not-completed-goals/${goalId}/complete`,
				{},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				},
			)
			.then((res) => {
				const completedGoal = res.data.goal;

				// 1️⃣ eltávolítjuk a nem teljesített listából
				setUserNotCompletedGoals((prev) => prev.filter((goal) => goal.id !== completedGoal.id));

				// 2️⃣ hozzáadjuk a teljesített listához
				setUserCompletedGoals((prev) => [completedGoal, ...prev]);

				return completedGoal;
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

	// Checklists
	function getOrCreateTodaysChecklist() {
		return axios
			.post(
				"http://localhost:8000/api/user-today-checklist",
				{},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				},
			)
			.then((res) => res.data.checklist)
			.catch((err) => {
				console.error("Hiba a mai checklist lekérésénél/létrehozásánál:", err);
				return null;
			});
	}

	return (
		<UserContext.Provider
			value={{
				// State-ek
				loading, // kell a töltés spinnerhez
				userName, // kell a logout popuphoz
				userDontWantEssay, // kell a DontWantEssay komponenshez
				setUserDontWantEssay, // kell a DontWantEssay komponenshez
				userWantEssay, // kell a WantEssay komponenshez
				setUserWantEssay, // kell a WantEssay komponenshez
				userNotCompletedGoals, // kell a nem teljesített célok kilistázásához
				userCompletedGoals, // kell a teljesített célok kilistázásához
                todaysChecklist, // kell a UserTodaysChecklist komponenshez
				// API hívások
				putUserDontWantEssay, // kell a DontWantEssay komponenshez
				putUserWantEssay, // kell a WantEssay komponenshez
				postUserNotCompletedGoal, // kell célok létrehozásához
				patchUserNotCompletedGoal, // kell célok szerkesztéséhez
				completeUserNotCompletedGoal, // kell célok teljesítéséhez
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
