import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Book Club Management System',
    default: 'Acme Book Club Management System',
  },
  description: 'This is the Acme Book Club Management System where users can join book clubs, participate in discussions, and manage their reading lists.',
  metadataBase: new URL('https://acme.com/'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
