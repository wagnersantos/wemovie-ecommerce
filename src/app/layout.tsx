import '@/styles/globals.css';
import { Header } from '@/components/Header';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.className} suppressHydrationWarning data-lt-installed="true">
      <body className='bg-[#1b1b2f]'>
        <main className="min-h-screen flex justify-between md:items-center flex-col text-white">
          <div className='px-4 h-[calc(100%-3.75rem)] md:px-0 md:w-[calc(100%-11.25rem)] md:h-[calc(100%-2.5rem)]'>
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
