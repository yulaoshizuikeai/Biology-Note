let loadPromise: Promise<void> | null = null;

export function ensureBusuanzi(): Promise<void> {
  if (typeof window === "undefined" || typeof document === "undefined") return Promise.resolve();
  if (document.getElementById("cc-busuanzi-script")) return Promise.resolve();
  if (loadPromise) return loadPromise;
  loadPromise = new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.id = "cc-busuanzi-script";
    script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
    script.referrerPolicy = "no-referrer-when-downgrade";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
    setTimeout(resolve, 4000);
  });
  return loadPromise;
}
