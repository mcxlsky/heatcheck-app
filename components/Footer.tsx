import HLogo from "../imports/HLogo";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <div className="w-8 h-8 flex-shrink-0">
            <HLogo />
          </div>
          
          {/* Links on the right */}
          <div className="flex items-center gap-6 text-muted-foreground">
            <a 
              href="mailto:ryan.mccaulsky@gmail.com"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
            <span className="text-border">•</span>
            <a 
              href="#"
              className="hover:text-foreground transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // Privacy policy functionality can be added here
              }}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}