import React from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Home />
      </main>
      <Footer />
    </div>
  )
}
