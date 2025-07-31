'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Skills data
const skills = {
  languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'PHP', 'HTML/CSS'],
  frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'],
  tools: ['Git', 'GitHub', 'Docker', 'Terraform', 'Vault', 'GCP', 'AWS'],
  databases: ['MongoDB', 'PostgreSQL'],
  softSkills: ['Technical Writing', 'Public Speaking', 'Team Leadership', 'Problem Solving', 'Communication']
};

// Experience data
const experience = [
  {
    role: 'Developer Advocate',
    company: 'Adyen · Full-time',
    period: 'Sep 2022 - Present',
    description: '',
    achievements: [
      'Led open source and ecosystem initiatives, helping shape contribution policies and driving GitHub engagement.',
      'Built and managed developer community programs in EMEA to increase adoption of Adyen APIs and SDKs.',
      'Authored 10+ technical tutorials and blogs that improved developer onboarding and integration success.',
      'Partnered with engineering to enhance DevEx and streamline feedback-to-feature processes.',
      'Represented Adyen at regional meetups, fintech developer events, and industry webinars.'
    ]
  },
  {
    role: 'Full-stack Software Developer',
    company: 'Ayoxo Media IT Consulting',
    period: 'Jan 2015 - Aug 2022',
    description: '',
    achievements: [
      'Developed high-performance websites using modern web frameworks to ensure scalability and visual appeal.',
      'Seamlessly integrated front-end design, server-side functionality, and database management for full-stack applications.',
      'Achieved a 20% increase in website traffic and user engagement through optimized website performance.'
    ]
  },
  {
    role: 'Developer Community Advocate',
    company: 'Polygon Technology · Contract',
    period: 'Jan 2022 - Aug 2022',
    description: '',
    achievements: [
      'Supported aspiring Web3 engineers in their transition into the blockchain space by providing mentorship and technical guidance.',
      'Acted as a resource person to enable seamless integration of new members into the Web3 ecosystem.',
      'Curated and shared technical resources, tutorials, and tools to empower community members in their Web3 learning journeys.',
      'Organized hands-on workshops and bootcamps to educate members about Web3.'
    ]
  },
  {
    role: 'Developer Community Lead',
    company: 'Google Developers Group · Contract',
    period: 'Apr 2020 - Aug 2022',
    description: '',
    achievements: [
      'Founded the GDG group and grew membership from 0 to 700+ active participants within 13 months.',
      'Positively impacted over 4,000 developers by providing them with knowledge, opportunities, and networking platforms.',
      'Spearheaded over 21 technical meetups, workshops, and training sessions, including two flagship DevFest events.',
      'Created and shared technical resources, tutorials, and open-source contributions tailored to developers\' needs.',
      'Produced technical guides and project templates to aid developers in their journeys with Google technologies.'
    ]
  },
  {
    role: 'Senior Technical Program Manager',
    company: 'Smart Kids Zone · Full-time',
    period: 'Apr 2021 - Feb 2022',
    description: '',
    achievements: [
      'Created a sustainable framework for program development and implementation ensuring scalability.',
      'Conceptualized, developed, and implemented engaging coding and STEM initiatives tailored for children, fostering early interest in technology and problem-solving.',
      'Developed comprehensive technical curriculum by creating a detailed and kid friendly technical curricula covering HTML, CSS, JavaScript, PHP, and Python.',
      'Turning curriculum into content by developing various interactive content types for enhanced learning.',
      'Identified, recruited and onboarded skilled developers, tutors creating a multidisciplinary team for enhanced program implementation.'
    ]
  }
];

export default function About() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                About Me
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                I'm a Developer Advocate and Fullstack Software Engineer passionate about 
                creating exceptional developer experiences and building tools that empower teams.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                With a focus on open source, technical writing, and community building, 
                I help developers succeed through content, tooling, and mentorship.
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
                  href="/projects"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                           text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 
                           transition-colors"
                >
                  View Projects
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
        <div className="max-w-7xl mx-auto">
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

      {/* Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Experience
          </h2>
          <div className="space-y-12">
            {experience.map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {job.role}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {job.company}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 sm:mt-0">
                    {job.period}
                  </p>
                </div>
                {expanded === index && (
                  <>
                    {job.description && (
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {job.description}
                      </p>
                    )}
                    <ul className="list-disc list-inside space-y-2 mb-4">
                      {job.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-gray-600 dark:text-gray-300"
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <button
                  className="mt-2 text-brand dark:text-brand-light font-medium hover:underline focus:outline-none"
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  aria-expanded={expanded === index}
                  aria-controls={`exp-details-${index}`}
                >
                  {expanded === index ? 'Show less' : 'Show details'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Interests Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
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
 