// src/utils/api.js
const MOCK = true;

export async function fetchDistricts() {
  try {
    if (MOCK) {
      // ✅ Use public folder path for production
      const res = await fetch("/districts.json");
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
      // ✅ Use public folder path for production
      const res = await fetch("/sample-metrics.json");
      if (!res.ok) throw new Error(`Failed to fetch metrics: ${res.status}`);
      const raw = await res.json();

      if (Array.isArray(raw)) {
        const found = raw.find((d) => d.districtId === districtId);
        return found ?? { districtId, metrics: [], last_updated: null };
      }

      if (raw && typeof raw === "object") {
        if (raw.districtId === districtId) return raw;
        return {
          districtId,
          metrics: raw.metrics ?? [],
          last_updated: raw.last_updated ?? null,
        };
      }

      return { districtId, metrics: [], last_updated: null };
    }
  } catch (err) {
    console.error("fetchMetrics error for", districtId, err);
    return { districtId, metrics: [], last_updated: null };
  }
}
