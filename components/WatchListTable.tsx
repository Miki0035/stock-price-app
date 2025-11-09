import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { formatMarketCap } from "@/lib/utils";

const WatchListTable = ({ stocks }: { stocks: WatchlistStock[] }) => {
  return (
    <div>
      <div className="flex justify-between items-center my-2">
        <h3 className="font-bold text-3xl text-gray-100">Watchlist</h3>
        <Button type="button" className="yellow-btn w-32 h-5 p-0 text-sm">
          Add Stock
        </Button>
      </div>
      <Table className="text-md">
        <TableHeader>
          <TableRow className="rounded-t-lg bg-[#212328]">
            <TableHead></TableHead>
            <TableHead className="text-left text-gray-400">Company</TableHead>
            <TableHead className=" text-gray-400">Symbol</TableHead>
            <TableHead className=" text-gray-400">Price</TableHead>
            <TableHead className="text-right text-gray-400">Change</TableHead>
            <TableHead className="text-right text-gray-400">
              Market Cap
            </TableHead>
            <TableHead className="text-right text-gray-400">
              P/E Ratio
            </TableHead>
            <TableHead className="text-center text-gray-400">Alert</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-lg">
          {stocks.map(
            ({
              symbol,
              companyName,
              currentPrice,
              percentChange,
              marketCap,
              peRatio,
            }) => (
              <TableRow key={symbol} className="cursor-pointer">
                <TableCell>
                  <Star />
                </TableCell>
                <TableCell className="text-white font-medium">
                  {companyName}
                </TableCell>
                <TableCell className="text-white">{symbol}</TableCell>
                <TableCell className="text-white">${currentPrice}</TableCell>
                <TableCell className="text-right">
                  {percentChange! < 0 ? (
                    <span className="text-red-500">{percentChange}%</span>
                  ) : (
                    <span className="text-green-400">{percentChange}%</span>
                  )}
                </TableCell>
                <TableCell className="text-white text-center">
                  {formatMarketCap(marketCap || 0)}
                </TableCell>
                <TableCell className="text-white text-center">
                  {peRatio?.toFixed(1)}
                </TableCell>
                <TableCell className="text-center">
                  <Button className="cursor-pointer text-white bg-[#FF824333] hover:bg-[#FF824333]/100 text-red-400">
                    Add Alert
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default WatchListTable;
