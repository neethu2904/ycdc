import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Phone,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Award,
  Briefcase,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Zap,
  Sparkles,
  Scissors,
  Stethoscope,
  ClipboardList,
  Upload
} from 'lucide-react';
import BookingWidget from './components/BookingWidget';
import ConsultationForm from './components/ConsultationForm';
import LeadDashboard from './components/LeadDashboard';
import AboutUs from './pages/AboutUs';
import TreatmentsList from './pages/TreatmentsList';
import ContactUs from './pages/ContactUs';
import OurTeam from './pages/OurTeam';
import BeforeAfter from './pages/BeforeAfter';
import GalleryPage from './pages/GalleryPage';
import BlogPage from './pages/BlogPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ApplyNowModal from './components/ApplyNowModal';
import AdminPortal from './pages/AdminPortal';
import { API_BASE_URL } from './config';
import useScrollReveal from './hooks/useScrollReveal';
import AnimatedCounter from './components/AnimatedCounter';
import studio from '@theatre/studio';
import SplineHero from './components/SplineHero';
import { getPageFromPath, PAGE_PATHS } from './routes/pageRoutes';
import type { PageId } from './types/navigation';
import { scrollToTop } from './utils/scroll';
import { useAppContext } from './contexts';
import { RootLayout } from './layouts';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  closeBookingModal,
  openBookingModal,
  setActiveTreatmentTab,
  setApplyModalOpen,
  setDashboardModalOpen,
  setMobileMenuOpen,
  toggleMobileMenu
} from './store/appUiSlice';

import './App.css';

// Initialize Theatre.js Studio in development mode
if (import.meta.env.DEV) {
  try {
    // Clear old Theatre.js studio state to prevent byObject / undefined errors from cached data
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('__theatrejs') || key.endsWith('.persistent')) {
        localStorage.removeItem(key);
      }
    }
    
    const actualStudio = (studio as any).default || studio;
    if (typeof actualStudio.initialize === 'function') {
      actualStudio.initialize();
    } else {
      console.warn('Theatre.js studio initialize function not found on:', actualStudio);
    }
  } catch (err) {
    console.warn('Theatre.js studio failed to initialize:', err);
  }
}

// Treatment tabs data
const TREATMENT_CATEGORIES = [
  {
    id: 'skin',
    title: 'Clinical Dermatology',
    icon: Stethoscope,
    tagline: 'Science-backed treatments for healthy, disease-free skin.',
    treatments: [
      { name: 'Advanced Acne & Scar Correction', desc: 'Targeted laser and RF therapies to clear breakouts and smooth deep skin scars.', duration: '45 mins' },
      { name: 'Premium Chemical Peels', desc: 'Medically formulated resurfacing peels to reveal luminous, even-toned skin.', duration: '30 mins' },
      { name: 'Microdermabrasion & Skin Polishing', desc: 'Gentle mechanical exfoliation to eliminate dead skin cells and refine texture.', duration: '40 mins' },
      { name: 'Eczema & Psoriasis Management', desc: 'Expert clinical care and systemic plans for chronic inflammatory skin disorders.', duration: 'Varies' }
    ]
  },
  {
    id: 'hair',
    title: 'Hair & Scalp Care',
    icon: Scissors,
    tagline: 'Advanced hair restoration and medical trichology.',
    treatments: [
      { name: 'Follicular Hair Transplant (FUE)', desc: 'State-of-the-art hair restoration procedures delivering highly natural density.', duration: '4-8 hours' },
      { name: 'PRP Hair Growth Therapy', desc: 'Platelet-rich plasma scalp micro-injections to stimulate hair follicles.', duration: '60 mins' },
      { name: 'Anti-Hair Fall MesoTherapy', desc: 'Nutrient-rich cocktails delivered directly into the roots to block DHT and boost growth.', duration: '45 mins' },
      { name: 'Scalp Rejuvenation Treatment', desc: 'Detoxifying treatment targeting dandruff, dry scalp, and folliculitis.', duration: '50 mins' }
    ]
  },
  {
    id: 'laser',
    title: 'Laser & Aesthetics',
    icon: Zap,
    tagline: 'Cutting-edge laser therapies for permanent rejuvenation.',
    treatments: [
      { name: 'Secret RF Microneedling', desc: 'Fractional radiofrequency targeting deep wrinkles, acne scars, and skin laxity.', duration: '60 mins' },
      { name: 'Laser Hair Reduction (US-FDA Approved)', desc: 'Permanent pain-free reduction of unwanted hair across face, body, or limbs.', duration: '30-90 mins' },
      { name: 'Q-Switched Laser Toning', desc: 'Laser treatment targeting freckles, melasma, birthmarks, and dark pigment.', duration: '45 mins' },
      { name: 'Hollywood Carbon Laser Peel', desc: 'Carbon-assisted laser facial for immediate skin brightening and pore shrinkage.', duration: '40 mins' }
    ]
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Aesthetics',
    icon: Sparkles,
    tagline: 'Non-surgical anti-aging and facial contouring.',
    treatments: [
      { name: 'Botox Anti-Wrinkle Injections', desc: 'Targeted micro-doses to relax dynamic wrinkles and restore youthfulness.', duration: '30 mins' },
      { name: 'Dermal Fillers (Lips / Cheeks / Under-eye)', desc: 'Premium hyaluronic acid fillers to restore volume and sculpt facial contours.', duration: '45 mins' },
      { name: 'Luxury Hydrafacial Medi-Facial', desc: 'Multi-step skin cleansing, extraction, hydration, and antioxidant infusion.', duration: '60 mins' },
      { name: 'Vampire Facial (PRP Microneedling)', desc: 'Combining collagen induction therapy with auto-PRP for profound skin renewal.', duration: '75 mins' }
    ]
  }
];

const DOCTORS = [
  {
    id: 'yogiraj',
    name: 'Dr. K. Yogiraj',
    designation: 'Chairman & Chief Director',
    experience: '48+ Years Experience',
    qualification: 'MD, DVD, DHA (Dermatologist & Cosmetologist)',
    bio: 'A legendary pioneer in Indian dermatology, Dr. Yogiraj has treated generations of patients and specializes in advanced clinical dermatology, hair restoration, and traditional dermatologic surgeries.',
    locations: 'Trivandrum & Bangalore'
  },
  {
    id: 'niranjana',
    name: 'Dr. Niranjana Raj',
    designation: 'Chief Consultant Dermatologist',
    experience: '12+ Years Experience',
    qualification: 'MD (Dermatology), Fellow in Aesthetic Medicine',
    bio: 'Highly specialized in lasers, chemical resurfacing, and advanced facial contouring (Botox/Fillers). Known for creating custom aesthetic treatment plans.',
    locations: 'Whitefield, Bangalore'
  },
  {
    id: 'vennela',
    name: 'Dr. Vennela Reddy',
    designation: 'Hair Transplant Surgeon & Trichologist',
    experience: '9+ Years Experience',
    qualification: 'MS, MCh (Plastic Surgery), Hair Transplant Specialist',
    bio: 'Expert surgeon specializing in FUE hair transplantations, scar-free hair line designs, and advanced medical therapies for hair thinning.',
    locations: 'Whitefield, Bangalore'
  },
  {
    id: 'maya',
    name: 'Dr. Maya Vincent',
    designation: 'Senior Consultant Dermatologist',
    experience: '15+ Years Experience',
    qualification: 'MD (Dermatology, Venereology & Leprosy)',
    bio: 'Specialist in pediatric dermatology and clinical treatments. Renowned for her expertise in managing chronic skin diseases like psoriasis and vitiligo.',
    locations: 'Pattom, Trivandrum'
  }
];

const REVIEWS = [
  {
    name: 'Priyamvada Nair',
    location: 'Trivandrum',
    treatment: 'Secret RF Microneedling (Google Review)',
    rating: 5,
    text: 'I visited the Trivandrum center for my acne scar treatment. Dr. Maya Vincent was very gentle. After 3 sessions of Secret RF, my skin is much smoother and the scars are barely visible.'
  },
  {
    name: 'Siddharth R.',
    location: 'Bangalore',
    treatment: 'Hair Transplant (FUE)',
    rating: 5,
    text: 'Dr. Yogiraj and Dr. Vennela Reddy performed my hair transplant. The results are incredibly natural. The facility in Whitefield is state-of-the-art and feels very premium. Excellent care!'
  },
  {
    name: 'Anjali Menon',
    location: 'Trivandrum',
    treatment: 'Chemical Peels (Google Review)',
    rating: 5,
    text: 'YCDC is the oldest and most trusted clinic in Trivandrum. I had their chemical peels for hyperpigmentation. Dr. Yogiraj\'s diagnosis was spot-on, and the clinical care is exceptional.'
  },
  {
    name: 'Deepak Mohan',
    location: 'Bangalore',
    treatment: 'Laser Hair Reduction',
    rating: 5,
    text: 'Very professional clinic. The staff explain everything patiently. The laser treatment is completely pain-free compared to other clinics. Value for money and premium service.'
  },
  {
    name: 'Dr. Rahul Krishnan',
    location: 'Bangalore',
    treatment: 'Acne Correction (Google Review)',
    rating: 5,
    text: 'As a doctor myself, I appreciate YCDC\'s evidence-based approach. My acne scars have reduced significantly and the Whitefield clinic has the latest lasers. Highly recommended.'
  },
  {
    name: 'Kavitha S.',
    location: 'Trivandrum',
    treatment: 'Hydrafacial (Google Review)',
    rating: 5,
    text: 'Loved my experience at YCDC Pattom. The staff is highly trained and the Hydrafacial gave my skin an instant glow. Perfect bridal glow prep!'
  }
];

const INSTAGRAM_POSTS = [
  {
    image: 'https://ycdc.in/wp-content/uploads/2025/05/niranjana.jpg',
    caption: 'Consultation and aesthetics tips with Dr. Niranjana Raj.',
    link: 'https://www.instagram.com/drniranjanaraj/'
  },
  {
    image: 'https://ycdc.in/wp-content/uploads/2025/05/hsavvxh.jpg',
    caption: 'Advanced skin treatments for natural radiance and glow.',
    link: 'https://www.instagram.com/ycdc_india/'
  },
  {
    image: 'https://ycdc.in/wp-content/uploads/2025/05/yeysy.jpg',
    caption: 'Restoring confidence with state-of-the-art hair restoration.',
    link: 'https://www.instagram.com/ycdc_india/'
  },
  {
    image: 'https://ycdc.in/wp-content/uploads/2025/05/niranjana-.jpg',
    caption: 'Personalized clinical skin management plans.',
    link: 'https://www.instagram.com/drniranjanaraj/'
  },
  {
    image: 'https://ycdc.in/wp-content/uploads/2025/05/niranajana-conference.jpg',
    caption: 'YCDC presence at national dermatology conferences.',
    link: 'https://www.instagram.com/drniranjanaraj/'
  },
  {
    image: 'https://ycdc.in/wp-content/uploads/2025/05/Dr.-NR.jpg',
    caption: 'Expert consultation sessions for customized solutions.',
    link: 'https://www.instagram.com/drniranjanaraj/'
  },
  {
    image: 'https://ycdc.in/wp-content/uploads/2025/05/Dr.-NR-Opd.jpg',
    caption: 'Committed to clinical excellence and patient care.',
    link: 'https://www.instagram.com/drniranjanaraj/'
  },
  {
    image: 'https://ycdc.in/wp-content/uploads/2025/05/Dr.-Niranjana-Raj.jpg',
    caption: 'Science-backed aesthetic treatments by Dr. Niranjana Raj.',
    link: 'https://www.instagram.com/drniranjanaraj/'
  }
];

const TREATMENT_IMAGES: Record<string, string> = {
  skin: '/skin_treatment_premium.png',
  hair: '/hair_treatment_premium.png',
  laser: '/laser_treatment_premium.png',
  cosmetic: '/cosmetic_treatment_premium.png'
};

const DOCTOR_IMAGES: Record<string, string> = {
  yogiraj: '/doctor_yogiraj.png',
  niranjana: '/doctor_niranjana.png',
  vennela: '/doctor_vennela.png',
  maya: '/doctor_maya.png'
};
const theatreState = {
  "definitionVersion": "0.4.0",
  "revisionHistory": [],
  "sheetsById": {
    "Hero Sheet": {
      "staticOverrides": {
        "byObject": {}
      },
      "sequence": {
        "sublines": [],
        "length": 2.0,
        "tracksByObject": {
        }
      }
    }
  },
  "tracks": {
    "text-opacity": {
      "type": "ISegment",
      "keyframes": [
        { "time": 0, "value": 0, "easeIn": [0.5, 0, 1, 1], "easeOut": [0, 0, 0.5, 1] },
        { "time": 1.2, "value": 1, "easeIn": [0.5, 0, 1, 1], "easeOut": [0, 0, 0.5, 1] }
      ]
    },
    "text-y": {
      "type": "ISegment",
      "keyframes": [
        { "time": 0, "value": 30, "easeIn": [0.25, 0.1, 0.25, 1], "easeOut": [0.25, 0.1, 0.25, 1] },
        { "time": 1.2, "value": 0, "easeIn": [0.25, 0.1, 0.25, 1], "easeOut": [0.25, 0.1, 0.25, 1] }
      ]
    },
    "card-opacity": {
      "type": "ISegment",
      "keyframes": [
        { "time": 0.3, "value": 0, "easeIn": [0.5, 0, 1, 1], "easeOut": [0, 0, 0.5, 1] },
        { "time": 1.5, "value": 1, "easeIn": [0.5, 0, 1, 1], "easeOut": [0, 0, 0.5, 1] }
      ]
    },
    "card-scale": {
      "type": "ISegment",
      "keyframes": [
        { "time": 0.3, "value": 0.95, "easeIn": [0.25, 0.1, 0.25, 1], "easeOut": [0.25, 0.1, 0.25, 1] },
        { "time": 1.5, "value": 1, "easeIn": [0.25, 0.1, 0.25, 1], "easeOut": [0.25, 0.1, 0.25, 1] }
      ]
    },
    "card-y": {
      "type": "ISegment",
      "keyframes": [
        { "time": 0.3, "value": 20, "easeIn": [0.25, 0.1, 0.25, 1], "easeOut": [0.25, 0.1, 0.25, 1] },
        { "time": 1.5, "value": 0, "easeIn": [0.25, 0.1, 0.25, 1], "easeOut": [0.25, 0.1, 0.25, 1] }
      ]
    }
  }
};
void theatreState;

const HERO_SLIDES = [
  {
    badge: "ISO 9001:2015 CERTIFIED CLINIC",
    title: "50+ Years of Excellence",
    highlight: "in Skin, Hair & Aesthetic Care",
    desc: "YCDC has blended clinical expertise with state-of-the-art aesthetic science to deliver exceptional care for your skin and hair under the leadership of Dr. K. Yogiraj."
  },
  {
    badge: "SCIENCE-DRIVEN DERMATOLOGY",
    title: "Clinical Expertise",
    highlight: "Blended with Aesthetic Science",
    desc: "Every skin type is unique. We provide customized, evidence-based dermatological treatments tailored to your individual needs."
  },
  {
    badge: "TRUSTED LEGACY",
    title: "State-of-the-Art",
    highlight: "FDA-Approved Medical Lasers",
    desc: "Equipped with the latest US-FDA approved technologies to deliver safe, effective, and permanent rejuvenation results."
  }
];

function AppContent() {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { fullName, phone, whatsapp, workingHours, branches, socialLinks } = useAppContext();
  const branchSummary = branches.map((branch) => branch.name).join(' & ');

  const {
    activeTreatmentTab: activeTab,
    mobileMenuOpen,
    showBookingModal,
    showDashboardModal,
    showApplyModal,
    bookingPrefills
  } = useAppSelector((state) => state.appUi);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate hero slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentPage = getPageFromPath(location.pathname);

  // Helper to navigate
  const navigateToPage = (page: PageId) => {
    navigate(PAGE_PATHS[page] ?? PAGE_PATHS.home);
    dispatch(setMobileMenuOpen(false));
    scrollToTop();
  };
  const [seoConfigs, setSeoConfigs] = useState<any>(null);

  const { refresh } = useScrollReveal();

  // Re-observe animations when page or active tab changes
  useEffect(() => {
    refresh();
  }, [currentPage, activeTab]);

  // Fetch SEO configurations on page load

  useEffect(() => {
    fetch(`${API_BASE_URL}/seo`)
      .then(res => res.json())
      .then(data => setSeoConfigs(data))
      .catch(err => console.error('Failed to fetch SEO configs:', err));
  }, []);

  // Dynamically update page title, meta description, and keywords
  useEffect(() => {
    if (!seoConfigs) return;
    const routeName = currentPage === 'before-after' ? 'before-after' : currentPage;
    const config = seoConfigs[routeName];
    if (config) {
      document.title = config.title || 'YCDC | Yogiraj Centre for Dermatology & Cosmetology';

      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', config.meta_description || '');

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', config.keywords || '');
    } else {
      document.title = 'YCDC | Yogiraj Centre for Dermatology & Cosmetology';
    }
  }, [currentPage, seoConfigs]);

  // Google Analytics Pageview Tracker
  useEffect(() => {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
    }
  }, [currentPage, location]);


  const handleBookTreatment = (category: string, serviceId: string) => {
    dispatch(openBookingModal({ category, service: serviceId }));
  };

  // Carousel & responsive state
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsToShow = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;
  const maxIndex = Math.max(0, DOCTORS.length - itemsToShow);

  useEffect(() => {
    if (carouselIndex > maxIndex) {
      setCarouselIndex(maxIndex);
    }
  }, [maxIndex, carouselIndex]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, maxIndex]);

  const nextDoctor = () => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevDoctor = () => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Quick CTA Handlers
  const handleWhatsAppConnect = (branch: string) => {
    const text = encodeURIComponent(`Hello YCDC, I would like to inquire about treatments at your ${branch} branch.`);
    window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Top Banner (Timings & Quick CTA) */}
      {currentPage !== 'admin' && (
        <div className="glass-dark top-bar-container" style={{ color: 'white', fontSize: '0.85rem', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', position: 'relative', zIndex: 1000 }}>
          <div className="container top-bar-inner">
            <div className="top-bar-contact">
                <span>⏱️ {workingHours}</span>
                <span className="top-bar-separator">|</span>
                <span>📍 {branchSummary}</span>
              </div>
              <div className="top-bar-actions">
              <a href={`tel:${phone}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white' }}>
                <Phone size={14} style={{ color: 'white' }} /> +91 75938 64264
              </a>
              <button
                onClick={() => handleWhatsAppConnect('General')}
                className="top-bar-whatsapp-pulse"
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ color: '#25D366' }}>
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.97 14.101.943 11.474.943 6.037.943 1.611 5.313 1.607 10.744c-.001 1.674.437 3.313 1.272 4.757l-.995 3.633 3.763-.98zm12.355-6.388c-.328-.164-1.94-.959-2.24-1.069-.3-.11-.518-.164-.738.164-.22.329-.85.85-1.042 1.069-.19.22-.382.246-.71.082-.328-.164-1.386-.511-2.64-1.631-.975-.87-1.633-1.947-1.824-2.274-.19-.328-.02-.505.143-.669.148-.148.328-.383.493-.574.165-.19.22-.328.328-.546.11-.22.055-.41-.028-.574-.082-.164-.738-1.78-.997-2.42-.25-.6-.525-.515-.71-.523-.19-.009-.41-.01-.628-.01-.22 0-.573.082-.873.41-.3.329-1.147 1.122-1.147 2.733 0 1.61 1.173 3.167 1.336 3.386.164.22 2.307 3.523 5.59 4.947.78.338 1.39.54 1.86.689.784.249 1.497.213 2.06.13.628-.092 1.94-.793 2.214-1.56.273-.767.273-1.423.19-1.56-.081-.137-.3-.22-.628-.383z" />
                </svg>
                WhatsApp Consultation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Header / Navigation */}
      {currentPage !== 'admin' && (
        <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 999, borderBottom: '1px solid var(--silk-200)', padding: '16px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigateToPage('home'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.2rem',
                fontWeight: '700',
                color: 'var(--plum-800)',
                letterSpacing: '0.05em'
              }}>
                YCDC
              </span>
              <div style={{ borderLeft: '1px solid var(--gold-500)', paddingLeft: '8px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: windowWidth < 480 ? '0.65rem' : '0.75rem', fontWeight: 'bold', color: 'var(--plum-900)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Yogiraj Centre</span>
                {windowWidth >= 480 && (
                  <span style={{ fontSize: '0.65rem', color: 'var(--gold-600)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Dermatology & Cosmetology</span>
                )}
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={() => navigateToPage('home')}
                style={{ background: 'none', border: 'none', fontWeight: currentPage === 'home' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Home
              </button>
              <button
                onClick={() => navigateToPage('about')}
                style={{ background: 'none', border: 'none', fontWeight: currentPage === 'about' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                About Us
              </button>
              <button
                onClick={() => navigateToPage('team')}
                style={{ background: 'none', border: 'none', fontWeight: currentPage === 'team' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Our Team
              </button>
              <button
                onClick={() => navigateToPage('before-after')}
                style={{ background: 'none', border: 'none', fontWeight: currentPage === 'before-after' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Before & After
              </button>
              <button
                onClick={() => navigateToPage('treatments')}
                style={{ background: 'none', border: 'none', fontWeight: currentPage === 'treatments' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Treatments
              </button>
              <button
                onClick={() => navigateToPage('gallery')}
                style={{ background: 'none', border: 'none', fontWeight: currentPage === 'gallery' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Gallery
              </button>
              <button
                onClick={() => navigateToPage('blog')}
                style={{ background: 'none', border: 'none', fontWeight: currentPage === 'blog' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Blog
              </button>
              <button
                onClick={() => navigateToPage('contact')}
                style={{ background: 'none', border: 'none', fontWeight: currentPage === 'contact' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Contact
              </button>
              <button
                onClick={() => {
                  navigateToPage('home');
                  setTimeout(() => {
                    const el = document.getElementById('consultation');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                style={{ background: 'none', border: 'none', fontWeight: '500', color: 'var(--plum-800)', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Virtual Diagnosis
              </button>
              <button
                onClick={() => dispatch(openBookingModal(undefined))}
                className="btn btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.8rem' }}
              >
                Book Appointment
              </button>
            </nav>

            {/* Mobile Menu Icon */}
            <button
              className="mobile-menu-btn"
              onClick={() => dispatch(toggleMobileMenu())}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', padding: '20px 24px', backgroundColor: 'white', borderTop: '1px solid var(--silk-200)', borderBottom: '1px solid var(--silk-200)', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: 'var(--shadow-md)', textAlign: 'left' }}>
              <button onClick={() => { navigateToPage('home'); dispatch(setMobileMenuOpen(false)); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: currentPage === 'home' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>Home</button>
              <button onClick={() => { navigateToPage('about'); dispatch(setMobileMenuOpen(false)); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: currentPage === 'about' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>About Us</button>
              <button onClick={() => { navigateToPage('team'); dispatch(setMobileMenuOpen(false)); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: currentPage === 'team' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>Our Team</button>
              <button onClick={() => { navigateToPage('before-after'); dispatch(setMobileMenuOpen(false)); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: currentPage === 'before-after' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>Before & After</button>
              <button onClick={() => { navigateToPage('treatments'); dispatch(setMobileMenuOpen(false)); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: currentPage === 'treatments' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>Treatments & Services</button>
              <button onClick={() => { navigateToPage('gallery'); dispatch(setMobileMenuOpen(false)); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: currentPage === 'gallery' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>Gallery</button>
              <button onClick={() => { navigateToPage('blog'); dispatch(setMobileMenuOpen(false)); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: currentPage === 'blog' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>Blog</button>
              <button onClick={() => { navigateToPage('contact'); dispatch(setMobileMenuOpen(false)); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: currentPage === 'contact' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>Contact Us</button>
              <button
                onClick={() => {
                  navigateToPage('home');
                  dispatch(setMobileMenuOpen(false));
                  setTimeout(() => {
                    const el = document.getElementById('consultation');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: '500', color: 'var(--plum-800)', cursor: 'pointer', padding: 0 }}
              >
                Virtual Diagnosis
              </button>
              <button
                onClick={() => { dispatch(setMobileMenuOpen(false)); dispatch(openBookingModal(undefined)); }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Book Appointment
              </button>
            </div>
          )}
        </header>
      )}

      <main key={currentPage} className="page-transition-enter" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        {currentPage === 'home' && (

          <>
            {/* Hero Section */}
            <section className="reveal reveal-scale" style={{
              position: 'relative',
              minHeight: '85vh',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              padding: '60px 0',
              overflow: 'hidden'
            }}>
              {/* Background Video */}
              <video
                key={isMobile ? 'mobile-hero' : 'desktop-hero'}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: -2
                }}
              >
                <source src="/hero section.mp4" type="video/mp4" />
              </video>
              <div className="hero-bg-overlay" />

              {/* Kinetic Blob Background Elements */}
              <div className="ambient-blob-container">
                <div className="ambient-blob" style={{ top: '-10%', left: '-10%' }}></div>
                <div className="ambient-blob ambient-blob-plum" style={{ top: '30%', right: '10%' }}></div>
                <div className="ambient-blob ambient-blob-gold" style={{ bottom: '-10%', left: '20%' }}></div>
              </div>
              <div className="container hero-container">
                <div ref={heroTextRef} className="reveal reveal-left hero-content-wrapper" style={{ transition: 'none' }}>
                  {/* Sliding Hero Text Content */}
                  <div className="hero-slide-container">
                    {HERO_SLIDES.map((slide, idx) => {
                      const isActive = idx === currentSlide;
                      return (
                        <div
                          key={idx}
                          className={`hero-slide-item ${isActive ? 'active' : ''}`}
                        >
                          <span className="badge badge-premium animate-float" style={{ marginBottom: '20px', backgroundColor: 'rgba(196, 156, 190, 0.25)', color: '#ffffff', borderColor: 'rgba(196, 156, 190, 0.65)' }}>
                            {slide.badge}
                          </span>
                          <h1 className="hero-title">
                            {slide.title} <br />
                            <span className="gold-gradient-text">{slide.highlight}</span>
                          </h1>
                          <p className="hero-desc">
                            {slide.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Slide Indicator Bars */}
                  <div className="hero-indicator-container">
                    {HERO_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`hero-indicator-bar ${idx === currentSlide ? 'active' : 'inactive'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Static CTAs */}
                  <div className="hero-ctas">
                    <button onClick={() => dispatch(openBookingModal(undefined))} className="btn btn-accent spring-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Schedule Appointment <Calendar size={16} />
                    </button>
                    <a href="#consultation" className="btn btn-outline-white spring-button" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Online Virtual Diagnosis
                    </a>
                  </div>

                  {/* Features Row */}
                  <div className="hero-features reveal-stagger">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Award size={20} style={{ color: '#f3c061' }} />
                      <div>
                        <h6 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 'bold' }}>
                          <AnimatedCounter target={50} suffix="+" /> Years Legacy
                        </h6>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Founded by Dr. Yogiraj</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <ShieldCheck size={20} style={{ color: '#f3c061' }} />
                      <div>
                        <h6 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 'bold' }}>ISO Certified Quality</h6>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Highest clinical standards</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Briefcase size={20} style={{ color: '#f3c061' }} />
                      <div>
                        <h6 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 'bold' }}>Advanced Lasers</h6>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>US-FDA approved equipment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* ISO Certified Quality & Legacy Section */}
            <section id="iso-certified" className="section-padding" style={{ backgroundColor: 'var(--silk-100)', position: 'relative', overflow: 'hidden' }}>
              <div className="ambient-blob-container">
                <div className="ambient-blob" style={{ top: '10%', right: '5%' }}></div>
                <div className="ambient-blob ambient-blob-gold" style={{ bottom: '10%', left: '5%' }}></div>
              </div>
              <div className="container iso-section-grid">
                {/* Left Column: Text & ISO Info */}
                <div className="reveal reveal-left" style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                  <span className="badge badge-premium" style={{ width: 'fit-content' }}>Hello and Welcome</span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', fontSize: '2.5rem', lineHeight: '1.2' }}>
                    Providing Best Skin and Hair Care Services – <span style={{ color: 'var(--plum-800)' }}>ISO Certified</span>
                  </h2>

                  {/* Inline ISO Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', margin: '10px 0', padding: '15px', borderRadius: '8px', backgroundColor: 'rgba(214, 123, 141, 0.05)', border: '1px solid rgba(214, 123, 141, 0.1)' }}>
                    <img
                      src="https://ycdc.in/wp-content/uploads/2026/01/YCDC-ISO.png"
                      alt="YCDC ISO Certified Badge"
                      style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                    />
                    <p style={{ flex: 1, minWidth: '200px', fontWeight: '600', color: 'var(--plum-900)', fontSize: '0.95rem', margin: 0 }}>
                      ISO Certified for quality and safety, YCDC meets rigorous international standards, giving you peace of mind along with effective, personalized solutions.
                    </p>
                  </div>

                  <p style={{ fontSize: '1rem', color: 'var(--muted-charcoal)', lineHeight: '1.7' }}>
                    Our team of expert Dermatologists and Hair Transplant Surgeons specializes in skin rejuvenation, laser treatments, hair restoration, and hair transplant procedures. We work closely with each client to provide customized skin care and hair solutions, helping you achieve healthy, glowing skin and thick, voluminous hair.
                  </p>
                  <p style={{ fontSize: '1rem', color: 'var(--muted-charcoal)', lineHeight: '1.7' }}>
                    At YCDC, we bring over 50 years of expertise in advanced skin care and hair treatments, combining experience with innovation to deliver exceptional results. Our clinics in Trivandrum, Kerala, and Bangalore, Karnataka, are equipped with state-of-the-art dermatology and hair restoration technology, ensuring precision, safety, and superior outcomes.
                  </p>

                  {/* Dr. Yogiraj Signature & Info */}
                  <div className="signature-container">
                    <img
                      src="https://ycdc.in/wp-content/uploads/2025/05/Yogiraj-2.png"
                      alt="Dr. K Yogiraj Signature"
                      style={{ height: '50px', objectFit: 'contain', filter: 'contrast(1.2)' }}
                    />
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-sans)', fontWeight: 'bold', fontSize: '1rem', color: 'var(--plum-900)', margin: 0 }}>
                        Dr. K Yogiraj, MBBS, MD (D&amp;V), DV
                      </h5>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', margin: 0 }}>
                        Chairman and Managing Director
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Hero Portrait Image */}
                <div className="reveal reveal-right iso-image-decor-wrapper">
                  <div className="iso-image-decor-border"></div>
                  <img
                    src="https://ycdc.in/wp-content/uploads/2025/05/DSC09955-scaled-880x952.jpg"
                    alt="Providing Best Skin and Hair Care Services"
                    className="iso-portrait"
                  />
                </div>
              </div>
            </section>

            {/* Specialties Overview Grid Section */}
            <section id="specialties-overview" className="section-padding reveal reveal-scale" style={{ backgroundColor: 'white', borderTop: '1px solid var(--silk-200)', borderBottom: '1px solid var(--silk-200)' }}>
              <div className="container">
                <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
                  <span className="badge badge-premium">Key Specialties</span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
                    Our Core <span style={{ color: 'var(--plum-800)' }}>Dermatology Specialties</span>
                  </h2>
                  <p style={{ maxWidth: '650px', margin: '12px auto 0', color: 'var(--muted-charcoal)' }}>
                    Explore our primary areas of excellence, blending advanced clinical dermatology with cutting-edge cosmetic science.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                  {/* Card 1 */}
                  <div className="glass hover-premium reveal reveal-left" style={{ padding: '30px', borderRadius: '12px', background: 'white', border: '1px solid var(--silk-200)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'var(--transition-smooth)' }}>
                    <div>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--plum-100)', color: 'var(--plum-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                        <Stethoscope size={24} />
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--plum-900)', marginBottom: '10px' }}>Clinical Dermatology</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', lineHeight: '1.6' }}>
                        Professional treatment for acne, deep scars, melasma, psoriasis, and pediatric clinical skin disorders using evidence-based medical therapies.
                      </p>
                    </div>
                    <button onClick={() => { dispatch(setActiveTreatmentTab('skin')); const el = document.getElementById('services'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: 'var(--gold-600)', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginTop: '20px', padding: 0 }}>
                      Learn More <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Card 2 */}
                  <div className="glass hover-premium reveal reveal-up" style={{ padding: '30px', borderRadius: '12px', background: 'white', border: '1px solid var(--silk-200)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'var(--transition-smooth)' }}>
                    <div>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--plum-100)', color: 'var(--plum-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                        <Scissors size={24} />
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--plum-900)', marginBottom: '10px' }}>Hair & Scalp Care</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', lineHeight: '1.6' }}>
                        State-of-the-art FUE hair transplantations, Platelet-Rich Plasma (PRP) scalp therapy, and DHT-blocking meso-nutrients to restore hair density.
                      </p>
                    </div>
                    <button onClick={() => { dispatch(setActiveTreatmentTab('hair')); const el = document.getElementById('services'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: 'var(--gold-600)', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginTop: '20px', padding: 0 }}>
                      Learn More <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Card 3 */}
                  <div className="glass hover-premium reveal reveal-up" style={{ padding: '30px', borderRadius: '12px', background: 'white', border: '1px solid var(--silk-200)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'var(--transition-smooth)' }}>
                    <div>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--plum-100)', color: 'var(--plum-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                        <Zap size={24} />
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--plum-900)', marginBottom: '10px' }}>Laser & Aesthetics</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', lineHeight: '1.6' }}>
                        US-FDA approved laser hair reduction, Secret RF microneedling for acne scars/anti-aging, and Hollywood carbon laser peels for instant glow.
                      </p>
                    </div>
                    <button onClick={() => { dispatch(setActiveTreatmentTab('laser')); const el = document.getElementById('services'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: 'var(--gold-600)', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginTop: '20px', padding: 0 }}>
                      Learn More <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Card 4 */}
                  <div className="glass hover-premium reveal reveal-right" style={{ padding: '30px', borderRadius: '12px', background: 'white', border: '1px solid var(--silk-200)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'var(--transition-smooth)' }}>
                    <div>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--plum-100)', color: 'var(--plum-800)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                        <Sparkles size={24} />
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--plum-900)', marginBottom: '10px' }}>Cosmetic Aesthetics</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', lineHeight: '1.6' }}>
                        Premium Botox injections, Dermal fillers (lips, cheeks, under-eyes), medical hydrafacials, and vampire facials to combat signs of aging.
                      </p>
                    </div>
                    <button onClick={() => { dispatch(setActiveTreatmentTab('cosmetic')); const el = document.getElementById('services'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} style={{ background: 'none', border: 'none', color: 'var(--gold-600)', fontWeight: 'bold', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginTop: '20px', padding: 0 }}>
                      Learn More <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Treatments & Services Section */}
            <section id="services" className="section-padding" style={{ backgroundColor: 'var(--silk-100)', borderBottom: '1px solid var(--silk-200)' }}>
              <div className="container">
                <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
                  <span className="badge badge-premium">Our Offerings</span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
                    Advanced Clinical & <span style={{ color: 'var(--plum-800)' }}>Cosmetic Care</span>
                  </h2>
                  <p style={{ maxWidth: '650px', margin: '12px auto 0', color: 'var(--muted-charcoal)' }}>
                    Explore our structured treatments ranging from advanced medical trichology and hair transplants to skin correction and aesthetic procedures.
                  </p>
                </div>

                {/* Treatment Tabs */}
                <div className="reveal reveal-up" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px', borderBottom: '1px solid var(--silk-200)', paddingBottom: '20px' }}>
                  {TREATMENT_CATEGORIES.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => dispatch(setActiveTreatmentTab(cat.id))}
                        className="spring-button"
                        style={{
                          padding: '12px 24px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          borderRadius: '30px',
                          border: '1px solid transparent',
                          cursor: 'pointer',
                          backgroundColor: activeTab === cat.id ? 'var(--plum-800)' : 'var(--silk-100)',
                          color: activeTab === cat.id ? 'white' : 'var(--plum-900)',
                          transition: 'var(--transition-smooth)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {IconComponent && <IconComponent size={16} />}
                        {cat.title}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content Display */}
                <div className="treatment-layout">
                  {/* Treatment List */}
                  <div className="reveal reveal-left" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {TREATMENT_CATEGORIES.find(c => c.id === activeTab)?.treatments.map((t, idx) => (
                      <div
                        key={idx}
                        className="hover-premium treatment-list-card"
                      >
                        <div style={{ textAlign: 'left' }}>
                          <h5 style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--plum-900)' }}>{t.name}</h5>
                          <p style={{ fontSize: '0.9rem', color: 'var(--muted-charcoal)', marginTop: '4px' }}>{t.desc}</p>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', background: 'var(--plum-100)', color: 'var(--plum-800)', padding: '4px 10px', borderRadius: '30px', flexShrink: 0 }}>
                          {t.duration}
                        </span>
                      </div>
                    ))}
                    <div style={{ textAlign: 'left', marginTop: '10px' }}>
                      <button onClick={() => dispatch(openBookingModal(undefined))} className="btn btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        Book For {TREATMENT_CATEGORIES.find(c => c.id === activeTab)?.title} <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Visual Treatment Graphic */}
                  <div className="reveal reveal-scale" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '420px', boxShadow: 'var(--shadow-md)' }}>
                    <img
                      src={TREATMENT_IMAGES[activeTab] || '/skin_treatment_premium.png'}
                      alt="Treatment Demonstration"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      padding: '30px',
                      background: 'linear-gradient(transparent, rgba(45,14,37,0.95))',
                      color: 'white',
                      textAlign: 'left'
                    }}>
                      <span className="badge badge-premium" style={{ marginBottom: '8px' }}>Standard of Excellence</span>
                      <h4 style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>
                        {TREATMENT_CATEGORIES.find(c => c.id === activeTab)?.title}
                      </h4>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginTop: '6px' }}>
                        {TREATMENT_CATEGORIES.find(c => c.id === activeTab)?.tagline}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Doctors / About Section */}
            <section id="doctors" className="section-padding reveal reveal-scale" style={{ backgroundColor: 'white', borderTop: '1px solid var(--silk-200)', borderBottom: '1px solid var(--silk-200)' }}>
              <div className="container">

                {/* Custom Flex Header for Heading and Chevron Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                  <div style={{ textAlign: 'left' }}>
                    <span className="badge badge-premium">Our Specialists</span>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
                      Led By Decades of <span style={{ color: 'var(--plum-800)' }}>Clinical Excellence</span>
                    </h2>
                    <p style={{ maxWidth: '650px', marginTop: '12px', color: 'var(--muted-charcoal)' }}>
                      Get consultations from certified medical practitioners and transplant surgeons with global credentials.
                    </p>
                  </div>

                  {/* Navigation buttons */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={prevDoctor}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: '1px solid var(--silk-200)',
                        background: 'white',
                        color: 'var(--gold-500)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--gold-500)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = 'var(--gold-500)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = 'var(--gold-500)';
                        e.currentTarget.style.borderColor = 'var(--silk-200)';
                      }}
                      title="Previous Specialist"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextDoctor}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: '1px solid var(--silk-200)',
                        background: 'white',
                        color: 'var(--gold-500)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--gold-500)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = 'var(--gold-500)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = 'var(--gold-500)';
                        e.currentTarget.style.borderColor = 'var(--silk-200)';
                      }}
                      title="Next Specialist"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Doctor Profiles Carousel */}
                <div
                  className="reveal reveal-up"
                  style={{ overflow: 'hidden', position: 'relative', width: '100%', padding: '10px 0' }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div style={{
                    display: 'flex',
                    transform: `translateX(calc(-${carouselIndex} * (100% + 24px) / ${itemsToShow}))`,
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    gap: '24px'
                  }}>
                    {DOCTORS.map((d) => (
                      <div
                        key={d.id}
                        className="glass doctor-card hover-premium"
                        style={{
                          flex: `0 0 calc(${100 / itemsToShow}% - ${(24 * (itemsToShow - 1)) / itemsToShow}px)`,
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: '1px solid var(--silk-200)',
                          boxShadow: 'var(--shadow-sm)',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {/* Doctor Image Block */}
                        <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                          <img
                            src={DOCTOR_IMAGES[d.id] || `/doctor_${d.id}.png`}
                            alt={d.name}
                            className="doctor-card-img"
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                          {/* Soft dark-plum gradient overlay */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to bottom, rgba(43, 20, 39, 0) 40%, rgba(43, 20, 39, 0.85) 100%)',
                            zIndex: 1
                          }} />

                          {/* Award overlay badge */}
                          <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.25)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            zIndex: 2
                          }}>
                            <Award size={18} />
                          </div>

                          {/* Text Overlay on image */}
                          <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            zIndex: 2,
                            textAlign: 'left'
                          }}>
                            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--plum-500)', fontWeight: 'bold' }}>{d.experience}</span>
                            <h4 style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '1.4rem', marginTop: '4px', marginBottom: 0 }}>{d.name}</h4>
                          </div>
                        </div>

                        {/* Doctor Bio Details */}
                        <div style={{ padding: '24px', textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--gold-500)', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '6px' }}>{d.designation}</span>
                            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--muted-charcoal)', fontStyle: 'italic', marginBottom: '12px' }}>{d.qualification}</span>
                            <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', lineHeight: '1.5', marginBottom: '16px' }}>{d.bio}</p>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-600)', fontSize: '0.8rem', fontWeight: '600', borderTop: '1px solid var(--silk-200)', paddingTop: '12px' }}>
                            <MapPin size={12} /> Locations: {d.locations}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>


            {/* Multi-Branch Setup Section */}
            <section id="locations" className="section-padding" style={{ backgroundColor: 'var(--silk-100)' }}>
              <div className="container">
                <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
                  <span className="badge badge-premium">Our Centers</span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
                    Our State-of-the-Art <span style={{ color: 'var(--plum-800)' }}>Clinic Centers</span>
                  </h2>
                  <p style={{ maxWidth: '650px', margin: '12px auto 0', color: 'var(--muted-charcoal)' }}>
                    Visit our state-of-the-art facilities equipped with advanced infrastructure in Bengaluru or Thiruvananthapuram.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                  {/* Trivandrum Branch */}
                  <div className="glass reveal reveal-left hover-premium" style={{ padding: '30px', borderRadius: '12px', border: '1px solid var(--silk-200)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--plum-900)' }}>{branches[0]?.name}</h4>
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Active Center</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '20px' }}>
                        <div>
                          <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Address</strong>
                          <span>Marappalam Road, Opposite IndusInd Bank, Pattom, Thiruvananthapuram, Kerala - 695004</span>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Hours</strong>
                          <span>{workingHours} <br />(Sunday Closed)</span>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Direct Phone</strong>
                          <a href="tel:+914713100707" style={{ color: 'var(--gold-600)', fontWeight: 'bold' }}>+91 471 310 0707</a>
                        </div>
                      </div>

                      {/* Mock Map Placeholder */}
                      <div style={{
                        height: '150px',
                        borderRadius: '6px',
                        background: 'var(--silk-200)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        border: '1px solid var(--silk-200)',
                        color: 'var(--muted-charcoal)',
                        fontSize: '0.8rem',
                        flexDirection: 'column',
                        gap: '6px'
                      }}>
                        <MapPin size={24} style={{ color: 'var(--plum-800)' }} />
                        <span>Pattom Marappalam Road Navigation Map</span>
                        <a href="https://maps.google.com" target="_blank" style={{ textDecoration: 'underline', color: 'var(--gold-600)', fontWeight: 'bold' }}>Open Live Map</a>
                      </div>
                    </div>

                    <div className="location-card-buttons">
                      <button onClick={() => handleWhatsAppConnect('Trivandrum')} className="btn btn-outline" style={{ padding: '10px', fontSize: '0.8rem', textTransform: 'none' }}>
                        WhatsApp Branch
                      </button>
                      <button onClick={() => dispatch(openBookingModal(undefined))} className="btn btn-primary" style={{ padding: '10px', fontSize: '0.8rem', textTransform: 'none' }}>
                        Book Trivandrum
                      </button>
                    </div>
                  </div>

                  {/* Whitefield Branch */}
                  <div className="glass reveal reveal-right hover-premium" style={{ padding: '30px', borderRadius: '12px', border: '1px solid var(--silk-200)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--plum-900)' }}>{branches[1]?.name}</h4>
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Active Center</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '20px' }}>
                        <div>
                          <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Address</strong>
                          <span>4th Floor, Premium Square, Whitefield Main Road, Near ITPL, Whitefield, Bengaluru - 560066</span>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Hours</strong>
                          <span>{workingHours} <br />(Sunday Closed)</span>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Direct Phone</strong>
                          <a href={`tel:${phone}`} style={{ color: 'var(--gold-600)', fontWeight: 'bold' }}>{phone}</a>
                        </div>
                      </div>

                      {/* Mock Map Placeholder */}
                      <div style={{
                        height: '150px',
                        borderRadius: '6px',
                        background: 'var(--silk-200)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        border: '1px solid var(--silk-200)',
                        color: 'var(--muted-charcoal)',
                        fontSize: '0.8rem',
                        flexDirection: 'column',
                        gap: '6px'
                      }}>
                        <MapPin size={24} style={{ color: 'var(--plum-800)' }} />
                        <span>Whitefield Main Road Navigation Map</span>
                        <a href="https://maps.google.com" target="_blank" style={{ textDecoration: 'underline', color: 'var(--gold-600)', fontWeight: 'bold' }}>Open Live Map</a>
                      </div>
                    </div>

                    <div className="location-card-buttons">
                      <button onClick={() => handleWhatsAppConnect('Bangalore')} className="btn btn-outline" style={{ padding: '10px', fontSize: '0.8rem', textTransform: 'none' }}>
                        WhatsApp Branch
                      </button>
                      <button onClick={() => dispatch(openBookingModal(undefined))} className="btn btn-primary" style={{ padding: '10px', fontSize: '0.8rem', textTransform: 'none' }}>
                        Book Whitefield
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Online Consultation / Diagnosis section */}
            <section id="consultation" className="section-padding reveal reveal-scale" style={{ background: 'linear-gradient(var(--silk-200), var(--silk-100))' }}>
              <div className="container consultation-layout">
                <div className="reveal reveal-left" style={{ textAlign: 'left' }}>
                  <span className="badge badge-premium" style={{ marginBottom: '10px' }}>Remote Screening</span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', fontSize: '2.5rem', lineHeight: '1.2', marginTop: '10px' }}>
                    Request Online <br />
                    <span style={{ color: 'var(--plum-800)' }}>Virtual Diagnosis</span>
                  </h2>
                  <p style={{ marginTop: '16px', fontSize: '1rem', color: 'var(--muted-charcoal)' }}>
                    Can't make it to our Bangalore or Trivandrum clinic? YCDC offers a secure, virtual pre-screening consultation.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--plum-100)',
                        color: 'var(--plum-800)',
                        border: '1px solid var(--plum-600)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <ClipboardList size={18} />
                      </div>
                      <div>
                        <h6 style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', color: 'var(--plum-800)', fontSize: '1.1rem', marginBottom: '4px' }}>
                          1. Share Concerns & Symptoms
                        </h6>
                        <p style={{ fontSize: '0.85rem', color: 'var(--charcoal)', lineHeight: '1.5' }}>
                          Fill out our diagnostic questionnaire regarding skin or hair concerns.
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--plum-100)',
                        color: 'var(--plum-800)',
                        border: '1px solid var(--plum-600)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Upload size={18} />
                      </div>
                      <div>
                        <h6 style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', color: 'var(--plum-800)', fontSize: '1.1rem', marginBottom: '4px' }}>
                          2. Secure Photo Upload
                        </h6>
                        <p style={{ fontSize: '0.85rem', color: 'var(--charcoal)', lineHeight: '1.5' }}>
                          Upload clear pictures of the affected skin area for dermatologist evaluation.
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--plum-100)',
                        color: 'var(--plum-800)',
                        border: '1px solid var(--plum-600)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Stethoscope size={18} />
                      </div>
                      <div>
                        <h6 style={{ fontFamily: 'var(--font-serif)', fontWeight: 'bold', color: 'var(--plum-800)', fontSize: '1.1rem', marginBottom: '4px' }}>
                          3. Doctor Review & Treatment Path
                        </h6>
                        <p style={{ fontSize: '0.85rem', color: 'var(--charcoal)', lineHeight: '1.5' }}>
                          Our specialists review your details and contact you with custom prescriptions or clinic invitation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="reveal reveal-right" style={{ width: '100%', minWidth: 0 }}>
                  <ConsultationForm />
                </div>
              </div>
            </section>

            {/* Patient Reviews / Testimonials */}
            <section className="section-padding reveal reveal-scale" style={{ backgroundColor: 'white', overflow: 'hidden' }}>
              <div className="container">

                {/* Custom Flex Header for Heading */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                  <div style={{ textAlign: 'left' }}>
                    <span className="badge badge-premium">Patient Stories</span>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
                      Trusted by Thousands of <span style={{ color: 'var(--plum-800)' }}>Happy Patients</span>
                    </h2>
                    <p style={{ maxWidth: '650px', margin: '12px auto 0', color: 'var(--muted-charcoal)' }}>
                      Read genuine feedback from patients who experienced transformative skincare and hair treatments at YCDC.
                    </p>
                  </div>
                </div>

                {/* Running Marquee Testimonial Carousel */}
                <div className="marquee-container" style={{ margin: '30px 0', padding: '10px 0' }}>
                  <div className="marquee-content">
                    {REVIEWS.map((r, idx) => (
                      <div
                        key={`rev-marquee-1-${idx}`}
                        className="glass-glow-card"
                        style={{
                          width: '380px',
                          flexShrink: 0,
                          padding: '24px',
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: '260px',
                          borderRadius: '12px'
                        }}
                      >
                        <div>
                          {/* Rating stars */}
                          <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                            {[...Array(r.rating)].map((_, i) => (
                              <span key={i} style={{ color: 'var(--gold-500)', fontSize: '1.2rem' }}>★</span>
                            ))}
                          </div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)', fontStyle: 'italic', marginBottom: '16px', lineHeight: '1.5' }}>
                            "{r.text}"
                          </p>
                        </div>

                        <div style={{ borderTop: '1px solid var(--silk-200)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h6 style={{ fontWeight: 'bold', color: 'var(--plum-900)', fontSize: '0.9rem' }}>{r.name}</h6>
                            <span style={{ fontSize: '0.75rem', color: 'var(--muted-charcoal)' }}>Patient, {r.location}</span>
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--gold-600)', background: 'var(--gold-100)', padding: '2px 8px', borderRadius: '4px' }}>
                            {r.treatment}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="marquee-content" aria-hidden="true">
                    {REVIEWS.map((r, idx) => (
                      <div
                        key={`rev-marquee-2-${idx}`}
                        className="glass-glow-card"
                        style={{
                          width: '380px',
                          flexShrink: 0,
                          padding: '24px',
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: '260px',
                          borderRadius: '12px'
                        }}
                      >
                        <div>
                          {/* Rating stars */}
                          <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                            {[...Array(r.rating)].map((_, i) => (
                              <span key={i} style={{ color: 'var(--gold-500)', fontSize: '1.2rem' }}>★</span>
                            ))}
                          </div>
                          <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)', fontStyle: 'italic', marginBottom: '16px', lineHeight: '1.5' }}>
                            "{r.text}"
                          </p>
                        </div>

                        <div style={{ borderTop: '1px solid var(--silk-200)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <h6 style={{ fontWeight: 'bold', color: 'var(--plum-900)', fontSize: '0.9rem' }}>{r.name}</h6>
                            <span style={{ fontSize: '0.75rem', color: 'var(--muted-charcoal)' }}>Patient, {r.location}</span>
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--gold-600)', background: 'var(--gold-100)', padding: '2px 8px', borderRadius: '4px' }}>
                            {r.treatment}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Instagram Posts Section */}
            <section id="instagram-feed" className="section-padding reveal reveal-scale" style={{ backgroundColor: 'var(--silk-100)', borderTop: '1px solid var(--silk-200)' }}>
              <div className="container" style={{ textAlign: 'center' }}>
                <div className="reveal reveal-up" style={{ marginBottom: '40px' }}>
                  <span className="badge badge-premium">Dr. Niranjana Raj</span>
                  <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
                    Instagram <span style={{ color: 'var(--plum-800)' }}>Posts</span>
                  </h2>
                  <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--muted-charcoal)' }}>
                    Follow our social feed for professional skin care advice, treatment insights, and clinical highlights directly from Dr. Niranjana Raj and YCDC.
                  </p>
                </div>

                {/* Grid of Instagram posts */}
                <div className="instagram-posts-grid reveal-stagger">
                  {INSTAGRAM_POSTS.map((post, idx) => (
                    <a
                      key={idx}
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="instagram-card"
                    >
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="instagram-card-img"
                        loading="lazy"
                      />
                      <div className="instagram-card-overlay">
                        <div className="instagram-card-icon">
                          <Instagram size={28} style={{ color: 'var(--plum-500)' }} />
                        </div>
                        <p className="instagram-card-caption">
                          {post.caption}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Connect Buttons */}
                <div className="reveal reveal-up" style={{ marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href="https://www.instagram.com/drniranjanaraj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Instagram size={18} /> Follow Dr. Niranjana Raj
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--plum-800)', color: 'var(--plum-900)' }}
                  >
                    <Instagram size={18} /> Follow YCDC India
                  </a>
                </div>
              </div>
            </section>
          </>
        )}


        {currentPage === 'about' && (
          <AboutUs onNavigateToContact={() => navigateToPage('contact')} />
        )}

        {currentPage === 'team' && (
          <OurTeam onOpenApplyModal={() => dispatch(setApplyModalOpen(true))} />
        )}

        {currentPage === 'before-after' && (
          <BeforeAfter onBookTreatment={handleBookTreatment} />
        )}

        {currentPage === 'treatments' && (
          <TreatmentsList onBookTreatment={handleBookTreatment} />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage />
        )}

        {currentPage === 'blog' && (
          <BlogPage />
        )}

        {currentPage === 'contact' && (
          <ContactUs />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicy />
        )}

        {currentPage === 'admin' && (
          <AdminPortal />
        )}
      </main>

      {currentPage !== 'admin' && (
        <>
          {/* Footer */}
          <footer className="glass-dark" style={{ color: 'rgba(255,255,255,0.7)', padding: '60px 0 30px', borderTop: '1px solid var(--plum-800)' }}>
            <div className="container footer-main">
              <div>
                <h4
                  onClick={() => navigateToPage('home')}
                  style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
                >
                  YCDC
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '10px', lineHeight: '1.5' }}>
                  {fullName} (YCDC) is an ISO 9001:2015 certified aesthetic and clinical clinic group specializing in advanced skin, hair, and laser therapies.
                </p>
                {/* Footer Social Media Icons */}
                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--plum-800)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    title="Instagram"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--plum-800)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    title="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--plum-800)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    title="YouTube"
                  >
                    <Youtube size={16} />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--plum-800)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    title="LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--plum-800)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    title="Twitter"
                  >
                    <Twitter size={16} />
                  </a>
                </div>
              </div>

              <div className="footer-links-grid">
                <div>
                  <h6 style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '16px' }}>Quick Links</h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', alignItems: 'flex-start' }}>
                    <button onClick={() => navigateToPage('home')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Home</button>
                    <button onClick={() => navigateToPage('about')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>About Us</button>
                    <button onClick={() => navigateToPage('team')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Our Team</button>
                    <button onClick={() => navigateToPage('before-after')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Before & After</button>
                    <button onClick={() => navigateToPage('treatments')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Treatments & Services</button>
                    <button onClick={() => navigateToPage('gallery')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Gallery</button>
                    <button onClick={() => navigateToPage('blog')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Blog</button>
                    <button onClick={() => navigateToPage('contact')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Contact Us</button>
                  </div>
                </div>
                <div>
                  <h6 style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '16px' }}>Locations</h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                    {branches.map((branch) => (
                      <span key={branch.id}>{branch.name}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h6 style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '16px' }}>Compliance</h6>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                    <span>ISO 9001:2015</span>
                    <span>HIPAA Secured Data</span>
                    <span>Medical Board Certified</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              <span>
                © {new Date().getFullYear()} {fullName} (YCDC). All rights reserved.
                <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.15)' }}>|</span>
                <span>
                  Designed &amp; Developed by <a href="https://chromologtechnologies.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-400)'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>Chromolog Technologies</a>
                </span>
              </span>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => navigateToPage('privacy')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Privacy Policy</button>
                <span>|</span>
                <button onClick={() => navigateToPage('privacy')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}>Terms of Service</button>
                <span>|</span>
                <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: 'var(--gold-500)', fontSize: '0.75rem', cursor: 'pointer', padding: 0, fontWeight: '500' }}>Admin Dashboard</button>
              </div>
            </div>
          </footer>

          {/* Floating Action Buttons */}

          {/* Floating Call Now Button */}
          <div className="floating-cta-phone">
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => window.open(`tel:${phone}`, '_self')}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--plum-900)',
                  color: 'var(--gold-300)',
                  border: '2px solid var(--gold-500)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
                }}
                title="Call Us Now"
              >
                <Phone size={24} />
              </button>
            </div>
          </div>

          {/* 1. Floating WhatsApp Connect Button */}
          <div className="floating-cta-whatsapp">
            <div style={{ position: 'relative' }}>
              {/* Pulsing ring animation in inline style */}
              <div style={{
                position: 'absolute',
                top: '-5px',
                left: '-5px',
                right: '-5px',
                bottom: '-5px',
                borderRadius: '50%',
                border: '2px solid green',
                animation: 'pulse-ring 2s cubic-bezier(0.215, 0.610, 0.355, 1) infinite'
              }} />
              <button
                onClick={() => handleWhatsAppConnect('General Floating')}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  position: 'relative',
                  zIndex: 2
                }}
                title="Chat on WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" style={{ color: 'white' }}>
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.574 1.97 14.101.943 11.474.943 6.037.943 1.611 5.313 1.607 10.744c-.001 1.674.437 3.313 1.272 4.757l-.995 3.633 3.763-.98zm12.355-6.388c-.328-.164-1.94-.959-2.24-1.069-.3-.11-.518-.164-.738.164-.22.329-.85.85-1.042 1.069-.19.22-.382.246-.71.082-.328-.164-1.386-.511-2.64-1.631-.975-.87-1.633-1.947-1.824-2.274-.19-.328-.02-.505.143-.669.148-.148.328-.383.493-.574.165-.19.22-.328.328-.546.11-.22.055-.41-.028-.574-.082-.164-.738-1.78-.997-2.42-.25-.6-.525-.515-.71-.523-.19-.009-.41-.01-.628-.01-.22 0-.573.082-.873.41-.3.329-1.147 1.122-1.147 2.733 0 1.61 1.173 3.167 1.336 3.386.164.22 2.307 3.523 5.59 4.947.78.338 1.39.54 1.86.689.784.249 1.497.213 2.06.13.628-.092 1.94-.793 2.214-1.56.273-.767.273-1.423.19-1.56-.081-.137-.3-.22-.628-.383z" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}



      {/* ----------------- POPUP MODALS ----------------- */}

      {/* 1. Appointment Scheduler Modal */}
      {showBookingModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(26, 8, 21, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '12px' }}>
            <BookingWidget
              onClose={() => {
                dispatch(closeBookingModal());
              }}
              initialCategory={bookingPrefills.category}
              initialService={bookingPrefills.service}
            />
          </div>
        </div>
      )}

      {/* 2. Admin Lead Dashboard Modal */}
      {showDashboardModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(26, 8, 21, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{ width: '100%', maxWidth: '980px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '12px' }}>
            <LeadDashboard onClose={() => dispatch(setDashboardModalOpen(false))} />
          </div>
        </div>
      )}
      {/* 3. Careers Application Modal */}
      {showApplyModal && (
        <ApplyNowModal onClose={() => dispatch(setApplyModalOpen(false))} />
      )}
    </>
  );
}

function App() {
  return (
    <RootLayout>
      <AppContent />
    </RootLayout>
  );
}

export default App;
