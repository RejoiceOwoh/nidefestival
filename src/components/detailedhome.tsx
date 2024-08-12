export default function DetailedHome() {
    return (
        <div>
            <section>
                <div className="mx-auto bg-white w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Lorem ipsum, dolor sit amet consectetur 
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
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis
                                    eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae
                                    eius quidem quam repellat.
                                </p>

                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum explicabo quidem
                                    voluptatum voluptas illo accusantium ipsam quis, vel mollitia? Vel provident culpa
                                    dignissimos possimus, perferendis consectetur odit accusantium dolorem amet voluptates
                                    aliquid, ducimus tempore incidunt quas. Veritatis molestias tempora distinctio
                                    voluptates sint! Itaque quasi corrupti, sequi quo odit illum impedit!
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}