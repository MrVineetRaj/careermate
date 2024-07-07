"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonialInterface } from "@/config/TypeScriptTypes";
import { testimonials } from "@/config/constants";

const TestimonialCard = ({ testimonial }: any) => {
  return (
    <div className="w-full flex flex-col items-center max-w-[200px]">
      <div className="w-1 h-[30px] bg-primary"></div>
      <div className="">
        <h3 className="text-grad">{testimonial.author}</h3>
        <p className="text-sm text-left line-clamp-5">
          {testimonial.description}
        </p>
      </div>
    </div>
  );
};

const Testimonial = () => {
  const testimonialsLength = testimonials.length;
  return (
    <section className="w-full flex flex-col items-center pt-36">
      <div className="w-[90%] md:w-[75%] lg:w-[60%] ">
        <h1 className="text-grad text-5xl w-full text-center pb-6 border-b-2 border-b-primary">
          What People Are Saying?
        </h1>
        <Carousel>
          <div className="px-8">
            <CarouselContent>
              {testimonials?.map(
                (testimonial: testimonialInterface, index: number) => (
                  <CarouselItem key={index}>
                    <span className="flex w-full justify-between">
                      <TestimonialCard
                        testimonial={testimonials[index % testimonialsLength]}
                      />

                      <TestimonialCard
                        testimonial={
                          testimonials[(index + 1) % testimonialsLength]
                        }
                      />
                      <TestimonialCard
                        testimonial={
                          testimonials[(index + 2) % testimonialsLength]
                        }
                      />
                    </span>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
          </div>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonial;
