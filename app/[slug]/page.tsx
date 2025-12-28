export const dynamic = 'force-dynamic';

import { notFound, redirect } from 'next/navigation';

import { UmimicConfig } from '@/config/config.umimic';

export default async function ShortLinkPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Test redirect for debugging
  if (slug === 'test') {
    redirect('https://google.com');
  }

  try {
    // Call backend API with redirect: 'manual' to get the redirect response
    const response = await fetch(`${UmimicConfig.apiBaseUrl}/${slug}`, {
      redirect: 'manual',
    });

    if (response.status === 302) {
      const location = response.headers.get('location');

      if (location) {
        redirect(location);
      }
    }

    // If not 302 or no location, it's not found or expired
    notFound();
  } catch (error) {
    notFound();
  }
}