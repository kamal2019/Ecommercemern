import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Cart from "../components/Cart";
import Clients from "../components/Clients";
import CtaSection from "../components/Ctasection";

function Home() {
  return (
    <div>
      <Banner />
      <Clients />
      <Cart content="Our Products" slice0={0} slice1={8} />
      <CtaSection />
      <Cart content="Products you might need" slice0={8} slice1={16} />
    </div>
  );
}

export default Home;
