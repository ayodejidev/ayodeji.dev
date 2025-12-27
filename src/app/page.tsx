import HeroSection from '@/components/HeroSection';
import FeaturedSection from '@/components/FeaturedSection';
import RecentActivity from '@/components/RecentActivity';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Section */}
      <FeaturedSection />
      
      {/* Recent Activity Section */}
      <RecentActivity />
    </main>
  );
}
