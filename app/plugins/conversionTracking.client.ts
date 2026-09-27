import { track } from "@vercel/analytics/nuxt/runtime";

type ConversionEvent =
  | "booking_click"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "directions_click";

const getConversionEvent = (href: string): ConversionEvent | undefined => {
  const url = new URL(href, window.location.origin);

  if (url.hostname === "enisa-healing-massage.setmore.com") {
    return "booking_click";
  }

  if (url.protocol === "tel:") {
    return "phone_click";
  }

  if (url.protocol === "mailto:") {
    return "email_click";
  }

  if (url.hostname === "wa.me" || url.hostname.endsWith(".whatsapp.com")) {
    return "whatsapp_click";
  }

  if (
    url.hostname.endsWith("google.com") &&
    (url.pathname.startsWith("/maps/dir") ||
      url.pathname.startsWith("/maps/search"))
  ) {
    return "directions_click";
  }

  return undefined;
};

export default defineNuxtPlugin(() => {
  document.addEventListener("click", (event) => {
    if (event.button !== 0) return;

    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;

    const conversionEvent = getConversionEvent(link.href);
    if (!conversionEvent) return;

    track(conversionEvent, { source_path: window.location.pathname });
  });
});
