import { Invitation } from "@/components/Invitation";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata("aj");

export default function AnaliaJavierPage() {
  return <Invitation host="aj" />;
}
