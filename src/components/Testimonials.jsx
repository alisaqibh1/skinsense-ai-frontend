import React from 'react'
import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

function Testimonials() {
  const testimonials = [
    {
      name: 'Ahmed Khan',
      location: 'Karachi, Pakistan',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
      text: 'SkinSense AI helped me identify my skin condition quickly. The results were accurate and gave me confidence to see a dermatologist.',
      rating: 5,
      isAI: false
    },
    {
      name: 'Dr. AI Dermatologist',
      location: 'AI-Powered Skin Specialist',
      image: null,
      text: 'As an AI-powered dermatology assistant, I analyze thousands of skin conditions daily. This tool provides accurate preliminary screening and helps patients understand their skin health better.',
      rating: 5,
      isAI: true
    }
  ]

  return (
    <section id="testimonials" style={{ backgroundColor: '#0891B2' }} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">
            What People Say
          </h2>
          <p className="text-xl text-white">
            Real experiences from our users
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                {testimonial.isAI ? (
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#0891B2' }}
                  >
                    <Bot size={36} color="#FFFFFF" strokeWidth={2} />
                  </div>
                ) : (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h4 className="font-bold text-lg" style={{ color: '#0891B2' }}>
                    {testimonial.name}
                  </h4>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="leading-relaxed italic" style={{ color: '#111827' }}>
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
