import RegisterForm from "../components/RegisterForm";
import "./RegisterPage.css";

export default function RegisterPage() {
	// ezen még dolgozni kell:
	// /me végpontot használva.
	// ha 200 jön, navigálj /user-re; ha 401/419, töröld a token-t és maradjon a regisztrációnál.
	// ezt a logikát lehet, hogy érdemes az App.js-be rakni
	/* 	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		// Ha van token, átirányítás a /user oldalra
		if (token) {
			console.log("be van már jelentkezve a felhasználó, átiránítás a /user oldalra");
			navigate("/user", { replace: true });
		}
	}, []); // csak egyszer, a komponens mountolásakor lefut
 */
	return (
		<div className="RegisterPage">
			<RegisterForm></RegisterForm>
		</div>
	);
}
