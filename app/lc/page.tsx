import { Invitation } from "@/components/Invitation";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata("lc");

export default function LorenaClaudioPage() {
  return <Invitation host="lc" />;
}
