import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

export function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Main Video Player Loading */}
        <div className="max-w-4xl mx-auto space-y-4">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Up Next Loading */}
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="flex gap-3 p-3 pb-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex-shrink-0 w-72 rounded-lg overflow-hidden">
                  <Skeleton className="w-full aspect-video" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-20" />
                      <div className="flex gap-3">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-14" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}