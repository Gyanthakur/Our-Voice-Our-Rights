import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [district, setDistrict] = useState(null)
  const [language, setLanguage] = useState('hi-IN')

  return (
    <AppContext.Provider value={{ district, setDistrict, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  )
}
