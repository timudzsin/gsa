import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Navigate to="/login" replace />} />

					<Route path="/register" element={<RegisterPage></RegisterPage>}></Route>

					<Route path="/login" element={<LoginPage></LoginPage>}></Route>

					<Route path="/user" element={<UserPage></UserPage>}>
					    <Route index element={<Navigate to="dont-want" replace />}></Route>
                        <Route path="dont-want" element={<UserDontWantPage></UserDontWantPage>}></Route>
                        <Route path="want" element={<UserWantPage></UserWantPage>}></Route>
                        <Route path="goals" element={<UserGoalsPage></UserGoalsPage>}></Route>
                        <Route path="tasks" element={<UserTasksPage></UserTasksPage>}></Route>
                    </Route>

					<Route path="/admin" element={<AdminPage></AdminPage>}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
