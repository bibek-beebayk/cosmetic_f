'use client'

import { useAuth } from '@/context/AuthContext'
import { Suspense, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { apiCall } from '@/lib/axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const { login } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState<'form' | 'verify'>('form')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [otp, setOtp] = useState('')

  const handleGoogleLogin = () => {
    alert('Google login triggered')
  }

  const handleLogin = async () => {
    const credentials = { email, password }
    try {
      await login(credentials)
      // alert('Login successful')
      toast.success("Logged in successfully")
      router.push("/")
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      toast.error(error.data.detail)
    }
  }

  const handleRegisterRequest = async () => {
    if (password !== confirmPassword) return toast.error("Passwords don't match")
    try {
      await apiCall('post', '/auth/register/', { email, password, full_name: fullName })
      setStep('verify')
      toast.success("OTP sent to email")
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (e: any) {
      console.log(e)
      toast.error('Failed to send OTP')
    }
  }

  const handleConfirmRegistration = async () => {
    try {
      await apiCall('post', '/auth/confirm-registration/', { email, password, otp, full_name: fullName })
      toast.success('Account created. Please login.')
      setMode('login')
      setStep('form')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e)
      toast.error('Invalid OTP')
    }
  }

  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between mb-6">
            <button
              className={`w-1/2 py-2 font-semibold rounded-l ${mode === 'login' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => {
                setMode('login')
                setStep('form')
              }}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-2 font-semibold rounded-r ${mode === 'register' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => {
                setMode('register')
                setStep('form')
              }}
            >
              Register
            </button>
          </div>

          <div>
            {mode === 'register' && step === 'form' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
              </>
            )}

            {(mode === 'login' || (mode === 'register' && step === 'form')) && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full border rounded px-3 py-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input type="password" className="w-full border rounded px-3 py-2 text-sm" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </>
            )}

            {mode === 'register' && step === 'form' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <input type="password" className="w-full border rounded px-3 py-2 text-sm" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <button className="w-full bg-red-500 hover:bg-pink-600 text-white text-sm font-semibold py-2 rounded mb-4" onClick={handleRegisterRequest}>
                  Send OTP
                </button>
              </>
            )}

            {mode === 'register' && step === 'verify' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Enter OTP</label>
                  <input type="text" className="w-full border rounded px-3 py-2 text-sm" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </div>

                <button className="w-full bg-red-500 hover:bg-pink-600 text-white text-sm font-semibold py-2 rounded mb-4" onClick={handleConfirmRegistration}>
                  Confirm Account
                </button>
              </>
            )}

            {mode === 'login' && (
              <>
                <button className="w-full bg-red-500 hover:bg-pink-600 text-white text-sm font-semibold py-2 rounded mb-4" onClick={handleLogin}>
                  Login
                </button>

                <div className="text-center text-gray-500 text-sm mb-3">or</div>

                <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 transition text-sm">
                  <FcGoogle className="text-xl" />
                  Continue with Google
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  )
}
