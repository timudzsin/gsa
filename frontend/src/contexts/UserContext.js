import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userName, setUserName] = useState(null);
	const [userDontWantEssay, setUserDontWantEssay] = useState("");
	const [userWantEssay, setUserWantEssay] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchAllUserData();
	}, []);

	function fetchAllUserData() {
		setLoading(true);
		Promise.all([me(), getUserDontWantEssay(), getUserWantEssay()])
			.then(([userData, dontWantEssayData, wantEssayData]) => {
				setUserName(userData.name);
				setUserDontWantEssay(dontWantEssayData);
				setUserWantEssay(wantEssayData);

				// Segítség: Ki van bejelentkezve?
				console.log("bejelentkezve:\n" + userData.name);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}

	function me() {
		// Segítség: Ki van bejelentkezve?
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

	function postUserDontWantEssay(x) {
		return axios.post(
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
			.then((res) => res.data.dont_want_essay);
	}

	function postUserWantEssay(x) {
		return axios.post(
			"http://localhost:8000/api/user-want-essay",
			{ want_essay: x },
			{ headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
		);
	}

	return (
		<UserContext.Provider
			value={{
				loading,

				userDontWantEssay,
				setUserDontWantEssay,
				postUserDontWantEssay,

				userWantEssay,
				setUserWantEssay,
				postUserWantEssay,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
