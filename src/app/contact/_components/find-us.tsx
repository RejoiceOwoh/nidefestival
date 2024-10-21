import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FindUs = () => {
  return (
    <Card className="shadow-lg border-0 bg-accent/30">
      <CardHeader className="bg-accent/5 border-b border-accent/10">
        <CardTitle className="text-2xl font-semibold text-primary">
          Find Us
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8396858.885707242!2d-15.014573267263767!3d54.10224854729113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e1!3m2!1sen!2sro!4v1729552339256!5m2!1sen!2sro"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="w-full h-full rounded-b-lg"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
};

export default FindUs;