export interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    image: string;
    category: string;
    author: string;
    content: {
      type: string;
      content: string;
      url?: string;
      alt?: string;
      caption?: string;
    }[];
  }
  
  export interface ExternalNewsItem {
    id: number;
    title: string;
    source: string;
    date: string;
    image: string;
    url: string;
  }
  
  export const internalNews: NewsItem[] = [
    {
      id: 1,
      title: "NIDEFEST 2024 Announces Headliners",
      excerpt: "Get ready for an unforgettable experience as we reveal our star-studded lineup for NIDEFEST 2024!",
      date: "2024-03-15",
      readTime: "5 min",
      image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1736404638/New_Project_25_ylf797.png",
      category: "Announcements",
      author: "NIDEFEST Team",
      content: [
        {
          type: "paragraph",
          content: "We are thrilled to announce the headliners for NIDEFEST 2024! This year's festival promises to be our biggest and most exciting yet, featuring a diverse array of talented artists from across the Niger Delta region and beyond."
        },
        {
          type: "heading",
          content: "Star-Studded Lineup"
        },
        {
          type: "paragraph",
          content: "Our main stage will be graced by the following incredible performers:"
        },
        {
          type: "image",
          content: "",
          url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734365458/pexels-rdne-6192557_1_zzgkwl.jpg",
          alt: "NIDEFEST 2024 Headliners Collage",
          caption: "From left to right: Burna Boy, Yemi Alade, Flavour, and Tiwa Savage"
        },
        {
          type: "paragraph",
          content: "1. Burna Boy - The African Giant himself, bringing his electrifying Afro-fusion sound\n2. Yemi Alade - Queen of Afropop, ready to set the stage on fire\n3. Flavour - The highlife maestro, celebrating our rich musical heritage\n4. Tiwa Savage - Nigeria's own Afrobeats diva, promising an unforgettable performance"
        },
        {
          type: "callToAction",
          content: "Don't miss out on this incredible lineup! Get your tickets now!",
          url: "/tickets"
        },
        {
          type: "paragraph",
          content: "Stay tuned for more announcements as we reveal our full lineup in the coming weeks. NIDEFEST 2024 is shaping up to be an unmissable celebration of arts, culture, and music!"
        }
      ]
    },
    {
      id: 2,
      title: "Local Artisans Showcase: Celebrating Niger Delta Craftsmanship",
      excerpt: "Discover the rich tapestry of Niger Delta craftsmanship at our upcoming Local Artisans Showcase during NIDEFEST 2024.",
      date: "2024-03-20",
      readTime: "4 min",
      image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1736404467/New_Project_24_uxgqfa.png",
      category: "Events",
      author: "Cultural Affairs Department",
      content: [
        {
          type: "paragraph",
          content: "NIDEFEST 2024 is proud to present a special Local Artisans Showcase, highlighting the incredible craftsmanship and artistic traditions of the Niger Delta region. This event will provide a platform for local artisans to display their skills and sell their unique creations to festival-goers."
        },
        {
          type: "image",
          content: "",
          url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734365446/pexels-olugbenga-ladipo-1193324626-27978227_c4eeqq.jpg",
          alt: "Local artisan demonstrating traditional weaving techniques",
          caption: "Master weaver Amina Okoro demonstrating her craft"
        },
        {
          type: "heading",
          content: "What to Expect"
        },
        {
          type: "paragraph",
          content: "Visitors to the Local Artisans Showcase can look forward to:\n\n- Live demonstrations of traditional crafting techniques\n- A wide variety of handmade goods for sale, including textiles, pottery, jewelry, and wood carvings\n- Interactive workshops where you can try your hand at various crafts\n- Meet-and-greet sessions with master artisans"
        },
        {
          type: "video",
          content: "",
          url: "https://res.cloudinary.com/dnbnev9lr/video/upload/v1737026854/112267444_1920_1080_25fps_lovuyc.mp4",
          caption: "A sneak peek at some of the incredible artisans you'll meet at NIDEFEST 2024"
        },
        {
          type: "paragraph",
          content: "This showcase is not just an opportunity to purchase unique, locally-made items – it's a chance to connect with the rich cultural heritage of the Niger Delta region and support the talented individuals keeping these traditions alive."
        },
        {
          type: "callToAction",
          content: "Join us in celebrating Niger Delta craftsmanship!",
          url: "/events/local-artisans-showcase"
        }
      ]
    },
    {
      id: 3,
      title: "NIDEFEST 2024 Unveils Eco-Friendly Initiatives",
      excerpt: "Learn about our commitment to sustainability and the environment-friendly measures we're implementing for this year's festival.",
      date: "2024-03-25",
      readTime: "6 min",
      image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1736404463/New_Project_23_yearb9.png",
      category: "Sustainability",
      author: "Environmental Team",
      content: [
        {
          type: "paragraph",
          content: "As we prepare for NIDEFEST 2024, we're excited to announce a series of eco-friendly initiatives aimed at reducing our environmental impact and promoting sustainability throughout the festival."
        },
        {
          type: "heading",
          content: "Our Green Commitments"
        },
        {
          type: "paragraph",
          content: "1. Zero Waste Goal: We're implementing a comprehensive recycling and composting program to minimize waste sent to landfills.\n2. Renewable Energy: A significant portion of the festival's energy needs will be met through solar power.\n3. Sustainable Transportation: We're partnering with local transit authorities to provide eco-friendly transportation options for attendees.\n4. Water Conservation: Water refill stations will be available throughout the festival grounds to reduce plastic bottle usage."
        },
        {
          type: "image",
          content: "",
          url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1736404463/New_Project_23_yearb9.png",
          alt: "Solar panels being installed at the festival grounds",
          caption: "Installation of solar panels to power NIDEFEST 2024"
        },
        {
          type: "paragraph",
          content: "These initiatives reflect our commitment to preserving the natural beauty of the Niger Delta region and setting a positive example for sustainable event management."
        },
        {
          type: "callToAction",
          content: "Learn more about our eco-friendly initiatives and how you can contribute!",
          url: "/sustainability"
        }
      ]
    }
  ];
  
  export const externalNews: ExternalNewsItem[] = [
    {
      id: 1,
      title: "NIDEFEST: A Celebration of Niger Delta's Rich Cultural Heritage",
      source: "Cultural Times",
      date: "2024-03-10",
      image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734365481/pexels-efrem-efre-2786187-28284658_aulnph.jpg",
      url: "https://culturaltimes.com/nidefest-2024-preview"
    },
    {
      id: 2,
      title: "How NIDEFEST is Boosting Tourism in the Niger Delta Region",
      source: "Travel & Leisure Magazine",
      date: "2024-03-18",
      image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734365468/pexels-safari-consoler-3290243-28928758_wxpedr.jpg",
      url: "https://travelandleisure.com/nidefest-tourism-impact"
    },
    {
      id: 3,
      title: "NIDEFEST 2024: What to Expect from This Year's Lineup",
      source: "Music Insider",
      date: "2024-03-22",
      image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734365453/Traditional-Dance-Day-23-scaled_bx263o.jpg",
      url: "https://musicinsider.com/nidefest-2024-lineup-analysis"
    }
  ];
  
  export const fetchNews = ({ page, category, searchTerm }: { page: number; category: string; searchTerm: string }): NewsItem[] => {
    let filteredNews = [...internalNews];
  
    if (category && category !== 'all') {
      filteredNews = filteredNews.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
  
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filteredNews = filteredNews.filter(item => 
        item.title.toLowerCase().includes(lowercaseSearchTerm) ||
        item.excerpt.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
  
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
  
    return filteredNews.slice(startIndex, endIndex);
  };
  
  export const fetchExternalNews = ({ page, searchTerm }: { page: number; searchTerm: string }): ExternalNewsItem[] => {
    let filteredNews = [...externalNews];
  
    if (searchTerm) {
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      filteredNews = filteredNews.filter(item => 
        item.title.toLowerCase().includes(lowercaseSearchTerm) ||
        item.source.toLowerCase().includes(lowercaseSearchTerm)
      );
    }
  
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
  
    return filteredNews.slice(startIndex, endIndex);
  };
  
  export const fetchArticle = (id: string | string[]): NewsItem | undefined => {
    return internalNews.find(article => article.id === Number(id));
  };
  
  export const fetchRelatedArticles = (id: string | string[]): NewsItem[] => {
    const currentArticle = internalNews.find(article => article.id === Number(id));
    if (!currentArticle) return [];
  
    return internalNews
      .filter(article => article.id !== Number(id) && article.category === currentArticle.category)
      .slice(0, 3);
  };
  
  