import { motion } from "framer-motion";
import { BookOpen, Library, Sparkles, BookText } from "lucide-react";

const AppLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full opacity-10 bg-gradient-to-r from-blue-400 to-purple-400"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, 20, -10, 10, 0],
              x: [null, 10, -10, 5, -5, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Main Loading Container */}
      <div className="relative z-10">
        {/* Animated Book Stack */}
        <div className="relative mb-12">
          <motion.div
            className="absolute -left-8 -top-4"
            animate={{
              rotate: [0, 5, -5, 5, 0],
              y: [0, -2, 2, -1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <BookOpen className="w-12 h-12 text-blue-400/50" />
          </motion.div>

          <motion.div
            className="absolute -right-6 -top-2"
            animate={{
              rotate: [0, -3, 3, -3, 0],
              y: [0, 2, -2, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.2,
            }}
          >
            <BookText className="w-10 h-10 text-purple-400/50" />
          </motion.div>

          {/* Center Animated Book */}
          <div className="relative">
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.05, 1],
                rotateY: [0, 180, 360],
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
                rotateY: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <div className="p-6 shadow-2xl bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
                <Library className="w-16 h-16 text-white" />
              </div>

              {/* Floating particles around the book */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  initial={{
                    x: 40,
                    y: 40,
                    scale: 0,
                  }}
                  animate={{
                    x: 40 + Math.cos(i * 45 * (Math.PI / 180)) * 60,
                    y: 40 + Math.sin(i * 45 * (Math.PI / 180)) * 60,
                    scale: [0, 1, 0.5, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </div>

        {/* Loading Text & Progress */}
        <div className="text-center">
          <motion.h1
            className="mb-6 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Library<span className="text-blue-400">.</span>Pro
          </motion.h1>

          <motion.p
            className="mb-8 text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              Loading your digital library experience
            </span>
          </motion.p>

          {/* Animated Progress Bar */}
          <div className="relative w-64 h-2 mx-auto mb-4 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
            <motion.div
              className="absolute top-0 bottom-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Progress bar shimmer effect */}
            <motion.div
              className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-100, 400] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Loading Message */}
          <motion.p
            className="mt-8 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              className="inline-block"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Preparing your dashboard...
            </motion.span>
          </motion.p>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-6 -mb-8">
          {["📚", "✨", "🎯", "🚀"].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Animated border around the whole screen */}
      <div className="absolute pointer-events-none inset-4">
        <motion.div
          className="absolute inset-0 border-2 border-transparent rounded-3xl"
          animate={{
            borderColor: [
              "rgba(59, 130, 246, 0.1)",
              "rgba(147, 51, 234, 0.2)",
              "rgba(59, 130, 246, 0.1)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          style={{
            borderImage: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899) 1",
          }}
        />
      </div>
    </div>
  );
};

export default AppLoading;
