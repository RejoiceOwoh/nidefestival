import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { Award, EyeIcon } from 'lucide-react'

export default function AboutMain() {
  return (
    <div>
<div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-[#faba38]">Our Heritage!</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Afrigold Palm Oil</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
              AfriGold Palm Oil is a premium UK-based brand that sources its high-quality palm oil directly from Nigeria. 
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt=""
            src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218467/_LUP8401_nhtjxj.png"
            className="w-[48rem] md:max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
              Known for its rich color, robust flavor, and nutritional benefits, AfriGold Palm Oil combines traditional Nigerian methods with modern standards to deliver a product that is both authentic and superior.
              </p>
              <p>
              <strong className="font-semibold text-gray-900">Authenticity and Tradition</strong>
              <br />AfriGold Palm Oil is not just a product; it{"'"}s a heritage. The palm oil is sourced from the
              heart of Nigeria, where palm oil production is deeply rooted in tradition. For generations, Nigerian communities have perfected the art of extracting palm oil, ensuring that each drop retains its natural richness and flavor. This deep connection to traditional methods sets AfriGold apart, providing consumers with an authentic taste of Nigeria.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <EyeIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-[#faba38]" />
                  <span>
                    <strong className="font-semibold text-gray-900">Our Vision:</strong> To become the leading global brand for premium, ethically- sourced palm oil, known for quality and sustainability. 
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <Award aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-[#faba38]" />
                  <span>
                    <strong className="font-semibold text-gray-900">Our Mission:</strong> To provide consumers with the purest, highest-quality palm oil while supporting sustainable farming practices and empowering local Nigerian communities
                  </span>
                </li>
              </ul>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Quality and Purity</h2>
              <p className="mt-6">
              The original production process of AfriGold Palm Oil emphasizes purity. Following
              meticulous traditional methods that have been refined over centuries. This process involves selecting the finest palm fruits, which are then carefully processed to extract the oil without losing its essential nutrients. The commitment to quality ensures that AfriGold Palm Oil remains unadulterated and true to its origins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-[#faba38]">Our Heritage!</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Afrigold Palm Oil</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
              AfriGold Palm Oil is a premium UK-based brand that sources its high-quality palm oil directly from Nigeria. 
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt=""
            src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218467/_LUP8401_nhtjxj.png"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] sm:h-[10rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
              Known for its rich color, robust flavor, and nutritional benefits, AfriGold Palm Oil combines traditional Nigerian methods with modern standards to deliver a product that is both authentic and superior.
              </p>
              <p>
              <strong className="font-semibold text-gray-900">Authenticity and Tradition</strong>
              <br />AfriGold Palm Oil is not just a product; it{"'"}s a heritage. The palm oil is sourced from the
              heart of Nigeria, where palm oil production is deeply rooted in tradition. For generations, Nigerian communities have perfected the art of extracting palm oil, ensuring that each drop retains its natural richness and flavor. This deep connection to traditional methods sets AfriGold apart, providing consumers with an authentic taste of Nigeria.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <EyeIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-[#faba38]" />
                  <span>
                    <strong className="font-semibold text-gray-900">Our Vision:</strong> To become the leading global brand for premium, ethically- sourced palm oil, known for quality and sustainability. 
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <Award aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-[#faba38]" />
                  <span>
                    <strong className="font-semibold text-gray-900">Our Mission:</strong> To provide consumers with the purest, highest-quality palm oil while supporting sustainable farming practices and empowering local Nigerian communities
                  </span>
                </li>
              </ul>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Quality and Purity</h2>
              <p className="mt-6">
              The original production process of AfriGold Palm Oil emphasizes purity. Following
              meticulous traditional methods that have been refined over centuries. This process involves selecting the finest palm fruits, which are then carefully processed to extract the oil without losing its essential nutrients. The commitment to quality ensures that AfriGold Palm Oil remains unadulterated and true to its origins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </div>
  )
}
