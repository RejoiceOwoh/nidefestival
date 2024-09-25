"use client";

import React, { useState } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner"; // Optional: To show toast notifications

const FooterForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send the form data to FormSubmit.co using fetch
      const response = await fetch("https://formsubmit.co/acefoodsuk@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true); // Set submitted to true to display the success message
        setEmail(""); // Clear the input field

        // Optionally trigger success toast notification
        toast.success("Successfully subscribed!", {
          description: "Thank you for subscribing!",
        });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast.error("Subscription failed", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <form id="contactform" onSubmit={handleSubmit} className="flex flex-col space-y-2">
      {/* Conditional success message */}
      {submitted && (
        <div className="text-center text-green-600 font-bold mb-2">
          🎉 Subscription successful!
        </div>
      )}

      <input
        type="email"
        name="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update the email state
        required
        className="px-4 py-2 bg-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-sm text-white placeholder-gray-400"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-white text-primary font-semibold rounded-md hover:bg-gray-100 transition duration-300 text-sm flex items-center justify-center"
      >
        <CalendarDaysIcon className="h-5 w-5 mr-2" />
        Subscribe
      </button>
    </form>
  );
};

export default FooterForm;
