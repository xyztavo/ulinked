"use client";

import Linktree from "@/components/linktree";
import config from "@/config";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@heroui/react";


export default function Home() {

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <Linktree />
      {config.blog && <div>
        <Card className="max-w-[340px]">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={config.avatarImgSrc}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">{config.nickname}</h4>
                <h5 className="text-small tracking-tight text-default-400">{config.nickname}</h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <p>Frontend developer and UI/UX enthusiast. Join me on this coding adventure!</p>
            <span className="pt-2">
              #FrontendWithZoey
              <span aria-label="computer" className="py-2" role="img">
                💻
              </span>
            </span>
          </CardBody>
          <CardFooter className="gap-3 font-semibold text-default-400 text-small">
            fgdg
          </CardFooter>
        </Card>
      </div>}
    </div>
  );
}
