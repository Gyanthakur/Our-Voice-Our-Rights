import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDistricts, fetchMetrics } from "../utils/api";
import { ArrowRight, TrendingUp, Users, DollarSign, Clock } from "lucide-react";

// TrendSparkline Component
const TrendSparkline = ({ metrics, metricKey = "person_days", title }) => {
	if (!metrics || metrics.length === 0) {
		return (
			<div className="bg-white rounded-xl shadow-md p-4 border border-gray-100 mt-4">
				<div className="text-sm font-medium text-gray-700">No data</div>
			</div>
		);
	}

	const values = metrics.map((d) => d[metricKey]);
	const max = Math.max(...values);
	const min = Math.min(...values);
	const range = max - min || 1;

	const points = values
		.map((val, i) => {
			const x = (i / (values.length - 1)) * 100;
			const y = 100 - ((val - min) / range) * 100;
			return `${x},${y}`;
		})
		.join(" ");

	return (
		<div className="mt-4">
			{title && (
				<h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
			)}
			<svg viewBox="0 0 100 40" className="w-full h-20">
				<polyline
					points={points}
					fill="none"
					stroke="#0ea5e9"
					strokeWidth="2"
				/>
			</svg>
			<div className="text-lg font-bold text-gray-800 mt-2">
				{metricKey === "person_days"
					? values[values.length - 1]?.toLocaleString("en-IN")
					: `₹ ${values[values.length - 1]?.toLocaleString("en-IN")}`}
			</div>
		</div>
	);
};

// ComparisonMetric Component
const ComparisonMetric = ({
	icon: Icon,
	label,
	value1,
	value2,
	formatter = (v) => v,
}) => {
	const diff =
		value1 && value2 ? (((value1 - value2) / value2) * 100).toFixed(1) : null;
	const isHigher = diff > 0;

	return (
		<div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
			<div className="flex items-center gap-2 mb-3">
				<div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
					<Icon className="text-blue-600" size={18} />
				</div>
				<span className="text-sm font-medium text-gray-700">{label}</span>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<div className="text-xs text-gray-500 mb-1">District 1</div>
					<div className="text-lg font-bold text-gray-900">
						{value1 ? formatter(value1) : "—"}
					</div>
				</div>
				<div>
					<div className="text-xs text-gray-500 mb-1">District 2</div>
					<div className="text-lg font-bold text-gray-900">
						{value2 ? formatter(value2) : "—"}
					</div>
				</div>
			</div>
			{diff && (
				<div
					className={`mt-2 text-xs font-medium ${
						isHigher ? "text-green-600" : "text-red-600"
					}`}
				>
					{isHigher ? "↑" : "↓"} {Math.abs(diff)}% difference
				</div>
			)}
		</div>
	);
};

export default function Compare() {
	const { data: districts } = useQuery({
		queryKey: ["districts"],
		queryFn: fetchDistricts,
		staleTime: 1000 * 60 * 10,
	});

	const [d1, setD1] = useState("");
	const [d2, setD2] = useState("");

	const { data: m1 } = useQuery({
		queryKey: ["metrics", d1],
		queryFn: () => fetchMetrics(d1),
		enabled: !!d1,
	});
	const { data: m2 } = useQuery({
		queryKey: ["metrics", d2],
		queryFn: () => fetchMetrics(d2),
		enabled: !!d2,
	});

	const latest1 = m1?.metrics?.[m1.metrics.length - 1];
	const latest2 = m2?.metrics?.[m2.metrics.length - 1];

	const districtName1 =
		districts?.find((x) => x.id === d1)?.name || "District 1";
	const districtName2 =
		districts?.find((x) => x.id === d2)?.name || "District 2";

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
			{/* Header */}
			<div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-8 mb-6 rounded-b-3xl shadow-xl">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-3xl font-bold mb-2">District Comparison</h1>
					<p className="text-purple-100 text-sm">
						Compare MGNREGA performance across districts
					</p>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 pb-8">
				{/* Selection Card */}
				<div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
					<div className="flex items-center gap-3 mb-4">
						<TrendingUp className="text-purple-600" size={24} />
						<h3 className="text-lg font-semibold text-gray-800">
							Select districts to compare
						</h3>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
						<div className="relative">
							<label className="block text-xs font-medium text-gray-600 mb-2">
								District 1
							</label>
							<select
								value={d1}
								onChange={(e) => setD1(e.target.value)}
								className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors bg-white text-gray-800"
							>
								<option value="">Choose first district</option>
								{districts?.map((x) => (
									<option key={x.id} value={x.id}>
										{x.name}
									</option>
								))}
							</select>
						</div>

						<div className="flex justify-center items-center">
							<div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
								<ArrowRight className="text-white" size={20} />
							</div>
						</div>

						<div className="relative">
							<label className="block text-xs font-medium text-gray-600 mb-2">
								District 2
							</label>
							<select
								value={d2}
								onChange={(e) => setD2(e.target.value)}
								className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-colors bg-white text-gray-800"
							>
								<option value="">Choose second district</option>
								{districts?.map((x) => (
									<option key={x.id} value={x.id}>
										{x.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				{/* Comparison Content */}
				{d1 && d2 ? (
					<>
						{/* District Headers */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-xl p-6 text-white">
								<div className="flex items-center gap-3 mb-2">
									<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
										<span className="text-2xl">📍</span>
									</div>
									<div>
										<div className="text-xs text-purple-100">District 1</div>
										<h2 className="text-xl font-bold">{districtName1}</h2>
									</div>
								</div>
							</div>

							<div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl shadow-xl p-6 text-white">
								<div className="flex items-center gap-3 mb-2">
									<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
										<span className="text-2xl">📍</span>
									</div>
									<div>
										<div className="text-xs text-pink-100">District 2</div>
										<h2 className="text-xl font-bold">{districtName2}</h2>
									</div>
								</div>
							</div>
						</div>

						{/* Metrics Comparison */}
						{latest1 && latest2 && (
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
								<ComparisonMetric
									icon={Users}
									label="Person-days"
									value1={latest1.person_days}
									value2={latest2.person_days}
									formatter={(v) => v.toLocaleString("en-IN")}
								/>
								<ComparisonMetric
									icon={DollarSign}
									label="Wages paid"
									value1={latest1.wages_paid}
									value2={latest2.wages_paid}
									formatter={(v) => `₹ ${v.toLocaleString("en-IN")}`}
								/>
								<ComparisonMetric
									icon={Clock}
									label="Pending wages"
									value1={latest1.pending}
									value2={latest2.pending}
									formatter={(v) => `₹ ${v.toLocaleString("en-IN")}`}
								/>
							</div>
						)}

						{/* Trend Charts */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
								<div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
									<h4 className="text-sm font-semibold text-white">
										{districtName1}
									</h4>
									<div className="text-2xl font-bold text-white mt-2">
										{latest1
											? latest1.person_days.toLocaleString("en-IN")
											: "—"}
									</div>
									<div className="text-xs text-purple-100 mt-1">
										Person-days (latest month)
									</div>
								</div>
								<div className="p-4">
									<TrendSparkline
										metrics={m1?.metrics}
										metricKey="person_days"
									/>
								</div>
							</div>

							<div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
								<div className="bg-gradient-to-r from-pink-500 to-pink-600 p-4">
									<h4 className="text-sm font-semibold text-white">
										{districtName2}
									</h4>
									<div className="text-2xl font-bold text-white mt-2">
										{latest2
											? latest2.person_days.toLocaleString("en-IN")
											: "—"}
									</div>
									<div className="text-xs text-pink-100 mt-1">
										Person-days (latest month)
									</div>
								</div>
								<div className="p-4">
									<TrendSparkline
										metrics={m2?.metrics}
										metricKey="person_days"
									/>
								</div>
							</div>
						</div>

						{/* Additional Metrics Charts */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
							{/* Wages Paid Comparison */}
							<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
								<h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
									<DollarSign className="text-green-600" size={18} />
									Wages Paid Trend
								</h3>
								<div className="space-y-4">
									<div>
										<div className="text-xs text-purple-600 font-medium mb-2">
											{districtName1}
										</div>
										<TrendSparkline
											metrics={m1?.metrics}
											metricKey="wages_paid"
										/>
									</div>
									<div className="border-t pt-4">
										<div className="text-xs text-pink-600 font-medium mb-2">
											{districtName2}
										</div>
										<TrendSparkline
											metrics={m2?.metrics}
											metricKey="wages_paid"
										/>
									</div>
								</div>
							</div>

							{/* Pending Wages Comparison */}
							<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
								<h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
									<Clock className="text-orange-600" size={18} />
									Pending Wages Trend
								</h3>
								<div className="space-y-4">
									<div>
										<div className="text-xs text-purple-600 font-medium mb-2">
											{districtName1}
										</div>
										<TrendSparkline metrics={m1?.metrics} metricKey="pending" />
									</div>
									<div className="border-t pt-4">
										<div className="text-xs text-pink-600 font-medium mb-2">
											{districtName2}
										</div>
										<TrendSparkline metrics={m2?.metrics} metricKey="pending" />
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
						<div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<TrendingUp className="text-purple-600" size={40} />
						</div>
						<h2 className="text-2xl font-bold text-gray-800 mb-3">
							Start Comparing
						</h2>
						<p className="text-gray-600 max-w-md mx-auto">
							Select two districts from the dropdowns above to compare their
							MGNREGA performance metrics
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
