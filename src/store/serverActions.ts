"use server";

import axios from "axios";
import { redirect } from "next/navigation";

const API_KEY = process.env.COINGECKO_API_KEY;

// Fallback data for when API is unavailable
const fallbackGlobalData = {
  data: {
    active_cryptocurrencies: 2500,
    total_market_cap: { usd: 2500000000000 },
    total_volume: { usd: 80000000000 },
    market_cap_percentage: { btc: 50, eth: 20 },
    market_cap_change_percentage_24h_usd: 2.5,
  },
};

const fallbackCoinsData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 45000,
    market_cap: 900000000000,
    market_cap_rank: 1,
    fully_diluted_valuation: 950000000000,
    total_volume: 25000000000,
    high_24h: 46000,
    low_24h: 44000,
    price_change_24h: 1000,
    price_change_percentage_24h: 2.27,
    market_cap_change_24h: 20000000000,
    market_cap_change_percentage_24h: 2.27,
    circulating_supply: 19500000,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69000,
    ath_change_percentage: -34.78,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 67.81,
    atl_change_percentage: 66347.52,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: new Date().toISOString(),
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3000,
    market_cap: 360000000000,
    market_cap_rank: 2,
    fully_diluted_valuation: 360000000000,
    total_volume: 15000000000,
    high_24h: 3100,
    low_24h: 2900,
    price_change_24h: 50,
    price_change_percentage_24h: 1.69,
    market_cap_change_24h: 6000000000,
    market_cap_change_percentage_24h: 1.69,
    circulating_supply: 120000000,
    total_supply: 120000000,
    max_supply: null,
    ath: 4800,
    ath_change_percentage: -37.5,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 692647.52,
    atl_date: "2015-10-20T00:00:00.000Z",
    roi: null,
    last_updated: new Date().toISOString(),
  },
];

const fallbackTrendingData = [
  {
    item: {
      id: "bitcoin",
      coin_id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      market_cap_rank: 1,
      thumb: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
      small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
      large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      slug: "bitcoin",
      price_btc: 1,
      score: 0,
    },
  },
  {
    item: {
      id: "ethereum",
      coin_id: 279,
      name: "Ethereum",
      symbol: "ETH",
      market_cap_rank: 2,
      thumb: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      small: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      slug: "ethereum",
      price_btc: 0.066666,
      score: 1,
    },
  },
];

function handleApiError(error: any, fallbackData: any) {
  // If it's a rate limit error (429) or network error, return fallback data
  if (error?.response?.status === 429 || error?.code === "ECONNREFUSED" || error?.code === "ENOTFOUND") {
    return fallbackData;
  }
  
  // For other errors, still return fallback data
  return fallbackData;
}

export async function fetchGlobalMarketCap() {
  try {
    const headers: any = {};
    if (API_KEY) {
      headers.Authorization = `Bearer ${API_KEY}`;
    }

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/global",
      { headers }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, fallbackGlobalData);
  }
}

export async function fetchCoins(
  page = 1,
  per_page = 100,
  order = "market_cap_desc"
) {
  try {
    const headers: any = {};
    if (API_KEY) {
      headers.Authorization = `Bearer ${API_KEY}`;
    }

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?price_change_percentage=24h",
      {
        headers,
        params: {
          vs_currency: "usd",
          order: order,
          per_page: per_page,
          page,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error, fallbackCoinsData);
  }
}

export async function fetchCoinDetails(id: string) {
  try {
    const headers: any = {};
    if (API_KEY) {
      headers.Authorization = `Bearer ${API_KEY}`;
    }

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true`,
      { headers }
    );
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      redirect("/404");
    } else {
      // Return better fallback data for popular coins
      const fallbackCoinData = getFallbackCoinData(id);
      return handleApiError(error, fallbackCoinData);
    }
  }
}

// Helper function to get better fallback data for popular coins
function getFallbackCoinData(id: string) {
  const popularCoins: { [key: string]: any } = {
    bitcoin: {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      description: { en: "Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the name Satoshi Nakamoto." },
      market_data: {
        current_price: { usd: 45000 },
        market_cap: { usd: 900000000000 },
        total_volume: { usd: 25000000000 },
        high_24h: { usd: 46000 },
        low_24h: { usd: 44000 },
        price_change_24h: 1000,
        price_change_percentage_24h: 2.27,
        market_cap_change_24h: 20000000000,
        market_cap_change_percentage_24h: 2.27,
        price_change_percentage_7d_in_currency: { usd: 5.2 },
        price_change_percentage_30d_in_currency: { usd: 12.5 },
        price_change_percentage_1y_in_currency: { usd: 45.8 },
      },
      market_cap_rank: 1,
      hashing_algorithm: "SHA-256",
      genesis_date: "2009-01-03",
      sentiment_votes_up_percentage: 85,
      sentiment_votes_down_percentage: 15,
      links: {
        whitepaper: "https://bitcoin.org/bitcoin.pdf",
        twitter_screen_name: "bitcoin",
        facebook_username: "bitcoin",
        subreddit_url: "https://reddit.com/r/bitcoin",
      },
      image: { large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
      last_updated: new Date().toISOString(),
    },
    ethereum: {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      description: { en: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform." },
      market_data: {
        current_price: { usd: 3000 },
        market_cap: { usd: 360000000000 },
        total_volume: { usd: 15000000000 },
        high_24h: { usd: 3100 },
        low_24h: { usd: 2900 },
        price_change_24h: 50,
        price_change_percentage_24h: 1.69,
        market_cap_change_24h: 6000000000,
        market_cap_change_percentage_24h: 1.69,
        price_change_percentage_7d_in_currency: { usd: 3.8 },
        price_change_percentage_30d_in_currency: { usd: 8.9 },
        price_change_percentage_1y_in_currency: { usd: 32.1 },
      },
      market_cap_rank: 2,
      hashing_algorithm: "Ethash",
      genesis_date: "2015-07-30",
      sentiment_votes_up_percentage: 78,
      sentiment_votes_down_percentage: 22,
      links: {
        whitepaper: "https://ethereum.org/en/whitepaper/",
        twitter_screen_name: "ethereum",
        facebook_username: "ethereum",
        subreddit_url: "https://reddit.com/r/ethereum",
      },
      image: { large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png" },
      last_updated: new Date().toISOString(),
    },
    binancecoin: {
      id: "binancecoin",
      symbol: "bnb",
      name: "BNB",
      description: { en: "BNB is the native cryptocurrency of the Binance Chain ecosystem." },
      market_data: {
        current_price: { usd: 320 },
        market_cap: { usd: 48000000000 },
        total_volume: { usd: 800000000 },
        high_24h: { usd: 325 },
        low_24h: { usd: 315 },
        price_change_24h: 5,
        price_change_percentage_24h: 1.59,
        market_cap_change_24h: 750000000,
        market_cap_change_percentage_24h: 1.59,
        price_change_percentage_7d_in_currency: { usd: 2.1 },
        price_change_percentage_30d_in_currency: { usd: 6.3 },
        price_change_percentage_1y_in_currency: { usd: 18.7 },
      },
      market_cap_rank: 3,
      hashing_algorithm: "BEP-2",
      genesis_date: "2017-07-25",
      sentiment_votes_up_percentage: 72,
      sentiment_votes_down_percentage: 28,
      links: {
        whitepaper: "https://www.bnbchain.io/en/whitepaper",
        twitter_screen_name: "binance",
        facebook_username: "binance",
        subreddit_url: "https://reddit.com/r/binance",
      },
      image: { large: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png" },
      last_updated: new Date().toISOString(),
    },
  };

  // Return specific coin data if available, otherwise generic data
  if (popularCoins[id.toLowerCase()]) {
    return popularCoins[id.toLowerCase()];
  }

  // Generic fallback for unknown coins
  return {
    id: id,
    symbol: id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    description: { en: "Coin data temporarily unavailable due to API rate limiting." },
    market_data: {
      current_price: { usd: 100 },
      market_cap: { usd: 1000000 },
      total_volume: { usd: 100000 },
      high_24h: { usd: 110 },
      low_24h: { usd: 90 },
      price_change_24h: 5,
      price_change_percentage_24h: 5.26,
      market_cap_change_24h: 50000,
      market_cap_change_percentage_24h: 5.26,
      price_change_percentage_7d_in_currency: { usd: 3.2 },
      price_change_percentage_30d_in_currency: { usd: 7.8 },
      price_change_percentage_1y_in_currency: { usd: 25.4 },
    },
    market_cap_rank: 999,
    hashing_algorithm: "Unknown",
    genesis_date: "Unknown",
    sentiment_votes_up_percentage: 50,
    sentiment_votes_down_percentage: 50,
    links: {},
    image: { large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
    last_updated: new Date().toISOString(),
  };
}

export async function fetchTrendingCoins() {
  try {
    const headers: any = {};
    if (API_KEY) {
      headers.Authorization = `Bearer ${API_KEY}`;
    }

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/search/trending",
      { headers }
    );
    return response.data.coins;
  } catch (error) {
    return handleApiError(error, fallbackTrendingData);
  }
}

export async function fetchCoinChart(id: string, days: number) {
  try {
    const headers: any = {};
    if (API_KEY) {
      headers.Authorization = `Bearer ${API_KEY}`;
    }

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        headers,
        params: {
          vs_currency: "usd",
          days: days,
          interval: days > 29 ? "daily" : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Generate fallback chart data
    const fallbackChartData = {
      prices: Array.from({ length: days }, (_, i) => [
        Date.now() - (days - i) * 24 * 60 * 60 * 1000,
        Math.random() * 100 + 50
      ]),
      market_caps: Array.from({ length: days }, (_, i) => [
        Date.now() - (days - i) * 24 * 60 * 60 * 1000,
        Math.random() * 1000000 + 500000
      ]),
      total_volumes: Array.from({ length: days }, (_, i) => [
        Date.now() - (days - i) * 24 * 60 * 60 * 1000,
        Math.random() * 100000 + 50000
      ]),
    };
    return handleApiError(error, fallbackChartData);
  }
}

// ? We can't use search API due to API rate limits and fetching all coins is not feasible for demoing purposes, but we can fetch it once and cache it as it would save tons of search API hits
// export async function fetchAllCoins() {
//   try {
//     const response = await axios.get(
//       "https://api.coingecko.com/api/v3/coins/list",
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw new Error((error as Error).message);
//   }
// }

// ? For Now using this as a workaround, fetching top 100 coins
export async function fetchAllCoins() {
  return fetchCoins(1, 100);
}
