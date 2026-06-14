import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services & Treatments | Glam'more Salon Thiruvalla",
  description: "Explore our full menu of hair cutting, creative coloring, acrylic gel nail extensions, spa pedicures, and skincare treatments at Glam'more.",
};

export default function Page() {
  return <ServicesClient />;
}
