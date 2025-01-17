import React from 'react';
import { Check, Zap, Rocket, Crown } from 'lucide-react';

const features = {
  basic: [
    '5 free content transformations',
    'Basic AI transformations',
    'Social media formats',
    'Email support'
  ],
  pro: [
    'Unlimited transformations',
    'Advanced AI algorithms',
    'All content formats',
    'Priority support',
    'Custom templates',
    'Analytics dashboard'
  ],
  enterprise: [
    'Everything in Pro',
    'Dedicated account manager',
    'Custom AI training',
    'API access',
    'SSO integration',
    'Custom features'
  ]
};

export function PricingPage() {
  return (
    <div className="py-12 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Start with our free tier and upgrade as you grow
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {/* Free Tier */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-500" />
                  Basic
                </h3>
                <span className="px-3 py-1 text-green-800 text-sm font-semibold bg-green-100 rounded-full">
                  Free
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-500">Perfect for getting started</p>
              <ul className="mt-6 space-y-4">
                {features.basic.map((feature, index) => (
                  <li key={index} className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 pt-6 pb-8">
              <button className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 py-2 px-4 rounded-md transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="border border-indigo-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white relative">
            <div className="absolute -top-4 inset-x-0">
              <div className="inline-block bg-indigo-600 rounded-full px-4 py-1 text-sm font-semibold text-white">
                Most Popular
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-indigo-500" />
                  Pro
                </h3>
                <div className="ml-4">
                  <span className="text-4xl font-extrabold text-gray-900">₹999</span>
                  <span className="text-base font-medium text-gray-500">/mo</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">For growing businesses</p>
              <ul className="mt-6 space-y-4">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 pt-6 pb-8">
              <button className="w-full bg-indigo-600 text-white hover:bg-indigo-700 py-2 px-4 rounded-md transition-colors">
                Subscribe Now
              </button>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-purple-500" />
                  Enterprise
                </h3>
                <span className="text-lg font-medium text-gray-900">Custom</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">For large organizations</p>
              <ul className="mt-6 space-y-4">
                {features.enterprise.map((feature, index) => (
                  <li key={index} className="flex space-x-3">
                    <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 pt-6 pb-8">
              <button className="w-full bg-purple-50 text-purple-700 hover:bg-purple-100 py-2 px-4 rounded-md transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}