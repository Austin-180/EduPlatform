import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -12 },
}

const transition = { duration: 0.32, ease: [0.16, 1, 0.3, 1] }

export default function PageTransition({ children, style }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', ...style }}
    >
      {children}
    </motion.div>
  )
}
