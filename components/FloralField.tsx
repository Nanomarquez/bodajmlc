import Image from "next/image";

export function FloralField({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
