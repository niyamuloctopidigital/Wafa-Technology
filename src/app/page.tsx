import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import ServicesPreview from '@/components/home/ServicesPreview'
import CodeShowcase from '@/components/home/CodeShowcase'
import MobileShowcase from '@/components/home/MobileShowcase'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import HowWeWork from '@/components/home/HowWeWork'
import Testimonials from '@/components/home/Testimonials'
import CTASection from '@/components/home/CTASection'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <ServicesPreview />
      <CodeShowcase />
      <MobileShowcase />
      <WhyChooseUs />
      <HowWeWork />
      <Testimonials />
      <CTASection />
    </main>
  )
}
