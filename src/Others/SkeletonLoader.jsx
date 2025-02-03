import React from "react";
import { motion } from "framer-motion";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-grow flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </main>
    </div>
  );
};

export default SkeletonLoader;
