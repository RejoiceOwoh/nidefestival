import Image from 'next/image'
import FAQAccordion from '@/components/FAQAccordion'

const faqCategories = [
  {
    category: "Registration",
    questions: [
      {
        question: "How do I register for the Niger Delta Festival?",
        answer: "You can register for the Niger Delta Festival through our online portal. Visit the 'Registration' page on our website and follow the step-by-step instructions to complete your registration."
      },
      {
        question: "Is there a registration fee?",
        answer: "The registration fee varies depending on the type of participation. Please check our 'Tickets' page for detailed information on fees and what they include."
      },
      {
        question: "Can I register on-site during the festival?",
        answer: "While we recommend registering in advance, limited on-site registration may be available. However, this is subject to capacity and cannot be guaranteed."
      }
    ]
  },
  {
    category: "Vendors",
    questions: [
      {
        question: "How can I apply to be a vendor at the festival?",
        answer: "Vendor applications are accepted through our website. Navigate to the 'Vendors' section and fill out the application form. Our team will review your application and get back to you."
      },
      {
        question: "What types of products are allowed for vending?",
        answer: "We welcome vendors selling authentic Niger Delta crafts, artworks, food, and cultural items. All products must be approved by our vendor committee to ensure they align with the festival's theme and standards."
      }
    ]
  },
  {
    category: "Hotel Reservations",
    questions: [
      {
        question: "Are there partner hotels offering special rates for festival attendees?",
        answer: "Yes, we have partnered with several hotels in the area that offer special rates for festival attendees. You can find the list of partner hotels and booking instructions on our 'Accommodation' page."
      },
      {
        question: "How far in advance should I book my hotel?",
        answer: "We recommend booking your hotel as soon as possible after registering for the festival. Hotels tend to fill up quickly, especially those closest to the festival grounds."
      }
    ]
  },
  {
    category: "Festival Program",
    questions: [
      {
        question: "What types of events can I expect at the festival?",
        answer: "The Niger Delta Festival features a wide range of events including cultural performances, art exhibitions, culinary showcases, workshops, and panel discussions. Check our 'Program' page for a detailed schedule."
      },
      {
        question: "Are there any age restrictions for festival events?",
        answer: "Most festival events are suitable for all ages. However, some specific events may have age restrictions. These will be clearly marked in the program schedule."
      }
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[40vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_1600,h_800/v1734365481/pexels-efrem-efre-2786187-28284658_aulnph.jpg"
          alt="Frequently Asked Questions"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl max-w-2xl">Find answers to common questions about the Niger Delta Festival</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {faqCategories.map((category, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                <FAQAccordion questions={category.questions} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

