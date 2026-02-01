import type { WorkItem, SiteSettings } from "@/types/content";
import { useTranslations } from "next-intl";

interface WorkCardProps {
  title: string;
  type?: string;
  summary?: string;
  liveUrl?: string;
  featured?: boolean;
}

function WorkCard({ title, type, summary, liveUrl, featured }: WorkCardProps) {
  return (
    <div className="group border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all">
      {/* Image placeholder */}
      <div className="aspect-video bg-muted relative">
        {featured && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
            Featured
          </span>
        )}
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl md:text-2xl font-semibold">{title}</h3>
          {type && (
            <span className="text-xs uppercase tracking-wider text-muted-foreground whitespace-nowrap">
              {type}
            </span>
          )}
        </div>

        {summary && (
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            {summary}
          </p>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline inline-flex items-center gap-1"
          >
            Vedi progetto →
          </a>
        )}
      </div>
    </div>
  );
}

type WorkProps = {
  workItems?: WorkItem[];
  copy?: SiteSettings['workSection'];
};

export function Work({ workItems = [], copy }: WorkProps) {
  const t = useTranslations('work');
  
  const heading = copy?.heading || t('heading');
  const intro = copy?.intro || t('intro');
  const emptyText = copy?.emptyText || t('emptyText');

  return (
    <section id="case" className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8 py-20 md:py-32">
        <h2 className="text-xs uppercase tracking-[0.2em] font-medium mb-3 opacity-40">
          {heading}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-12">
          {intro}
        </p>

        {workItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {workItems.map((item) => (
              <WorkCard key={item._id} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{emptyText}</p>
          </div>
        )}
      </div>
    </section>
  );
}
