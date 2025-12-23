import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const AppLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
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
            <BookOpen className="w-16 h-20 text-blue-600 dark:text-blue-400" />
          </motion.div>

          {/* Simple pulse effect */}
          <motion.div
            className="absolute inset-0 bg-blue-100 rounded-full dark:bg-blue-900/30"
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
          <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
            Library Manager
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your dashboard...
          </p>
        </motion.div>

        {/* Minimal loading dots */}
        <div className="flex justify-center gap-1 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full"
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
