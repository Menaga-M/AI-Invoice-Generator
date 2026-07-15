//import React from 'react'
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "../../utils/data";


const Testimonials = () => {
  return (
    <section id="testimonials" className="">
        <div className="">
            <div className="">
                <h2 className="">
                    What Our Customers Say
                </h2>
                <p className="">We are trusted by thousands of small businesses.</p>
            </div>
            <div className="">
                {TESTIMONIALS.map((Testimonial, index) => (
                    <div key={index} className="">
                        <div className="">
                            <Quote className=""/>
                        </div>
                        <p className="">{Testimonial.quote}</p>
                        <div className="">
                            <img src={Testimonial.avatar} alt={Testimonial.author} className=""/>
                            <div className="">
                                <p className="">{Testimonial.author}</p>
                                <p className="">{Testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Testimonials