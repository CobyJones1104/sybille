import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { TrustBar } from "@/components/home/trust-bar";
import { Categories } from "@/components/home/categories";
import { VisitTeaser } from "@/components/home/visit-teaser";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <TrustBar />
      <Categories />
      <VisitTeaser />
    </>
  );
}
