import React from 'react';
import { MessageSquare, Shield, Users, Heart } from 'lucide-react';

function AboutUs() {
  return (
    <div className="min-h-full bg-background-light dark:bg-background-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About ChatConnect
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Connecting people through secure and seamless communication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold ml-3 text-gray-900 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              To provide a secure and intuitive communication platform that brings people closer together, 
              regardless of their location or device.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold ml-3 text-gray-900 dark:text-white">Privacy First</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Your privacy is our top priority. We use end-to-end encryption to ensure your conversations 
              remain private and secure.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <Users className="w-6 h-6 text-accent mt-1" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Community</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Building meaningful connections and fostering a global community of users.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-accent mt-1" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Security</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Implementing the highest standards of security to protect user data.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <MessageSquare className="w-6 h-6 text-accent mt-1" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Innovation</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Continuously improving our platform with cutting-edge technology.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Heart className="w-6 h-6 text-accent mt-1" />
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">User Focus</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Putting our users first in every decision we make.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Contact Us
          </h2>
          <div className="max-w-lg mx-auto">
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Have questions or feedback? We'd love to hear from you. Reach out to our team at:
            </p>
            <div className="text-center">
              <a 
                href="mailto:support@chatconnect.com" 
                className="text-accent hover:text-accent-light transition-colors"
              >
                support@chatconnect.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;