import React from 'react'
import { motion } from 'framer-motion'

function Stats() {
  const stats = [
    { number: '30+', label: 'Diseases Detected' },
    { number: '93%', label: 'Accuracy Rate' },
    { number: '<5s', label: 'Results in Seconds' }
  ]

  return (
    <section style={{ backgroundColor: '#DC2626' }} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-white font-heading mb-2">
                {stat.number}
              </div>
              <div className="text-white text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
