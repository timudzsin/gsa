import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userDontWantEssay, setUserDontWantEssay] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchAllUserData();
	}, []);

	function fetchAllUserData() {
		setLoading(true);
		Promise.all([getUserDontWantEssay()])
			.then(([dontWantEssayData]) => {
				setUserDontWantEssay(dontWantEssayData);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
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

	return (
		<UserContext.Provider value={{ userDontWantEssay, setUserDontWantEssay, postUserDontWantEssay, loading }}>
			{children}
		</UserContext.Provider>
	);
};
