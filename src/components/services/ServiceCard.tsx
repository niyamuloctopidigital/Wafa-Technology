import Link from 'next/link'

interface ServiceCardProps {
  service: {
    slug: string
    title: string
    description: string
    icon: string
    keyFeatures: string[]
    technologies: string[]
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const getIcon = (icon: string) => {
    const icons: Record<string, string> = {
      globe: '🌐',
      palette: '🎨',
      sparkles: '✨',
      'trending-up': '📈'
    }
    return icons[icon] || '→'
  }

  return (
    <div className="bg-[#111111] border border-[#4ADE80]/20 rounded-lg p-8 hover:border-[#4ADE80]/50 hover:shadow-lg hover:shadow-[#4ADE80]/10 transition-all duration-300 group">
      {/* Icon */}
      <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {getIcon(service.icon)}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>

      {/* Description */}
      <p className="text-gray-400 mb-6">{service.description}</p>

      {/* Key Features */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-[#4ADE80] mb-3 uppercase tracking-wider">Key Features</h4>
        <ul className="space-y-2">
          {service.keyFeatures.map((feature, index) => (
            <li key={index} className="text-sm text-gray-400 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#4ADE80]"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-[#4ADE80] mb-3 uppercase tracking-wider">Technologies</h4>
        <div className="flex flex-wrap gap-2">
          {service.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 bg-[#4ADE80]/10 text-[#4ADE80] rounded-full border border-[#4ADE80]/20"
            >
              {tech}
            </span>
          ))}
          {service.technologies.length > 4 && (
            <span className="text-xs px-3 py-1 bg-[#4ADE80]/10 text-[#4ADE80] rounded-full border border-[#4ADE80]/20">
              +{service.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Learn More Link */}
      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center gap-2 text-[#4ADE80] hover:text-[#22c55e] font-medium transition-colors group/link"
      >
        Learn More
        <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
      </Link>
    </div>
  )
}
