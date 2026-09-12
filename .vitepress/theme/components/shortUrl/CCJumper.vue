<!-- 参考自 https://notes.linho.cc/s?q=adaf352048 -->

<script setup lang="ts">
import { useRouter } from "vitepress";
import { onMounted } from "vue";

const router = useRouter();

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("q") || window.location.search.match(/[?&]q=([a-f0-9]{10})/i)?.[1];
  if (!id) return router.go(`/404`);

  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const shortMapUrl = `${base}/shortmap.json`.replace(/\/+/g, "/");

  fetch(shortMapUrl)
    .then((res) => (res.ok ? res.json() : null))
    .then((data: Record<string, string> | null) => {
      if (!data || data[id] === undefined) return router.go(`/404`);
      const target = data[id];
      const targetUrl = target ? `${base}/${encodeURI(target)}`.replace(/\/+/g, "/") : `${base}/`;
      router.go(targetUrl);
    })
    .catch(() => router.go(`/404`));
});
</script>
