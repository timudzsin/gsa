import { useEffect, useState } from "react";

export default function InlineSVG({ src, className }) {
	const [svgContent, setSvgContent] = useState("");

	useEffect(() => {
		fetch(src)
			.then((res) => res.text())
			.then((data) => setSvgContent(data));
	}, [src]);

	return <span className={className} dangerouslySetInnerHTML={{ __html: svgContent }} />;
}
