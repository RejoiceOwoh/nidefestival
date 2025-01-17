import DetailedPageTemplate from '@/components/DetailedPageTemplate'
import { aboutPJChills } from '@/data/content'

export default function PJChillsPage() {
  return (
    <DetailedPageTemplate
      title={aboutPJChills.title}
      subtitle={aboutPJChills.subtitle}
      content={aboutPJChills.fullContent}
      imageSrc={aboutPJChills.imageSrc}
      imageAlt={aboutPJChills.imageAlt}
      quickFacts={aboutPJChills.quickFacts}
    />
  )
}

