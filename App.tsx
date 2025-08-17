import { useState, useEffect } from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import { UpNext } from "./components/UpNext";
import { AppHeader } from "./components/AppHeader";
import { LoadingState } from "./components/LoadingState";
import { ErrorBanner } from "./components/ErrorBanner";
import { Footer } from "./components/Footer";
import { useVideoData } from "./hooks/useVideoData";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const { videos, loading, error, isUsingMockData, refetch } = useVideoData();
  const [currentVideo, setCurrentVideo] = useState(videos[0]);

  // Update current video when videos data changes
  useEffect(() => {
    if (videos.length > 0 && !currentVideo) {
      setCurrentVideo(videos[0]);
    }
  }, [videos, currentVideo]);

  const handleVideoSelect = (video: typeof videos[0]) => {
    setCurrentVideo(video);
  };

  // Show loading state while fetching
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <LoadingState />
        <Footer />
      </div>
    );
  }

  // Ensure we have a current video
  const displayCurrentVideo = currentVideo || videos[0];

  return (
    <div className="min-h-screen bg-background">
      {error && (
        <ErrorBanner 
          error={error} 
          isUsingMockData={isUsingMockData}
          onRetry={refetch}
          loading={loading}
        />
      )}
      
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Main Video Player */}
          <div className="max-w-4xl mx-auto">
            <VideoPlayer video={displayCurrentVideo} />
          </div>
          
          {/* Up Next Section */}
          <div>
            <UpNext 
              videos={videos}
              currentVideoId={displayCurrentVideo?.id}
              onVideoSelect={handleVideoSelect}
            />
          </div>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}