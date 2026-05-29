import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import HowItWorks from './components/HowItWorks'
import UploadSection from './components/UploadSection'
import ResultCard from './components/ResultCard'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import DiseasesPage from './components/DiseasesPage'

function HomePage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <UploadSection 
        setResult={setResult} 
        loading={loading} 
        setLoading={setLoading} 
      />
      {result && <ResultCard result={result} />}
      <Testimonials />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diseases" element={<DiseasesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
