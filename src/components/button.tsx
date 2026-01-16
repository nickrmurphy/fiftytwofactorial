import { HTMLMotionProps, motion } from "motion/react";

export function Button({ children, ...props }: Omit<HTMLMotionProps<"button">, "ref">) {
  return (
    <motion.button
      whileTap={{ scale: 1.1, filter: "brightness(1.1)" }}
      className="bg-zinc-200 text-black/90 px-3.5 py-2.5 rounded-xl font-medium"
      {...props}
    >
      {children}
    </motion.button>
  );
}
