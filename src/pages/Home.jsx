import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDistricts, fetchMetrics } from "../utils/api";
import DistrictSelect from "../components/DistrictSelect";
import Tiles from "../components/Tiles";
import TrendSparkline from "../components/TrendSparkline";
import Chart from "../components/Chart";
import { speak } from "../utils/speech";
import useGeolocation from "../hooks/useGeolocation";

const METRIC_OPTIONS = [
	{ key: "person_days", label: "Person-days" },
	{ key: "wages_paid", label: "Wages paid" },
	{ key: "pending", label: "Pending wages" },
];

export default function Home() {
	const [selected, setSelected] = useState(null);
	const [metricKey, setMetricKey] = useState("person_days");

	// districts list
	const { data: districts } = useQuery({
		queryKey: ["districts"],
		queryFn: fetchDistricts,
		staleTime: 1000 * 60 * 10,
	});

	// metrics for selected district
	const { data: metricsData, isFetching } = useQuery({
		queryKey: ["metrics", selected],
		queryFn: () => fetchMetrics(selected),
		enabled: !!selected,
		staleTime: 1000 * 60 * 10,
	});

	const metrics = metricsData?.metrics || [];
	const geo = useGeolocation();

	useEffect(() => {
		// when district changes, speak a short summary automatically (optional)
		if (metrics && metrics.length > 0) {
			const latest = metrics[metrics.length - 1];
			// speak basic summary in chosen language
			// keep it short for demo
			speak(
				`Latest person days ${latest.person_days}. Wages paid ${latest.wages_paid} rupees. Pending ${latest.pending} rupees.`
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [metricsData]);

	function autoDetect() {
		geo.getCurrentPosition();
		const check = setInterval(() => {
			if (!geo.loading && geo.position && districts) {
				const { lat, lng } = geo.position;
				let nearest = null;
				let minD = Infinity;
				districts.forEach((d) => {
					const dx = d.centroid.lat - lat;
					const dy = d.centroid.lng - lng;
					const dist = dx * dx + dy * dy;
					if (dist < minD) {
						minD = dist;
						nearest = d;
					}
				});
				if (nearest) setSelected(nearest.id);
				clearInterval(check);
			}
		}, 400);
		setTimeout(() => clearInterval(check), 10000);
	}

	return (
		<div>
			<div className="mb-4">
				<DistrictSelect
					districts={districts || []}
					value={selected}
					onChange={setSelected}
				/>
				<div className="flex gap-2 mt-2">
					<button
						onClick={autoDetect}
						className="px-4 py-2 bg-green-600 text-white rounded-md text-sm shadow-sm"
					>
						Auto-detect district
					</button>
					<button
						onClick={() => speak("Select a district to hear summary")}
						className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm shadow-sm"
					>
						Hear summary
					</button>
				</div>
			</div>

			{isFetching && (
				<div className="bg-white rounded-lg shadow p-4 text-gray-600 mb-4">
					Loading latest data…
				</div>
			)}

			{/* Empty state when no district selected */}
			{!selected ? (
				<div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
					<p className="mb-3">Please select a district to view performance.</p>
					<div className="flex items-center justify-center gap-3">
						<button
							onClick={autoDetect}
							className="px-4 py-2 bg-green-600 text-white rounded-md text-sm"
						>
							Auto-detect
						</button>
						<button
							onClick={() => setSelected(districts?.[0]?.id)}
							className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
						>
							Use example district
						</button>
					</div>
				</div>
			) : (
				<>
					<Tiles metrics={metrics} onSpeak={(t) => speak(t)} />

					<div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
						<div className="lg:col-span-2">
							{/* Metric selector */}
							<div className="flex items-center gap-2 mb-3">
								{METRIC_OPTIONS.map((opt) => (
									<button
										key={opt.key}
										onClick={() => setMetricKey(opt.key)}
										className={`px-3 py-2 rounded-md text-sm font-medium ${
											metricKey === opt.key
												? "bg-blue-600 text-white"
												: "bg-white border text-gray-700"
										}`}
									>
										{opt.label}
									</button>
								))}
							</div>

							{/* Chart for selected metric */}
							<Chart
								data={metrics}
								metricKey={metricKey}
								title={`${
									METRIC_OPTIONS.find((m) => m.key === metricKey)?.label
								} (monthly)`}
							/>
						</div>

						{/* Trend sparkline in side panel */}
						<div>
							{/* <TrendSparkline metrics={metrics} /> */}
							<TrendSparkline
								metrics={metrics}
								metricKey="wages_paid"
								title="Wages disbursed (monthly)"
							/>
							<div className="mt-4 bg-white rounded-lg shadow p-4">
								<h3 className="text-sm font-medium text-gray-700">Data info</h3>
								<p className="text-xs text-gray-500 mt-2">
									Last updated:{" "}
									{metricsData?.last_updated
										? new Date(metricsData.last_updated).toLocaleString()
										: "—"}
								</p>
								<p className="text-xs text-gray-500 mt-2">
									District:{" "}
									{districts?.find((d) => d.id === selected)?.name ?? selected}
								</p>
							</div>
						</div>
					</div>

					<div className="mt-6 bg-white rounded-lg shadow p-4">
						<h2 className="text-sm font-medium text-gray-700">About</h2>
						<p className="mt-2 text-sm text-gray-500">
							This is a frontend demo. Data shown is sample/mock data. For
							production, connect to a server that caches the data.gov.in API.
						</p>
					</div>
				</>
			)}
		</div>
	);
}
