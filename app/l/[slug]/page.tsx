export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';

import { UmimicConfig } from '@/config/config.umimic';

function RedirectPage({ url }: { url: string }) {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${url}`} />
      </head>
      <body>
        <p>Redirecting to <a href={url}>{url}</a>...</p>
      </body>
    </html>
  );
}

export default async function ShortLinkPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Test redirect for debugging
  if (slug === 'test') {
    return <RedirectPage url="https://google.com" />;
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
        return <RedirectPage url={location} />;
      }
    } else if (response.status === 200) {
      // Assume body is { redirect: string }
      const data = await response.json();
      if (data.redirect) {
        return <RedirectPage url={data.redirect} />;
      }
    }

    // If not handled, not found
    notFound();
  } catch (error) {
    console.log('Error:', error);
    notFound();
  }
}