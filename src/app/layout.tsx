// // ============ src/app/layout.tsx ============
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { Providers } from "./providers";
// import { cn } from "@/lib/utils/cn";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";

// const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// export const metadata: Metadata = {
//   title: "EcoSpark Hub | Share Sustainable Ideas",
//   description:
//     "Join a community of innovators working together to create a sustainable future",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={cn(
//           "min-h-screen bg-background font-sans antialiased",
//           inter.variable,
//         )}
//       >
//         <Providers>
//           <div className="flex min-h-screen flex-col">
//             {/* <div className="mb-10">
//               <Navbar />
//             </div> */}
//             <Navbar />
//             <main className="flex-1">{children}</main>
//             <Footer />
//           </div>
//         </Providers>
//       </body>
//     </html>
//   );
// }

// ============ src/app/layout.tsx ============
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/lib/utils/cn";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "EcoSpark Hub | Share Sustainable Ideas",
  description:
    "Join a community of innovators working together to create a sustainable future",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
        )}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
