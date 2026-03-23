import React from "react";
import "./UserWantPage.css";
import UserWantEssay from "../components/UserWantEssay";

export default function UserWantPage() {
	return (
		<div className="UserWantPage">
			<h1>Mit akarok?</h1>
            <UserWantEssay></UserWantEssay>
		</div>
	);
}
