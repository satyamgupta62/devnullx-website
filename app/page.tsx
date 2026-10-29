import { CapabilityLedger } from "./components/capability-ledger";
import { CompanyClose } from "./components/company-close";
import { HardwareReveal } from "./components/hardware-reveal";
import { IncidentJourney } from "./components/incident-journey";
import { NetworkAtlas, ProductSpotlight } from "./components/network-atlas";
import { OperationalStack } from "./components/operational-stack";
import { ProductPillars } from "./components/product-pillars";
import { SupportedBy } from "./components/supported-by";

export default function Home() {
  return (
    <main id="main">
      <NetworkAtlas />
      <HardwareReveal />
      <ProductSpotlight />
      <OperationalStack />
      <CapabilityLedger />
      <IncidentJourney />
      <ProductPillars />
      <SupportedBy />
      <CompanyClose />
    </main>
  );
}
