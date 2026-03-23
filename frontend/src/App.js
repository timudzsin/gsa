import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import UserDontWantPage from "./pages/UserDontWantPage";
import UserWantPage from "./pages/UserWantPage";
import UserGoalsPage from "./pages/UserGoalsPage";
import UserTasksPage from "./pages/UserTasksPage";
import { UserProvider } from "./contexts/UserContext";
import { AnimatePresence, motion } from "framer-motion";

// ez mit csinál?
function PageWrapper({ children }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.03 }}
		>
			{children}
		</motion.div>
	);
}

// ez mit csinál?
function AnimatedRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<Navigate to="/register" replace />} />

				<Route
					path="/register"
					element={
						<PageWrapper>
							<RegisterPage />
						</PageWrapper>
					}
				/>
				<Route
					path="/login"
					element={
						<PageWrapper>
							<LoginPage />
						</PageWrapper>
					}
				/>

				<Route
					path="/user"
					element={
						<UserProvider>
							<PageWrapper>
								<UserPage />
							</PageWrapper>
						</UserProvider>
					}
				>
					<Route index element={<Navigate to="dont-want" replace />} />
					<Route
						path="dont-want"
						element={
							<PageWrapper>
								<UserDontWantPage />
							</PageWrapper>
						}
					/>
					<Route
						path="want"
						element={
							<PageWrapper>
								<UserWantPage />
							</PageWrapper>
						}
					/>
					<Route
						path="goals"
						element={
							<PageWrapper>
								<UserGoalsPage />
							</PageWrapper>
						}
					/>
					<Route
						path="tasks"
						element={
							<PageWrapper>
								<UserTasksPage />
							</PageWrapper>
						}
					/>
				</Route>

				<Route
					path="/admin"
					element={
						<PageWrapper>
							<AdminPage />
						</PageWrapper>
					}
				/>
			</Routes>
		</AnimatePresence>
	);
}

function App() {
	return (
		<BrowserRouter>
			<AnimatedRoutes />
		</BrowserRouter>
	);
}

export default App;
