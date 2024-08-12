import Image from "next/image"


export default function CTA() {
    return (
        <div>
            <section>
                <div className="mx-auto bg-white max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="bg-[#faba38] p-8 md:p-12 lg:px-16 lg:py-24">
                            <div className="mx-auto max-w-xl text-center">
                                <h2 className="text-2xl font-bold text-white md:text-3xl">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit
                                </h2>

                                <p className="hidden text-white/90 sm:mt-4 sm:block">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam
                                    sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet
                                    volutpat quisque ut interdum tincidunt duis.
                                </p>

                                <div className="mt-4 md:mt-8">
                                    <a
                                        href="#"
                                        className="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-[#faba38] transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
                                    >
                                        Get Started Today
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
                            <img
                                alt=""
                                src="https://www.allrecipes.com/thmb/gGxd_XsQjCNs7Au0PfgvU4Uce2w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/12978-Egusi-Soup-ddmfs-026-4x3-1-e662479f824b4b54bdc25165ad41c6b6.jpg"
                                className="h-40 w-full object-cover sm:h-56 md:h-full"
                            />

                            <img
                                alt=""
                                src="https://www.chilipeppermadness.com/wp-content/uploads/2024/01/Egusi-Soup-Recipe1.jpg"
                                className="h-40 w-full object-cover sm:h-56 md:h-full"
                            />
                        </div>


                    </div>
                </div>
            </section>
        </div>
    )
}