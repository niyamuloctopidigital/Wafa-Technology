import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

export const metadata: Metadata = {
  title: 'Wafa Technology | AI-Driven Software Solutions',
  description: 'Transform your business with cutting-edge software development, AI automation, full stack solutions, and mobile app development. Expert tech consultants for the future.',
  keywords: ['software development', 'AI automation', 'full stack development', 'mobile app development', 'web development'],
  authors: [{ name: 'Wafa Technology' }],
  openGraph: {
    title: 'Wafa Technology | AI-Driven Software Solutions',
    description: 'Transform your business with cutting-edge software development, AI automation, full stack solutions, and mobile app development.',
    type: 'website',
    url: 'https://wafatechnology.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var stored = localStorage.getItem('wafa-theme');
              if (stored === 'light' || stored === 'dark') {
                document.documentElement.className = document.documentElement.className.replace(/dark|light/g, '') + ' ' + stored;
              } else {
                var hour = new Date().getHours();
                var auto = (hour >= 6 && hour < 18) ? 'light' : 'dark';
                document.documentElement.className = document.documentElement.className.replace(/dark|light/g, '') + ' ' + auto;
              }
            } catch(e) {}
          })();
        `}} />
        <link rel="icon" href="https://wafatechnology.com/wp-content/uploads/2025/11/WF-LOGO1-2-3.png" />
        <link rel="apple-touch-icon" href="https://wafatechnology.com/wp-content/uploads/2025/11/WF-LOGO1-2-3.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Wafa Technology',
              url: 'https://wafatechnology.com',
              logo: 'https://wafatechnology.com/wp-content/uploads/2025/11/Frame-1597879963.png',
              description: 'AI-Driven Software Solutions',
              sameAs: [
                'https://twitter.com/wafatechnology',
                'https://linkedin.com/company/wafatechnology',
                'https://github.com/wafatechnology',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                email: 'info@wafatechnology.com',
              },
            }),
          }}
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
