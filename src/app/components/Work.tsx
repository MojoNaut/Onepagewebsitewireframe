import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  badge: string;
  title: string;
  summary: string;
  challenge: string;
  result: string;
  hasLive?: boolean;
  hasDemo?: boolean;
}

function ProjectCard({
  badge,
  title,
  summary,
  challenge,
  result,
  hasLive = false,
  hasDemo = false,
}: ProjectCardProps) {
  return (
    <div className="group">
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-muted border border-border rounded mb-6 overflow-hidden" />

      <Badge
        variant="secondary"
        className="bg-white border border-border rounded-full mb-3 text-xs px-3 py-1"
      >
        {badge}
      </Badge>
      <h3 className="text-lg md:text-xl font-medium mb-3">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
        {summary}
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <span className="text-xs uppercase tracking-wider opacity-40 block mb-1.5">
            Sfida
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {challenge}
          </p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wider opacity-40 block mb-1.5">
            Risultato
          </span>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {hasLive && (
          <Button
            variant="outline"
            size="sm"
            className="border-border rounded-full h-8 text-xs hover:bg-white"
          >
            <ExternalLink className="w-3 h-3 mr-1.5" />
            Live
          </Button>
        )}
        {hasDemo && (
          <Button
            variant="outline"
            size="sm"
            className="border-border rounded-full h-8 text-xs hover:bg-white"
          >
            <ExternalLink className="w-3 h-3 mr-1.5" />
            Demo
          </Button>
        )}
      </div>
    </div>
  );
}

export function Work() {
  const projects = [
    {
      badge: "Build",
      title: "Progetto 01",
      summary: "Piattaforma di gestione operativa per team distribuiti",
      challenge: "Centralizzare processi sparsi tra strumenti diversi",
      result: "Sistema unificato che riduce sovrapposizioni e accelera decisioni",
      hasLive: true,
      hasDemo: false,
    },
    {
      badge: "Prototype",
      title: "Progetto 02",
      summary: "Dashboard analitica per monitoraggio performance",
      challenge: "Rendere accessibili dati complessi a utenti non tecnici",
      result: "Interfaccia intuitiva che facilita lettura e azione immediata",
      hasLive: false,
      hasDemo: true,
    },
    {
      badge: "Client",
      title: "Progetto 03",
      summary: "Landing page per lancio prodotto SaaS",
      challenge: "Comunicare valore in modo chiaro e diretto",
      result: "Pagina ad alta conversione con messaggio focalizzato",
      hasLive: true,
      hasDemo: false,
    },
    {
      badge: "Build",
      title: "Progetto 04",
      summary: "App mobile per onboarding clienti",
      challenge: "Semplificare processo lungo e complesso",
      result: "Flow guidato che riduce attrito e migliora completamento",
      hasLive: false,
      hasDemo: true,
    },
  ];

  return (
    <section id="lavori" className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8 py-20 md:py-32">
        <h2 className="text-xs uppercase tracking-[0.2em] font-medium mb-16 opacity-40">
          Lavori selezionati
        </h2>

        {/* Featured Project */}
        <div className="mb-24 md:mb-32 pb-16 md:pb-24 border-b border-border">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            {/* Left: Details */}
            <div className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.2em] font-medium mb-6 opacity-40">
                Featured Project
              </span>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 leading-tight">
                Progetto Featured
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
                Piattaforma completa per gestione operazioni e analisi dati in
                real-time, pensata per team che vogliono decisioni rapide e
                informate.
              </p>
              <div className="space-y-6 mb-10">
                <div className="border-l-2 border-border pl-6">
                  <span className="text-xs uppercase tracking-[0.2em] opacity-40 block mb-2">
                    Sfida
                  </span>
                  <p className="text-sm md:text-base leading-relaxed">
                    Unificare dashboard separate e creare esperienza coerente
                  </p>
                </div>
                <div className="border-l-2 border-border pl-6">
                  <span className="text-xs uppercase tracking-[0.2em] opacity-40 block mb-2">
                    Risultato
                  </span>
                  <p className="text-sm md:text-base leading-relaxed">
                    Sistema integrato che riduce tempi di risposta e migliora
                    collaborazione
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border rounded-full h-10 px-5 text-sm hover:bg-white"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border rounded-full h-10 px-5 text-sm hover:bg-white"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Case Study
                </Button>
              </div>
            </div>

            {/* Right: Collage placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-muted border border-border rounded" />
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-20">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}