import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FindUs = () => {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="text-2xl font-semibold text-primary">
          Find Us
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6676173779683!2d7.4234943!3d6.4358333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044a3d8f9f3d3a7%3A0x9a0f0e7b0b8f9f9f!2sTower%20of%20Refuge%20Hospital!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
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
