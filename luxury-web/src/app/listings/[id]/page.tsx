import { notFound } from 'next/navigation';
import { getListingById } from '@/lib/api';
import ListingDetailClient from '@/components/listings/ListingDetailClient';
import { FEATURED_LISTINGS } from '@/lib/constants';

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 30;

export default async function ListingDetailPage({ params }: Props) {
  const { id } = await params;
  let listing = await getListingById(id);

  // If not found in API, check if it matches a custom curated id or fallback to first featured item
  if (!listing) {
    listing = FEATURED_LISTINGS.find((l) => l.id === id) || FEATURED_LISTINGS[0];
  }

  if (!listing) {
    notFound();
  }

  return <ListingDetailClient listing={listing} />;
}
