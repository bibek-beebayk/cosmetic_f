'use client'

import { useAuth } from '@/context/AuthContext'
import { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleGoogleLogin = () => {
    // Integrate Google Auth logic here
    alert('Google login triggered')
  }

  const handleLogin = async () => {
    const credentials = {
      email: email, // Replace with actual username input  
      password: password, // Replace with actual password input
    }
    try {
      await login(credentials) // Replace 'google' with actual ref if needed
      alert('Login successful')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 font-semibold rounded-l ${mode === 'login' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-semibold rounded-r ${mode === 'register' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {mode === 'register' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-pink-600 text-white text-sm font-semibold py-2 rounded mb-4"
            onClick={handleLogin}
          >
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>

          <div className="text-center text-gray-500 text-sm mb-3">or</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 transition text-sm"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}
