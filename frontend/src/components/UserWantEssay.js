import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import "./UserWantEssay.css";

export default function UserWantEssay() {
	const { loading } = useContext(UserContext);
	const { userWantEssay, setUserWantEssay, putUserWantEssay } = useContext(UserContext);
	const debounceTimeout = useRef(null);
	const textareaRef = useRef(null);

	useEffect(() => {
		// A form megfelelő magasságának beállítása (reseteljük a magasságot és állítjuk a tartalomhoz)
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
		}
	}, [userWantEssay]);

	function handleChange(e) {
		setUserWantEssay(e.target.value);

		// Postolás 3 másodperc no-activity után
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}
		debounceTimeout.current = setTimeout(() => {
			putUserWantEssay(e.target.value);
		}, 3000);
	}

	if (loading) return <div></div>;
	return (
		<form className="UserWantEssay">
			<textarea
				value={userWantEssay || ""}
				onChange={handleChange}
				placeholder={
					"\n\nMit akarok a következő 4 évben?\n\n\nMi az, aminek a gondolata igazán motivál engem?\n\n\nHa a legtöbbet hoznám ki az életből, az hogyan nézne ki?"
				}
				ref={textareaRef}
				spellCheck={false}
			></textarea>
		</form>
	);
}
