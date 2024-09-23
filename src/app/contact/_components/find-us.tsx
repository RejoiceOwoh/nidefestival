import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FindUs = () => {
  return (
    <Card className="shadow-lg border-0 bg-[#faba38]/30">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="text-2xl font-semibold text-primary">
          Find Us
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.485407965132!2d-0.6609252235886595!3d51.52265617181677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487664a88bdb2153%3A0x2c0e0e90b62e3bc7!2s26%20Greenfern%20Ave%2C%20Taplow%2C%20Slough%20SL1%206AQ%2C%20UK!5e0!3m2!1sen!2sng!4v1727107274941!5m2!1sen!2sng"
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