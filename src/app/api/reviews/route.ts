import { NextResponse } from 'next/server';

interface ReviewItem {
  name: string;
  rating: number;
  ago: string;
  text: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return NextResponse.json(
      { error: 'Missing Google Places credentials' },
      { status: 500 }
    );
  }

  try {
    // Using new Places API (v1) instead of legacy
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || data.error);
    }

    if (!data.reviews || data.reviews.length === 0) {
      return NextResponse.json({ reviews: [] });
    }

    // Transform Google reviews to our format
    const reviews: ReviewItem[] = data.reviews.map((review: any) => ({
      name: review.authorAttribution?.displayName || 'Anonymous',
      rating: review.rating || 5,
      ago: review.publishTime ? formatTimeAgo(review.publishTime, locale) : 'Recently',
      text: review.originalText || review.text || '',
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Google Places API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews', reviews: [] },
      { status: 500 }
    );
  }
}

// Helper function to format ISO timestamp to relative time
function formatTimeAgo(publishTime: string, locale: string): string {
  try {
    const publishDate = new Date(publishTime);
    const now = new Date();
    const diffMs = now.getTime() - publishDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (locale === 'nl') {
      if (diffDays === 0) return 'Vandaag';
      if (diffDays === 1) return '1 dag geleden';
      if (diffDays < 7) return `${diffDays} dagen geleden`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weken geleden`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} maanden geleden`;
      return `${Math.floor(diffDays / 365)} jaar geleden`;
    } else {
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    }
  } catch {
    return locale === 'nl' ? 'Recent' : 'Recently';
  }
}
