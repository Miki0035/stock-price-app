import Header from "@/components/Header";
import React, { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen text-gray-400">
      <Header />
      <div className="container py-10">{children}</div>
    </main>
  );
};
