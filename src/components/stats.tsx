

export default function Stats() {
    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">More Than Just Palm Oil</h2>

                    <p className="mt-4 text-gray-500 sm:text-xl">
                    We are more than just palm oil. These numbers highlight our commitment to delivering the best while making a positive difference.
                    </p>
                </div>

                <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Purity Level</dt>

                        <dd className="text-4xl font-extrabold text-[#faba38] md:text-5xl">99.9%</dd>
                    </div>

                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Quality Assurance Process</dt>

                        <dd className="text-4xl font-extrabold text-[#faba38] md:text-5xl">3-Step</dd>
                    </div>

                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Natural Ingredients</dt>

                        <dd className="text-4xl font-extrabold text-[#faba38] md:text-5xl">100%</dd>
                    </div>

                    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Trans-Fat</dt>

                        <dd className="text-4xl font-extrabold text-[#faba38] md:text-5xl">0%</dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}
