import { UpNextItem } from "./UpNextItem";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PlayCircle, Shuffle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { YouTubeVideo } from "../services/youtubeApi";
import { useRef, useState, useEffect } from "react";

interface UpNextProps {
  videos: YouTubeVideo[];
  currentVideoId: string;
  onVideoSelect: (video: YouTubeVideo) => void;
}

export function UpNext({ videos, currentVideoId, onVideoSelect }: UpNextProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Filter out the current video and get remaining videos
  const upNextVideos = videos.filter(video => video.id !== currentVideoId);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        scrollElement.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [upNextVideos]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            <CardTitle>Up Next</CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Shuffle className="w-4 h-4" />
              Shuffle
            </Button>
            {upNextVideos.length > 3 && (
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={scrollLeft}
                  disabled={!canScrollLeft}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={scrollRight}
                  disabled={!canScrollRight}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          {upNextVideos.length} videos in queue
        </p>
      </CardHeader>
      
      <CardContent className="p-0">
        {upNextVideos.length > 0 ? (
          <div className="relative">
            <div 
              ref={scrollRef}
              className="flex gap-4 px-6 pb-6 overflow-x-auto scrollbar-thin"
            >
              {upNextVideos.map((video) => (
                <div key={video.id} className="flex-shrink-0 w-72">
                  <UpNextItem
                    video={video}
                    onClick={() => onVideoSelect(video)}
                    isActive={false}
                  />
                </div>
              ))}
            </div>
            
            {/* Gradient fade indicators */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent pointer-events-none z-10" />
            )}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none z-10" />
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <PlayCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No more videos in queue</p>
            <p className="text-sm opacity-75">All videos have been watched</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}