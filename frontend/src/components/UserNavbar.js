import React from "react";
import { Link } from "react-router-dom";
import "./UserNavbar.css";

export default function UserNavbar() {
	return (
		<div className="UserNavbar">
			<Link to="/user/dont-want"><img src="/images/stick.png"></img>Don't&nbsp;want</Link>
			<Link to="/user/want"><img src="/images/cookie.png"></img>Want</Link>
			<Link to="/user/goals"><img src="/images/flag.png"></img>Goals</Link>
			<Link to="/user/tasks"><img src="/images/check.png"></img>Tasks</Link>
		</div>
	);
}
