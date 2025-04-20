"use client";

import Blog from "@/components/app/blog";
import Footer from "@/components/app/footer";
import Linktree from "@/components/app/linktree";
import React from "react";
import config from "../config";

export default function Home() {
  return (
    <div>
        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-[10rem]">
              <Linktree />
              {config.options.blog && <Blog />}
            </div>
            {/* gambiarra judaica */}
            {config.options.blog && <Footer />}
          </div>
        </div>
   
    </div>
  );
}
