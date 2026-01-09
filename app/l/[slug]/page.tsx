export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';

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

  console.log('Slug:', slug);

  try {
    // Call backend API with redirect: 'manual' to get the redirect response
    const response = await fetch(`${UmimicConfig.apiBaseUrl}/short/${slug}`, {
      redirect: 'manual',
    });

    console.log('Response status:', response.status);

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

    // If not handled, display friendly message
    return (
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <p>Hey! maybe the link expired, you can ask for whoever who generated this link to generate another one for you.</p>
      </div>
    );
  } catch (error) {
    console.log('Error:', error);
    return (
      <div className="flex items-center justify-center min-h-screen p-4 text-center">
        <p>Hey! maybe the link expired, you can ask for whoever who generated this link to generate another one for you.</p>
      </div>
    );
  }
}