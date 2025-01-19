  export interface GalleryItem {
    type: 'image' | 'video';
    url: string;
    caption: string;
    state: string;
  }
  
  export const statesGalleryData: GalleryItem[] = [
    {
      type: 'image',
      url: 'https://res.cloudinary.com/dnbnev9lr/image/upload/v1734439694/New_Project_18_pgkxbb.png',
      caption: 'Port Harcourt Pleasure Park, Rivers State (16:9)',
      state: 'Rivers'
    },
    {
      type: 'image',
      url: 'https://res.cloudinary.com/dnbnev9lr/image/upload/v1734436318/New_Project_16_gaydcw.png',
      caption: 'Traditional sculpture in Delta State (9:16)',
      state: 'Delta'
    },
    {
      type: 'video',
      url: 'https://res.cloudinary.com/dnbnev9lr/video/upload/v1737027641/12297192_1280_720_50fps_sfey3v.mp4',
      caption: 'Ox-bow lake in Yenagoa, Bayelsa State',
      state: 'Bayelsa'
    },
    {
      type: 'image',
      url: 'https://res.cloudinary.com/dnbnev9lr/image/upload/v1734433449/New_Project_11_beutz6.png',
      caption: 'Ibeno Beach, Akwa Ibom State (1:1)',
      state: 'Akwa Ibom'
    },
    // Add more gallery items for each state...
  ];
  
  