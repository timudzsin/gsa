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
				placeholder={
					"\n\n\nMit nem akarok a következő 4 évben?\n\n\nMilyen negatív gondolataim vannak?\n\n\nMi fog történni, ha nem teszem a dolgokat amiket kéne?"
				}
				ref={textareaRef}
				spellCheck={false}
			></textarea>
		</form>
	);
}
