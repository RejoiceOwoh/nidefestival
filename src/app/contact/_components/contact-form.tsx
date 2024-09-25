"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  UserIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);  // New submission state

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const currentURL = typeof window !== "undefined" ? window.location.href : "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitted(true);  // Set form to submitted

    // Optionally trigger success toast
    toast.success("Message sent successfully!", {
      description: "You'll be redirected shortly.",
    });

    // Allow FormSubmit.co to handle actual form submission and redirect
  };

  return (
    <Form {...form}>
      <form
        id="contactform"
        action="https://formsubmit.co/acefoodsuk@gmail.com"
        method="POST"
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Hidden input to handle the redirect */}
        <input type="hidden" name="_next" value={currentURL} />
        <input type="hidden" name="_captcha" value="false" />

        {/* Conditional success message */}
        {submitted && (
          <div className="text-center text-green-600 font-bold mb-4">
            🎉 Your message has been sent! Redirecting...
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold">Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold">
                Email
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold">
                Subject
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <ChatBubbleLeftIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Your Subject"
                    {...field}
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold">
                Message
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please provide details about your inquiry..."
                  className="resize-none bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="pt-4"
        >
          <Button
            type="submit"
            className="w-full bg-[#faba38]  text-black font-semibold hover:text-black hover:bg-transparent hover:border-2 hover:border-[#faba38] py-3 px-6 rounded-md transition duration-300 flex items-center justify-center"
          >
            <PaperAirplaneIcon className="h-5 w-5 mr-2" />
            Send Message
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};

export default ContactForm;
