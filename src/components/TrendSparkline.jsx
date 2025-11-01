import React from "react";
import {
	LineChart,
	Line,
	ResponsiveContainer,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Area,
	AreaChart,
} from "recharts";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const monthNamesShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
				<p className="text-xs font-semibold text-gray-800 mb-1">{label}</p>
				<p className="text-sm font-bold text-blue-600">
					{new Intl.NumberFormat("en-IN").format(payload[0].value)}
				</p>
			</div>
		);
	}
	return null;
};

export default function TrendSparkline({
	metrics = [],
	metricKey = "person_days",
	title,
}) {
	if (!metrics || metrics.length === 0) {
		return (
			<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
						<Activity className="text-gray-400" size={20} />
					</div>
					<div className="text-sm font-medium text-gray-700">
						No data available
					</div>
				</div>
			</div>
		);
	}

	const labelMap = {
		person_days: "Person-days",
		wages_paid: "Wages paid",
		pending: "Pending wages",
	};

	const chartTitle =
		title ?? `${labelMap[metricKey] ?? metricKey} (last months)`;

	const data = metrics.map((m) => {
		const monthIdx =
			typeof m.month === "number" && m.month >= 1 && m.month <= 12
				? m.month
				: null;
		const name = monthIdx
			? monthNamesShort[monthIdx - 1]
			: m.monthName ?? `M${m.month ?? ""}`;
		const value = Number(m[metricKey] ?? 0);
		return { name, value, raw: m };
	});

	// Calculate trend
	const firstValue = data[0]?.value || 0;
	const lastValue = data[data.length - 1]?.value || 0;
	const trend = lastValue - firstValue;
	const trendPercentage =
		firstValue !== 0 ? ((trend / firstValue) * 100).toFixed(1) : 0;
	const isPositive = trend >= 0;

	// Calculate stats
	const values = data.map((d) => d.value);
	const maxValue = Math.max(...values);
	const minValue = Math.min(...values);
	const avgValue = values.reduce((sum, val) => sum + val, 0) / values.length;

	return (
		<div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
			{/* Header */}
			<div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 border-b border-gray-200">
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
							<Activity className="text-white" size={16} />
						</div>
						<h3 className="text-sm font-bold text-gray-900">{chartTitle}</h3>
					</div>
				</div>

				{/* Trend Indicator */}
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						{isPositive ? (
							<TrendingUp className="text-green-600" size={20} />
						) : (
							<TrendingDown className="text-red-600" size={20} />
						)}
						<span
							className={`text-sm font-bold ${
								isPositive ? "text-green-600" : "text-red-600"
							}`}
						>
							{isPositive ? "+" : ""}
							{trendPercentage}%
						</span>
					</div>
					<div className="text-xs text-gray-500">vs first month</div>
				</div>
			</div>

			{/* Stats Bar */}
			<div className="grid grid-cols-3 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-200">
				<div>
					<p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
						Min
					</p>
					<p className="text-xs font-bold text-gray-900">
						{new Intl.NumberFormat("en-IN", { notation: "compact" }).format(
							minValue
						)}
					</p>
				</div>
				<div className="border-l border-r border-gray-300 pl-3">
					<p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
						Avg
					</p>
					<p className="text-xs font-bold text-gray-900">
						{new Intl.NumberFormat("en-IN", { notation: "compact" }).format(
							avgValue
						)}
					</p>
				</div>
				<div className="pl-3">
					<p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
						Max
					</p>
					<p className="text-xs font-bold text-gray-900">
						{new Intl.NumberFormat("en-IN", { notation: "compact" }).format(
							maxValue
						)}
					</p>
				</div>
			</div>

			{/* Chart */}
			<div className="p-5">
				<div className="w-full h-48">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={data}>
							<defs>
								<linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
									<stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
							<XAxis
								dataKey="name"
								tick={{ fontSize: 11, fill: "#6b7280" }}
								axisLine={{ stroke: "#d1d5db" }}
							/>
							<YAxis
								tickFormatter={(v) =>
									Math.abs(v) >= 1000 ? `${(v / 1000).toFixed(1)}k` : v
								}
								tick={{ fontSize: 11, fill: "#6b7280" }}
								axisLine={{ stroke: "#d1d5db" }}
								width={45}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Area
								type="monotone"
								dataKey="value"
								stroke="#0ea5e9"
								strokeWidth={3}
								fill="url(#colorValue)"
								animationDuration={1000}
							/>
							<Line
								type="monotone"
								dataKey="value"
								stroke="#0ea5e9"
								strokeWidth={3}
								dot={{ r: 4, fill: "#0ea5e9", strokeWidth: 2, stroke: "#fff" }}
								activeDot={{
									r: 6,
									fill: "#0ea5e9",
									strokeWidth: 2,
									stroke: "#fff",
								}}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Footer */}
			<div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
				<div className="flex items-center justify-between">
					<p className="text-xs text-gray-500">
						Latest:{" "}
						<span className="font-bold text-gray-900">
							{new Intl.NumberFormat("en-IN").format(lastValue)}
						</span>
					</p>
					<p className="text-xs text-gray-500">
						{data.length} month{data.length !== 1 ? "s" : ""}
					</p>
				</div>
			</div>
		</div>
	);
}
