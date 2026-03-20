import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    
	async function getUserDontWantEssay() {
		axios
			.get("localhost:8000/api/user-dont-want-essay", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then(function (response) {
				console.log(response.data);

			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return <UserContext.Provider value={{ getUserDontWantEssay }}>{children}</UserContext.Provider>;
};
