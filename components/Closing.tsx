import { wedding } from "@/lib/config";
import { BranchRule, HeartIcon } from "@/components/Botanicals";
import { FloralField } from "@/components/FloralField";
import { Reveal } from "@/components/Reveal";

export function Closing() {
  const [first, second] = wedding.couples;

  return (
    <section className="relative overflow-clip bg-ivory px-6 py-28 text-center sm:px-10 md:py-40">
      <FloralField src="/gallery/bg-1.png" />
      <Reveal className="relative mx-auto max-w-3xl">
        <BranchRule className="mx-auto mb-8 h-9 w-56 text-sage/75" />
        <h2 className="text-balance font-serif text-[1.7rem] leading-snug font-light tracking-[0.1em] text-sage-ink uppercase sm:text-5xl">
          El amor se multiplica cuando se comparte.
        </h2>
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="font-serif text-3xl text-sage-ink italic sm:text-4xl">{first.short}</p>
          <HeartIcon className="my-1 h-5 w-5 text-sage" />
          <p className="font-serif text-3xl text-sage-ink italic sm:text-4xl">{second.short}</p>
        </div>
        <p className="mt-10 font-serif text-xl text-sage-deep italic sm:text-2xl">{wedding.closing}</p>
      </Reveal>
    </section>
  );
}
