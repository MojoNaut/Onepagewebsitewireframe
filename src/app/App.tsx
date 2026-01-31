import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { Services } from "@/app/components/Services";
import { FitFilter } from "@/app/components/FitFilter";
import { Process } from "@/app/components/Process";
import { Work } from "@/app/components/Work";
import { FAQ } from "@/app/components/FAQ";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <FitFilter />
        <Process />
        <Work />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}