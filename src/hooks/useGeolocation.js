import { useState, useEffect } from "react";

export default function useGeolocation() {
	const [position, setPosition] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!("geolocation" in navigator)) {
			setError("Geolocation not supported");
			return;
		}
	}, []);

	function getCurrentPosition() {
		setLoading(true);
		setError(null);
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
				setLoading(false);
			},
			(err) => {
				setError(err.message);
				setLoading(false);
			},
			{ enableHighAccuracy: false, timeout: 10000 }
		);
	}

	return { position, loading, error, getCurrentPosition };
}
