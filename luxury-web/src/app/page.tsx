import HeroSection from '@/components/home/HeroSection';
import EditorialSection from '@/components/home/EditorialSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import CollectionGrid from '@/components/home/CollectionGrid';
import PrivateAccessSection from '@/components/home/PrivateAccessSection';
import OffMarketSection from '@/components/home/OffMarketSection';
import MembershipSection from '@/components/home/MembershipSection';
import NetworkSection from '@/components/home/NetworkSection';
import AcquisitionProtocol from '@/components/home/AcquisitionProtocol';
import VerificationSection from '@/components/home/VerificationSection';
import GlobalPresence from '@/components/home/GlobalPresence';
import ConciergeSection from '@/components/home/ConciergeSection';
import BrandStory from '@/components/home/BrandStory';
import { getListings } from '@/lib/api';
import { LuxuryListing } from '@/types';

export const revalidate = 60;

export default async function HomePage() {
  let listings: LuxuryListing[] = [];
  try {
    listings = await getListings({ limit: 6, featuredOnly: true });
  } catch (e) {
    listings = [];
  }

  return (
    <div className="flex flex-col">
      <HeroSection />
      <EditorialSection />
      <CategoryShowcase />
      <CollectionGrid initialListings={listings} />
      <PrivateAccessSection />
      <OffMarketSection />
      <MembershipSection />
      <NetworkSection />
      <AcquisitionProtocol />
      <VerificationSection />
      <GlobalPresence />
      <ConciergeSection />
      <BrandStory />
    </div>
  );
}
