import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata = {
  title: "Art website",
  description: "Art",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
          <ToastProvider />
        </LanguageProvider>
      </body>
    </html>
  );
}