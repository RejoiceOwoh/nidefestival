export interface Governor {
    id: number;
    name: string;
    state: string;
    image: string;
    description: string;
    content: {
      type: string;
      content: string;
      url?: string;
      alt?: string;
      caption?: string;
    }[];
  }
  
  export const governors: Governor[] = [
    {
        id: 1,
        name: "Pst. Umo Eno",
        state: "Akwa Ibom State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734435462/New_Project_14_y1y74k.png",
        description: "Governor of Akwa Ibom State, committed to sustainable development.",
        content: [
          {
            type: "paragraph",
            content: "Pst. Umo Eno is the current governor of Rivers State, known for his commitment to sustainable development and economic growth."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734435462/New_Project_14_y1y74k.png",
              alt: "Pst. Umo Eno at a project site",
              caption: "Pst. Umo Eno inspecting a new infrastructure project",
              content: ""
          },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "list",
            content: "1. Implemented a comprehensive urban renewal program\n2. Increased investment in education, resulting in higher literacy rates\n3. Launched initiatives to promote clean energy and environmental conservation"
          },
          {
            type: "paragraph",
            content: "Under his leadership, Rivers State has seen significant improvements in infrastructure, education, and environmental sustainability."
          }
        ]
      },
      {
        id: 2,
        name: "Gov. Godwin Obaseki",
        state: "Edo State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434228/New_Project_ym7led.png",
        description: "Governor of Edo State, focusing on economic growth and education.",
        content: [
          {
            type: "paragraph",
            content: "Gov. Godwin Obaseki has been a transformative leader in Delta State, prioritizing economic growth and educational reforms."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434228/New_Project_ym7led.png",
              alt: "Governor Jane Smith at a school opening",
              caption: "Governor Godwin Obaseki inaugurating a new school",
              content: ""
          },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "list",
            content: "1. Increased funding for public schools\n2. Launched vocational training programs\n3. Attracted foreign investments to Delta State"
          },
          {
            type: "paragraph",
            content: "Her initiatives have led to a significant rise in employment opportunities and educational standards."
          }
        ]
      },
      {
        id: 3,
        name: "Gov. Sheriff Oborevwori",
        state: "Delta State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434209/New_Project_1_w9h5zt.png",
        description: "Governor of Delta State, prioritizing environmental conservation.",
        content: [
          {
            type: "paragraph",
            content: "Mike Johnson is dedicated to preserving the rich biodiversity of Bayelsa State while promoting sustainable development."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434209/New_Project_1_w9h5zt.png",
              alt: "Governor Mike Johnson at a conservation site",
              caption: "Governor Mike Johnson promoting environmental conservation",
              content: ""
          },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "list",
            content: "1. Established protected areas for wildlife\n2. Promoted eco-tourism initiatives\n3. Implemented policies to reduce pollution"
          },
          {
            type: "paragraph",
            content: "His leadership has made Bayelsa a model for environmental sustainability in Nigeria."
          }
        ]
      },
      {
        id: 4,
        name: "Gov. Lucky Aiyeda",
        state: "Ondo State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434191/New_Project_2_saqgpi.png",
        description: "Governor of Ondo State, championing youth empowerment.",
        content: [
          {
            type: "paragraph",
            content: "Sarah Brown is a strong advocate for youth empowerment and job creation in Akwa Ibom State."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434191/New_Project_2_saqgpi.png",
              alt: "Governor Sarah Brown at a youth event",
              caption: "Governor Sarah Brown engaging with youth leaders",
              content: ""
          },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "list",
            content: "1. Launched youth entrepreneurship programs\n2. Increased access to vocational training\n3. Established partnerships with tech companies"
          },
          {
            type: "paragraph",
            content: "Her efforts have empowered thousands of young people to start their own businesses."
          }
        ]
      },
      {
        id: 5,
        name: "Gov. Douye Diri",
        state: "Bayelsa State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434187/New_Project_3_ud5z2c.png",
        description: "Governor ofBayelsa State, driving technological innovation.",
        content: [
          {
            type: "paragraph",
            content: "Chris Wilson is committed to making Edo State a hub for technological innovation and development."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434187/New_Project_3_ud5z2c.png",
              alt: "Governor Chris Wilson at a tech conference",
              caption: "Governor Chris Wilson promoting tech innovation",
              content: ""
          },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "list",
            content: "1. Established tech incubators\n2. Increased funding for tech startups\n3. Launched digital literacy programs"
          },
          {
            type: "paragraph",
            content: "His initiatives have attracted numerous tech companies to Edo State."
          }
        ]
      },
      {
        id: 6,
        name: "Gov. Siminalayi Fubara",
        state: "Rivers State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433627/New_Project_7_u1jek5.png",
        description: "Governor of Rivers State, promoting tourism and culture.",
        content: [
          {
            type: "paragraph",
            content: "Laura Taylor is dedicated to promoting the rich cultural heritage and tourism potential of Cross River State."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433627/New_Project_7_u1jek5.png",
              alt: "Governor Laura Taylor at a cultural festival",
              caption: "Governor Laura Taylor celebrating cultural diversity",
              content: ""
          },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "list",
            content: "1. Developed tourism infrastructure\n2. Promoted cultural festivals\n3. Increased international tourism"
          },
          {
            type: "paragraph",
            content: "Her leadership has significantly boosted the local economy through tourism."
          }
        ]
      },
      {
        id: 7,
        name: "Gov. Bassey Otu",
        state: "Cross River State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433724/New_Project_5_opnbff.png",
        description: "Governor of Cross River State, advancing agricultural initiatives.",
        content: [
          {
            type: "paragraph",
            content: "Alex Green is focused on advancing agricultural initiatives to ensure food security in Ondo State."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433724/New_Project_5_opnbff.png",
              alt: "Governor Alex Green at a farm",
              caption: "Governor Alex Green promoting agricultural development",
              content: ""
          },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "list",
            content: "1. Increased funding for farmers\n2. Launched agricultural training programs\n3. Promoted sustainable farming practices"
          },
          {
            type: "paragraph",
            content: "His initiatives have led to a significant increase in agricultural productivity."
          }
        ]
      },
      {
        id: 8,
        name: "Dr. Alex Otti",
        state: "Abia State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433629/New_Project_8_utu20d.png",
        description: "Governor of Abia State, focusing on infrastructure development.",
        content: [
          {
            type: "paragraph",
            content: "Olivia White is committed to improving infrastructure in Imo State to enhance economic growth."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433629/New_Project_8_utu20d.png",
              alt: "Governor Olivia White at a construction site",
              caption: "Governor Olivia White inspecting infrastructure projects",
              content: ""
          },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "list",
            content: "1. Launched major road construction projects\n2. Improved public transportation\n3. Increased access to clean water"
          },
          {
            type: "paragraph",
            content: "Her efforts have significantly improved the quality of life for residents."
          }
        ]
      },
      {
        id: 9,
        name: "Gov. Hope Uzodinma",
        state: "Imo State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433688/New_Project_6_u6wvvc.png",
        description: "Governor of Imo State, championing small business growth.",
        content: [
          {
            type: "paragraph",
            content: "Daniel Black is dedicated to supporting small businesses and entrepreneurs in Abia State."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433688/New_Project_6_u6wvvc.png",
              alt: "Governor Daniel Black at a small business event",
              caption: "Governor Daniel Black supporting local entrepreneurs",
              content: ""
          },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "list",
            content: "1. Established small business grants\n2. Launched mentorship programs\n3. Increased access to microloans"
          },
          {
            type: "paragraph",
            content: "His initiatives have empowered many entrepreneurs to thrive."
          }
        ]
      },
    // Add more governors here...
  ];
  

  export const governorsmain: Governor[] = [
   
  ]
  