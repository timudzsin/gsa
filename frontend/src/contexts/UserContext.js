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



    // Nem akarok esszé
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



    // Akarok esszé
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



    // Nem teljesített célok
	function getUserNotCompletedGoals() {
		return axios
			.get("http://localhost:8000/api/user-not-completed-goals", {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((res) => res.data.goals);
	}



    // Teljesített célok
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
				userName,

				userDontWantEssay,
				setUserDontWantEssay,

				userWantEssay,
				setUserWantEssay,
                
				userNotCompletedGoals,
                setUserNotCompletedGoals,
                
				putUserDontWantEssay,
				putUserWantEssay,

				loading,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
