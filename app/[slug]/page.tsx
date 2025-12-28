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
    const response = await fetch(`${UmimicConfig.apiBaseUrl}/short/${slug}`, {
      redirect: 'manual',
    });

    if (response.status === 302) {
      const location = response.headers.get('location');

      if (location) {
        redirect(location);
      }
    } else if (response.status === 200) {
      // Assume body is { redirect: string }
      const data = await response.json();
      if (data.redirect) {
        redirect(data.redirect);
      }
    }

    // If not handled, not found
    notFound();
  } catch (error) {
    notFound();
  }
}