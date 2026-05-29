import React from 'react'
import { Scan, Heart, AlertCircle } from 'lucide-react'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer style={{ backgroundColor: '#DC2626' }} className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={logo} 
                alt="SkinSense AI Logo" 
                style={{ 
                  width: '64px', 
                  height: '64px', 
                  minWidth: '64px',
                  minHeight: '64px',
                  borderRadius: '14px',
                  objectFit: 'contain',
                  display: 'block',
                  backgroundColor: 'transparent'
                }} 
              />
              <span style={{ fontFamily: 'Fraunces' }} className="text-2xl font-bold text-white">
                SkinSense AI
              </span>
            </div>
            <p className="text-white leading-relaxed">
              AI-powered skin disease detection for early awareness and better health outcomes.
            </p>
          </div>

          {/* Important Notice */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-heading text-white">Important Notice</h4>
            <div className="flex items-start gap-2 text-white text-sm" style={{ opacity: 0.9 }}>
              <AlertCircle size={20} color="#FFFFFF" className="flex-shrink-0 mt-1" />
              <p>
                SkinSense AI is not a substitute for professional medical advice. 
                Always consult a qualified doctor for diagnosis and treatment.
              </p>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold text-lg mb-4 font-heading text-white">Connect</h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/alisaqibh1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition" 
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/saqib--ali/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition" 
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://alisaqib-portfolio.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition" 
                aria-label="Portfolio"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3a7 7 0 100 14 7 7 0 000-14zm0 2a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white pt-8 text-center text-white text-sm" style={{ borderOpacity: 0.3 }}>
          <p className="flex items-center justify-center gap-2">
            Made with <Heart size={16} color="#FFFFFF" fill="#FFFFFF" /> for better health awareness
          </p>
          <p className="mt-2">
            © 2026 SkinSense AI. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
