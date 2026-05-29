import React from 'react'
import { motion } from 'framer-motion'
import { Upload, Scan, CheckCircle } from 'lucide-react'

function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Photo',
      description: 'Take or upload a clear photo of the affected skin area'
    },
    {
      icon: Scan,
      title: 'AI Analysis',
      description: 'Our AI model analyzes the image using advanced deep learning'
    },
    {
      icon: CheckCircle,
      title: 'Get Results',
      description: 'Receive instant diagnosis with confidence score and recommendations'
    }
  ]

  return (
    <section id="how-it-works" style={{ backgroundColor: '#DCFCE7' }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#111827' }}>
            How It Works
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#374151' }}>
            Get your skin analysis in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Step Number */}
              <div 
                className="absolute -top-4 -left-4 w-12 h-12 text-white rounded-full flex items-center justify-center font-bold text-xl font-heading"
                style={{ backgroundColor: '#0891B2' }}
              >
                {index + 1}
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl p-8 h-full border-2" style={{ borderColor: '#0891B2' }}>
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <step.icon size={32} color="#0891B2" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3" style={{ color: '#111827' }}>
                  {step.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#374151' }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
