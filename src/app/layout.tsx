import type { Metadata } from "next";
import "./globals.css";
import Header from "@/component/common/header";
import Footer from "@/component/common/footer";

export const metadata: Metadata = {
  title: '일상 OFF, OFFPICK',
  description:
    'OFF, 일상을 끄고, 비일상을 꺼내다.',
  keywords: ['축제', '팝업', '팝업스토어', '데이트'],
  robots: 'index, follow',
  openGraph: {
    title: '일상 OFF, OFFPICK',
    description:
      'OFF, 일상을 끄고, 비일상을 꺼내다.',
    url: 'https://offpocket.vercel.app',
    type: 'website',
    images: [
      {
        url: 'https://offpocket.vercel.app/og_thumnail.png',
        width: 1200,
        height: 630,
        alt: '대표 이미지',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
