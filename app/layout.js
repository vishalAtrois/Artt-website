import "./globals.css";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: "Art website",
  description: "Art",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}