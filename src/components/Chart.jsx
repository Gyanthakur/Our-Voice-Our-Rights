

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";


const monthNamesShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4">
        <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <p className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">
              {new Intl.NumberFormat("en-IN").format(payload[0].value)}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const Chart = ({ data, metricKey = "person_days", title = "" }) => {
  // Accept either data.metrics or a direct array
  const metrics = Array.isArray(data) ? data : data?.metrics ?? [];

  // If no metrics, show friendly message
  if (!metrics || metrics.length === 0) {
    return (
      <div className="w-full h-80 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center text-gray-500 p-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <TrendingUp className="text-gray-400" size={32} />
        </div>
        <p className="text-sm font-medium">No data to show</p>
        <p className="text-xs text-gray-400 mt-1">Select a district to view chart</p>
      </div>
    );
  }

  // Map metrics into Recharts friendly shape: { name: 'Mar', value: 1234 }
  const chartData = metrics.map((m) => {
    // month may be number or string; handle both
    const monthIdx = typeof m.month === "number" ? Math.max(1, Math.min(12, m.month)) : null;
    const name = monthIdx ? monthNamesShort[monthIdx - 1] : (m.monthName ?? m.name ?? `M${m.month ?? ""}`);
    const value = Number(m[metricKey] ?? m.value ?? 0);
    return { name, value, raw: m };
  });

  // Calculate stats for display
  const values = chartData.map(d => d.value);
  const total = values.reduce((sum, val) => sum + val, 0);
  const average = total / values.length;
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  // Map metric keys to display labels
  const metricLabels = {
    person_days: 'Person-days',
    wages_paid: 'Wages Paid',
    pending: 'Pending Wages'
  };

  const displayLabel = metricLabels[metricKey] || metricKey;

  // Ensure parent container has explicit height so ResponsiveContainer can compute size
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header Section */}
      {title && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{title}</h3>
                <p className="text-xs text-gray-500">Monthly performance trend</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Average</p>
          <p className="text-sm font-bold text-gray-900">
            {new Intl.NumberFormat("en-IN", { notation: 'compact', compactDisplay: 'short' }).format(average)}
          </p>
        </div>
        <div className="text-center border-l border-r border-gray-300">
          <p className="text-xs text-gray-500 mb-1">Highest</p>
          <p className="text-sm font-bold text-green-600">
            {new Intl.NumberFormat("en-IN", { notation: 'compact', compactDisplay: 'short' }).format(maxValue)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-1">Lowest</p>
          <p className="text-sm font-bold text-orange-600">
            {new Intl.NumberFormat("en-IN", { notation: 'compact', compactDisplay: 'short' }).format(minValue)}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
              />
              <YAxis 
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={() => displayLabel}
                iconType="circle"
              />
              <Bar 
                dataKey="value" 
                fill="url(#colorBar)" 
                name={displayLabel}
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Showing data for {chartData.length} month{chartData.length !== 1 ? 's' : ''} • 
          Total: <span className="font-semibold text-gray-700">
            {new Intl.NumberFormat("en-IN").format(total)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Chart;