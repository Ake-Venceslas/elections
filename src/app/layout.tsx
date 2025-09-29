import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MboaVote",
  description: "Election voting platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
      return (
        <ClerkProvider>
          <html lang="en">
            <head>
              <link rel="icon" href="/Voting.jpg" type="image/jpeg" />
              {/* Link preview: Open Graph & Twitter */}
              <meta property="og:title" content="MboaVote - Plateforme de vote en ligne" />
              <meta property="og:description" content="Votez en ligne pour les élections présidentielles du Cameroun. Plateforme sécurisée, rapide et transparente." />
              <meta property="og:image" content="/Voting.jpg" />
              <meta property="og:url" content="https://mboavote.com/" />
              <meta property="og:type" content="website" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="MboaVote - Plateforme de vote en ligne" />
              <meta name="twitter:description" content="Votez en ligne pour les élections présidentielles du Cameroun." />
              <meta name="twitter:image" content="/Voting.jpg" />
            </head>
            <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
              {/* ...existing code... */}
              <main>{children}</main>
            </body>
          </html>
        </ClerkProvider>
      );
}