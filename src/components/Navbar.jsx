import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const scrollToUpload = () => {
    if (isHomePage) {
      document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#upload-section'
    }
    setIsMenuOpen(false)
  }

  const handleNavClick = (e, target) => {
    e.preventDefault()
    setIsMenuOpen(false)
    if (isHomePage) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/${target}`
    }
  }

  const navLinks = [
    { href: '#home', label: 'Home', type: 'scroll' },
    { href: '/diseases', label: 'Diseases', type: 'route' },
    { href: '#how-it-works', label: 'How It Works', type: 'scroll' },
    { href: '#testimonials', label: 'Testimonials', type: 'scroll' }
  ]

  return (
    <nav style={{ backgroundColor: '#0891B2' }} className="shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="SkinSense AI Logo" 
              style={{ 
                width: '90px', 
                height: '90px', 
                minWidth: '90px',
                minHeight: '90px',
                borderRadius: '16px',
                objectFit: 'contain',
                display: 'block',
                backgroundColor: 'transparent'
              }} 
            />
            <span 
              className="text-3xl font-bold text-white"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              SkinSense AI
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.type === 'route' ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white hover:opacity-80 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white hover:opacity-80 transition"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Desktop Try Now Button */}
          <button 
            onClick={scrollToUpload}
            className="hidden md:block bg-white px-6 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
            style={{ color: '#0891B2' }}
          >
            Try Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:opacity-80 transition"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: '#0891B2' }}
            className="md:hidden border-t border-white border-opacity-20 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                link.type === 'route' ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white hover:opacity-80 px-4 py-2 rounded-lg transition"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block text-white hover:opacity-80 px-4 py-2 rounded-lg transition"
                  >
                    {link.label}
                  </a>
                )
              ))}
              <button
                onClick={scrollToUpload}
                className="w-full bg-white px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium"
                style={{ color: '#0891B2' }}
              >
                Try Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
