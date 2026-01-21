import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "Ticketmaster - Official Ticket Marketplace",
  description: "Buy tickets for concerts, sports, arts, theater, family events, and more. Find event tickets at Ticketmaster.com",
  keywords: "tickets, concerts, sports, events, live events, theater, family",
  openGraph: {
    title: "Ticketmaster - Official Ticket Marketplace",
    description: "Buy tickets for concerts, sports, arts, theater, family events, and more.",
    type: "website",
    siteName: "Ticketmaster",
  },
};

import { SupportChat } from "@/components/common/SupportChat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StyledComponentsRegistry>
          {children}
          <SupportChat />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
