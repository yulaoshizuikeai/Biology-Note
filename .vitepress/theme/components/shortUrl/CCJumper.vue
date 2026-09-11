<!-- 参考自 https://notes.linho.cc/s?q=adaf352048 -->

<script setup lang="ts">
import { useRouter } from "vitepress";
import { onMounted } from "vue";
const router = useRouter();
onMounted(() => {
  const id = window.location.search.match(/\?q=(.{10})$/)?.[1];
  if (!id) return router.go(`/404`);
  fetch("/shortmap.json")
    .then((res) => (res.ok ? res.json() : null))
    .then((data: Record<string, string> | null) =>
      data && data[id] !== undefined ? router.go(`/${encodeURI(data[id])}`) : router.go(`/404`),
    )
    .catch(() => router.go(`/404`));
});
</script>
