"use client"
import Blog from "@/components/blog/blog";
import Footer from "@/components/app/footer";
import Linktree from "@/components/app/linktree";
import React from "react";
import config from "../config";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex flex-col items-center justify-center my-10 gap-16 ">
        <Linktree />
        {config.options.blog && <Blog />}
      </div>
      <Footer />
    </div>
  );
}
