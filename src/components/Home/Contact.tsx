import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="flex w-[90%] sm:w-[80%] lg:w-[60%] pt-16">
      <div className="flex flex-[0.5] flex-col gap-4 mt-8 w-full">
        <h1 className="text-grad">Contact Form</h1>
        <div className="relative w-full">
          <input
            type="text"
            name="name"
            required
            className="bg-transparent border border-gray-800 px-4 py-2 rounded-md border-b-2 outline-none focus:border-b-primary w-full peer"
          />
          <label
            htmlFor="name"
            className="absolute left-2 top-2.5 peer-focus:text-primary peer-focus:text-sm peer-focus:-top-2 transition-all duration-150"
          >
            Name *
          </label>
        </div>
        <div className="relative w-full">
          <input
            type="email"
            name="email"
            required
            className="bg-transparent border border-gray-800 px-4 py-2 rounded-md border-b-2 outline-none focus:border-b-primary w-full peer"
          />
          <label
            htmlFor="email"
            className="absolute left-2 top-2.5 peer-focus:text-primary peer-focus:text-sm peer-focus:-top-2 transition-all duration-150"
          >
            Email *
          </label>
        </div>
        <div className="relative w-full">
          <textarea
            name="description"
            required
            className="bg-transparent border border-gray-800 px-4 py-2 rounded-md border-b-2 outline-none focus:border-b-primary w-full peer"
          />
          <label
            htmlFor="description"
            className="absolute left-2 top-2.5 peer-focus:text-primary peer-focus:text-sm peer-focus:-top-2 transition-all duration-150"
          >
            Description *
          </label>
        </div>
      </div>
    </section>
  );
};

export default Contact;
