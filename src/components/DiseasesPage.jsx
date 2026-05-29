import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, AlertCircle } from 'lucide-react'

function DiseasesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const diseases = [
    { name: 'Acne', category: 'Common', description: 'Inflammatory skin condition causing pimples and blemishes' },
    { name: 'Actinic Keratosis', category: 'Precancerous', description: 'Rough, scaly patches caused by sun damage' },
    { name: 'Atopic Dermatitis', category: 'Chronic', description: 'Chronic inflammatory skin condition with itchy rashes' },
    { name: 'Basal Cell Carcinoma', category: 'Cancer', description: 'Most common type of skin cancer' },
    { name: 'Cellulitis', category: 'Infection', description: 'Bacterial skin infection causing redness and swelling' },
    { name: 'Chickenpox', category: 'Viral', description: 'Highly contagious viral infection with itchy blisters' },
    { name: 'Cutaneous Larva Migrans', category: 'Parasitic', description: 'Parasitic skin infection causing winding tracks' },
    { name: 'Dermatofibroma', category: 'Benign', description: 'Harmless skin growth appearing as firm bumps' },
    { name: 'Eczema', category: 'Chronic', description: 'Inflammatory condition causing dry, itchy skin' },
    { name: 'Impetigo', category: 'Infection', description: 'Contagious bacterial infection with honey-colored crusts' },
    { name: 'Lyme Disease', category: 'Infection', description: 'Tick-borne illness with characteristic bull\'s-eye rash' },
    { name: 'Melanoma', category: 'Cancer', description: 'Most serious type of skin cancer' },
    { name: 'Nail Fungus', category: 'Fungal', description: 'Fungal infection affecting fingernails or toenails' },
    { name: 'Poison Ivy', category: 'Allergic', description: 'Allergic reaction causing itchy, blistering rash' },
    { name: 'Psoriasis', category: 'Autoimmune', description: 'Autoimmune condition with scaly skin patches' },
    { name: 'Ringworm', category: 'Fungal', description: 'Fungal infection causing circular, ring-shaped rash' },
    { name: 'Rosacea', category: 'Chronic', description: 'Chronic condition causing facial redness and visible blood vessels' },
    { name: 'Scabies', category: 'Parasitic', description: 'Contagious skin infestation by mites causing intense itching' },
    { name: 'Seborrheic Keratosis', category: 'Benign', description: 'Harmless, wart-like growths on the skin' },
    { name: 'Shingles', category: 'Viral', description: 'Painful viral infection causing blistering rash' },
    { name: 'Squamous Cell Carcinoma', category: 'Cancer', description: 'Second most common type of skin cancer' },
    { name: 'Tinea Versicolor', category: 'Fungal', description: 'Fungal infection causing discolored patches' },
    { name: 'Urticaria (Hives)', category: 'Allergic', description: 'Raised, itchy welts on the skin' },
    { name: 'Vitiligo', category: 'Autoimmune', description: 'Loss of skin pigmentation in patches' },
    { name: 'Warts', category: 'Viral', description: 'Small, rough growths caused by HPV virus' },
    { name: 'Melasma', category: 'Pigmentation', description: 'Brown or gray-brown patches on the face' },
    { name: 'Folliculitis', category: 'Infection', description: 'Inflammation of hair follicles' },
    { name: 'Keratosis Pilaris', category: 'Common', description: 'Small, rough bumps on the skin' },
    { name: 'Perioral Dermatitis', category: 'Inflammatory', description: 'Rash around the mouth area' },
    { name: 'Pityriasis Rosea', category: 'Inflammatory', description: 'Rash with herald patch and smaller lesions' },
    { name: 'Seborrheic Dermatitis', category: 'Chronic', description: 'Scaly patches and red skin, mainly on scalp' }
  ]

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryColor = (category) => {
    const colors = {
      'Cancer': '#DC2626',
      'Precancerous': '#EA580C',
      'Infection': '#0891B2',
      'Fungal': '#059669',
      'Viral': '#7C3AED',
      'Parasitic': '#DB2777',
      'Chronic': '#2563EB',
      'Autoimmune': '#9333EA',
      'Allergic': '#CA8A04',
      'Benign': '#10B981',
      'Common': '#6B7280',
      'Pigmentation': '#8B5CF6',
      'Inflammatory': '#F59E0B'
    }
    return colors[category] || '#6B7280'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section style={{ backgroundColor: '#DC2626' }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-4">
              Detectable Skin Diseases
            </h1>
            <p className="text-xl text-white opacity-90 mb-8">
              Our AI can detect and analyze 31 different skin conditions
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                size={20} 
              />
              <input
                type="text"
                placeholder="Search diseases by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-white"
                style={{ color: '#111827' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Diseases Grid */}
      <section className="py-16" style={{ backgroundColor: '#DCFCE7' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8 text-center">
            <p className="text-lg" style={{ color: '#374151' }}>
              Showing <span className="font-bold" style={{ color: '#0891B2' }}>{filteredDiseases.length}</span> of {diseases.length} diseases
            </p>
          </div>

          {/* Diseases Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease, index) => (
              <motion.div
                key={disease.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                {/* Disease Name */}
                <h3 className="font-heading text-xl font-bold mb-2" style={{ color: '#111827' }}>
                  {disease.name}
                </h3>

                {/* Category Badge */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-3"
                  style={{ backgroundColor: getCategoryColor(disease.category) }}
                >
                  {disease.category}
                </span>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                  {disease.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredDiseases.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <AlertCircle size={48} className="mx-auto mb-4" style={{ color: '#DC2626' }} />
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#111827' }}>
                No diseases found
              </h3>
              <p style={{ color: '#6B7280' }}>
                Try adjusting your search terms
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-2" style={{ color: '#111827' }}>
                  Important Medical Disclaimer
                </h4>
                <p className="leading-relaxed" style={{ color: '#374151' }}>
                  This AI tool is designed to assist in preliminary screening and should not replace professional medical diagnosis. 
                  Always consult a qualified dermatologist or healthcare provider for accurate diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DiseasesPage
