// src/utils/gtm.ts
export const initGTM = (gtmId: string) => {
  if (!window.dataLayer) {
    (window as any).dataLayer = [];
  }
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
  (window as any).dataLayer.push({ event: 'gtm.js', 'gtm.start': new Date().getTime(), });
};

export const gtmPush = (event: Record<string, any>) => {
  (window as any).dataLayer.push(event);
};
