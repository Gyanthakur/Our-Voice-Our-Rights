import React from 'react'
import { Heart, Github, Linkedin, Mail, ExternalLink, Code, Database, Wifi, WifiOff } from 'lucide-react'

export default function Footer() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine)

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                G
              </div>
              <h3 className="font-bold text-gray-900">GramInsight</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              A modern, accessible dashboard for MGNREGA district performance monitoring. Built with care for rural communities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <ExternalLink size={12} />
                  Data.gov.in
                </a>
              </li>
              <li>
                <a href="https://nrega.nic.in" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <ExternalLink size={12} />
                  MGNREGA Official Site
                </a>
              </li>
              <li>
                <button className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <Code size={12} />
                  API Documentation
                </button>
              </li>
              <li>
                <button className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <Database size={12} />
                  Data Sources
                </button>
              </li>
            </ul>
          </div>

          {/* Status & Info */}
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-3">Status</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                {isOnline ? (
                  <>
                    <Wifi size={14} className="text-green-600" />
                    <span className="text-gray-600">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff size={14} className="text-orange-600" />
                    <span className="text-gray-600">Offline Mode</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Database size={14} className="text-blue-600" />
                <span className="text-gray-600">Using Mock Data</span>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs text-blue-800 font-medium mb-1">Demo Version</p>
                <p className="text-xs text-blue-600">This is a frontend demonstration with sample data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300"></div>

        {/* Bottom Bar */}
        <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Creator Info */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>Built with</span>
            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <span className="font-semibold text-gray-900">Gyan Pratap Singh</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Gyanthakur"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={16} className="text-gray-700" />
            </a>
            <a
              href="https://www.linkedin.com/in/gyan-pratap-singh-275785236/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} className="text-blue-600" />
            </a>
            <a
              href="mailto:gps.96169@gmail.com"
              className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:border-green-400 hover:bg-green-50 transition-all hover:scale-110"
              aria-label="Email"
            >
              <Mail size={16} className="text-green-600" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} GramInsight. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}