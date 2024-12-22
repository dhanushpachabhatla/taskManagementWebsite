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

  // Check if the user is logged in (from localStorage or your state management)
  useEffect(() => {
    // Example: Check LocalStorage for a logged-in status
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Replace with actual login check logic
    setIsLoggedIn(userLoggedIn);

    // Redirect to login if user is not logged in and trying to access protected pages
    if (!userLoggedIn && (pathname === "/dashboard" || pathname === "/profile" /* Add more protected pages here */)) {
      router.push("/login"); // Redirect to login page
    }

    // Redirect to dashboard if user is logged in and trying to access login or signup page
    if (userLoggedIn && (pathname === "/login" || pathname === "/signup")) {
      router.push("/dashboard"); // Redirect to the dashboard if logged in
    }
  }, [pathname, router]);

  const showHeader = pathname !== "/" && pathname !== "/login" && pathname !== "/signup"; // Avoid header on certain pages

  return (
    <>
      {showHeader && <Header />}
      {isLoggedIn || pathname === "/" || pathname === "/login" || pathname === "/signup" ? (
        children // Render the children if logged in or on public pages
      ) : (
        <div>Please log in to access this page.</div> // Show a message or redirect if not logged in
      )}
      <Footer />
    </>
  );
}
