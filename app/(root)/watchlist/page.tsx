import Alert from "@/components/Alert";
import News from "@/components/News";
import WatchListTable from "@/components/WatchListTable";
import { getNews, getStocks } from "@/lib/actions/finnhub.actions";
import { POPULAR_STOCK_SYMBOLS } from "@/lib/constants";
import React from "react";

const Watchlist = async () => {
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  const stocks = await getStocks();
  const news = await getNews(POPULAR_STOCK_SYMBOLS);
  return (
    <div className="flex min-h-screen home-wrapper ">
      <section className="grid w-full gap-8 home-section">
        {/* Table */}
        <div className="col-span-2">
          <WatchListTable stocks={stocks} />
        </div>
        {/* Alert Section */}
        <div className="col-span-2 xl:col-span-1">
          <Alert stocks={stocks.slice(0, 5)} />
        </div>
      </section>
      {/* News section */}
      <News news={news} />
    </div>
  );
};

export default Watchlist;
