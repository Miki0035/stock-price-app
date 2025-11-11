"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import AlertCard from "./AlertCard";
import AlertForm from "./AlertForm";
import { cn } from "@/lib/utils";

const Alert = ({ stocks }: { stocks: WatchlistStock[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-2xl text-gray-100">Alerts</h3>
          <Button
            type="button"
            className="yellow-btn w-32 !h-10 p-0 text-sm"
            onClick={() => setOpen(!open)}
          >
            Create Alert
          </Button>
        </div>
        <div className="space-y-5">
          {stocks.map(
            ({ companyName, symbol, currentPrice, percentChange, logo }) => (
              <AlertCard
                key={symbol}
                companyName={companyName}
                currentPrice={currentPrice}
                percentChange={percentChange}
                symbol={symbol}
                logo={logo}
                className={
                  percentChange && percentChange > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              />
            )
          )}
        </div>
      </div>
      {open && (
        <>
          <div
            className={cn(
              "absolute bg-black/30 backdrop-blur-sm top-0 left-0 w-full min-h-screen z-10 transtion-all ease-in-out duration-500",
              open ? "opacity-100" : "opacity-0"
            )}
          />
          <AlertForm isOpen={open} onClose={() => setOpen(false)} />
        </>
      )}
    </>
  );
};

export default Alert;
