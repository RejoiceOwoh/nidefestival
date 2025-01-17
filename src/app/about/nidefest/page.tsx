import DetailedPageTemplate from '@/components/DetailedPageTemplate'
import { aboutNidefest } from '@/data/content'

export default function NidefestPage() {
  return (
    <DetailedPageTemplate
      title={aboutNidefest.title}
      subtitle={aboutNidefest.subtitle}
      content={aboutNidefest.fullContent}
      imageSrc={aboutNidefest.imageSrc}
      imageAlt={aboutNidefest.imageAlt}
      quickFacts={aboutNidefest.quickFacts}
    />
  )
}

