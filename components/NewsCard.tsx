import { timeAgo } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const NewsCard = ({
  symbol,
  headline,
  publisher,
  timePublished,
  article,
  href,
}: NewsCardProps) => {
  return (
    <div className="p-5 space-y-5 shadow-2xl shadow-black/30 bg-[#141414]">
      <h5 className="text-sm w-fit text-green-300 rounded-xs bg-green-500/50 px-2 py-1 mb-2">
        {symbol}
      </h5>
      <h4 className="text-lg text-white">{headline}</h4>
      <p className="font-light space-x-3 text-xs">
        <span>{publisher}</span>{" "}
        <span>{timeAgo(timePublished).substring(6)} </span>
      </p>
      <p className="text-sm">{article}</p>
      <Link
        href={href}
        target="_blank"
        className="text-sm text-yellow-300 flex items-center gap-2"
      >
        Read More <ArrowRight className="text-yellow-500" size={18} />
      </Link>
    </div>
  );
};

export default NewsCard;
