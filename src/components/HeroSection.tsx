'use client';

import CTAButtons from './CTAButtons';
import ProfileImage from './ProfileImage';
import TypingAnimation from './TypingAnimation';
import SocialLinks from './SocialLinks';

export default function HeroSection() {
  return (
    <section className="flex items-start pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Intro Text & CTA */}
          <div className="space-y-8">
            {/* Greeting */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Hi, I'm{' '}
                <span className="text-brand dark:text-brand-light">
                  Ayodeji Ogundare
                </span>
              </h1>
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                <TypingAnimation 
                  text={[
                    "Developer Advocate at Adyen",
                    "Open Source Advocate",
                    "Full-stack Engineer",
                    "Technical Content Creator"
                  ]}
                  speed={80}
                  delay={500}
                  className="font-semibold text-brand dark:text-brand-light"
                  loop={true}
                  pauseTime={3000}
                />
              </p>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm passionate about developer experience, enabling teams through content, tooling, open source, and community.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4">
              <CTAButtons />
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <SocialLinks />
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <ProfileImage />
          </div>
        </div>
      </div>
    </section>
  );
} 