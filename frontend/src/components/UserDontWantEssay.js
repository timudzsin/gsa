import React, { useRef, useState, useContext, useEffect } from "react";
import "./UserDontWantEssay.css";
import { UserContext } from "../contexts/UserContext";

export default function UserDontWantEssay() {
	const [formData, setFormData] = useState(""); // Kontrollált komponenshez
	const textareaRef = useRef(null);
	const { getUserDontWantEssay } = useContext(UserContext);

    // A komponens mount-olásakor lekérdezzük a felhasználó dont_want_essay-ét, és beállítjuk a form-ba
	useEffect(() => {
		getUserDontWantEssay().then(data => setFormData(data.dont_want_essay));
	}, []);

	function handleChange(e) {
		setFormData(e.target.value); // Kontrollált komponenshez

		// A form megfelelő magasságának beállítása (reseteljük a magasságot és állítjuk a tartalomhoz)
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
		}
	}

	return (
		<form className="UserDontWantEssay">
			<textarea
				value={formData} // Kontrollált komponenshez
				onChange={handleChange}
				placeholder={
					"\n\n\nMit nem akarok a következő 4 évben?\n\n\nMilyen negatív gondolataim vannak?\n\n\nMi fog történni, ha nem teszem a dolgokat amiket kéne?"
				}
				ref={textareaRef}
				spellCheck={false}
			></textarea>
		</form>
	);
}
