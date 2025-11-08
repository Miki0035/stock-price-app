import Alert from "@/components/Alert";
import WatchListTable from "@/components/WatchListTable";
import { getStocks } from "@/lib/actions/finnhub.actions";
import React from "react";

const Watchlist = async () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  const stocks = await getStocks();
  return (
    <div className="flex min-h-screen home-wrapper ">
      <section className="grid w-full gap-8 home-section">
        {/* Table */}
        <div className="col-span-2">
          <WatchListTable stocks={stocks} />
        </div>
        {/* Alert Section */}
        <div>
          <Alert stocks={stocks.slice(0, 5)} />
        </div>
        <div></div>
        {/* News section */}
        <div></div>
      </section>
    </div>
  );
};

export default Watchlist;
