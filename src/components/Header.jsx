import React, { useState } from "react";
import {
	Menu,
	X,
	HelpCircle,
	Info,
	Home,
	BarChart3,
	Sparkles,
} from "lucide-react";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [showAbout, setShowAbout] = useState(false);
	const [showHelp, setShowHelp] = useState(false);

	return (
		<>
			<header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between py-4">
						{/* Logo Section */}
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
								G
							</div>
							<div>
								<h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
									GramInsight
									<span className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] font-semibold rounded-full">
										BETA
									</span>
								</h1>
								<p className="text-xs text-gray-500 flex items-center gap-1">
									<Sparkles size={12} className="text-blue-500" />
									MGNREGA district performance — simple & local
								</p>
							</div>
						</div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center gap-2">
							<button
								onClick={() => setShowHelp(true)}
								className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
							>
								<HelpCircle size={16} />
								Help
							</button>
							<button
								onClick={() => setShowAbout(true)}
								className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
							>
								<Info size={16} />
								About
							</button>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
						>
							{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>

					{/* Mobile Menu */}
					{mobileMenuOpen && (
						<div className="md:hidden py-4 border-t border-gray-200 space-y-2">
							<button
								onClick={() => {
									setShowHelp(true);
									setMobileMenuOpen(false);
								}}
								className="w-full flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
							>
								<HelpCircle size={16} />
								Help
							</button>
							<button
								onClick={() => {
									setShowAbout(true);
									setMobileMenuOpen(false);
								}}
								className="w-full flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:border-gray-300 hover:bg-gray-50 transition-colors"
							>
								<Info size={16} />
								About
							</button>
						</div>
					)}
				</div>
			</header>

			{/* About Modal */}
			{showAbout && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					onClick={() => setShowAbout(false)}
				>
					<div
						className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-2xl">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
										<Info size={24} />
									</div>
									<h2 className="text-2xl font-bold">About GramInsight</h2>
								</div>
								<button
									onClick={() => setShowAbout(false)}
									className="p-2 hover:bg-white/20 rounded-lg transition-colors"
								>
									<X size={24} />
								</button>
							</div>
						</div>

						<div className="p-6 space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									What is GramInsight?
								</h3>
								<p className="text-gray-600 leading-relaxed">
									GramInsight is a comprehensive dashboard for monitoring
									MGNREGA (Mahatma Gandhi National Rural Employment Guarantee
									Act) performance across districts in India. Our platform
									provides real-time insights into employment generation, wage
									disbursement, and pending payments.
								</p>
							</div>

							<div className="grid md:grid-cols-2 gap-4">
								<div className="bg-blue-50 rounded-xl p-4">
									<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
										<Home className="text-white" size={20} />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">
										District Analytics
									</h4>
									<p className="text-sm text-gray-600">
										View detailed performance metrics for your district with
										interactive charts and trends.
									</p>
								</div>

								<div className="bg-indigo-50 rounded-xl p-4">
									<div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mb-3">
										<BarChart3 className="text-white" size={20} />
									</div>
									<h4 className="font-semibold text-gray-900 mb-2">
										Comparison Tools
									</h4>
									<p className="text-sm text-gray-600">
										Compare performance across multiple districts to identify
										best practices.
									</p>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									Data Source
								</h3>
								<p className="text-gray-600 leading-relaxed">
									Data is sourced from data.gov.in and updated regularly. This
									demo uses sample data for demonstration purposes.
								</p>
							</div>

							<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
								<p className="text-sm text-gray-700">
									<strong>Note:</strong> This is a demonstration interface. For
									production use, connect to an authenticated API that caches
									official MGNREGA data.
								</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Help Modal */}
			{showHelp && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					onClick={() => setShowHelp(false)}
				>
					<div
						className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 rounded-t-2xl">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
										<HelpCircle size={24} />
									</div>
									<h2 className="text-2xl font-bold">How to Use</h2>
								</div>
								<button
									onClick={() => setShowHelp(false)}
									className="p-2 hover:bg-white/20 rounded-lg transition-colors"
								>
									<X size={24} />
								</button>
							</div>
						</div>

						<div className="p-6 space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Getting Started
								</h3>
								<div className="space-y-4">
									<div className="flex gap-4">
										<div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
											1
										</div>
										<div>
											<h4 className="font-semibold text-gray-900 mb-1">
												Select Your District
											</h4>
											<p className="text-sm text-gray-600">
												Use the dropdown menu to select your district, or click
												"Auto-detect" to find your location automatically.
											</p>
										</div>
									</div>

									<div className="flex gap-4">
										<div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
											2
										</div>
										<div>
											<h4 className="font-semibold text-gray-900 mb-1">
												View Performance Metrics
											</h4>
											<p className="text-sm text-gray-600">
												Review person-days worked, wages paid, and pending
												amounts through interactive cards and charts.
											</p>
										</div>
									</div>

									<div className="flex gap-4">
										<div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
											3
										</div>
										<div>
											<h4 className="font-semibold text-gray-900 mb-1">
												Compare Districts
											</h4>
											<p className="text-sm text-gray-600">
												Navigate to the Compare page to analyze performance
												across multiple districts side-by-side.
											</p>
										</div>
									</div>

									<div className="flex gap-4">
										<div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
											4
										</div>
										<div>
											<h4 className="font-semibold text-gray-900 mb-1">
												Audio Summaries
											</h4>
											<p className="text-sm text-gray-600">
												Click "Hear summary" buttons to listen to data read
												aloud - great for accessibility.
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
								<h4 className="font-semibold text-gray-900 mb-2">
									💡 Pro Tips
								</h4>
								<ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
									<li>
										Use the metric selector to switch between different
										performance indicators
									</li>
									<li>Hover over charts to see detailed values</li>
									<li>
										Enable location services for automatic district detection
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
