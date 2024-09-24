import Link from "next/link";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/afrigoldpalmoil", icon: FacebookIcon },
  { name: "Twitter", href: "https://x.com/afrigoldpalmoil", icon: TwitterIcon },
  { name: "Instagram", href: "https://instagram.com/afrigoldpalmoil", icon: InstagramIcon },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "Products", href: "/products" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Sitemap", href: "/sitemap" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#000000] text-white relative overflow-hidden">
      {/* SVG Background */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(255, 255, 255, 0.05)"
          fillOpacity="1"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hospital Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[gold]">
              Afrigold Palmoil
            </h2>
            <p className="mb-4 text-sm text-gray-200">
              Palm Oil at its Originality
            </p>
            <div className="flex mb-4 space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <p className="mb-4 text-sm text-gray-200">
              <b>PATNERSHIP?</b> Send us an email at <a href="mailto:acefoodsuk@gmail.com">acefoodsuk@gmail.com</a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-200 hover:text-white transition duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-sm">
                <MapPinIcon className="h-5 w-5 text-gray-300" />
                <span className="text-gray-200">
                26 Greenfern Avenue, Slough, SL1 6AQ United Kingdom
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <PhoneIcon className="h-5 w-5 text-gray-300" />
                <span className="text-gray-200"> <a href="tel:+44 75260 66245">+44 75260 66245</a> 
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <EnvelopeIcon className="h-5 w-5 text-gray-300" />
                <span className="text-gray-200">
                 <a href="mailto:info@acefoods.co.uk">info@acefoods.co.uk</a>
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
              <FaWhatsapp size={40} className="h-5 w-5 text-gray-300" />
                <span className="text-gray-200">
                <a href="https://wa.me/+447526066245" target="_blank" rel="noopener noreferrer">Chat with us</a>
                </span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
              <FaStar size={20} className="h-5 w-5 text-gray-300" />
                <span className="text-gray-200">
                <a href="/contact" target="_blank" rel="noopener noreferrer">Let{"'"}s hear your review</a>
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Stay Informed
            </h3>
            <p className="text-sm mb-4 text-gray-200">
              Subscribe to our newsletter for product updates.
            </p>
            <form id="contactform" action="https://formsubmit.io/send/acefoodsuk@gmail.com" method="POST" className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left text-gray-300">
            &copy; {currentYear} Acefoods Global. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
            {/* <ul className="flex space-x-4 mb-2 md:mb-0 md:mr-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul> */}
            <p className="text-xs text-gray-400">
              Designed and developed by{" "}
              <a
                href="https://mytechteam.ng"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                My Tech Team
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
