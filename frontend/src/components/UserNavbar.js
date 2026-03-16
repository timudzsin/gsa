import React from "react";
import { Link } from "react-router-dom";
import "./UserNavbar.css";

export default function UserNavbar() {
	return (
		<div className="UserNavbar">
			<Link to="/user/dont-want"><img src="/images/about.png"></img>Dont&nbsp;want</Link>
			<Link to="/user/want"><img src="/images/watch.png"></img>Want</Link>
			<Link to="/user/goals"><img src="/images/cart.png"></img>Goals</Link>
			<Link to="/user/tasks"><img src="/images/account.png"></img>Tasks</Link>
		</div>
	);
}
