"use client";

import Blog from "@/components/blog";
import Linktree from "@/components/linktree";
import React from "react";


export default function Home() {

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <Linktree />
      <Blog />
    </div>
  );
}
