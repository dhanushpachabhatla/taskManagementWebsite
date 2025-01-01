"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Replace with actual login check logic
    setIsLoggedIn(userLoggedIn);
    
    if (!userLoggedIn && (pathname === "/dashboard" || pathname === "/profile" || pathname === "/assignedtask")) {
      router.push("/login"); // Redirect to login page
    }

    if (userLoggedIn && (pathname === "/login" || pathname === "/signup")) {
      router.push("/dashboard"); // Redirect to the dashboard if logged in
    }
  }, [pathname, router]);

  const showHeader = pathname !== "/" && pathname !== "/login" && pathname !== "/signup"; // Avoid header on certain pages

  return (
    <>
      {showHeader && <Header />}
      {isLoggedIn || pathname === "/" || pathname === "/login" || pathname === "/signup" ? (
        children 
      ) : (
        <div>Please log in to access this page.</div> 
      )}
      <Footer />
    </>
  );
}
