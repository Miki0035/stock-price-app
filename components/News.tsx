import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import NewsCard from "./NewsCard";

const News = ({ news }: { news: MarketNewsArticle[] }) => {
  return (
    <section className="w-full ">
      <h3 className="font-bold text-2xl text-gray-100 mb-4">News </h3>
      <div className="grid grid-cols-1 gap-x-3 gap-y-5 lg:grid-cols-3 xl:grid-cols-4">
        {/* News items would go here */}
        {news.map(
          ({ id, headline, source, url, datetime, summary, related }) => (
            <NewsCard
              key={id}
              publisher={source}
              timePublished={datetime}
              headline={headline}
              article={summary}
              href={url}
              symbol={related}
            />
          )
        )}
      </div>
    </section>
  );
};

export default News;
