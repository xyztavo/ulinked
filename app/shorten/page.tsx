'use client';

import { useState } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Card, CardBody, CardHeader } from '@heroui/card';
import axios from 'axios';

import { UmimicConfig } from '@/config/config.umimic';

export default function ShortenPage() {
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSlug = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    const finalSlug = slug || generateSlug();

    try {
      const response = await axios.post(`${UmimicConfig.apiBaseUrl}/short/${finalSlug}`, {
        redirect: url,
      });

      if (response.status === 201) {
        setShortUrl(`${window.location.origin}/l/${finalSlug}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');

      textArea.value = shortUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Shorten Link</h1>
        </CardHeader>
        <CardBody>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              required
              label="URL to shorten"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Input
              label="Custom slug (optional)"
              placeholder="mylink"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <Button className="w-full" color="primary" isLoading={loading} type="submit">
              {loading ? 'Shortening...' : 'Shorten'}
            </Button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {shortUrl && (
            <div className="mt-4">
              <p className="text-green-500">Short link created!</p>
              <div className="flex items-center gap-2 mt-2">
                <Input readOnly value={shortUrl} />
                <Button color="secondary" onPress={copyToClipboard}>
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}