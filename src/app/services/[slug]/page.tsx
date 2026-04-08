import { Metadata } from 'next'
import Link from 'next/link'
import CTASection from '@/components/home/CTASection'

const serviceData = {
  'web-app-development': {
    title: 'Web & App Development',
    description: 'Custom web and mobile applications built with modern technologies for optimal performance and user experience.',
    longDescription: 'We specialize in building high-performance web and mobile applications that drive business results. From responsive websites to progressive web apps and complex e-commerce platforms, our team delivers solutions that combine aesthetic design with robust functionality. Our development process follows best practices and modern architectural patterns to ensure scalability, maintainability, and exceptional user experiences.',
    features: [
      {
        title: 'Custom Website Development',
        description: 'Tailored solutions that align perfectly with your business needs and brand vision'
      },
      {
        title: 'Responsive Design',
        description: 'Seamless experience across all devices from mobile to desktop'
      },
      {
        title: 'Progressive Web Apps',
        description: 'App-like experience with offline capability and instant loading'
      },
      {
        title: 'E-commerce Platforms',
        description: 'Complete shopping solutions with payment integration and inventory management'
      },
      {
        title: 'CMS Integration',
        description: 'Easy content management systems for non-technical users'
      },
      {
        title: 'API Development',
        description: 'Robust backend APIs for seamless data integration and third-party connections'
      }
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker'],
    process: [
      { step: 1, title: 'Discovery & Planning', description: 'Understanding your requirements and defining project scope' },
      { step: 2, title: 'Design & Prototyping', description: 'Creating wireframes and interactive prototypes for approval' },
      { step: 3, title: 'Development', description: 'Building the application using cutting-edge technologies' },
      { step: 4, title: 'Testing & QA', description: 'Comprehensive testing to ensure quality and reliability' },
      { step: 5, title: 'Deployment', description: 'Launching your application to production' },
      { step: 6, title: 'Support & Maintenance', description: 'Ongoing support and continuous improvements' }
    ]
  },
  'creative': {
    title: 'Creative Design',
    description: 'Stunning visual design and branding solutions that capture your brand essence and engage your audience.',
    longDescription: 'Creative design is at the heart of great digital experiences. Our design team creates compelling visual identities, intuitive user interfaces, and captivating brand experiences. We believe that great design combines aesthetics with functionality, creating solutions that not only look beautiful but also drive user engagement and business results.',
    features: [
      {
        title: 'UI/UX Design',
        description: 'User-centered design that prioritizes usability and engagement'
      },
      {
        title: 'Brand Identity',
        description: 'Complete branding solutions including logos, colors, and guidelines'
      },
      {
        title: 'Motion Graphics',
        description: 'Engaging animations that bring your story to life'
      },
      {
        title: 'Illustrations',
        description: 'Custom artwork that adds personality and visual interest'
      },
      {
        title: 'Prototyping',
        description: 'Interactive prototypes to test ideas before development'
      },
      {
        title: 'Design Systems',
        description: 'Scalable design systems that ensure consistency across products'
      }
    ],
    technologies: ['Figma', 'Adobe Suite', 'After Effects', 'Blender', 'Framer', 'Sketch'],
    process: [
      { step: 1, title: 'Brand Discovery', description: 'Understanding your brand values and target audience' },
      { step: 2, title: 'Conceptualization', description: 'Creating multiple design concepts and variations' },
      { step: 3, title: 'Design Development', description: 'Refining selected concepts with detailed designs' },
      { step: 4, title: 'Prototyping', description: 'Creating interactive prototypes for user testing' },
      { step: 5, title: 'Refinement', description: 'Incorporating feedback and finalizing designs' },
      { step: 6, title: 'Handoff', description: 'Delivering design assets and documentation to development' }
    ]
  },
  'ai-automation': {
    title: 'AI & Automation',
    description: 'Intelligent automation solutions powered by AI and machine learning to streamline your business processes.',
    longDescription: 'Artificial intelligence and automation are transforming businesses by increasing efficiency and enabling new capabilities. We develop custom AI solutions and automation workflows that reduce manual work, improve accuracy, and unlock insights from your data. From intelligent chatbots to predictive analytics, we harness AI to create competitive advantages.',
    features: [
      {
        title: 'AI Chatbots',
        description: 'Intelligent conversational AI for customer support and engagement'
      },
      {
        title: 'Workflow Automation',
        description: 'Automated business processes that save time and reduce errors'
      },
      {
        title: 'ML Models',
        description: 'Custom machine learning models tailored to your specific needs'
      },
      {
        title: 'Data Analytics',
        description: 'Insights and predictive analytics from your business data'
      },
      {
        title: 'NLP Solutions',
        description: 'Natural language processing for text analysis and understanding'
      },
      {
        title: 'Computer Vision',
        description: 'Image recognition and analysis for automated visual tasks'
      }
    ],
    technologies: ['Python', 'TensorFlow', 'OpenAI', 'LangChain', 'FastAPI', 'n8n', 'Make'],
    process: [
      { step: 1, title: 'Process Analysis', description: 'Identifying automation opportunities in your workflows' },
      { step: 2, title: 'Model Selection', description: 'Choosing appropriate AI/ML models for your use case' },
      { step: 3, title: 'Data Preparation', description: 'Gathering and preparing data for model training' },
      { step: 4, title: 'Model Training', description: 'Training and optimizing models for accuracy' },
      { step: 5, title: 'Integration', description: 'Integrating AI solutions into your existing systems' },
      { step: 6, title: 'Monitoring & Improvement', description: 'Ongoing monitoring and continuous improvement' }
    ]
  },
  'marketing-growth': {
    title: 'Marketing & Growth',
    description: 'Data-driven marketing strategies and growth optimization to scale your business and reach your target audience.',
    longDescription: 'Effective marketing is essential for business growth. Our team combines data analytics, strategic thinking, and creative execution to develop comprehensive marketing solutions. Whether through SEO, PPC, social media, or content marketing, we help you reach your audience and achieve sustainable growth.',
    features: [
      {
        title: 'SEO Optimization',
        description: 'Improve visibility in search results and organic traffic'
      },
      {
        title: 'PPC Campaigns',
        description: 'Strategic paid advertising to drive qualified traffic'
      },
      {
        title: 'Social Media Marketing',
        description: 'Engaging content and campaigns across social platforms'
      },
      {
        title: 'Content Marketing',
        description: 'Valuable content that attracts and engages your audience'
      },
      {
        title: 'Email Automation',
        description: 'Personalized email campaigns that nurture leads'
      },
      {
        title: 'Analytics & Reporting',
        description: 'Data-driven insights to measure success and optimize performance'
      }
    ],
    technologies: ['Google Analytics', 'SEMrush', 'HubSpot', 'Mailchimp', 'Meta Ads', 'Google Ads'],
    process: [
      { step: 1, title: 'Strategy Development', description: 'Creating a comprehensive marketing strategy based on market research' },
      { step: 2, title: 'Audience Analysis', description: 'Deep understanding of your target audience and their behaviors' },
      { step: 3, title: 'Campaign Setup', description: 'Implementing campaigns across multiple channels' },
      { step: 4, title: 'Content Creation', description: 'Developing engaging content for your audience' },
      { step: 5, title: 'Performance Monitoring', description: 'Tracking metrics and optimizing campaigns in real-time' },
      { step: 6, title: 'Reporting & Optimization', description: 'Regular reporting and continuous strategy refinement' }
    ]
  }
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = serviceData[params.slug as keyof typeof serviceData]

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.'
    }
  }

  return {
    title: `${service.title} | Wafa Technology`,
    description: service.description,
    openGraph: {
      title: `${service.title} | Wafa Technology`,
      description: service.description,
      type: 'website'
    }
  }
}

export function generateStaticParams() {
  return [
    { slug: 'web-app-development' },
    { slug: 'creative' },
    { slug: 'ai-automation' },
    { slug: 'marketing-growth' }
  ]
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = serviceData[params.slug as keyof typeof serviceData]

  if (!service) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <p className="text-gray-400 mb-8">The service you're looking for doesn't exist.</p>
          <Link href="/services" className="text-[#4ADE80] hover:text-[#22c55e] transition-colors">
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-[#0a0a0a] border-b border-[#4ADE80]/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <nav className="text-sm text-gray-400 flex items-center gap-2">
              <Link href="/" className="hover:text-[#4ADE80] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#4ADE80] transition-colors">Services</Link>
              <span>/</span>
              <span className="text-[#4ADE80]">{service.title}</span>
            </nav>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{service.title}</h1>
          <p className="text-xl text-gray-400 max-w-2xl">{service.description}</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bg-[#0a0a0a] py-20 border-b border-[#4ADE80]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Overview</h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-8">{service.longDescription}</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-[#0a0a0a] py-20 border-b border-[#4ADE80]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <div key={index} className="bg-[#111111] border border-[#4ADE80]/10 rounded-lg p-6 hover:border-[#4ADE80]/30 transition-colors">
                <h3 className="text-xl font-semibold text-[#4ADE80] mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="bg-[#0a0a0a] py-20 border-b border-[#4ADE80]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Technologies We Use</h2>
          <div className="flex flex-wrap gap-3">
            {service.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#4ADE80]/10 border border-[#4ADE80]/30 rounded-full text-[#4ADE80] text-sm font-medium hover:bg-[#4ADE80]/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-[#0a0a0a] py-20 border-b border-[#4ADE80]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.process.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4ADE80]/10 border border-[#4ADE80]/30 flex items-center justify-center">
                    <span className="text-[#4ADE80] font-bold text-lg">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}
