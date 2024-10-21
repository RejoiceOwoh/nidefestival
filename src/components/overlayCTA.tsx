"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Eye, Sun } from 'lucide-react'

export default function OverlayCTA() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 500)
        return () => clearTimeout(timer)
    }, [])

    const stats = [
        { icon: Heart, label: 'Heart Health', value: '20%', description: 'Improved cardiovascular function due to the presence of tocotrienols and healthy fats.' },
        { icon: Eye, label: 'Vision Support', value: '9,000 IU', description: 'Per tablespoon - Improved vision due to high levels of carotenoids, which the body converts to Vitamin A' },
        { icon: Sun, label: 'Energy Boost', value: '120 kcal', description: 'Per tablespoon - Increased energy levels from medium-chain triglycerides (MCTs) that provide a quick energy source' },
    ]

    return (
        <section className="relative overflow-hidden bg-[url(https://res.cloudinary.com/dyd0lsoo4/image/upload/v1723218624/_LUP8399_qhesh0.png)] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="max-w-xl text-center sm:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Pure, Unrefined Excellence
                    </h2>

                    <p className="mt-4 max-w-lg text-white/90 sm:text-xl/relaxed">
                        Experience the power of nature with our premium palm oil. Rich in essential vitamins and antioxidants, it{"'"}s the perfect choice for your everyday cooking needs.
                    </p>

                    <motion.div
                        className="mt-8 flex flex-wrap gap-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <a
                            href="/products"
                            className="block w-full rounded-full bg-primary px-12 py-3 text-sm font-medium text-accent shadow hover:bg-primary/90 focus:outline-none focus:ring sm:w-auto"
                        >
                            Get Yours Today
                        </a>

                        <a
                            href="/about"
                            className="block w-full rounded-full bg-accent px-12 py-3 text-sm font-medium text-primary shadow hover:text-primary/90 focus:outline-none focus:ring sm:w-auto"
                        >
                            Learn More
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <dl className="mt-8 flex flex-col gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6 lg:grid lg:gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-6 text-center backdrop-blur-sm"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <dt className="order-last text-lg font-medium text-white/75">
                                    {stat.label}
                                </dt>

                                <dd className="text-4xl font-extrabold text-white md:text-5xl">
                                    {stat.value}
                                </dd>

                                <stat.icon className="mb-2 h-8 w-8 text-primary" />

                                <p className="mt-1 text-sm text-accent/60">{stat.description}</p>
                            </motion.div>
                        ))}
                    </dl>
                </motion.div>
            </div>
        </section>
    )
}