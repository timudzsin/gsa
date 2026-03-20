import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	async function getUserDontWantEssay() {
		return axios
			.get("http://localhost:8000/api/user-dont-want-essay", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then(function (response) {
				return response.data;
			})
			.catch(function (error) {
				return null;
			});
	}

	async function postUserDontWantEssay(apiBody) {
		
	}

	return (
		<UserContext.Provider value={{ getUserDontWantEssay, postUserDontWantEssay }}>{children}</UserContext.Provider>
	);
};
