/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
    {
        id: 1,
        name: 'Bottle of AfriGold Palm Oil',
        href: 'https://buy.stripe.com/4gw6qa27ca1LgmI3cc',
        imageSrc: 'https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218421/GOLD2_wozmcv.png',
        imageSrc2: 'https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218462/_LUP8385_yy0ku0.png',
        imageAlt: "Bottle of Afrigold Palm Oil",
        price: '£10.99',
        color: '',
    },
    // More products...
]

export default function ProductsList() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <a href={product.href} className="group block overflow-hidden">
                                <div className="relative h-[350px] sm:h-[450px] overflow-hidden">
                                    <img
                                        src={product.imageSrc}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
                                    />

                                    <img
                                        alt={product.imageAlt}
                                        src={product.imageSrc2}
                                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 group-hover:scale-110"
                                    />
                                </div>

                                <div className="relative bg-white pt-3">
                                    <h3 className="text-sm text-gray-700 transition-all duration-300 ease-in-out group-hover:underline group-hover:underline-offset-4">
                                        {product.name}
                                    </h3>

                                    <div className="mt-1.5 flex items-center justify-between text-gray-900">
                                        <p className="tracking-wide">{product.price}</p>

                                        <p className="text-xs uppercase tracking-wide">2 Litres</p>
                                    </div>
                                </div>
                            </a>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
