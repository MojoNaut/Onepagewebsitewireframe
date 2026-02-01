type FooterProps = {
  brandName?: string;
  footerLine?: string;
  contactEmail?: string;
  linkedinUrl?: string;
};

export function Footer({
  brandName = "LIVOTI STUDIO",
  footerLine = "Developer con mindset product. Base in Veneto, Italia.",
  contactEmail,
  linkedinUrl,
}: FooterProps) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-350 px-6 md:px-12 lg:px-24 py-16 md:py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-base md:text-lg font-bold uppercase tracking-tight mb-4">
              {brandName}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
              {footerLine}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:items-end gap-4">
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {contactEmail}
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                LinkedIn →
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lorenzo Livoti. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
