// Example Fallback Component with Framer Motion animations
import { motion } from 'framer-motion'

export default function FallbackLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-opacity-90 bg-primary">
      <motion.div
        className="text-center p-6 rounded-md bg-red shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2 className="text-4xl font-bold text-accent mb-4 animate-pulse">
          Preparing Your Policies...
        </h2>
        <div className="flex space-x-2 mt-4 justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 bg-white rounded-full"
              animate={{
                y: [0, -10, 0],
                transition: { duration: 0.6, repeat: Infinity, delay: i * 0.2 },
              }}
            />
          ))}
        </div>
        <motion.div
          className="h-1 bg-gradient-to-r from-primary to-red mt-4"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
