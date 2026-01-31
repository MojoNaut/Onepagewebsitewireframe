import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contatti" className="border-t border-border">
      <div className="mx-auto max-w-[1120px] px-6 md:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <h2 className="text-xs uppercase tracking-[0.2em] font-medium mb-6 opacity-40">
            Contatti
          </h2>

          <p className="text-base md:text-lg mb-12 leading-relaxed">
            Compila il form qui sotto. Ti rispondo entro 24–48h con una prima
            valutazione e i prossimi step.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-[0.15em] opacity-50">
                Nome
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="h-12 rounded border-border bg-input-background focus:border-foreground transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-[0.15em] opacity-50">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="h-12 rounded border-border bg-input-background focus:border-foreground transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service" className="text-xs uppercase tracking-[0.15em] opacity-50">
                Tipo progetto
              </Label>
              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData({ ...formData, service: value })
                }
              >
                <SelectTrigger className="h-12 rounded border-border bg-input-background focus:border-foreground transition-colors">
                  <SelectValue placeholder="Seleziona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mvp">MVP Sprint</SelectItem>
                  <SelectItem value="webapp">Web App su misura</SelectItem>
                  <SelectItem value="website">Sito / Landing</SelectItem>
                  <SelectItem value="other">Altro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-xs uppercase tracking-[0.15em] opacity-50">
                Budget
              </Label>
              <Select
                value={formData.budget}
                onValueChange={(value) =>
                  setFormData({ ...formData, budget: value })
                }
              >
                <SelectTrigger className="h-12 rounded border-border bg-input-background focus:border-foreground transition-colors">
                  <SelectValue placeholder="Seleziona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-10k">€5k–€10k</SelectItem>
                  <SelectItem value="10-20k">€10k–€20k</SelectItem>
                  <SelectItem value="20-40k">€20k–€40k</SelectItem>
                  <SelectItem value="40k+">€40k+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline" className="text-xs uppercase tracking-[0.15em] opacity-50">
                Timeline
              </Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) =>
                  setFormData({ ...formData, timeline: value })
                }
              >
                <SelectTrigger className="h-12 rounded border-border bg-input-background focus:border-foreground transition-colors">
                  <SelectValue placeholder="Seleziona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgente (entro 30 giorni)</SelectItem>
                  <SelectItem value="normal">Normale (30–60 giorni)</SelectItem>
                  <SelectItem value="flexible">Flessibile (60+ giorni)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs uppercase tracking-[0.15em] opacity-50">
                Messaggio
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Parlami del progetto..."
                rows={6}
                required
                className="rounded border-border bg-input-background focus:border-foreground transition-colors resize-none"
              />
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 h-12 text-sm font-medium"
              >
                Invia richiesta
              </Button>
              <p className="text-xs text-muted-foreground mt-4 opacity-60">
                Risposta entro 24–48h
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}