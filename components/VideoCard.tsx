import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Eye, Calendar, User } from "lucide-react";

interface VideoData {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  viewCount: number;
  uploadDate: string;
  duration: string;
  genre: string;
}

interface VideoCardProps {
  video: VideoData;
}

export function VideoCard({ video }: VideoCardProps) {
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <ImageWithFallback
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
          {video.duration}
        </div>
        <Badge 
          variant="secondary" 
          className="absolute top-2 left-2 bg-primary/90 text-primary-foreground"
        >
          {video.genre}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2 leading-tight">
          {video.title}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <User className="w-4 h-4" />
          <span className="text-sm">{video.channel}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{formatViewCount(video.viewCount)} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(video.uploadDate)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}