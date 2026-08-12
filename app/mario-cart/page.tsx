import { permanentRedirect } from "next/navigation";

/* Mario Cart moved into the Docs area with the other trailers.
 * Keep the old URL alive for anything still linking to it. */
export default function MarioCartPage() {
  permanentRedirect("/docs/mario-cart");
}
