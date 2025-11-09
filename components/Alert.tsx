import React from "react";
import { Button } from "./ui/button";
import AlertCard from "./AlertCard";

const Alert = ({ stocks }: { stocks: WatchlistStock[] }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-2xl text-gray-100">Alerts</h3>
        <Button type="button" className="yellow-btn w-32 !h-10 p-0 text-sm">
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
  );
};

export default Alert;
