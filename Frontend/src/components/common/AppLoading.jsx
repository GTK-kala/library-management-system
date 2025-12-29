import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const AppLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
      <div className="text-center">
        {/* Simple animated book icon */}
        <div className="relative mb-8">
          <motion.div
            animate={{
              rotateY: [0, 10, 0, -10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotateY: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="inline-block"
          >
            <BookOpen className="w-16 h-20 mt-2 text-white" />
          </motion.div>

          {/* Simple pulse effect */}
          <motion.div
            className="absolute inset-0 bg-blue-600 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Simple loading text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-2 text-xl font-semibold text-white">
            Library Manager
          </h2>
          <p className="text-white/80">Loading your dashboard...</p>
        </motion.div>

        {/* Minimal loading dots */}
        <div className="flex justify-center gap-1 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-600 rounded-full"
              animate={{
                y: [0, -5, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppLoading;
