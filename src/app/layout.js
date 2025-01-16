"use client";
import { poppins } from "@/app/ui/fonts";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import './globals.css'

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const pathname=usePathname();
  const isLogin = pathname === "/login";
  return (
    <html lang="en">
      <body className={`${poppins.className}`} style={{padding:'0',margin:'0'}}>
        {isLogin?
        <Login/>:
        <div className="main-layout">
          <Navbar>{children}</Navbar>         
        </div>
        }
      </body>
    </html>
  );
}