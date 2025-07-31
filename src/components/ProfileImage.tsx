'use client';

import Image from 'next/image';

export default function ProfileImage() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Decorative floating squares */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Square 1 */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-brand/20 dark:bg-brand-light/20 rounded-lg transform rotate-12 animate-float"></div>
        
        {/* Square 2 */}
        <div className="absolute top-16 right-8 w-6 h-6 bg-brand/15 dark:bg-brand-light/15 rounded-lg transform -rotate-12 animate-float-reverse" style={{ animationDelay: '1s' }}></div>
        
        {/* Square 3 */}
        <div className="absolute bottom-8 left-12 w-10 h-10 bg-brand/25 dark:bg-brand-light/25 rounded-lg transform rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Square 4 */}
        <div className="absolute bottom-16 right-4 w-7 h-7 bg-brand/10 dark:bg-brand-light/10 rounded-lg transform -rotate-45 animate-float-reverse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Main profile image */}
      <div className="relative z-10">
        <div className="relative w-80 h-80 sm:w-96 sm:h-96">
          <Image
            src="/profile.png"
            alt="Ayodeji Ogundare"
            fill
            className="object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
            sizes="(max-width: 640px) 320px, 384px"
            priority
            unoptimized
          />
          
          {/* Gradient ring effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand/20 via-brand/10 to-brand/20 dark:from-brand-light/20 dark:via-brand-light/10 dark:to-brand-light/20 blur-xl"></div>
        </div>
      </div>
    </div>
  );
} 