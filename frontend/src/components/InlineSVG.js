import { useEffect, useState } from "react";

export default function InlineSVG({ src, className, onClick }) {
	const [content, setContent] = useState("");

	useEffect(() => {
		fetch(src)
			.then((res) => res.text())
			.then((data) => {
				if (!data.trim().startsWith("<svg")) {
					// csak a fájl neve .svg nélkül
					const fallback = src.split("/").pop().replace(".svg", "");
					setContent(fallback);
				} else {
					setContent(data);
				}
			})
			.catch(() => {
				const fallback = src.split("/").pop().replace(".svg", "");
				setContent(fallback);
			});
	}, [src]);

	return <span className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: content }} />;
}
