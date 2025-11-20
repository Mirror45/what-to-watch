import 'react-toastify/dist/ReactToastify.css';
import './styles/main.css';

import type { Metadata } from 'next';

import SvgSprite from '@/components/SvgSprite';
import { APP_NAME, APP_URL } from '@/config';

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — online cinema`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    'Watch movies online on "What to Watch". Browse by genres, promo films, and personalized recommendations.',
  keywords: ['online cinema', 'movies', 'series', 'watch online', 'genres', 'new releases'],
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: APP_NAME,
    title: `${APP_NAME} — online cinema`,
    description: 'Watch the best movies online. Easy navigation by genres and curated promo films.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SvgSprite />
        {children}
      </body>
    </html>
  );
}
