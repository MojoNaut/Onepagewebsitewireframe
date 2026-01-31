export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8 py-20 md:py-32">
        {/* Bold Wordmark */}
        <h2 className="text-[15vw] md:text-[10vw] lg:text-[120px] leading-[0.85] font-bold uppercase tracking-tighter mb-16 md:mb-20">
          LIVOTI<br />STUDIO.
        </h2>

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 pb-8 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            Guidato da Lorenzo Livoti. Network di specialisti quando serve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href="mailto:hello@livotistudio.com"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              hello@livotistudio.com
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:opacity-60 transition-opacity"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8">
          <p className="text-xs text-muted-foreground opacity-40">
            © 2025 Livoti Studio. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}