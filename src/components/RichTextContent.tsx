import { useMemo } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface RichTextContentProps {
  content: {
    type: string
    content: string
    url?: string
    alt?: string
    caption?: string
    content2?: string
    heading?: string;
    items?: string[];
    content3?: string;
    content4?:string;
    content5?:string;
    content6?:string;
    
  }[]
}

export default function RichTextContent({ content }: RichTextContentProps) {
  const renderedContent = useMemo(() => {
    return content.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return <p key={index} className="mb-4">{block.content}</p>
     
           case 'heading':
          return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{block.content}</h2>
         
         
        case 'image':
          return (
            <figure key={index} className="my-8">
              <Image 
                src={block.url || "/placeholder.svg"} 
                alt={block.alt || "Article image"}
                width={800}
                height={600}
                className="rounded-lg"
              />
           {/*   {block.caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-2">{block.caption}</figcaption>
             )} */}
             <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{block.heading}</h2>
               <p  className="my-4">{block.content} </p>
               <p>{block.content2} </p>
               <p className="my-4">{block.content3} </p>
               <p>{block.content4} </p>
               <p className="my-4">{block.content5} </p>
               <p>{block.content6} </p>

            </figure>
          )
      { /*case 'video':
          return (
            <div key={index} className="my-8">
              <video 
                src={block.url} 
                controls 
                className="w-full rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
              {block.caption && (
                <p className="text-center text-sm text-gray-500 mt-2">{block.caption}</p>
              )}
            </div>
          ) */}


          case 'list':
    return (
        <ul key={index} className="list-disc pl-6 mb-6">
            {block.items && block.items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="mb-2">{item}</li>
            ))}
        </ul>
    )

          
        case 'callToAction':
          return (
            <div key={index} className="my-8 p-6 bg-gray-100 rounded-lg text-center">
              <p className="text-xl font-bold mb-4">{block.content}</p>
              <Button asChild>
                <a href={block.url} target="_blank" rel="noopener noreferrer">Learn More</a>
              </Button>
            </div>
          )
        default:
          return null
      }
    })
  }, [content])

  return <div className="prose prose-lg max-w-none">{renderedContent}</div>
}

