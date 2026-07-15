import { NextResponse } from 'next/server';

interface ReviewItem {
  name: string;
  rating: number;
  ago: string;
  text: string;
}

interface PlacesV1Review {
  rating?: number;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  text?: { text?: string } | string;
  originalText?: { text?: string } | string;
  authorAttribution?: {
    displayName?: string;
  };
}

interface PlacesV1Response {
  reviews?: PlacesV1Review[];
  error?: {
    message?: string;
  };
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
    const url = `https://places.googleapis.com/v1/places/${placeId}`;

    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
          'reviews.rating,reviews.publishTime,reviews.relativePublishTimeDescription,reviews.text,reviews.originalText,reviews.authorAttribution.displayName',
      },
      cache: 'no-store',
    });
    const data: PlacesV1Response = await response.json();

    if (data.error) {
      throw new Error(data.error.message || data.error);
    }

    if (!data.reviews || data.reviews.length === 0) {
      return NextResponse.json({ reviews: [] });
    }

    // Transform Google reviews to our format
    const reviews: ReviewItem[] = data.reviews.map((review) => ({
      name: review.authorAttribution?.displayName || 'Anonymous',
      rating: review.rating || 5,
      ago:
        review.relativePublishTimeDescription ||
        (review.publishTime ? formatTimeAgo(review.publishTime, locale) : locale === 'nl' ? 'Recent' : 'Recently'),
      text: getReviewText(review),
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

function getReviewText(review: PlacesV1Review): string {
  const original = review.originalText;
  const text = review.text;

  if (typeof original === 'string' && original.trim().length > 0) {
    return original;
  }
  if (typeof original === 'object' && original?.text) {
    return original.text;
  }
  if (typeof text === 'string' && text.trim().length > 0) {
    return text;
  }
  if (typeof text === 'object' && text?.text) {
    return text.text;
  }

  return '';
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
