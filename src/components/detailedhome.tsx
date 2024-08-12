export default function DetailedHome() {
    return (
        <div>
            <section>
                <div className="mx-auto bg-white w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Afrigold Palm Oil Originality 
                        </h2>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
                            <img
                                alt=""
                                src="https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218622/_LUP8379_z3nzi5.png"
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>

                        <div className="lg:py-16">
                            <article className="space-y-4 text-gray-600">
                                <p>
                                AfriGold Palm Oil is not just a product; it{"'"}s a heritage. The palm oil is sourced from the
                                heart of Nigeria, where palm oil production is deeply rooted in tradition. For generations, Nigerian communities have perfected the art of extracting palm oil, ensuring that each drop retains its natural richness and flavor. This deep connection to traditional methods sets AfriGold apart, providing consumers with an authentic taste of Nigeria.
                                </p>

                                <p>
                                Following
                                meticulous traditional methods that have been refined over centuries. This process involves selecting the finest palm fruits, which are then carefully processed to extract the oil without losing its essential nutrients. The commitment to quality ensures that AfriGold Palm Oil remains unadulterated and true to its origins.
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}