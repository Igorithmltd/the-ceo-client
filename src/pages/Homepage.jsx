import Faqs from "../components/Faqs";
import Hero from "../components/Hero";
import Cta from "../components/Cta";
import PlansSection from "../components/PlanSection";
import FeaturesSection from "./FeaturesSection";
import Marquee from "../components/Marquee";

export default function Home() {
  return (
    <main className=" relative py-12">
      <div className="container mx-auto px-5">
        <Hero
          heading={
            <>
              <span className="text-red">Grow</span> your business with{" "}
              <span className="text-red">Ease</span>
            </>
          }
          paragraph="TheCEOApp gives business owners instant graphic designs, an instant
        website, tracking of inventory, sales and debtor data, receipts,
        invoices, quotations and more business growth tools."
        />
        <Marquee />
        <FeaturesSection />
        <PlansSection />
      </div>

      <Faqs />

      <Cta
        heading="Manage Your Business Effortlessly with TheCEOApp"
        paragraph="TheCEOApp gives business owners instant graphic designs, an instant website , tracking
              of inventory, sales and debtor data, receipts, invoices, quotations and more business
              growth tools."
      />
    </main>
  );
}
