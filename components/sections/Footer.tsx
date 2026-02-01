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
      <div className="mx-auto max-w-280 px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] mb-3">
              {brandName}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {footerLine}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:items-end gap-4">
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {contactEmail}
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lorenzo Livoti
          </p>
        </div>
      </div>
    </footer>
  );
}
