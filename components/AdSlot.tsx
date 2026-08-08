"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

type AdSlotProps = {
  slot?: string;
  placement: string;
  format?: "auto" | "rectangle" | "horizontal";
};

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export default function AdSlot({ slot, placement, format = "auto" }: AdSlotProps) {
  const enabled = Boolean(client && slot);

  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers and consent tools can intentionally prevent ad loading.
    }
  }, [enabled, slot]);

  return (
    <aside className={`ad-slot ad-slot-${format}`} aria-label="Advertisement" data-placement={placement}>
      <span>ADVERTISEMENT</span>
      {enabled ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <p>Ad space</p>
      )}
    </aside>
  );
}
