import React, { useRef, useState, useContext, useEffect } from "react";
import "./UserDontWantEssay.css";
import { UserContext } from "../contexts/UserContext";

export default function UserDontWantEssay() {
	const { userDontWantEssay, setUserDontWantEssay, postUserDontWantEssay } = useContext(UserContext);
    const debounceTimeout = useRef(null);
	const textareaRef = useRef(null);

	function handleChange(e) {
		setUserDontWantEssay(e.target.value);

		// Postolás 3 másodperc no-activity után
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}
		debounceTimeout.current = setTimeout(() => {
			postUserDontWantEssay(e.target.value);
		}, 3000);

		// A form megfelelő magasságának beállítása (reseteljük a magasságot és állítjuk a tartalomhoz)
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
		}
	}

	return (
		<form className="UserDontWantEssay">
			<textarea
				value={userDontWantEssay}
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
