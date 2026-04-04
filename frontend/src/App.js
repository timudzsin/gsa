import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import UserDontWantPage from "./pages/UserDontWantPage";
import UserWantPage from "./pages/UserWantPage";
import UserGoalsPage from "./pages/UserGoalsPage";
import UserTasksPage from "./pages/UserTasksPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/login" replace />} />

				<Route path="/register" element={<RegisterPage />} />

				<Route path="/login" element={<LoginPage />} />

				<Route path="/user" element={<UserPage />}>
					<Route index element={<Navigate to="dont-want" replace />} />
					<Route path="dont-want" element={<UserDontWantPage />} />
					<Route path="want" element={<UserWantPage />} />
					<Route path="goals" element={<UserGoalsPage />} />
					<Route path="tasks" element={<UserTasksPage />} />
				</Route>

				<Route path="/admin" element={<AdminPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
