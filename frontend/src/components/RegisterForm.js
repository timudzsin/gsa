import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

export default function RegisterForm() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault(); // ne frissüljön az oldal

		axios
			.post("http://localhost:8000/api/register", {
				name,
				password,
			})
			.then(function (response) {
				console.log(response.data);

				// Token beállítása
				const token =
					response?.data?.token ||
					response?.data?.access_token ||
					response?.data?.data?.token ||
					null;
				if (token) {
					localStorage.setItem("token", token);
					console.log("Token mentve:", token);
				}

				// Form mezőinek törlése
				setName("");
				setPassword("");

				// Navigálás a /user oldalra
				navigate("/user");
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<form className="RegisterForm" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Név"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Jelszó"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">Regisztráció</button>
		</form>
	);
}
