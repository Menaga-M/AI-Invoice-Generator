//import React from "react";
import Headers from "../../components/landing/Headers";
import Hero from "../../components/landing/Hero";

const LandingPage =  () => {
  return (
    <div className='bg-[#ffffff] text-gray-600'>
        <Headers />
      <main>
        <Hero />
      </main>
    </div>
  )
};

export default LandingPage;