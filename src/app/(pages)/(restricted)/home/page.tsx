"use client";
import {
  HomeBriefFuelDataProvider,
  HomeBriefTelemetryOBD,
} from "@/modules/home/components";

export default function Home() {
  return (
    <div>
      {/* <section> */}
      <HomeBriefFuelDataProvider />
      {/* </section> */}
      <HomeBriefTelemetryOBD />
    </div>
  );
}
