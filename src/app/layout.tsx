import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider, ThemeProvider } from '@/context';
import { Toaster } from 'react-hot-toast';
import { CookieConsent } from '@/components/shared';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'ProstutiAcademy - তোমার EXAM আমাদের প্রস্তুতি',
    template: '%s | ProstutiAcademy',
  },
  description: 'West Bengal HS পরীক্ষার জন্য সেরা প্রস্তুতি - সম্পূর্ণ ফ্রি! বাংলা ও English-এ Exam-oriented questions, mock tests, এবং PYQ analysis।',
  keywords: [
    'WB HS Exam',
    'West Bengal',
    'Higher Secondary',
    'HS Arts',
    'Bengali Medium',
    'Question Bank',
    'Mock Test',
    'PYQ',
    'Previous Year Questions',
    'WBCHSE',
    'Class 11',
    'Class 12',
  ],
  authors: [{ name: 'ProstutiAcademy' }],
  creator: 'ProstutiAcademy',
  publisher: 'ProstutiAcademy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ProstutiAcademy - তোমার EXAM আমাদের প্রস্তুতি',
    description: 'West Bengal HS পরীক্ষার জন্য সেরা প্রস্তুতি - সম্পূর্ণ ফ্রি!',
    url: 'https://prostutiacademy.web.app',
    siteName: 'ProstutiAcademy',
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProstutiAcademy - তোমার EXAM আমাদের প্রস্তুতি',
    description: 'West Bengal HS পরীক্ষার জন্য সেরা প্রস্তুতি - সম্পূর্ণ ফ্রি!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Google Fonts for Bengali */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#ffffff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#ffffff',
                  },
                },
              }}
            />
            <CookieConsent />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
