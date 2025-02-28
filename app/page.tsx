"use client";

import Blog from "@/components/blog";
import Linktree from "@/components/linktree";
import config from "@/config";
import React from "react";


export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[10rem]">
        <Linktree />
        <Blog />
      </div>
      <h2 className="my-10 text-zinc-400 text-center">{config.footer}</h2>
    </div>
  );
}
