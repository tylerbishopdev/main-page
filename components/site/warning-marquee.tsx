import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import { WORKS_INTRO } from "@/lib/content";

export default function WarningMarquee() {
  return (
    <section className="relative w-full overflow-hidden border-y border-primary/25 bg-background py-10">
      <ScrollVelocityContainer>
        <ScrollVelocityRow baseVelocity={16} direction={1}>
          <span className="whitespace-nowrap pr-10 font-ndot text-6xl uppercase leading-none tracking-tight text-foreground sm:text-8xl">
            <span className="text-primary">WARNING! </span>
            creative genius...{" "}
          </span>
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={10} direction={-1}>
          <span className="whitespace-nowrap pr-10 pt-4 font-mono text-sm uppercase tracking-widest text-muted-foreground sm:text-base">
            {WORKS_INTRO.warningBody}{" "}
            <span className="px-6 text-primary">{"///"}</span>
          </span>
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
}
