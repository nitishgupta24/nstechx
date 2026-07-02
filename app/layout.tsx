import { ThemeProvider } from 'next-themes';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          
          {children}
          
        </ThemeProvider>
      </body>
    </html>
  );
}