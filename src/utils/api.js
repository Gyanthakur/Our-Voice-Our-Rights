const MOCK = true;

export async function fetchDistricts() {
	try {
		if (MOCK) {
			const res = await fetch("/src/assets/data/districts.json");
			if (!res.ok) throw new Error(`Failed to fetch districts: ${res.status}`);
			return await res.json();
		}
	} catch (err) {
		console.error("fetchDistricts error:", err);
		return []; // safe fallback
	}
}

export async function fetchMetrics(districtId) {
	try {
		if (!districtId) {
			return { districtId: null, metrics: [], last_updated: null };
		}

		if (MOCK) {
			const res = await fetch("/src/assets/data/sample-metrics.json");
			if (!res.ok) throw new Error(`Failed to fetch metrics: ${res.status}`);
			const raw = await res.json();

			if (Array.isArray(raw)) {
				const found = raw.find((d) => d.districtId === districtId);
				if (found) return found;
				// not found => return empty well-formed object
				return { districtId, metrics: [], last_updated: null };
			}

			// If file is a single object
			if (raw && typeof raw === "object") {
				// If it already carries a districtId
				if (raw.districtId && raw.districtId === districtId) return raw;

				// Otherwise, return object but ensure metrics is present (use raw.metrics if present)
				return {
					districtId,
					metrics: raw.metrics ?? [],
					last_updated: raw.last_updated ?? null,
				};
			}

			// fallback
			return { districtId, metrics: [], last_updated: null };
		}
	} catch (err) {
		console.error("fetchMetrics error for", districtId, err);
		return { districtId, metrics: [], last_updated: null };
	}
}
