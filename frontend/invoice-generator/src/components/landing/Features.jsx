//import React from 'react'
import { ArrowRight } from "lucide-react";
import { FEATURES } from "../../utils/data";

const Features = () => {
  return (
    <section id="features" className="">
        <div className="">
            <div className="">
                <h2 className="">Powerful Features to Run Your Business</h2>
                <p className="">Everything you need to manage your invoicing and get paid.</p>
            </div>
            <div className="">
                {FEATURES.map((feature,index) => {
                    <div key={index} className="">
                        <div className="">
                            <feature.icon className=""/>
                        </div>
                        <h3 className="">
                            {feature.title}
                        </h3>
                        <p className="">{feature.description}</p>
                        <a href="#" className="">Learn More <ArrowRight className=""/></a>
                    </div>
                })}
            </div>
        </div>
    </section>
  )
}

export default Features