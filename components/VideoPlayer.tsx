import { useState } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { YouTubeVideo } from "../services/youtubeApi";
import { toast } from "sonner@2.0.3";
import { 
  Play, 
  Pause, 
  Volume2, 
  Settings, 
  Maximize, 
  ThumbsUp, 
  ThumbsDown,
  Share,
  Eye,
  Calendar,
  User,
  Cast
} from "lucide-react";

interface VideoPlayerProps {
  video: YouTubeVideo;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(23); // Mock progress at 23%

  const handleCast = () => {
    // Mock casting functionality - in a real app, this would integrate with Cast SDK
    const devices = ["Living Room TV (Chromecast)", "Bedroom Apple TV", "Kitchen Display"];
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];
    
    // Show searching toast first
    toast.loading("Scanning for devices...", {
      id: "cast-scan",
      duration: 1500,
    });
    
    // After a short delay, show available devices
    setTimeout(() => {
      toast.success(`Found ${randomDevice}`, {
        id: "cast-scan",
        description: "Tap to start casting (Demo mode - casting functionality coming soon!)",
        duration: 4000,
        action: {
          label: "Connect",
          onClick: () => {
            toast.success("Connected!", {
              description: `Now casting to ${randomDevice}`,
              duration: 3000,
            });
          },
        },
      });
    }, 1500);
  };

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
    <div className="space-y-4">
      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
        <ImageWithFallback
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        
        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="lg"
            className="h-16 w-16 rounded-full bg-black/60 hover:bg-black/80 border-2 border-white/20"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="h-8 w-8 text-white ml-1" />
            )}
          </Button>
        </div>

        {/* Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="relative w-full h-1 bg-white/30 rounded-full">
              <div 
                className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Volume2 className="h-4 w-4" />
              </Button>
              <span className="text-white text-sm">
                1:04 / {video.duration}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Settings className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Maximize className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={handleCast}>
                <Cast className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-xl mb-2 leading-tight">{video.title}</h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{video.channel}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{formatViewCount(video.viewCount)} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(video.uploadDate)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <ThumbsUp className="h-4 w-4" />
                Like
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleCast}>
                <Cast className="h-4 w-4" />
                Cast
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}