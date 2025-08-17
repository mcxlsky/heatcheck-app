// YouTube Data API v3 Service
// To use this service:
// 1. Go to https://console.developers.google.com/
// 2. Create a new project or select existing one
// 3. Enable YouTube Data API v3
// 4. Create credentials (API Key)
// 5. Add VITE_YOUTUBE_API_KEY to your environment variables

// Simple and reliable environment variable access
const YOUTUBE_API_KEY = (() => {
  try {
    // Try to access Vite environment variables
    if (typeof window !== 'undefined') {
      // We're in a browser, check for Vite's injected env vars
      return (window as any).__VITE_ENV__?.VITE_YOUTUBE_API_KEY || '';
    }
    // Try Node.js environment
    if (typeof process !== 'undefined' && process.env) {
      return process.env.VITE_YOUTUBE_API_KEY || '';
    }
    return '';
  } catch {
    return '';
  }
})();

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";

// Hip Hop and R&B artist channel IDs and keywords for better targeting
const HIP_HOP_RNB_KEYWORDS = [
  "hip hop", "rap", "r&b", "rnb", "hip-hop", "drake", "kendrick lamar", 
  "travis scott", "sza", "the weeknd", "future", "21 savage", "j cole",
  "summer walker", "bryson tiller", "ice spice", "metro boomin",
  "doja cat", "lil baby", "gunna", "bad bunny", "cardi b", "megan thee stallion"
];

// Additional search terms specifically for hip hop and r&b
const GENRE_SPECIFIC_TERMS = [
  "hip hop music video", "rap music video", "r&b music video", 
  "new hip hop 2025", "new r&b 2025", "latest rap songs",
  "hip hop hits", "r&b hits", "rap hits"
];

export interface YouTubeVideo {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  viewCount: number;
  uploadDate: string;
  duration: string;
}

interface YouTubeApiResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
      publishedAt: string;
    };
    statistics?: {
      viewCount: string;
    };
    contentDetails?: {
      duration: string;
    };
  }>;
}

// Convert ISO 8601 duration (PT4M23S) to readable format (4:23)
function parseDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "0:00";
  
  const hours = (match[1] || "").replace("H", "");
  const minutes = (match[2] || "").replace("M", "");
  const seconds = (match[3] || "").replace("S", "");
  
  if (hours) {
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  }
  return `${minutes || "0"}:${seconds.padStart(2, "0")}`;
}

// Get date from two weeks ago
function getTwoWeeksAgo(): string {
  const date = new Date();
  date.setDate(date.getDate() - 14);
  return date.toISOString();
}

export async function fetchTrendingVideos(): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    throw new Error("YouTube API key not configured. Please add VITE_YOUTUBE_API_KEY to your environment variables.");
  }

  try {
    const twoWeeksAgo = getTwoWeeksAgo();
    
    // Combine both artist names and genre-specific terms for comprehensive search
    const allSearchTerms = [...HIP_HOP_RNB_KEYWORDS, ...GENRE_SPECIFIC_TERMS];
    
    // Use more search terms to get a broader selection, aiming for 25 total videos
    const searchPromises = allSearchTerms.slice(0, 8).map(async (keyword) => {
      const searchUrl = `${YOUTUBE_API_BASE_URL}/search?` + new URLSearchParams({
        part: "snippet",
        q: keyword,
        type: "video",
        order: "viewCount",
        publishedAfter: twoWeeksAgo,
        videoCategoryId: "10", // Music category
        maxResults: "8", // Increased to get more results per search
        key: YOUTUBE_API_KEY,
      });

      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      return response.json() as YouTubeApiResponse;
    });

    const searchResults = await Promise.all(searchPromises);
    const allVideoIds = searchResults.flatMap(result => 
      result.items.map(item => item.id.videoId)
    );

    // Get detailed info for all videos
    const videoDetailsUrl = `${YOUTUBE_API_BASE_URL}/videos?` + new URLSearchParams({
      part: "snippet,statistics,contentDetails",
      id: allVideoIds.join(","),
      key: YOUTUBE_API_KEY,
    });

    const detailsResponse = await fetch(videoDetailsUrl);
    if (!detailsResponse.ok) {
      throw new Error(`YouTube API error: ${detailsResponse.status}`);
    }

    const detailsData = await detailsResponse.json();

    const videos: YouTubeVideo[] = detailsData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
      viewCount: parseInt(item.statistics?.viewCount || "0"),
      uploadDate: item.snippet.publishedAt,
      duration: parseDuration(item.contentDetails?.duration || "PT0S"),
    }));

    // Sort by view count and remove duplicates, targeting 25 videos
    const uniqueVideos = videos
      .filter((video, index, self) => 
        index === self.findIndex(v => v.id === video.id)
      )
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 25); // Increased to 25 videos

    return uniqueVideos;

  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw error;
  }
}

// Alternative endpoint for getting trending music videos
export async function fetchTrendingMusicVideos(): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    throw new Error("YouTube API key not configured. Please add VITE_YOUTUBE_API_KEY to your environment variables.");
  }

  try {
    // Get trending videos from Music category
    const trendingUrl = `${YOUTUBE_API_BASE_URL}/videos?` + new URLSearchParams({
      part: "snippet,statistics,contentDetails",
      chart: "mostPopular",
      videoCategoryId: "10", // Music category
      regionCode: "US",
      maxResults: "50", // Increased to get more hip hop/r&b videos
      key: YOUTUBE_API_KEY,
    });

    const response = await fetch(trendingUrl);
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    const videos: YouTubeVideo[] = data.items
      .filter((item: any) => {
        const text = `${item.snippet.title} ${item.snippet.channelTitle}`.toLowerCase();
        return HIP_HOP_RNB_KEYWORDS.some(keyword => text.includes(keyword));
      })
      .map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.high.url,
        viewCount: parseInt(item.statistics?.viewCount || "0"),
        uploadDate: item.snippet.publishedAt,
        duration: parseDuration(item.contentDetails?.duration || "PT0S"),
      }))
      .slice(0, 25); // Increased to 25 videos

    return videos;

  } catch (error) {
    console.error("Error fetching trending music videos:", error);
    throw error;
  }
}