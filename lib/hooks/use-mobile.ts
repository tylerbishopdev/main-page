import { useMediaQuery } from "@/lib/hooks/use-media-query";

export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}
