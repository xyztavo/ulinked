"use client";

import Blog from "@/components/app/blog";
import Footer from "@/components/app/footer";
import Linktree from "@/components/app/linktree";
import React from "react";


export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-[10rem]">
        <Linktree />
        <Blog />
      </div>
      <Footer />
    </div>
  );
}
