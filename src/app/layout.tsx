import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';

export const metadata: Metadata = {
  title: 'VoltShare — Community EV Charging Sharing Network',
  description: 'Share your private residential wallbox charger and earn passive income, or discover verified driveway charging slots nearby.',
  keywords: ['EV charging', 'community charging', 'Type 2', 'driveway charger', 'VoltShare', 'TheWebVale'],
  openGraph: {
    title: 'VoltShare — Community EV Charging Sharing Network',
    description: 'Turn your idle EV wallbox into passive revenue. Real-time slot booking, live telemetry, and community charging mesh.',
    url: 'https://voltshare.thewebvale.com',
    siteName: 'VoltShare',
    type: 'website',
  },
};

export const viewport: Viewport = {
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
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#06090e] text-slate-100 antialiased selection:bg-emerald-500 selection:text-white flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
