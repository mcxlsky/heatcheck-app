import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { AlertTriangle, RefreshCw, Info } from "lucide-react";

interface ErrorBannerProps {
  error: string;
  isUsingMockData: boolean;
  onRetry: () => void;
  loading: boolean;
}

export function ErrorBanner({ error, isUsingMockData, onRetry, loading }: ErrorBannerProps) {
  return (
    <div className="container mx-auto px-4 pt-4">
      <Alert className="mb-4">
        <div className="flex items-start gap-3">
          {isUsingMockData ? (
            <Info className="h-4 w-4 mt-0.5 text-blue-500" />
          ) : (
            <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-500" />
          )}
          <div className="flex-1">
            <AlertDescription className="text-sm">
              {error}
              {isUsingMockData && (
                <div className="mt-2 text-xs text-muted-foreground">
                  <p>To enable live YouTube data:</p>
                  <ol className="list-decimal list-inside mt-1 space-y-0.5">
                    <li>Get a YouTube Data API v3 key from <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                    <li>Add <code className="bg-gray-100 px-1 rounded text-xs">VITE_YOUTUBE_API_KEY=your_key_here</code> to your .env file</li>
                    <li>Refresh the page</li>
                  </ol>
                </div>
              )}
            </AlertDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Loading...' : 'Retry'}
          </Button>
        </div>
      </Alert>
    </div>
  );
}