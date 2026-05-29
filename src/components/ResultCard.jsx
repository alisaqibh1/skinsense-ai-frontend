import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Heart, Stethoscope, CheckCircle, X, AlertTriangle, Info, Users, Pill, Download } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

function ResultCard({ result }) {
  const getColor = (confidence) => {
    if (confidence >= 70) return '#DC2626'
    if (confidence >= 40) return '#DC2626'
    return '#0891B2'
  }

  const getRiskLevel = (confidence) => {
    if (confidence >= 70) return 'High Confidence'
    if (confidence >= 40) return 'Medium Confidence'
    return 'Low Confidence'
  }

  const color = getColor(result.confidence)

  const generatePDF = async () => {
    try {
      // Create a temporary container for PDF content
      const pdfContent = document.createElement('div')
      pdfContent.style.width = '800px'
      pdfContent.style.padding = '40px'
      pdfContent.style.backgroundColor = '#ffffff'
      pdfContent.style.fontFamily = 'Arial, sans-serif'
      
      // Build PDF content
      pdfContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #0891B2; padding-bottom: 20px;">
          <h1 style="color: #DC2626; font-size: 32px; margin: 0 0 10px 0; font-weight: bold;">SkinSense AI</h1>
          <p style="color: #6B7280; font-size: 16px; margin: 0;">Skin Disease Analysis Report</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="color: #111827; font-size: 24px; margin-bottom: 10px;">Detected Condition</h2>
          <p style="color: #DC2626; font-size: 28px; font-weight: bold; margin: 0;">${result.disease}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #111827; font-size: 20px; margin-bottom: 10px;">Confidence Level</h3>
          <div style="background: #E5E7EB; height: 30px; border-radius: 15px; overflow: hidden; margin-bottom: 10px;">
            <div style="background: #DC2626; height: 100%; width: ${result.confidence}%; border-radius: 15px;"></div>
          </div>
          <p style="color: #DC2626; font-size: 18px; font-weight: bold; margin: 0;">${result.confidence}% - ${getRiskLevel(result.confidence)}</p>
        </div>

        ${result.advice ? `
          <div style="margin-bottom: 25px; padding: 20px; background: #DCFCE7; border-left: 4px solid #0891B2; border-radius: 8px;">
            <h3 style="color: #0891B2; font-size: 20px; margin: 0 0 10px 0;">What is ${result.disease}?</h3>
            <p style="color: #111827; line-height: 1.6; margin: 0;">${result.advice.what_is_it}</p>
          </div>

          ${result.advice.causes ? `
            <div style="margin-bottom: 25px;">
              <h3 style="color: #0891B2; font-size: 20px; margin-bottom: 10px;">Common Causes & Why It Happens</h3>
              <ol style="color: #111827; line-height: 1.8; margin: 0; padding-left: 20px;">
                ${result.advice.causes.map(cause => `<li style="margin-bottom: 8px;">${cause}</li>`).join('')}
              </ol>
            </div>
          ` : ''}

          ${result.advice.who_gets_it ? `
            <div style="margin-bottom: 25px; padding: 20px; background: #F3F4F6; border-left: 4px solid #0891B2; border-radius: 8px;">
              <h3 style="color: #0891B2; font-size: 20px; margin: 0 0 10px 0;">Who Gets It?</h3>
              <p style="color: #111827; line-height: 1.6; margin: 0;">${result.advice.who_gets_it}</p>
            </div>
          ` : ''}

          ${result.advice.first_aid_medicines ? `
            <div style="margin-bottom: 25px; padding: 20px; background: #FEF3C7; border-left: 4px solid #DC2626; border-radius: 8px;">
              <h3 style="color: #DC2626; font-size: 20px; margin: 0 0 10px 0;">First Aid Medicines (Over-the-Counter)</h3>
              <ul style="color: #111827; line-height: 1.8; margin: 0 0 10px 0; padding-left: 20px;">
                ${result.advice.first_aid_medicines.map(med => `<li style="margin-bottom: 8px;">${med}</li>`).join('')}
              </ul>
              <p style="color: #92400E; font-size: 14px; font-style: italic; margin: 0;">⚠️ Always read labels and consult a pharmacist or doctor before use</p>
            </div>
          ` : ''}

          <div style="margin-bottom: 25px;">
            <h3 style="color: #0891B2; font-size: 20px; margin-bottom: 10px;">Home Care Tips</h3>
            <ul style="color: #111827; line-height: 1.8; margin: 0; padding-left: 20px;">
              ${result.advice.home_care.map(tip => `<li style="margin-bottom: 8px;">✓ ${tip}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 25px;">
            <h3 style="color: #DC2626; font-size: 20px; margin-bottom: 10px;">What to Avoid</h3>
            <ul style="color: #111827; line-height: 1.8; margin: 0; padding-left: 20px;">
              ${result.advice.avoid.map(item => `<li style="margin-bottom: 8px;">✗ ${item}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 25px; padding: 20px; background: #FEE2E2; border-left: 4px solid #DC2626; border-radius: 8px;">
            <h3 style="color: #DC2626; font-size: 20px; margin: 0 0 10px 0;">See a Doctor Urgently If</h3>
            <p style="color: #111827; line-height: 1.6; margin: 0;">${result.advice.see_doctor}</p>
          </div>
        ` : ''}

        <div style="margin-top: 30px; padding: 20px; background: #FEF3C7; border: 2px solid #FCD34D; border-radius: 8px;">
          <h3 style="color: #111827; font-size: 18px; margin: 0 0 10px 0;">⚠️ Important Medical Disclaimer</h3>
          <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 14px;">
            This AI-generated advice is for informational purposes only and does not replace professional medical diagnosis or treatment. 
            Always consult a qualified dermatologist or healthcare provider for proper diagnosis, treatment plan, and medication advice.
          </p>
        </div>

        <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 2px solid #E5E7EB;">
          <p style="color: #6B7280; font-size: 14px; margin: 0;">Generated by SkinSense AI - Detect. Understand. Act.</p>
          <p style="color: #9CA3AF; font-size: 12px; margin: 5px 0 0 0;">Report Date: ${new Date().toLocaleDateString()}</p>
        </div>
      `
      
      // Append to body temporarily
      document.body.appendChild(pdfContent)
      
      // Generate canvas from HTML
      const canvas = await html2canvas(pdfContent, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })
      
      // Remove temporary element
      document.body.removeChild(pdfContent)
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      
      // Save PDF
      pdf.save(`SkinSense-AI-Report-${result.disease.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`)
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    }
  }

  return (
    <section style={{ backgroundColor: '#DCFCE7' }} className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border-l-4"
          style={{ borderColor: '#0891B2' }}
        >
          {/* Header */}
          <div className="p-6 border-b-2 border-gray-100" style={{ backgroundColor: '#DCFCE7' }}>
            <h3 className="font-heading text-3xl font-bold mb-2" style={{ color: '#111827' }}>
              Analysis Results
            </h3>
            <p style={{ color: '#374151' }}>
              Based on AI analysis of your uploaded image
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Disease Name */}
            <div>
              <p className="text-sm mb-2 uppercase tracking-wide" style={{ color: '#6B7280' }}>
                Detected Condition
              </p>
              <h4 className="font-heading text-4xl font-bold" style={{ color: '#DC2626' }}>
                {result.disease}
              </h4>
            </div>

            {/* Confidence Bar */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm uppercase tracking-wide" style={{ color: '#6B7280' }}>
                  Confidence Level
                </p>
                <span className="font-bold text-2xl" style={{ color: '#DC2626' }}>
                  {result.confidence}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: '#DC2626' }}
                />
              </div>
              <p className="mt-2 text-sm font-medium" style={{ color }}>
                {getRiskLevel(result.confidence)}
              </p>
            </div>

            {/* AI-Powered Medical Advice */}
            {result.advice && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope size={24} color="#0891B2" />
                  <h5 className="font-heading text-2xl font-bold" style={{ color: '#0891B2' }}>
                    Detailed Medical Information
                  </h5>
                </div>

                {/* What is it? */}
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4" style={{ borderColor: '#0891B2', backgroundColor: '#DCFCE7' }}>
                  <div className="flex items-start gap-3">
                    <Info size={24} color="#0891B2" className="flex-shrink-0 mt-1" />
                    <div>
                      <h6 className="font-bold text-lg mb-3" style={{ color: '#0891B2' }}>
                        What is {result.disease}?
                      </h6>
                      <p className="leading-relaxed" style={{ color: '#111827' }}>
                        {result.advice.what_is_it}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Causes */}
                {result.advice.causes && (
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h6 className="font-bold text-lg mb-4 flex items-center gap-2" style={{ color: '#0891B2' }}>
                      <AlertCircle size={20} />
                      Common Causes & Why It Happens
                    </h6>
                    <ul className="space-y-3">
                      {result.advice.causes.map((cause, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#0891B2' }}>
                            {index + 1}
                          </span>
                          <span className="leading-relaxed" style={{ color: '#111827' }}>
                            {cause}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Who Gets It */}
                {result.advice.who_gets_it && (
                  <div className="bg-white rounded-xl p-6 shadow-md border-l-4" style={{ borderColor: '#0891B2' }}>
                    <div className="flex items-start gap-3">
                      <Users size={24} color="#0891B2" className="flex-shrink-0 mt-1" />
                      <div>
                        <h6 className="font-bold text-lg mb-2" style={{ color: '#0891B2' }}>
                          Who Gets It?
                        </h6>
                        <p className="leading-relaxed" style={{ color: '#111827' }}>
                          {result.advice.who_gets_it}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* First Aid Medicines */}
                {result.advice.first_aid_medicines && (
                  <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: '#FEF3C7' }}>
                    <div className="flex items-start gap-3 mb-4">
                      <Pill size={24} color="#DC2626" className="flex-shrink-0 mt-1" />
                      <h6 className="font-bold text-lg" style={{ color: '#DC2626' }}>
                        First Aid Medicines (Over-the-Counter)
                      </h6>
                    </div>
                    <ul className="space-y-3">
                      {result.advice.first_aid_medicines.map((medicine, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Pill size={18} color="#DC2626" className="flex-shrink-0 mt-1" />
                          <span className="leading-relaxed" style={{ color: '#111827' }}>
                            {medicine}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm italic" style={{ color: '#92400E' }}>
                      ⚠️ Always read labels and consult a pharmacist or doctor before use
                    </p>
                  </div>
                )}

                {/* Home Care Tips */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h6 className="font-bold text-lg mb-4" style={{ color: '#0891B2' }}>
                    Home Care Tips
                  </h6>
                  <ul className="space-y-3">
                    {result.advice.home_care.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle size={20} color="#0891B2" className="flex-shrink-0 mt-1" />
                        <span className="leading-relaxed" style={{ color: '#111827' }}>
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What to Avoid */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h6 className="font-bold text-lg mb-4" style={{ color: '#DC2626' }}>
                    What to Avoid
                  </h6>
                  <ul className="space-y-3">
                    {result.advice.avoid.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <X size={20} color="#DC2626" className="flex-shrink-0 mt-1" />
                        <span className="leading-relaxed" style={{ color: '#111827' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* See a Doctor If */}
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4" style={{ borderColor: '#DC2626' }}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={24} color="#DC2626" className="flex-shrink-0 mt-1" />
                    <div>
                      <h6 className="font-bold text-lg mb-2" style={{ color: '#DC2626' }}>
                        See a Doctor Urgently If
                      </h6>
                      <p className="leading-relaxed" style={{ color: '#111827' }}>
                        {result.advice.see_doctor}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Disclaimer */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-lg mb-2" style={{ color: '#111827' }}>
                    Important Medical Disclaimer
                  </h5>
                  <p className="leading-relaxed" style={{ color: '#374151' }}>
                    This AI-generated advice is for informational purposes only and does not replace professional medical diagnosis or treatment. 
                    Always consult a qualified dermatologist or healthcare provider for proper diagnosis, treatment plan, and medication advice.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center pt-4 flex gap-4 justify-center flex-wrap">
              <button
                onClick={generatePDF}
                className="px-8 py-3 text-white rounded-lg transition font-medium inline-flex items-center gap-2"
                style={{ backgroundColor: '#0891B2' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0E7490'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0891B2'}
              >
                <Download size={20} />
                Download PDF Report
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-3 text-white rounded-lg transition font-medium inline-flex items-center gap-2"
                style={{ backgroundColor: '#DC2626' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#B91C1C'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#DC2626'}
              >
                <Heart size={20} />
                Analyze Another Image
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ResultCard
