/* eslint-disable @next/next/no-img-element */
import Image from "next/image"


export default function CTA() {
    return (
        <div>
            <section>
                <div className="mx-auto bg-white max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="bg-[#faba38] p-8 md:p-12 lg:px-16 lg:py-24">
                            <div className="mx-auto max-w-xl text-center">
                                <h2 className="text-2xl font-bold text-black md:text-3xl">
                                    Used by the best chefs for tasty, natural and healthy delicacies
                                </h2>

                                <p className="hidden text-black/90 sm:mt-4 sm:block">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam
                                    sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet
                                    volutpat quisque ut interdum tincidunt duis.
                                </p>

                                <div className="mt-4 md:mt-8">
                                    <a
                                        href="#"
                                        className="inline-block text-balance text-black rounded-full border-2 border-white bg-white px-12 py-3 text-sm font-medium transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                                    >
                                        Get Yours Now
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
                            <img
                                alt=""
                                src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723446598/12978-Egusi-Soup-ddmfs-026-4x3-1-e662479f824b4b54bdc25165ad41c6b6_hoyoax.webp"
                                className="h-40 w-full object-cover sm:h-56 md:h-full"
                            />

                            <img
                                alt=""
                                src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723446692/2148821538_pbq1fu.jpg"
                                className="h-40 w-full object-cover sm:h-56 md:h-full"
                            />
                        </div>


                    </div>
                </div>
            </section>
        </div>
    )
}