import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "./store/ReduxProvider";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppShell from "./components/Layout/AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PoojaEV | Premium Electric Scooters & Spare Parts",
  description: "The ultimate destination for next-gen electric mobility. Shop authentic spare parts and high-performance scooters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/10 selection:text-primary`}>
        <ReduxProvider>
          <ThemeProvider>
            <AppShell>
              {children}
            </AppShell>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

