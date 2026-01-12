import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script, Great_Vibes, Alex_Brush } from "next/font/google"; // Import fonts
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const dancing = Dancing_Script({ subsets: ["latin"], variable: '--font-dancing' });
const greatVibes = Great_Vibes({ weight: '400', subsets: ["latin"], variable: '--font-great-vibes' });
const alexBrush = Alex_Brush({ weight: '400', subsets: ["latin"], variable: '--font-alex-brush' });

export const metadata: Metadata = {
  title: "Flower Sight - Shop Hoa Tươi",
  description: "Trao gửi yêu thương",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable} ${dancing.variable} ${greatVibes.variable} ${alexBrush.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}