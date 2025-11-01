import React from "react";
import {
	Users,
	DollarSign,
	Clock,
	Volume2,
	TrendingUp,
	TrendingDown,
} from "lucide-react";

function StatCard({
	title,
	value,
	subtitle,
	onSpeak,
	icon: Icon,
	trend,
	color = "blue",
}) {
	const colorMap = {
		blue: {
			bg: "from-blue-500 to-indigo-600",
			iconBg: "bg-blue-50",
			iconColor: "text-blue-600",
			accent: "bg-blue-600",
		},
		green: {
			bg: "from-green-500 to-emerald-600",
			iconBg: "bg-green-50",
			iconColor: "text-green-600",
			accent: "bg-green-600",
		},
		orange: {
			bg: "from-orange-500 to-amber-600",
			iconBg: "bg-orange-50",
			iconColor: "text-orange-600",
			accent: "bg-orange-600",
		},
	};

	const colors = colorMap[color] || colorMap.blue;

	return (
		<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex-1 min-w-[200px] hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
			{/* Header with Icon and Speak Button */}
			<div className="flex items-start justify-between mb-4">
				<div
					className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
				>
					<Icon className={colors.iconColor} size={24} />
				</div>
				<button
					onClick={onSpeak}
					className={`flex items-center gap-1.5 px-3 py-1.5 ${colors.iconBg} ${colors.iconColor} text-xs font-medium rounded-lg hover:shadow-md transition-all duration-200 hover:scale-105`}
					aria-label={`Speak ${title}`}
				>
					<Volume2 size={14} />
					<span>Hear</span>
				</button>
			</div>

			{/* Title */}
			<div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
				{title}
			</div>

			{/* Value with Trend */}
			<div className="flex items-end justify-between mb-3">
				<div className="text-3xl font-bold text-gray-900">{value}</div>
				{trend && (
					<div
						className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
							trend.isPositive ? "bg-green-50" : "bg-red-50"
						}`}
					>
						{trend.isPositive ? (
							<TrendingUp className="text-green-600" size={14} />
						) : (
							<TrendingDown className="text-red-600" size={14} />
						)}
						<span
							className={`text-xs font-bold ${
								trend.isPositive ? "text-green-600" : "text-red-600"
							}`}
						>
							{trend.percentage}%
						</span>
					</div>
				)}
			</div>

			{/* Subtitle */}
			{subtitle && (
				<div className="text-xs text-gray-500 flex items-center gap-2">
					<div className={`w-1 h-1 rounded-full ${colors.accent}`}></div>
					{subtitle}
				</div>
			)}

			{/* Bottom Accent Bar */}
			<div className="mt-4 pt-4 border-t border-gray-100">
				<div
					className={`h-1 rounded-full bg-gradient-to-r ${colors.bg} w-full opacity-50 group-hover:opacity-100 transition-opacity`}
				></div>
			</div>
		</div>
	);
}

export default function Tiles({ metrics, onSpeak }) {
	if (!metrics || metrics.length === 0) {
		return (
			<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
				<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
					<Users className="text-gray-400" size={32} />
				</div>
				<p className="text-sm font-medium text-gray-500">
					Select a district to see stats
				</p>
			</div>
		);
	}

	const latest = metrics[metrics.length - 1];
	const previous = metrics.length > 1 ? metrics[metrics.length - 2] : null;

	// Calculate trends if previous data exists
	const calculateTrend = (current, prev, key) => {
		if (!prev) return null;
		const change = current[key] - prev[key];
		const percentage =
			prev[key] !== 0 ? ((change / prev[key]) * 100).toFixed(1) : 0;
		return {
			isPositive: change >= 0,
			percentage: Math.abs(percentage),
		};
	};

	const personDaysTrend = calculateTrend(latest, previous, "person_days");
	const wagesPaidTrend = calculateTrend(latest, previous, "wages_paid");
	const pendingTrend = calculateTrend(latest, previous, "pending");

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<StatCard
				icon={Users}
				title="Person-days"
				value={latest.person_days.toLocaleString("en-IN")}
				subtitle={`Month: ${latest.month}/${latest.year}`}
				onSpeak={() =>
					onSpeak(`This month, person days are ${latest.person_days}`)
				}
				trend={personDaysTrend}
				color="blue"
			/>
			<StatCard
				icon={DollarSign}
				title="Wages paid"
				value={`₹ ${latest.wages_paid.toLocaleString("en-IN")}`}
				subtitle="Amount disbursed to workers"
				onSpeak={() => onSpeak(`Wages paid ${latest.wages_paid} rupees`)}
				trend={wagesPaidTrend}
				color="green"
			/>
			<StatCard
				icon={Clock}
				title="Pending wages"
				value={`₹ ${latest.pending.toLocaleString("en-IN")}`}
				subtitle="Amount pending"
				onSpeak={() => onSpeak(`Pending wages ${latest.pending} rupees`)}
				trend={pendingTrend}
				color="orange"
			/>
		</div>
	);
}
