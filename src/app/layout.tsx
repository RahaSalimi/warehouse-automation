"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import theme from "./theme";
import { ThemeProvider } from '@mui/material/styles';



const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Cozey Warehouse",
//   description: "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppRouterCacheProvider><ThemeProvider theme={theme}>
          {children}</ThemeProvider>
        </AppRouterCacheProvider></body>
    </html>
  );
}
