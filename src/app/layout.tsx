import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Ruta 9 | The Patagonian Burger Experience",
  description: "High-end burger menu and gamified loyalty platform for Ruta 9 Magallanes.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ruta 9 Super App",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`bg-[#0D0D12] text-[#FAF9F6] ${spaceGrotesk.variable} ${instrumentSerif.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu', e => e.preventDefault());
              document.addEventListener('dragstart', e => e.preventDefault());
              document.addEventListener('selectstart', e => e.preventDefault());
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
