import Image from 'next/image'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[40vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1600,h_800,g_auto/v1734365468/pexels-safari-consoler-3290243-28928758_wxpedr.jpg"
          alt="Contact Us"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl">Get in touch with the Niger Delta Festival team</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-[#E67E22] mr-4" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p>info@nigerdeltafestival.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-[#E67E22] mr-4" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p>+234 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-[#E67E22] mr-4" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p>123 Festival Street, Port Harcourt, Rivers State, Nigeria</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-[#E67E22] transition-colors">
                  <Facebook className="w-8 h-8" />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#E67E22] transition-colors">
                  <Twitter className="w-8 h-8" />
                </a>
                <a href="#" className="text-gray-600 hover:text-[#E67E22] transition-colors">
                  <Instagram className="w-8 h-8" />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

