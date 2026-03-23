import React from "react";
import UserDontWantEssay from "../components/UserDontWantEssay";
import "./UserDontWantPage.css";

export default function UserDontWantPage() {
	return <div className="UserDontWantPage">
        <h1>Mit nem akarok?</h1>
        <UserDontWantEssay></UserDontWantEssay>
    </div>;
}
