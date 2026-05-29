import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import aiDoctor from '../assets/ai-doctor.png'

function Hero() {
  const scrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" style={{ backgroundColor: '#DCFCE7' }} className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#111827' }}>
              Detect. Understand. Act.
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: '#374151' }}>
              Upload a photo of your skin concern and get instant AI-powered analysis. 
              Detect 30+ skin conditions with 93% accuracy in seconds.
            </p>
            <button 
              onClick={scrollToUpload}
              className="text-white px-8 py-4 rounded-lg transition font-medium text-lg flex items-center gap-2 group"
              style={{ backgroundColor: '#DC2626' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#B91C1C'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#DC2626'}
            >
              Get Started
              <ChevronRight className="group-hover:translate-x-1 transition" size={20} />
            </button>
            
            {/* Disclaimer */}
            <p className="mt-6 text-sm italic" style={{ color: '#6B7280' }}>
              SkinSense AI is not a substitute for professional medical advice. 
              Always consult a qualified doctor for diagnosis and treatment.
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <img 
              src={aiDoctor} 
              alt="AI Skin Specialist"
              style={{
                width: '100%',
                maxWidth: '480px',
                height: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
