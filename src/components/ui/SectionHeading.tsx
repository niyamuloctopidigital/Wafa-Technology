'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

interface SectionHeadingProps {
  tag?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

const SectionHeading = ({
  tag,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const justifyContent = align === 'center' ? 'center' : 'flex-start'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${alignClasses}`}
    >
      {/* Tag */}
      {tag && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block mb-4"
        >
          <span className="tag">{tag}</span>
        </motion.div>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold font-display gradient-text-white mb-4"
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-lg text-white/40 leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeading
