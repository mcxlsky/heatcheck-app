import Heatcheck from "../imports/Heatcheck-17-426";

export function AppHeader() {
  return (
    <div className="bg-card border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          <div className="w-28 h-9 flex-shrink-0">
            <Heatcheck />
          </div>
        </div>
      </div>
    </div>
  );
}