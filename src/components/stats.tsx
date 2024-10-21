"use client"

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Droplet, Leaf, ShieldCheck, Zap } from 'lucide-react'

const stats = [
    { icon: Droplet, label: 'Purity Level', value: 99.9, suffix: '%', color: 'bg-blue-500', progress: 99.9 },
    { icon: Zap, label: 'Quality Assurance Process', value: 3, suffix: '-Step', color: 'bg-yellow-500', progress: 100 },
    { icon: Leaf, label: 'Natural Ingredients', value: 100, suffix: '%', color: 'bg-green-500', progress: 100 },
    { icon: ShieldCheck, label: 'Trans-Fat', value: 0, suffix: '%', color: 'bg-red-500', progress: 100 },
]

interface CountUpProps {
    end: number;
    duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let startTime: number | null = null
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        requestAnimationFrame(animate)
    }, [end, duration])

    return <>{count}</>
}

export default function Stats() {
    const controls = useAnimation()
    const [ref, inView] = useInView()

    useEffect(() => {
        if (inView) {
            controls.start('visible')
        }
    }, [controls, inView])

    return (
        <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                        More Than Just Palm Oil
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
                        We are committed to delivering the best while making a positive difference. These numbers tell our story.
                    </p>
                </motion.div>

                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial="hidden"
                            animate={controls}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                            }}
                        >
                            <Card className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <stat.icon className={`h-12 w-12 ${stat.color} rounded-full p-2 text-white`} />
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                            <p className="text-3xl font-bold text-gray-900">
                                                <CountUp end={stat.value} />
                                                {stat.suffix}
                                            </p>
                                        </div>
                                    </div>
                                    <Progress
                                        value={stat.progress}
                                        className={`mt-4 ${stat.color}`}
                                    />
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}