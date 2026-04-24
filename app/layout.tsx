import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/ui/LenisProvider";
import { CapabilityProvider } from "@/components/ui/CapabilityProvider";
import { Cursor } from "@/components/ui/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05070e",
};

export const metadata: Metadata = {
  title: "Relyance Solutions — We build the web. You run your business.",
  description:
    "Relyance Solutions designs, builds, hosts, and manages beautiful websites for businesses. Websites, hosting, email, security — handled.",
  metadataBase: new URL("https://relyancesolutions.com"),
  openGraph: {
    title: "Relyance Solutions — We build the web. You run your business.",
    description:
      "Websites, hosting, email, security — handled. Every pixel and every packet.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} ${fraunces.variable}`}
    >
      <body>
        <CapabilityProvider>
          <LenisProvider>
            <Cursor />
            <Navbar />
            {children}
            <Footer />
          </LenisProvider>
        </CapabilityProvider>
      </body>
    </html>
  );
}
