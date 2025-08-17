import { useState, useEffect } from 'react';
import { fetchTrendingVideos, fetchTrendingMusicVideos, YouTubeVideo } from '../services/youtubeApi';

// Mock data as fallback when API fails or isn't configured
const mockVideoData: YouTubeVideo[] = [
  {
    id: "1",
    title: "Drake - First Person Shooter ft. J. Cole (Official Music Video)",
    channel: "Drake",
    thumbnail: "https://images.unsplash.com/photo-1621542864240-22e6fc265ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBtdXNpYyUyMHN0dWRpb3xlbnwxfHx8fDE3NTU0Mjg4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 8450000,
    uploadDate: "2025-08-10",
    duration: "4:23"
  },
  {
    id: "2",
    title: "SZA - Snooze (Live Performance at The Tonight Show)",
    channel: "The Tonight Show Starring Jimmy Fallon",
    thumbnail: "https://images.unsplash.com/photo-1549349807-4575e87c7e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyJTI2YiUyMHNpbmdlciUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc1NTQyODg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 3920000,
    uploadDate: "2025-08-12",
    duration: "3:47"
  },
  {
    id: "3",
    title: "Travis Scott - FE!N ft. Playboi Carti (Official Video)",
    channel: "Travis Scott",
    thumbnail: "https://images.unsplash.com/photo-1738667181188-a63ec751a646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3NTU0Mjg4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 12100000,
    uploadDate: "2025-08-08",
    duration: "3:11"
  },
  {
    id: "4",
    title: "Kendrick Lamar - luther ft. SZA (Official Audio)",
    channel: "Kendrick Lamar",
    thumbnail: "https://images.unsplash.com/photo-1568286453307-ec8dd11413bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXAlMjBtdXNpYyUyMGFydGlzdHxlbnwxfHx8fDE3NTU0Mjg4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 6870000,
    uploadDate: "2025-08-14",
    duration: "4:56"
  },
  {
    id: "5",
    title: "The Weeknd - Dancing In The Flames (Behind The Scenes)",
    channel: "The Weeknd",
    thumbnail: "https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvfGVufDF8fHx8MTc1NTQyODg2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 5240000,
    uploadDate: "2025-08-11",
    duration: "6:32"
  },
  {
    id: "6",
    title: "Summer Walker - CPR (Acoustic Version)",
    channel: "Summer Walker",
    thumbnail: "https://images.unsplash.com/photo-1606403444347-fdd6b74492d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxybmIlMjB2b2NhbGlzdCUyMG1pY3JvcGhvbmV8ZW58MXx8fHwxNzU1NDI4ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 2890000,
    uploadDate: "2025-08-13",
    duration: "3:21"
  },
  {
    id: "7",
    title: "21 Savage & Metro Boomin - Letter To My Brudda (Official Video)",
    channel: "21 Savage",
    thumbnail: "https://images.unsplash.com/photo-1621542864240-22e6fc265ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBtdXNpYyUyMHN0dWRpb3xlbnwxfHx8fDE3NTU0Mjg4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 4160000,
    uploadDate: "2025-08-07",
    duration: "3:45"
  },
  {
    id: "8",
    title: "Bryson Tiller - Whatever She Wants (Live Studio Session)",
    channel: "Bryson Tiller",
    thumbnail: "https://images.unsplash.com/photo-1549349807-4575e87c7e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyJTI2YiUyMHNpbmdlciUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc1NTQyODg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 1940000,
    uploadDate: "2025-08-09",
    duration: "4:12"
  },
  {
    id: "9",
    title: "Future & Metro Boomin - Type Sh*t ft. Travis Scott, Playboi Carti",
    channel: "Future",
    thumbnail: "https://images.unsplash.com/photo-1738667181188-a63ec751a646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3NTU0Mjg4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 7820000,
    uploadDate: "2025-08-06",
    duration: "3:28"
  },
  {
    id: "10",
    title: "Usher - Good Good ft. 21 Savage & Summer Walker (Official Video)",
    channel: "Usher",
    thumbnail: "https://images.unsplash.com/photo-1606403444347-fdd6b74492d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxybmIlMjB2b2NhbGlzdCUyMG1pY3JvcGhvbmV8ZW58MXx8fHwxNzU1NDI4ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 3450000,
    uploadDate: "2025-08-15",
    duration: "3:58"
  },
  {
    id: "11",
    title: "Ice Spice - Think U The Sh*t (Fart) [Official Music Video]",
    channel: "Ice Spice",
    thumbnail: "https://images.unsplash.com/photo-1568286453307-ec8dd11413bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXAlMjBtdXNpYyUyMGFydGlzdHxlbnwxfHx8fDE3NTU0Mjg4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 9230000,
    uploadDate: "2025-08-05",
    duration: "2:43"
  },
  {
    id: "12",
    title: "Victoria Monét - Alright (NPR Tiny Desk Concert)",
    channel: "NPR Music",
    thumbnail: "https://images.unsplash.com/photo-1549349807-4575e87c7e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyJTI2YiUyMHNpbmdlciUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc1NTQyODg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 1670000,
    uploadDate: "2025-08-16",
    duration: "4:05"
  },
  {
    id: "13",
    title: "Doja Cat - Paint The Town Red (Remix) ft. The Weeknd",
    channel: "Doja Cat",
    thumbnail: "https://images.unsplash.com/photo-1568286453307-ec8dd11413bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXAlMjBtdXNpYyUyMGFydGlzdHxlbnwxfHx8fDE3NTU0Mjg4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 5890000,
    uploadDate: "2025-08-04",
    duration: "3:15"
  },
  {
    id: "14",
    title: "Lil Baby & Gunna - Drip Too Hard (Live from Atlanta)",
    channel: "Lil Baby",
    thumbnail: "https://images.unsplash.com/photo-1621542864240-22e6fc265ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBtdXNpYyUyMHN0dWRpb3xlbnwxfHx8fDE3NTU0Mjg4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 7320000,
    uploadDate: "2025-08-03",
    duration: "4:01"
  },
  {
    id: "15",
    title: "Bad Bunny - Monaco (Official Video)",
    channel: "Bad Bunny",
    thumbnail: "https://images.unsplash.com/photo-1738667181188-a63ec751a646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3NTU0Mjg4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 11400000,
    uploadDate: "2025-08-02",
    duration: "3:42"
  },
  {
    id: "16",
    title: "Cardi B - Bongos ft. Megan Thee Stallion (Behind The Scenes)",
    channel: "Cardi B",
    thumbnail: "https://images.unsplash.com/photo-1606403444347-fdd6b74492d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxybmIlMjB2b2NhbGlzdCUyMG1pY3JvcGhvbmV8ZW58MXx8fHwxNzU1NDI4ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 8760000,
    uploadDate: "2025-08-01",
    duration: "2:56"
  },
  {
    id: "17",
    title: "J. Cole - Middle Child (Dreamville Studio Session)",
    channel: "Dreamville",
    thumbnail: "https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHByb2R1Y2VyJTIwc3R1ZGlvfGVufDF8fHx8MTc1NTQyODg2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 4570000,
    uploadDate: "2025-07-31",
    duration: "5:23"
  },
  {
    id: "18",
    title: "Jhené Aiko - Stay Ready (Live Acoustic Performance)",
    channel: "Jhené Aiko",
    thumbnail: "https://images.unsplash.com/photo-1549349807-4575e87c7e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyJTI2YiUyMHNpbmdlciUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc1NTQyODg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 2340000,
    uploadDate: "2025-07-30",
    duration: "4:18"
  },
  {
    id: "19",
    title: "Playboi Carti - FE!N (Solo Version) [Leak]",
    channel: "Playboi Carti",
    thumbnail: "https://images.unsplash.com/photo-1621542864240-22e6fc265ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBtdXNpYyUyMHN0dWRpb3xlbnwxfHx8fDE3NTU0Mjg4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 6120000,
    uploadDate: "2025-07-29",
    duration: "2:47"
  },
  {
    id: "20",
    title: "H.E.R. ft. Daniel Caesar - Best Part (Live From The Apollo)",
    channel: "H.E.R.",
    thumbnail: "https://images.unsplash.com/photo-1606403444347-fdd6b74492d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxybmIlMjB2b2NhbGlzdCUyMG1pY3JvcGhvbmV8ZW58MXx8fHwxNzU1NDI4ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 3890000,
    uploadDate: "2025-07-28",
    duration: "3:52"
  },
  {
    id: "21",
    title: "A$AP Rocky - Fashion Week (Official Video)",
    channel: "A$AP Rocky",
    thumbnail: "https://images.unsplash.com/photo-1568286453307-ec8dd11413bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXAlMjBtdXNpYyUyMGFydGlzdHxlbnwxfHx8fDE3NTU0Mjg4NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 5230000,
    uploadDate: "2025-07-27",
    duration: "3:33"
  },
  {
    id: "22",
    title: "Normani - Wild Side ft. Cardi B (Choreography Video)",
    channel: "Normani",
    thumbnail: "https://images.unsplash.com/photo-1549349807-4575e87c7e6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyJTI2YiUyMHNpbmdlciUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc1NTQyODg1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 4680000,
    uploadDate: "2025-07-26",
    duration: "3:29"
  },
  {
    id: "23",
    title: "Tyler, The Creator - EARFQUAKE (Director's Cut)",
    channel: "Tyler, The Creator",
    thumbnail: "https://images.unsplash.com/photo-1738667181188-a63ec751a646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBzdGFnZXxlbnwxfHx8fDE3NTU0Mjg4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 7950000,
    uploadDate: "2025-07-25",
    duration: "3:07"
  },
  {
    id: "24",
    title: "FKA twigs - Killer (Official Video)",
    channel: "FKA twigs",
    thumbnail: "https://images.unsplash.com/photo-1606403444347-fdd6b74492d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxybmIlMjB2b2NhbGlzdCUyMG1pY3JvcGhvbmV8ZW58MXx8fHwxNzU1NDI4ODcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 2780000,
    uploadDate: "2025-07-24",
    duration: "4:14"
  },
  {
    id: "25",
    title: "Baby Keem - Family Ties ft. Kendrick Lamar (Live Performance)",
    channel: "Baby Keem",
    thumbnail: "https://images.unsplash.com/photo-1621542864240-22e6fc265ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXAlMjBob3AlMjBtdXNpYyUyMHN0dWRpb3xlbnwxfHx8fDE3NTU0Mjg4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    viewCount: 6410000,
    uploadDate: "2025-07-23",
    duration: "4:31"
  }
];

interface UseVideoDataReturn {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
  isUsingMockData: boolean;
  refetch: () => Promise<void>;
}

export function useVideoData(): UseVideoDataReturn {
  const [videos, setVideos] = useState<YouTubeVideo[]>(mockVideoData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(true);

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      // Try to fetch real YouTube data
      let fetchedVideos: YouTubeVideo[];
      
      // First try fetching by keywords (most recent)
      try {
        fetchedVideos = await fetchTrendingVideos();
        if (fetchedVideos.length === 0) {
          throw new Error("No videos found with keywords, trying trending...");
        }
      } catch (keywordError) {
        console.warn("Keyword search failed, trying trending music videos:", keywordError);
        fetchedVideos = await fetchTrendingMusicVideos();
      }

      if (fetchedVideos.length > 0) {
        setVideos(fetchedVideos);
        setIsUsingMockData(false);
        console.log(`Loaded ${fetchedVideos.length} videos from YouTube API`);
      } else {
        throw new Error("No videos returned from YouTube API");
      }

    } catch (apiError: any) {
      console.warn("YouTube API failed, using mock data:", apiError.message);
      
      // Fall back to mock data
      setVideos(mockVideoData);
      setIsUsingMockData(true);
      
      // Set user-friendly error message
      if (apiError.message.includes("API key not configured")) {
        setError("YouTube API not configured. Using demo data. See console for setup instructions.");
      } else if (apiError.message.includes("YouTube API error: 403")) {
        setError("YouTube API quota exceeded or invalid key. Using demo data.");
      } else {
        setError("Unable to load live data. Using demo data.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return {
    videos,
    loading,
    error,
    isUsingMockData,
    refetch: fetchVideos,
  };
}