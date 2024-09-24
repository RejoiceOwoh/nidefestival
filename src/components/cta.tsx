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
                                    Oil Produced for Healthy Recipes
                                </h2>

                                <p className="hidden text-black/90 sm:mt-4 sm:block">
                                    Explore delicious and nutritious recipes made with Afri Gold Palm Oil. From Native Jollof rice and all native soups to modern fusion dishes, discover meals that are both healthy and flavorful.
                                </p>

                                <div className="mt-4 md:mt-8">
                                    <a
                                        href="/products"
                                        className="inline-block text-balance text-black rounded-full border-2 border-white bg-white px-12 py-3 text-sm font-medium transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                                    >
                                        Get Yours Now
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
                            <Image
                                alt=""
                                src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1727198510/Egusi_Soup_Recipe_-_How_to_cook_egusi_soup_pd3u7q.jpg"
                                className="h-40 w-full object-cover sm:h-56 md:h-full"
                                width={500} // Set the width as per your design
                                height={300} // Set the height as per your design
                            />
                            <Image
                                alt=""
                                src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1727198461/e8ef346971e02b9bd9446c309b5a8472_vddjk7.jpg"
                                className="h-40 w-full object-cover sm:h-56 md:h-full"
                                width={500} // Set the width as per your design
                                height={300} // Set the height as per your design
                            />
                        </div>


                    </div>
                </div>
            </section>
        </div>
    )
}