"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  InformationCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Products", href: "/products", icon: UserGroupIcon },
  { name: "About", href: "/about", icon: InformationCircleIcon },
  { name: "Contact", href: "/contact", icon: PhoneIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg"
            : "bg-white"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Tower of Refuge Hospital</span>
              <Image
                height={40}
                width={40}
                className="h-10 w-auto"
                src="/logo.png"
                alt="Hospital Logo"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:bg-accent"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 flex items-center space-x-1 px-3 py-2 rounded-full transition duration-300 ${
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    pathname === item.href ? "text-primary" : "text-primary/60"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/appointment"
              className="text-sm font-semibold leading-6 text-primary-foreground bg-primary px-4 py-2 rounded-full hover:bg-primary/90 transition duration-300 flex items-center space-x-1 shadow-md hover:shadow-lg"
            >
              <CalendarIcon className="h-5 w-5 text-primary-foreground" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-y-auto lg:hidden"
          >
            <div className="flex items-center justify-between p-6">
              <Link
                href="/"
                className="-m-1.5 p-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Tower of Refuge Hospital</span>
                <Image
                  height={32}
                  width={32}
                  className="h-8 w-auto"
                  src="/logo.png"
                  alt="Hospital Logo"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-muted-foreground hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root px-6">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 flex items-center space-x-2 ${
                        pathname === item.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon
                        className={`h-6 w-6 ${
                          pathname === item.href
                            ? "text-primary"
                            : "text-primary/60"
                        }`}
                      />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/appointment"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary-foreground bg-primary hover:bg-primary/90 transition duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <CalendarIcon className="h-6 w-6 text-primary-foreground" />
                    <span>Book Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
