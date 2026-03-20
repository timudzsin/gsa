import React, { useRef, useState } from "react";
import "./UserDontWantEssay.css";

export default function UserDontWantEssay() {
	const [essay, setEssay] = useState("");
	const textareaRef = useRef(null);

	function handleChange(e) {
		setEssay(e.target.value);

		// A form megfelelő magasságának beállítása
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto"; // reseteljük a magasságot
			textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // állítsuk a tartalomhoz
		}
	}

	return (
		<form className="UserDontWantEssay">
			<textarea
				value={essay}
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
