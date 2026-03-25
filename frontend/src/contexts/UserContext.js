import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userName, setUserName] = useState(null);
	const [userDontWantEssay, setUserDontWantEssay] = useState("");
	const [userWantEssay, setUserWantEssay] = useState("");
	const [userGoals, setUserGoals] = useState([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		fetchAllUserData();
	}, []);


	// Felhasználó összes adatának lekérése.
	function fetchAllUserData() {
		setLoading(true);
		Promise.all([getMe(), getUserDontWantEssay(), getUserWantEssay(), getUserGoals()])
			.then(([userData, dontWantEssayData, wantEssayData, goalsData]) => {
				setUserName(userData.name);
				setUserDontWantEssay(dontWantEssayData);
				setUserWantEssay(wantEssayData);
				setUserGoals(goalsData);

				// Segítség: Ki van bejelentkezve?
				console.log("bejelentkezve:\n" + userData.name);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}



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



	function getUserGoals() {
		return axios
			.get("http://localhost:8000/api/user-goals", {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then((res) => cleanGoals(res.data.goals));
	}

	function cleanGoals(goals) {
		return goals.map((goal) => ({
			title: goal.title,
			deadline: goal.deadline,
			is_completed: goal.is_completed,
			rank: goal.rank,
			color: goal.color,
			icon_url: goal.icon_url,

			motivations: goal.motivations?.map((m) => ({
				description: m.description,
			})),

			tasks: goal.tasks?.map((task) => ({
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
		}));
	}



	return (
		<UserContext.Provider
			value={{
				loading,

				userDontWantEssay,
				setUserDontWantEssay,
				putUserDontWantEssay,

				userWantEssay,
				setUserWantEssay,
				putUserWantEssay,

                userGoals,
                setUserGoals,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
