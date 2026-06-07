"use client";

import dynamic from "next/dynamic";

const CountdownBanner = dynamic(() => import("@/components/CountdownBanner"), { ssr: false });
const FunFactBanner = dynamic(() => import("@/components/FunFactBanner"), { ssr: false });

export default function ClientBanners() {
  return (
    <>
      <CountdownBanner />
      <FunFactBanner />
    </>
  );
}
