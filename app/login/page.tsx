'use client'

import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const handleGoogleLogin = () => {
    // Integrate Google Auth logic here
    alert('Google login triggered')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 font-semibold rounded-l ${
              mode === 'login' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-semibold rounded-r ${
              mode === 'register' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setMode('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="••••••••"
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
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-pink-600 text-white text-sm font-semibold py-2 rounded mb-4"
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
        </form>
      </div>
    </div>
  )
}
