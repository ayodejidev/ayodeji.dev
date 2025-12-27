'use client';

import Image from 'next/image';
import Link from 'next/link';

// Skills data
const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'PHP', 'HTML/CSS'],
  frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'],
  tools: ['Git', 'GitHub', 'Docker', 'Terraform', 'Vault', 'GCP', 'AWS'],
  databases: ['MongoDB', 'PostgreSQL'],
  softSkills: ['Public Speaking', 'Team Leadership', 'Problem Solving', 'Communication']
};

// Experience data with enhanced information
const experience = [
  {
    role: 'Developer Advocate',
    company: 'Adyen',
    type: 'Full-time',
    period: 'Sep 2022 - Present',
    duration: '3+ years'
  },
  {
    role: 'Full-stack Software Developer',
    company: 'Ayoxo Media IT Consulting',
    type: 'Full-time',
    period: 'Jan 2015 - Aug 2022',
    duration: '7+ years'
  },
  {
    role: 'Developer Community Advocate',
    company: 'Polygon Technology',
    type: 'Contract',
    period: 'Jan 2022 - Aug 2022',
    duration: '8 months'
  },
  {
    role: 'Developer Community Lead',
    company: 'Google Developers Group',
    type: 'Contract',
    period: 'Apr 2020 - Aug 2022',
    duration: '2+ years'
  },
  {
    role: 'Senior Technical Program Manager',
    company: 'Smart Kids Zone',
    type: 'Full-time',
    period: 'Apr 2021 - Feb 2022',
    duration: '11 months'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                I'm a Developer Advocate at Adyen and Fullstack Software Engineer.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                6+ years of experience leading open source programs, building developer communities, and improving developer experience through content, code, and collaboration.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-dark 
                           dark:bg-brand-light dark:hover:bg-brand transition-colors"
                >
                  Get in Touch
                </Link>
                <Link
                  href="#"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                           text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 
                           transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/profile.png"
                alt="Ayodeji Ogundare"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Languages */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 \
                             dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frameworks */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 \
                             dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 \
                             dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.softSkills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 \
                             dark:text-gray-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A journey through my career in software development, community building, and developer advocacy.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand via-brand to-gray-300 dark:to-gray-600 hidden lg:block"></div>
            
            <div className="space-y-8 lg:space-y-12">
              {experience.map((job, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  {/* Timeline dot for desktop */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-brand rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden lg:block group-hover:scale-125 transition-transform duration-300"></div>
                  
                  <div className="lg:ml-16">
                                          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {/* Header with gradient */}
                        <div className="bg-gradient-to-r from-brand to-brand-light dark:from-brand-light dark:to-brand p-6 text-white">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div>
                                <h3 className="text-xl font-bold">
                                  {job.role}
                                </h3>
                                <p className="text-white/90 font-medium">
                                  {job.company}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium">
                                {job.type}
                              </div>
                            </div>
                          </div>
                        </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm font-medium">{job.period}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm font-medium">{job.duration}</span>
                            </div>
                          </div>
                        </div>
                        

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-brand/10 to-brand-light/10 dark:from-brand/5 dark:to-brand-light/5 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ready to work together?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                Let's discuss how we can collaborate on your next project or explore opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-brand hover:bg-brand-dark dark:bg-brand-light dark:hover:bg-brand text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Get in Touch
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <a
                  href="https://www.linkedin.com/in/ayodeji-ogundare/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border-2 border-brand dark:border-brand-light text-brand dark:text-brand-light hover:bg-brand hover:text-white dark:hover:bg-brand-light dark:hover:text-gray-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Connect on LinkedIn
                  <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Interests Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            When I'm Not Coding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Speaking & Writing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                I regularly speak at tech conferences and write technical articles 
                to share knowledge with the developer community.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Open Source
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Contributing to open source projects and maintaining my own to 
                give back to the community.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Mentorship
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mentoring junior developers and helping them grow in their careers 
                through code reviews and guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
 