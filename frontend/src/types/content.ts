export interface CaseStudy {
  id: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  details: {
    doctor: string;
    technology: string;
    sessions: string;
    concern: string;
  };
}

export interface BlogPost {
  id: string;
  category: 'skin' | 'hair' | 'anti-aging';
  category_label: string;
  title: string;
  author: string;
  date: string;
  read_time: string;
  excerpt: string;
  image_path: string;
  body_content: string[];
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  category: 'infrastructure' | 'treatments';
  title: string;
  thumbnail_path: string;
  video_path?: string;
  description: string;
}

export interface Doctor {
  id: number;
  name: string;
  qualification: string;
  designation?: string;
  bio?: string;
  branch: string;
  instagram_url?: string;
  active: boolean;
  image_path?: string;
}

export interface Treatment {
  id: string;
  category: string;
  category_name: string;
  name: string;
  description: string;
  duration: string;
  price_range: string;
  science: string;
  treats: string;
  active: boolean;
  image?: string;
  branch?: 'trivandrum' | 'bangalore' | 'both';
  procedure_type?: 'dermatic' | 'cosmetic';
}
