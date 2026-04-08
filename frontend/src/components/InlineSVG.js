import { useEffect, useRef, useState } from "react";

export default function InlineSVG({ src, className, onClick }) {
	const [content, setContent] = useState("");
	const [visible, setVisible] = useState(false);
	const ref = useRef();

	// Saját lazy load (Intersection Observer)
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.05 },
		);

		if (ref.current) observer.observe(ref.current);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!visible) return;

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
	}, [visible, src]);

	return <span ref={ref} className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: content }} />;
}
