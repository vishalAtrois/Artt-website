import "./globals.css";

export const metadata = {
  title: "Next Starter",
  description: "Next.js + Tailwind Starter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
import { Playfair_Display } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600']
})