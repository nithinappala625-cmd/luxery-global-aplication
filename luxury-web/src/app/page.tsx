import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import Ticker from '@/components/layout/Ticker';
import LiveAuctionBanner from '@/components/home/LiveAuctionBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedListings from '@/components/home/FeaturedListings';
import MembershipPreview from '@/components/home/MembershipPreview';
import HowItWorks from '@/components/home/HowItWorks';
import WhyNPGroups from '@/components/home/WhyNPGroups';
import AppDownload from '@/components/home/AppDownload';
import { getCategories, getListings } from '@/lib/api';

export const revalidate = 60;

export default async function HomePage() {
  const [categories, listings] = await Promise.all([
    getCategories(),
    getListings({ limit: 6, featuredOnly: true }),
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsBar />
      <Ticker />
      <LiveAuctionBanner />
      <CategoryGrid categories={categories} />
      <FeaturedListings initialListings={listings} />
      <MembershipPreview />
      <HowItWorks />
      <WhyNPGroups />
      <AppDownload />
    </div>
  );
}
