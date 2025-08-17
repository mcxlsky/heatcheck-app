import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { YouTubeVideo } from "../services/youtubeApi";
import { Eye, Calendar, User } from "lucide-react";

interface UpNextItemProps {
  video: YouTubeVideo;
  onClick: () => void;
  isActive?: boolean;
}

export function UpNextItem({ video, onClick, isActive = false }: UpNextItemProps) {
  const formatViewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return `${Math.floor(diffDays / 7)} week ago`;
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  return (
    <div 
      className={`cursor-pointer transition-colors duration-200 rounded-lg overflow-hidden ${
        isActive 
          ? 'bg-primary/10 border border-primary/20' 
          : 'hover:bg-muted/50'
      }`}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative">
        <ImageWithFallback
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-1.5 py-0.5 rounded text-xs">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="text-sm leading-tight line-clamp-2">
          {video.title}
        </h3>
        
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span className="truncate">{video.channel}</span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{formatViewCount(video.viewCount)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(video.uploadDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}