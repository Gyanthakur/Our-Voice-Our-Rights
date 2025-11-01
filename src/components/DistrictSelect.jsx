import React, { useState } from 'react'
import { MapPin, Search, ChevronDown, X } from 'lucide-react'

export default function DistrictSelect({ districts = [], value, onChange }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const selectedDistrict = districts.find(d => d.id === value)
  
  const filteredDistricts = districts.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.state.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSelect = (districtId) => {
    onChange(districtId)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleClear = () => {
    onChange('')
    setSearchTerm('')
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
          <MapPin className="text-white" size={20} />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900">Select your district</label>
          <p className="text-xs text-gray-500">Choose from {districts.length} districts</p>
        </div>
      </div>

      {/* Native Select (Simple Mode) - Shows by default on mobile */}
      <div className="md:hidden">
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-blue-500 transition-colors bg-white text-gray-800"
        >
          <option value="">-- Choose district --</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.state}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Select with Search (Desktop) */}
      <div className="hidden md:block relative">
        {/* Selected Value Display */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-left focus:outline-none focus:border-blue-500 transition-colors bg-white hover:bg-gray-50 flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            {selectedDistrict ? (
              <>
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <MapPin className="text-blue-600" size={16} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{selectedDistrict.name}</div>
                  <div className="text-xs text-gray-500">{selectedDistrict.state}</div>
                </div>
              </>
            ) : (
              <span className="text-gray-500">-- Choose district --</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selectedDistrict && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
                className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            )}
            <ChevronDown 
              size={20} 
              className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </button>

        {/* Dropdown Panel */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Content */}
            <div className="absolute z-20 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-hidden">
              {/* Search Box */}
              <div className="p-3 border-b border-gray-200 sticky top-0 bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search districts or states..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                    autoFocus
                  />
                </div>
              </div>

              {/* District List */}
              <div className="max-h-64 overflow-y-auto">
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((district) => (
                    <button
                      key={district.id}
                      onClick={() => handleSelect(district.id)}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 group ${
                        district.id === value ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        district.id === value ? 'bg-blue-600' : 'bg-gray-100 group-hover:bg-blue-100'
                      }`}>
                        <MapPin 
                          className={district.id === value ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'} 
                          size={16} 
                        />
                      </div>
                      <div>
                        <div className={`font-medium ${district.id === value ? 'text-blue-900' : 'text-gray-900'}`}>
                          {district.name}
                        </div>
                        <div className="text-xs text-gray-500">{district.state}</div>
                      </div>
                      {district.id === value && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        </div>
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <Search className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm">No districts found</p>
                    <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
                  </div>
                )}
              </div>

              {/* Footer with count */}
              {filteredDistricts.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                  <p className="text-xs text-gray-500 text-center">
                    Showing {filteredDistricts.length} of {districts.length} districts
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Selected District Badge (when closed) */}
      {selectedDistrict && !isOpen && (
        <div className="mt-4 hidden md:flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1">Currently viewing</p>
            <p className="font-semibold text-gray-900">{selectedDistrict.name}, {selectedDistrict.state}</p>
          </div>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Change
          </button>
        </div>
      )}
    </div>
  )
}