import { Invitation } from "@/components/Invitation";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata(null);

export default function Page() {
  return <Invitation host={null} />;
}
