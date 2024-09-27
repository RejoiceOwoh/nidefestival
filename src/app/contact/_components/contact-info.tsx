import React from "react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactInformation = () => {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-[#faba38]/30 border-b border-primary/10">
        <CardTitle className="text-2xl font-semibold text-primary">
          Contact Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-start">
            <MapPinIcon className="w-6 h-6 text-gray-400 mr-4 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-700">Address</h4>
              <p className="text-gray-600">
                United Kingdom
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <PhoneIcon className="w-6 h-6 text-gray-400 mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-700">Phone</h4>
              <p className="text-gray-600">+44 75260 66245</p>
            </div>
          </div>
          <div className="flex items-center">
            <EnvelopeIcon className="w-6 h-6 text-gray-400 mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-700">Email</h4>
              <p className="text-gray-600">info@acefoods.co.uk</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInformation;
