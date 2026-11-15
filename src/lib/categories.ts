export const CATEGORIES = {
  search: "검색·포털",
  social: "소셜",
  video: "영상·음악",
  shopping: "쇼핑",
  news: "뉴스·지식",
  tech: "IT·개발",
  infra: "인프라·광고",
  other: "기타",
} as const;

export type Category = keyof typeof CATEGORIES;

const KNOWN: Record<string, Category> = {
  "google.com": "search", "bing.com": "search", "yahoo.com": "search",
  "baidu.com": "search", "yandex.ru": "search", "naver.com": "search",
  "daum.net": "search", "duckduckgo.com": "search", "yahoo.co.jp": "search",
  "facebook.com": "social", "instagram.com": "social", "twitter.com": "social",
  "x.com": "social", "linkedin.com": "social", "reddit.com": "social",
  "pinterest.com": "social", "tiktok.com": "social", "whatsapp.com": "social",
  "whatsapp.net": "social", "snapchat.com": "social", "vk.com": "social",
  "weibo.com": "social", "qq.com": "social", "discord.com": "social",
  "telegram.org": "social", "t.me": "social", "tumblr.com": "social",
  "threads.net": "social", "kakao.com": "social", "line.me": "social",
  "youtube.com": "video", "netflix.com": "video", "twitch.tv": "video",
  "spotify.com": "video", "vimeo.com": "video", "bilibili.com": "video",
  "soundcloud.com": "video", "primevideo.com": "video", "disneyplus.com": "video",
  "amazon.com": "shopping", "ebay.com": "shopping", "aliexpress.com": "shopping",
  "alibaba.com": "shopping", "taobao.com": "shopping", "etsy.com": "shopping",
  "walmart.com": "shopping", "shopify.com": "shopping", "coupang.com": "shopping",
  "temu.com": "shopping", "jd.com": "shopping", "rakuten.co.jp": "shopping",
  "paypal.com": "shopping", "booking.com": "shopping", "airbnb.com": "shopping",
  "wikipedia.org": "news", "nytimes.com": "news", "bbc.co.uk": "news",
  "bbc.com": "news", "cnn.com": "news", "theguardian.com": "news",
  "forbes.com": "news", "reuters.com": "news", "medium.com": "news",
  "wordpress.org": "news", "wordpress.com": "news", "blogspot.com": "news",
  "quora.com": "news", "imdb.com": "news", "washingtonpost.com": "news",
  "github.com": "tech", "microsoft.com": "tech", "apple.com": "tech",
  "stackoverflow.com": "tech", "openai.com": "tech", "chatgpt.com": "tech",
  "zoom.us": "tech", "office.com": "tech", "live.com": "tech",
  "adobe.com": "tech", "dropbox.com": "tech", "mozilla.org": "tech",
  "gitlab.com": "tech", "npmjs.com": "tech", "vercel.com": "tech",
  "anthropic.com": "tech", "claude.ai": "tech", "notion.so": "tech",
  "icloud.com": "tech", "outlook.com": "tech", "samsung.com": "tech",
};

const INFRA_HINTS = [
  "cdn", "akamai", "cloudfront", "cloudflare", "edgekey", "edgesuite",
  "amazonaws", "azure", "googleapis", "gstatic", "googleusercontent",
  "googlesyndication", "googletagmanager", "google-analytics", "doubleclick",
  "googlevideo", "ytimg", "ggpht", "gvt1", "gvt2", "fbcdn", "trafficmanager",
  "msedge", "windowsupdate", "digicert", "root-servers", "ntp", "dns",
  "office.net", "live.net", "msftncsi", "mzstatic", "icloud-content",
  "app-measurement", "crashlytics", "firebaseio", "sentry", "hotjar",
  "criteo", "adnxs", "rubiconproject", "pubmatic", "casalemedia",
  "scorecardresearch", "demdex", "omtrdc", "applovin", "unity3d",
  "ezviz", "cloudcam", "triplink", "gwfb", "domaincontrol", "tiktokv", "byteoversea", "ibyteimg", "bytefcdn", "fastly",
  "github.io", "githubusercontent", "gtld-servers", "pki", "ocsp",
  "apple-dns", "aaplimg", "mcafee", "symantec", "sophos", "avast",
];

export function categorize(domain: string): Category {
  const known = KNOWN[domain];
  if (known) return known;
  if (INFRA_HINTS.some((hint) => domain.includes(hint))) return "infra";
  return "other";
}
