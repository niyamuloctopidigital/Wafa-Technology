'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    category: string
    categoryTag: string
    description: string
    technologies: string[]
    thumbnail: string
    link: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-64 rounded-lg overflow-hidden mb-4 bg-[#111111] border border-[#4ADE80]/20 group-hover:border-[#4ADE80]/50 transition-colors duration-300">
        {/* Thumbnail */}
        <div
          className="absolute inset-0"
          style={{ background: project.thumbnail }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-white font-bold text-xl text-center mb-4">{project.title}</h3>
          <p className="text-gray-300 text-center text-sm mb-4">{project.description}</p>
          <Link
            href={project.link}
            className="px-4 py-2 bg-[#4ADE80] text-[#0a0a0a] rounded font-semibold hover:bg-[#22c55e] transition-colors"
          >
            View Project
          </Link>
        </motion.div>
      </div>

      {/* Content */}
      <div>
        {/* Category Badge */}
        <span className="inline-block px-3 py-1 bg-[#4ADE80]/10 text-[#4ADE80] text-xs font-medium rounded-full border border-[#4ADE80]/20 mb-3">
          {project.categoryTag}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#4ADE80] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-[#4ADE80]/10 text-[#4ADE80] rounded border border-[#4ADE80]/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 bg-[#4ADE80]/10 text-[#4ADE80] rounded border border-[#4ADE80]/20">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
