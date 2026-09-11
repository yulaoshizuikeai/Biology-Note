import { useRoute } from "vitepress";
import { computed, type ComputedRef } from "vue";
import type { Route } from "vitepress";

const serverURL = "" as string;

export const useWalineBase = (): { serverURL: string; route: Route; path: ComputedRef<string> } => {
  const route = useRoute();
  const path = computed(() => route.path);

  return {
    serverURL,
    route,
    path,
  };
};
