import React, { useRef } from "react";
import "./UserDontWantEssay.css";

export default function UserDontWantEssay() {
	const textareaRef = useRef(null);

	function handleChange(e) {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto"; // reseteljük a magasságot
			textarea.style.height = textarea.scrollHeight + "px"; // állítsuk a tartalomhoz
		}
	}

	return (
		<form className="UserDontWantEssay">
			<textarea
				onChange={handleChange}
				placeholder="Mit nem akarok?"
				ref={textareaRef}
				spellCheck={false}
			></textarea>
		</form>
	);
}
