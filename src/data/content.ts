export interface ContentItem {
  type: 'paragraph' | 'heading' | 'list';
  content?: string;
  items?: string[];
}

export interface PageContent {
  title: string;
  subtitle: string;
  excerpt: string;
  fullContent: ContentItem[];
  imageSrc: string;
  imageAlt: string;
  quickFacts: string[];
}

export const aboutNidefest: PageContent = {
  title: "About NIDEFEST",
  subtitle: "Celebrating the Rich Cultural Heritage of the Niger Delta",
  excerpt: "NIDEFEST, the Niger Delta Festival of Arts and Culture, is a grand celebration of the rich heritage and vibrant culture of the Niger Delta region. Established in 2010, this annual event has grown to become one of the most anticipated cultural festivals in Nigeria.",
  fullContent: [
    {
      type: 'paragraph',
      content: "NIDEFEST showcases the diverse traditions of the nine states that make up the Niger Delta region: Abia, Akwa Ibom, Bayelsa, Cross River, Delta, Edo, Imo, Ondo, and Rivers. Through a myriad of events and activities, NIDEFEST offers a unique opportunity to experience the essence of Niger Delta culture."
    },
    {
      type: 'heading',
      content: "Key Features of NIDEFEST:"
    },
    {
      type: 'list',
      items: [
        "Cultural Performances: Traditional dances, music, and theatrical performances that bring to life the stories and legends of the Niger Delta people.",
        "Art Exhibitions: Showcasing the works of local artists, from traditional crafts to contemporary art pieces inspired by Niger Delta themes.",
        "Culinary Delights: A food festival featuring the diverse and delicious cuisine of the Niger Delta, with cooking demonstrations and tasting sessions.",
        "Fashion Shows: Displaying both traditional attire and modern fashion inspired by Niger Delta aesthetics.",
        "Literary Events: Book readings, poetry performances, and storytelling sessions that celebrate the region's rich oral and written traditions.",
        "Youth Engagement: Programs designed to educate and inspire the younger generation about their cultural heritage."
      ]
    },
    {
      type: 'paragraph',
      content: "NIDEFEST is more than just a festival; it's a platform for cultural exchange, economic empowerment, and community building. By bringing together artisans, performers, and visitors, the festival contributes to the preservation and promotion of Niger Delta culture while also boosting local tourism and economy."
    },
    {
      type: 'paragraph',
      content: "As we look to the future, NIDEFEST continues to evolve, embracing new technologies and innovative ways to showcase the Niger Delta's cultural wealth. We invite you to join us in this celebration of identity, creativity, and unity."
    }
  ],
  imageSrc: "https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_800,h_600,g_auto/v1734365468/pexels-christian-alemu-127251395-28664276_i9nhkt.jpg",
  // imageSrc: "/placeholder.svg?height=600&width=800",
  imageAlt: "NIDEFEST Celebration",
  quickFacts: [
    "Established in 2010",
    "Over 100,000 annual attendees",
    "Showcases 9 Niger Delta states",
    "Features 50+ cultural performances",
    "Hosts 100+ local artisans"
  ]
};

export const aboutPJChills: PageContent = {
  title: "About PJ Chills and Crew",
  subtitle: "Bringing Cultural Experiences to Life",
  excerpt: "PJ Chills and Crew is a dynamic event management and creative agency specializing in bringing cultural experiences to life. Founded by the visionary entrepreneur PJ Chills, our team has been at the forefront of event planning and brand management in the Niger Delta region for over a decade.",
  fullContent: [
    {
      type: 'heading',
      content: "Our Expertise:"
    },
    {
      type: 'list',
      items: [
        "Event Management: From conceptualization to execution, we handle all aspects of event planning, ensuring seamless and memorable experiences.",
        "Branding: We create and maintain strong, cohesive brand identities that resonate with target audiences and stand the test of time.",
        "Marketing: Our innovative marketing strategies leverage both traditional and digital platforms to maximize reach and engagement.",
        "Creative Design: Our team of talented designers crafts visually stunning materials that capture the essence of each event and brand.",
        "Logistics: We excel in managing the complex logistics involved in large-scale cultural events like NIDEFEST."
      ]
    },
    {
      type: 'paragraph',
      content: "As the driving force behind NIDEFEST, PJ Chills and Crew has been instrumental in transforming the festival into a nationally recognized celebration of Niger Delta culture. Our deep understanding of the region's rich heritage, combined with our modern approach to event management, allows us to create experiences that are both authentic and innovative."
    },
    {
      type: 'paragraph',
      content: "Beyond NIDEFEST, we've successfully managed a wide range of events, from corporate conferences to music festivals, always infusing them with the vibrant spirit of the Niger Delta. Our commitment to excellence and attention to detail have earned us a reputation as one of the leading event management firms in the region."
    },
    {
      type: 'paragraph',
      content: "At PJ Chills and Crew, we believe in the power of cultural experiences to unite communities, preserve traditions, and drive economic growth. We're not just event planners; we're cultural ambassadors, dedicated to showcasing the best of the Niger Delta to the world."
    },
    {
      type: 'paragraph',
      content: "Join us in our mission to celebrate and elevate the rich cultural tapestry of the Niger Delta. Whether you're planning an event or looking to build a brand that resonates with the heart of our region, PJ Chills and Crew is your partner in bringing your vision to life."
    }
  ],
  imageSrc: "https://res.cloudinary.com/dnbnev9lr/image/upload/c_fill,w_800,h_600,g_auto/v1734365458/pexels-rdne-6192557_1_zzgkwl.jpg",
  // imageSrc: "/placeholder.svg?height=600&width=800",
  imageAlt: "PJ Chills and Crew Team",
  quickFacts: [
    "Founded by PJ Chills",
    "Over 10 years of experience",
    "Managed 100+ successful events",
    "Team of 50+ creative professionals",
    "Award-winning event management"
  ]
};
