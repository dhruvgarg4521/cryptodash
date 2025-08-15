"use client";

import React, { useEffect, useState } from "react";
import { CoinChart } from "./coinChart";
import useStore from "@/store/useStore";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  BotIcon,
  FacebookIcon,
  LinkIcon,
  ListCollapseIcon,
  ScrollTextIcon,
  SmileIcon,
  TwitterIcon,
} from "lucide-react";

export default function CoinDetails({
  intialData,
  id,
}: {
  intialData: any;
  id: string;
}) {
  const [coinDetailsData, setCoinDetailsData] = useState(
    intialData.coinDetails
  );

  const { coinDetails, loadingCoinDetails, errorCoinDetails } = useStore(
    (state) => ({
      coinDetails: state.coinDetails,
      loadingCoinDetails: state.loadingCoinDetails,
      errorCoinDetails: state.errorCoinDetails,
    })
  );

  useEffect(() => {
    if (!loadingCoinDetails && coinDetails) {
      setCoinDetailsData(coinDetails);
    }
  }, [loadingCoinDetails, coinDetails, id]);

  if (errorCoinDetails) {
    toast.error("Error Fetching Coin Details");
  }

  // Safely get nested properties
  const marketData = coinDetailsData?.market_data || {};
  const links = coinDetailsData?.links || {};
  const maxSupply = marketData.max_supply;
  const circulatingSupply = marketData.circulating_supply || 0;
  const supplyPercentage = maxSupply ? ((circulatingSupply / maxSupply) * 100) : 0;

  return (
    <div className="p-6 flex flex-col lg:flex-row gap-4">
      <div className="w-full max-w-3xl lg:w-6/12 lg:sticky top-0 self-center lg:self-auto">
        <CoinChart
          id={id}
          coinData={coinDetailsData}
          initialData={intialData.chartData}
        />
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <ListCollapseIcon />
              Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Market Cap Rank:</strong>{" "}
              {coinDetailsData?.market_cap_rank || "N/A"}
            </p>
            <p>
              <strong>Max Supply:</strong>{" "}
              {maxSupply || "No Limits"}
            </p>
            <p>
              <strong>Circulating Supply:</strong>{" "}
              {circulatingSupply.toLocaleString()}
            </p>
            <p>
              <strong>Supply:</strong>{" "}
              {supplyPercentage.toFixed(2)}%
            </p>
            <p>
              <strong>Hashing Algorithm:</strong>{" "}
              {coinDetailsData?.hashing_algorithm || "N/A"}
            </p>
            <p>
              <strong>Genesis Date:</strong> {coinDetailsData?.genesis_date || "N/A"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <SmileIcon />
              Sentiments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Votes Up:</strong>{" "}
              {coinDetailsData?.sentiment_votes_up_percentage || 0}%
            </p>
            <p>
              <strong>Votes Down:</strong>
              {coinDetailsData?.sentiment_votes_down_percentage || 0}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <LinkIcon /> Links
            </CardTitle>
          </CardHeader>
          <CardContent className="gap-2 flex flex-wrap">
            {links.whitepaper && (
              <a
                href={links.whitepaper}
                target="_blank"
                className="text-blue-500"
              >
                <Badge className="py-2 px-4">
                  <ScrollTextIcon className="w-4 h-4 mr-2" /> Whitepaper
                </Badge>
              </a>
            )}
            {links.twitter_screen_name && (
              <a
                href={
                  "https://x.com/" + links.twitter_screen_name
                }
                target="_blank"
                className="text-blue-500"
              >
                <Badge className="py-2 px-4">
                  <TwitterIcon className="w-4 h-4 mr-2" />
                  Twitter
                </Badge>
              </a>
            )}
            {links.facebook_username && (
              <a
                href={
                  "https://facebook.com/" +
                  links.facebook_username
                }
                target="_blank"
                className="text-blue-500"
              >
                <Badge className="py-2 px-4">
                  <FacebookIcon className="w-4 h-4 mr-2" />
                  Facebook
                </Badge>
              </a>
            )}
            {links.subreddit_url && (
              <a
                href={links.subreddit_url}
                target="_blank"
                className="text-blue-500"
              >
                <Badge className="py-2 px-4">
                  <BotIcon className="w-4 h-4 mr-2" />
                  Reddit
                </Badge>
              </a>
            )}
          </CardContent>
        </Card>
      </div>
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{coinDetailsData.description.en}</p>
        </CardContent>
      </Card> */}
    </div>
  );
}
