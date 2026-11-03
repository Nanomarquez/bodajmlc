import { wedding } from "@/lib/config";
import { BranchRule } from "@/components/Botanicals";
import { FloralField } from "@/components/FloralField";
import { Reveal } from "@/components/Reveal";

export function Message() {
  const [first, second] = wedding.invitation;

  return (
    <section id="invitacion" className="relative overflow-clip bg-ivory px-6 py-24 sm:px-10 md:py-36">
      <FloralField src="/gallery/bg-2.png" />

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <p className="font-serif text-6xl leading-none text-sage/30 italic sm:text-7xl" aria-hidden="true">
          “
        </p>
        <h2 className="sr-only">Invitación</h2>
        <p className="mt-2 font-serif text-xl leading-relaxed font-light text-sage-ink sm:text-[1.7rem] sm:leading-relaxed">
          {first}
        </p>
        <BranchRule className="mx-auto mt-8 h-8 w-52 text-sage/70" />
        <p className="mt-8 font-serif text-2xl leading-snug text-sage-deep italic sm:text-3xl">{second}</p>
      </Reveal>
    </section>
  );
}
