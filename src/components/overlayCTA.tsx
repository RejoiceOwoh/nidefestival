export default function OverlayCTA() {
    return (
        <div>
            <section
                className="overflow-hidden bg-[url(https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218624/_LUP8399_qhesh0.png)] bg-cover bg-bottom bg-no-repeat"
            >
                <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
                    <div className="">
                        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">Made for you</h2>

                        <p className="max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore officia corporis quasi
                            doloribus iure architecto quae voluptatum beatae excepturi dolores.
                        </p>

                        <div className="mt-4 sm:mt-8">
                            <a
                                href="#"
                                className="inline-block rounded-full bg-[#faba38] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#faba38]/70 focus:outline-none focus:ring focus:ring-yellow-400"
                            >
                                Get Yours Today
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}