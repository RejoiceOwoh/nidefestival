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
  excerpt: "NIDEFEST is a vibrant celebration of traditions, cultures, and pride in our roots. It showcases the unmatched beauty of our region, where cultures collide and communities unite.A dynamic movement bringing energy, unity, and heritage to life.",
  fullContent: [
    {
      type: 'paragraph',
      content: "NIDEFEST is a beacon of light shining a global spotlight on the incredible diversity, resilience, and creativity of the Niger Delta. It’s about igniting pride in who we are, celebrating what we’ve achieved, and dreaming together about what we can become with the sole mission to preserve, promote, and propel the unique stories of the Niger Delta onto a global stage."
    },
    {
      type: 'heading',
      content: "WHAT MAKES NIDEFEST UNIQUE?:"
    },
    {
      type: 'list',
      items: [
        "The air is filled with rhythm, energetic dances, soul-stirring music, and the iconic beats of the Niger Delta. ",
        "Your taste buds travel through time, sampling local delicacies passed down through generations, alongside bold new culinary creations. ",
        "Art comes alive with breathtaking exhibitions, live craft-making, and cutting-edge fashion inspired by the colors and textures of our land.  ",
        "The beauty and amazing tourist locations you never thought existed in the Niger Delta are unveiled to the whole world ",
       
       // "Literary Events: Book readings, poetry performances, and storytelling sessions that celebrate the region's rich oral and written traditions.",
        //"Youth Engagement: Programs designed to educate and inspire the younger generation about their cultural heritage."
      ]
    },
    {
      type: 'heading',
      content: "WHY NIDEFEST MATTERS :"
    },
    {
      type: 'list',
      items: [
        "We Preserve Culture: Every performance, every bite of food, every handmade craft helps keep the rich traditions of the Niger Delta alive.  ",
        "We Empower Communities: By spotlighting local artists, traders, and farmers, we create opportunities that fuel growth and prosperity. ",
        "We Unite People: Whether you’re from the Niger Delta or the other side of the globe, NIDEFEST is a shared space to celebrate, connect, and belong.  ",
        "We Inspire Tourism: By showcasing the wonders of the Niger Delta, we attract visitors who leave with memories—and a newfound love for the region. ",
       
       // "Literary Events: Book readings, poetry performances, and storytelling sessions that celebrate the region's rich oral and written traditions.",
        //"Youth Engagement: Programs designed to educate and inspire the younger generation about their cultural heritage."
      ]
    },



    {
      type: 'paragraph',
      content: "Whether you’re here to explore tradition, discover something new, or simply soak in the energy of the Niger Delta, NIDEFEST is your destination. "
    },
    {
      type: 'paragraph',
      content: "So come with an open heart, ready to experience the magic of a festival that’s not just about celebration but about legacy, unity, and progress."
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
