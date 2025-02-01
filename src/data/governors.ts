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
    content2?: string;
    heading?: string;
    items?: string[];
    content3?: string;
    content4?:string;
    content5?:string;
    content6?:string;

    }[];
  }
  
  
  export const governors: Governor[] = [
    {
        id: 1,
        name: "Pst. Umo Eno",
        state: "Akwa Ibom State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734435462/New_Project_14_y1y74k.png",
        description: "Governor of Akwa Ibom State, committed to Economic Development.",
        content: [
          {
            type: "paragraph",
            content: "Pst. Umo Eno is the current governor of Akwa Ibom State. Governor Eno’s vision is deeply rooted in creating a self-reliant Akwa Ibom State where opportunities are accessible to all."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734435462/New_Project_14_y1y74k.png",
              alt: "Pst. Umo Eno Political Journey",
             caption: "Pst. Umo Eno Political Journey",
              content: "Governor Eno’s foray into politics began when he was appointed as the Commissioner for Lands and Water Resources in Akwa Ibom State in 2021 by then-Governor Udom Emmanuel. In this role, he contributed significantly to the state’s development, particularly in land management and water resources.",
                content2: "In 2022, governor Eno resigned from his commissioner role to pursue his governorship ambition. Running under the People’s Democratic Party (PDP), he won the 2023 gubernatorial election, succeeding Udom Emmanuel." ,  
            heading: "Pst. Umo Eno Political Journey"
              },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "paragraph",
            content: "Since assuming office on May 29, 2023, Governor Umo Eno has prioritized:"
          },
          {
            type: 'list',
            content: '',
            items: [
              "Event Management: From conceptualization to execution, we handle all aspects of event planning, ensuring seamless and memorable experiences.",
              "Branding: We create and maintain strong, cohesive brand identities that resonate with target audiences and stand the test of time.",
              "Marketing: Our innovative marketing strategies leverage both traditional and digital platforms to maximize reach and engagement.",
              "Creative Design: Our team of talented designers crafts visually stunning materials that capture the essence of each event and brand.",
              "Logistics: We excel in managing the complex logistics involved in large-scale cultural events like NIDEFEST."
            ]
          },
        
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
            content: "Governor Obaseki’s administration prioritizes innovation, good governance, and sustainable development. His policies are transforming Edo State into a more developed and economically viable region."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434228/New_Project_ym7led.png",
              alt: "Governor Jane Smith at a school opening",
              caption: "Governor Godwin Obaseki inaugurating a new school",
              content: "In 2016, Godwin Obaseki emerged as Governor of Edo State, securing his position after a defining political struggle against high-handed political influences. He was re-elected in September 2020, continuing his mission to rebuild and advance the state’s socio-economic landscape.",
         heading: "Gov. Godwin Obaseki  Political Journey"
            },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "paragraph",
            content: "Under his leadership, Edo State has witnessed significant development in various sectors:"
          },
          {
            type: 'list',
            content: '',
            items: [
              "Healthcare : Governor Obaseki’s administration is reconstructing about 200 Primary Healthcare Centres across the state. He launched the Edo State Social Health Insurance Scheme to provide affordable healthcare services, reducing out-of-pocket spending for residents",
             "Private Sector Investment : To drive industrialization, Edo State has attracted several private sector investments, including:\n1. The 6000bpd Edo Modular Refinery.\n2. The 550MW Ossiomo Power Company, of which 95MW is operational, providing 24-hour electricity to government offices and public buildings. ",   
              "Education : Governor Obaseki’s focus on education has revolutionized the sector with the Edo Basic Education Sector Transformation (Edo-BEST) programme. Over 11,300 teachers have been trained in tech-based teaching, benefiting 300,000 school pupils across 918 public schools. Technical education has also been enhanced with the revitalization of the Government Science and Technical College, providing hands-on training for a skilled workforce.",
                    ]
          },
          {
            type: "paragraph",
            content: "These initiatives are transforming the industrial landscape of Edo State and promoting economic growth through strategic private sector collaboration."
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
            content: "Governor Sheriff Oborevwori’s life embodies service, leadership, and generosity. His vision for Delta State focuses on inclusivity, growth, and sustainability, creating a lasting legacy."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434209/New_Project_1_w9h5zt.png",
              alt: "Governor Mike Johnson at a conservation site",
              caption: "Governor Mike Johnson promoting environmental conservation",
              content: "In 2015, Sheriff Oborevwori was elected Member of the Delta State House of Assembly representing Okpe Constituency. On May 11, 2017, he became the Speaker of the House, serving for nearly six years as the longest-serving Speaker in Delta State’s history.",
          content2: "As Speaker, he maintained a robust relationship between the Executive and Legislature and presided over the passage of 81 significant bills. His legislative acumen earned him the roles of: n/1. National Treasurer, Conference of Speakers of State Legislatures. n/2. Deputy National Chairman, Conference of Speakers. " ,  
            heading: "Gov. Sheriff Oborevwori  Political Journey"
            },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "paragraph",
            content: "On May 29, 2023, Sheriff Oborevwori was sworn in as the Governor of Delta State. His administration is centered on:"
          },
          {
            type: 'list',
            content: '',
            items: [
              "Human Capital Development: Enhancing education and skill acquisition.",
              "Infrastructure Growth: Expanding urban and rural connectivity.",
              "Economic Empowerment: Fostering job creation and wealth generation.",
              "Peace and Security: Ensuring stability and development.",
                   ]
          },
          {
            type: "heading",
            content: "Philanthropy and Empowerment"
          },
          {
            type: "paragraph",
            content: "Governor Oborevwori is renowned for his philanthropic efforts through the Sheriff Oborevwori Foundation, which provides:"
          },

          {
            type: 'list',
            content: '',
            items: [
              "Scholarships for indigent students",
              "Skill acquisition training for youths and women",
              "Empowerment materials for communities.",
                      ]
          },
          {
            type: "paragraph",
            content: "In 2018, he empowered constituents with vehicles, salon kits, grinding machines, sewing machines, deep freezers, and financial assistance, uplifting lives across Okpe Local Government Area."
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
            content: "Governor Lucky Orimisan Aiyedatiwa is a strong advocate for youth empowerment and job creation in Ondo State."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434191/New_Project_2_saqgpi.png",
              alt: "Governor Sarah Brown at a youth event",
              caption: "Governor Sarah Brown engaging with youth leaders",
              content: "Aiyedatiwa began his political journey in 2011, joining the Action Congress of Nigeria (ACN) and later the All Progressives Congress (APC) in 2014. He served as a National Delegate for the APC at its 2014 National Convention and contested for the House of Representatives in the 2015 general elections.",
         content2: "In 2018, he was appointed by President Muhammadu Buhari as the Federal Commissioner representing Ondo State on the Niger Delta Development Commission (NDDC) Board. ",
           content3: 'In October 2020, Aiyedatiwa was re-elected as Deputy Governor of Ondo State alongside Governor Rotimi Akeredolu. Following Governor Akeredolu’s health challenges, Aiyedatiwa assumed office as the Executive Governor of Ondo State in December 2023. ',
           heading: "Gov. Lucky Orimisan Aiyedatiwa  Political Journey"
        
      
          },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "paragraph",
            content: "As Governor, Aiyedatiwa has prioritized development in key areas such as:"
          },
          {
            type: 'list',
            content: '',
            items: [
              "Economic Growth: Encouraging investment in agriculture, tourism, and industrialization.",
              "Infrastructure Development: Strengthening road networks and public services.",
              "Education and Health: Enhancing access to quality education and healthcare across Ondo State.",
                'Social Welfare: Recently granting prerogative of mercy to 40 prisoners in commemoration of his 60th birthday.'
            ]
          },
          {
            type: "paragraph",
            content: "Aiyedatiwa’s leadership reflects his commitment to progress and inclusive governance in Ondo State."
          }
        ]
      },
      {
        id: 5,
        name: "Gov. Douye Diri",
        state: "Bayelsa State",
        image: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434187/New_Project_3_ud5z2c.png",
        description: "Governor of Bayelsa State, driving technological innovation.",
        content: [
          {
            type: "paragraph",
            content: "Governor Douye Diri is committed to making Bayelsa State a hub for technological innovation and development."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734434187/New_Project_3_ud5z2c.png",
              alt: "Governor Chris Wilson at a tech conference",
              caption: "Governor Chris Wilson promoting tech innovation",
              content: "Governor Douye Diri’s political career gained momentum in 2012 when he was appointed Deputy Chief of Staff at the Bayelsa State Government House. A year later, he became the Principal Executive Secretary, a role he held until 2014, when he contested and won a seat in the Federal House of Representatives, representing the Kolokuma/Opokuma and Yenagoa Federal Constituency.",
        content2: 'In 2019, he was elected as the Senator for Bayelsa Central Senatorial District in the 9th National Assembly, where his legislative focus included environmental protection and communications.',
        content3:'In 2019, he was elected as the Senator for Bayelsa Central Senatorial District in the 9th National Assembly, where his legislative focus included environmental protection and communications.',
        heading:'Gov. Douye Diri  Political Journey'


        
        
            },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "paragraph",
            content: "Since assuming office, Governor Diri has demonstrated a commitment to the development of Bayelsa State by prioritizing:"
          },
          {
            type: 'list',
            content: '',
            items: [
              "Infrastructure Development: Improving road networks and bridges to connect rural and urban communities.",
              "Youth Empowerment: Expanding job creation initiatives and skill acquisition programs for young people.",
              "Environmental Sustainability: Addressing the unique challenges of Bayelsa as a coastal state, including erosion and flooding.",
                'Education and Health: Strengthening educational institutions and improving access to quality healthcare services.'
            ]
          },
         
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
            content: "Governor Siminalayi Fubara  is dedicated in promoting the rich cultural heritage and tourism potential of Rivers State."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433627/New_Project_7_u1jek5.png",
              alt: "Governor Laura Taylor at a cultural festival",
              caption: "Governor Laura Taylor celebrating cultural diversity",
              content: "Governor Fubara’s political journey began with the People’s Democratic Party (PDP) over a decade ago. Mentored by former Governor Nyesom Wike, Fubara played a pivotal role in unifying the party in Opobo/Nkoro Local Government Area. His leadership strengthened the party's grassroots presence and positioned him as a trusted leader in Rivers State politics.",
         heading:'Gov. Siminalayi Fubara Political Journey'
            },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "paragraph",
            content: "Elected as Governor in May 2023, Fubara has prioritized:"
          },
          {
            type: 'list',
            content: '',
            items: [
              "Economic Development: Attracting investment and promoting economic diversification.",
              "Infrastructure Growth: Building and maintaining critical infrastructure across the state.",
              "Community Development: Ensuring that rural and urban communities benefit from government programs.",
                'Youth Empowerment: Initiatives focused on education, skill acquisition, and job creation.'
            ]
          },
          
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
            content: "Governor Prince Otu focused on advancing human empowerment and economic development  Cross River State. He is also passionate about agriculture, engaging in farming alongside his professional pursuits."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433724/New_Project_5_opnbff.png",
              alt: "Governor Alex Green at a farm",
              caption: "Governor Alex Green promoting agricultural development",
              content: "House of Representatives (2003–2011) Prince Otu began his political career in 2003 as a Member of the House of Representatives, representing the Calabar Municipality/Odukpani Federal Constituency. His dedication to service earned him re-election in 2007. During his tenure, he held key roles, including: 1.  Chairman, House Committee on Petroleum (Upstream). 2. Vice Chairman, House Committee on National Population. ",
              content2:'Senate (2011–2019) In 2011, Prince Otu was elected as a Senator, representing the Cross River Southern Senatorial District. As a senator, he chaired committees on Finance and Banking and Financial Institutions and contributed significantly to Navy, Power, and Petroleum discussions. His efforts in human empowerment and economic development earned him national and international recognition.',
              heading:'Prince Bassey Edet Otu  Political Journey'
         
            },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "paragraph",
            content: "Governorship (2023–Present) On May 29, 2023, Governor Prince Otu was sworn in as the Governor of Cross River State. Under his leadership, the state is undergoing a transformation, with a focus on:"
          },
          {
            type: 'list',
            content: '',
            items: [
              "Digital Economy: Leveraging technology for sustainable development.",
              "Infrastructure: Improving urban and rural connectivity.",
              "Education and Healthcare: Enhancing access and quality.",
                'Tourism: Showcasing Cross River’s natural beauty and cultural heritage to attract global visitors.'
            ]
          },
          {
            type: "paragraph",
            content: "Governor Otu envisions a prosperous Cross River State built on inclusivity, innovation, and sustainability. He is dedicated to empowering citizens through job creation, entrepreneurship, and infrastructural development. His administration emphasizes unity and diversity, ensuring no community is left behind in the state’s journey toward growth and prosperity."
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
            content: "Governor Otti is redefining governance in Abia State, championing policies that prioritize the welfare of its citizens and fostering a culture of innovation and excellence."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433629/New_Project_8_utu20d.png",
              alt: "Governor Olivia White at a construction site",
              caption: "Governor Olivia White inspecting infrastructure projects",
              content: "Driven by a passion for public service, Governor Otti transitioned to politics, joining the All Progressives Grand Alliance (APGA) and later the Labour Party. In the 2023 general elections, he emerged as the Governor of Abia State after defeating his closest rival, marking a pivotal moment for the Labour Party in the state.",
          heading:' Gov. Alex Chioma Otti Political Journey'
            },
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "paragraph",
            content: "As Governor, Otti has prioritized:"
          },
          {
            type: 'list',
            content: '',
            items: [
              "Economic Development: Promoting industrialization and attracting investments to boost the state's economy.",
              "Infrastructure Renewal: Initiating and overseeing projects to improve roads, schools, and healthcare facilities.",
              "Transparency and Accountability: Advocating for good governance and efficient use of state resources.",
                'Youth and Women Empowerment: Launching programs to equip citizens with skills and opportunities for self-reliance.'
            ]
          },


          {
            type: "heading",
            content: "The Alex Otti Foundation"
          },
          {
            type: "paragraph",
            content: "Governor Otti established the Alex Otti Foundation, a non-profit organization committed to improving lives and empowering communities in Abia State and beyond. The foundation focuses on:"
          },
          {
            type: 'list',
            content: '',
            items: [
              "Education: Providing scholarships and grants to underprivileged students to ensure access to quality education.",
              "Healthcare: Supporting medical outreach programs and funding healthcare initiatives to improve access to medical services in rural areas.",
              "Entrepreneurship: Equipping young entrepreneurs with skills, resources, and funding to grow sustainable businesses.",
                'Community Development: Implementing programs aimed at improving living conditions and infrastructure in underserved communities.'
            ]
          },
          {
            type: "paragraph",
            content: "Through the Alex Otti Foundation, he continues to inspire hope and provide opportunities for a better future."
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
            content: "Governor Uzodinma’s leadership is marked by his commitment to inclusive governance, the rule of law, and sustainable development across Imo State."
          },
          {
              type: "image",
              url: "https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433688/New_Project_6_u6wvvc.png",
              alt: "Governor Daniel Black at a small business event",
              caption: "Governor Daniel Black supporting local entrepreneurs",
              content: "Governor Hope Uzodinma’s political journey began during the Second Nigerian Republic. In 1983, he became the Imo State Youth Leader of the ruling National Party of Nigeria (NPN). In the 1990s, with the transition to the Third Nigerian Republic, Uzodinma was an active member of the United Nigeria Congress Party.",
              content2:' In 1999, Uzodinma joined the People’s Democratic Party (PDP), serving in various capacities, including membership in the National Caucus, National Executive Committee, and Board of Trustees until 2017. He was a close associate of Governor Achike Udenwa until he decamped to the Alliance for Democracy (AD) ahead of the 2003 gubernatorial elections.',
              content3:'After losing the 2003 election, Uzodinma returned to the PDP in 2004. He contested in the PDP governorship primaries in 2006 but lost to Senator Ifeanyi Araraume. In 2011, he supported Governor Ikedi Ohakim for a second term before moving to the Action Congress of Nigeria (ACN), where he endorsed Rochas Okorocha for governor.',
              content4:'In 2018, Uzodinma left the PDP to join the ruling All Progressives Congress (APC) to contest for governor in the 2019 elections.',
              content5:'In the March 2019 gubernatorial election, Hope Uzodinma placed fourth with 96,458 votes, behind Emeka Ihedioha of the PDP (273,404 votes), Uche Nwosu of the Action Alliance (190,364 votes), and Ifeanyi Ararume of the All Progressives Grand Alliance (114,676 votes).',
              content6:'However, Uzodinma challenged the election results at the Supreme Court, which on 14th January 2020 declared him the duly elected Governor of Imo State. The court ruled that 388 polling units where votes were excluded had significant impact on the overall result. Following the judgment, Uzodinma was sworn in as Governor alongside his Deputy, Placid Njoku, on 15th January 2020.',
              heading:'Gov. Hope Odidika Uzodinma Political Journey'
            },
            
          {
            type: "heading",
            content: "Key Achievements"
          },
          {
            type: "paragraph",
            content: "Upon assuming office, Governor Uzodinma prioritized good governance and socio-economic development in Imo State. His administration has focused on:"
          },
          {
            type: 'list',
            content: '',
            items: [
              " Infrastructure Development: Continuous improvement of roads, healthcare facilities, and public buildings across the state.",
              "Economic Growth: Encouraging private sector investment to drive industrialization, with projects like the establishment of manufacturing hubs and enhancing agricultural development.",
              "Education and Skills Development: Revamping the educational sector through improved learning facilities and skills training for youths to foster job creation and entrepreneurship.",
                ' Health Sector Reform: Improving primary healthcare centers and expanding access to quality healthcare services for residents of Imo State.'
            ]
          },
         
        ]
      },
    // Add more governors here...
  ];
  

  export const governorsmain: Governor[] = [
   
  ]
  