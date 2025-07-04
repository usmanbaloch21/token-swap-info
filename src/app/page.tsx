'use client';

import SwapInterface from '@/components/SwapInterface';
import { BRAND_CONFIG } from '@/constants/config';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xl">F</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {BRAND_CONFIG.NAME}
                    </h1>
                    <p className="text-sm text-gray-600">
                      {BRAND_CONFIG.TAGLINE}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Token Swap Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select tokens and amounts to calculate swap rates with real-time pricing.
          </p>
        </div>

        <div className="flex justify-center">
          <SwapInterface />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="text-gray-900 font-semibold">
                {BRAND_CONFIG.NAME}
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Powered by Funkit API</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
