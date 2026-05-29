import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, Loader2, AlertCircle, Camera, X } from 'lucide-react'
import axios from 'axios'

function UploadSection({ setResult, loading, setLoading }) {
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState(null)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    setError(null)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const startCamera = async () => {
    try {
      setError(null)
      const cameraWidth = parseInt(import.meta.env.VITE_CAMERA_WIDTH || '1280')
      const cameraHeight = parseInt(import.meta.env.VITE_CAMERA_HEIGHT || '720')
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: cameraWidth },
          height: { ideal: cameraHeight }
        } 
      })
      setStream(mediaStream)
      setShowCamera(true)
      
      // Wait for video element to be ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      }, 100)
    } catch (err) {
      console.error('Camera error:', err)
      setError('Unable to access camera. Please check permissions or use file upload instead.')
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Convert canvas to data URL with quality from environment
      const imageQuality = parseFloat(import.meta.env.VITE_IMAGE_QUALITY || '0.9')
      const imageDataUrl = canvas.toDataURL('image/jpeg', imageQuality)
      setPreview(imageDataUrl)
      
      // Stop camera
      stopCamera()
    }
  }

  const analyzeImage = async () => {
    if (!preview) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Convert base64 to blob
      const response = await fetch(preview)
      const blob = await response.blob()
      
      // Create FormData and append the file
      const formData = new FormData()
      formData.append('file', blob, 'skin-image.jpg')

      // Get API URL from environment variable
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

      // Send to backend
      const apiResponse = await axios.post(`${apiBaseUrl}/predict`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data' 
        }
      })

      // Check if response has the expected structure
      if (apiResponse.data && apiResponse.data.disease && apiResponse.data.confidence !== undefined) {
        setResult(apiResponse.data)
      } else {
        throw new Error('Invalid response format from server')
      }
    } catch (err) {
      console.error('Error analyzing image:', err)
      
      // Provide specific error messages
      if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        setError(`Cannot connect to backend server. Please make sure the backend is running on ${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}`)
      } else if (err.response) {
        // Server responded with error
        setError(`Server error: ${err.response.data.detail || err.response.statusText}`)
      } else if (err.request) {
        // Request made but no response
        setError('No response from server. Please check if the backend is running.')
      } else {
        // Other errors
        setError('Failed to analyze image. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="upload-section" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#111827' }}>
            Upload Your Image
          </h2>
          <p className="text-xl" style={{ color: '#374151' }}>
            Take a clear photo of the affected area for accurate analysis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Camera View */}
          {showCamera && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 bg-black rounded-2xl overflow-hidden relative"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-auto"
                style={{ maxHeight: '500px' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={capturePhoto}
                    className="px-8 py-3 text-white rounded-lg transition font-medium flex items-center gap-2"
                    style={{ backgroundColor: '#DC2626' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#B91C1C'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#DC2626'}
                  >
                    <Camera size={20} />
                    Capture Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-8 py-3 bg-gray-600 text-white rounded-lg transition font-medium flex items-center gap-2 hover:bg-gray-700"
                  >
                    <X size={20} />
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Upload Area */}
          <div
            className={`border-4 border-dashed rounded-2xl p-12 text-center transition ${
              dragActive ? 'bg-gray-50' : 'bg-white'
            }`}
            style={{ borderColor: '#0891B2' }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {preview ? (
              <div className="space-y-6">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-96 mx-auto rounded-lg shadow-lg"
                />
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 border-2 rounded-lg transition font-medium"
                    style={{ borderColor: '#0891B2', color: '#0891B2' }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#0891B2'
                      e.target.style.color = '#FFFFFF'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#0891B2'
                    }}
                  >
                    Choose Different Image
                  </button>
                  <button
                    onClick={analyzeImage}
                    disabled={loading}
                    className="px-6 py-3 text-white rounded-lg transition font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#DC2626' }}
                    onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#B91C1C')}
                    onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#DC2626')}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Image'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#DCFCE7' }}>
                  <Upload size={40} color="#0891B2" />
                </div>
                <div>
                  <p className="text-xl font-medium mb-2" style={{ color: '#111827' }}>
                    Drag and drop your image here
                  </p>
                  <p className="mb-4" style={{ color: '#6B7280' }}>or</p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-8 py-3 text-white rounded-lg transition font-medium flex items-center gap-2"
                      style={{ backgroundColor: '#0891B2' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#0E7490'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#0891B2'}
                    >
                      <Upload size={20} />
                      Browse Files
                    </button>
                    <button
                      onClick={startCamera}
                      className="px-8 py-3 text-white rounded-lg transition font-medium flex items-center gap-2"
                      style={{ backgroundColor: '#DC2626' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#B91C1C'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#DC2626'}
                    >
                      <Camera size={20} />
                      Take Photo
                    </button>
                  </div>
                </div>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Supported formats: JPG, PNG, JPEG
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700"
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default UploadSection
