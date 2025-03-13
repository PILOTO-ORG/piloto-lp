// Utilitário para rastrear eventos do Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const trackPageView = (path: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'AW-16895441328', {
      page_path: path,
    });
    console.log(`Página rastreada: ${path}`);
  }
};

export const trackEvent = (
  eventName: string,
  eventParams: Record<string, any> = {}
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
    console.log(`Evento rastreado: ${eventName}`, eventParams);
  }
};
