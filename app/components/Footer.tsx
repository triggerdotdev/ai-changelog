import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { GitHub } from "./logos/GitHub";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-screen py-4 border-t bg-background">
      <div className="flex flex-col sm:flex-row gap-y-4 items-center sm:items-end lg:items-center justify-between h-full pl-4 pr-3 text-dimmed text-sm">
        <div className="flex flex-col w-full lg:flex-row sm:items-baseline gap-0 sm:gap-2">
          <p className="font-medium text-sm sm:text-base">How does it work?</p>
          <p className="text-xs sm:text-sm">
            This site is powered by{" "}
            <Link
              href="https://trigger.dev"
              target="_blank"
              className="hover:text-indigo-500 text-primary font-normal"
            >
              Trigger.dev
            </Link>
            , an open source background jobs framework.
          </p>
        </div>
        <div className="flex items-center gap-6 justify-between sm:justify-end w-full lg:w-fit">
          <Link
            href="https://trigger.dev/showcase/projects/auto-changelog"
            target="_blank"
          >
            <Button
              variant="secondary"
              size="sm"
              className="group text-dimmed font-normal whitespace-nowrap space-x-1"
            >
              Explore the code
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
};
