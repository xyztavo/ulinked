"use client"
import Blog from "@/components/blog/blog";
import Footer from "@/components/app/footer";
import Linktree from "@/components/app/linktree";
import React from "react";
import config from "../config/config";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-[10rem]">
        <Linktree />
        {config.options.blog && <Blog />}
      </div>
      <Footer />
    </div>
  );
}
