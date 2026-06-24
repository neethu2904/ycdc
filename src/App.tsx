import { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
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
  Layers
} from 'lucide-react';
import BookingWidget from './components/BookingWidget';
import ConsultationForm from './components/ConsultationForm';
import LeadDashboard from './components/LeadDashboard';
import AboutUs from './components/AboutUs';
import TreatmentsList from './components/TreatmentsList';
import ContactUs from './components/ContactUs';

import './App.css';

// Treatment tabs data
const TREATMENT_CATEGORIES = [
  {
    id: 'skin',
    title: 'Clinical Dermatology',
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
    locations: 'Bangalore & Trivandrum'
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
    name: 'Siddharth R.',
    location: 'Bangalore',
    treatment: 'Hair Transplant (FUE)',
    rating: 5,
    text: 'Dr. Yogiraj and Dr. Vennela Reddy performed my hair transplant. The results are incredibly natural. The facility in Whitefield is state-of-the-art and feels very premium. Excellent care!'
  },
  {
    name: 'Priyamvada Nair',
    location: 'Trivandrum',
    treatment: 'Secret RF Microneedling',
    rating: 5,
    text: 'I visited the Trivandrum center for my acne scar treatment. Dr. Maya Vincent was very gentle. After 3 sessions of Secret RF, my skin is much smoother and the scars are barely visible.'
  },
  {
    name: 'Deepak Mohan',
    location: 'Bangalore',
    treatment: 'Laser Hair Reduction',
    rating: 5,
    text: 'Very professional clinic. The staff explain everything patiently. The laser treatment is completely pain-free compared to other clinics. Value for money and premium service.'
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

function App() {
  const [activeTab, setActiveTab] = useState('skin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [bookingPrefills, setBookingPrefills] = useState<{ category?: string; service?: string }>({});

  const handleBookTreatment = (category: string, serviceId: string) => {
    setBookingPrefills({ category, service: serviceId });
    setShowBookingModal(true);
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
    window.open(`https://wa.me/918884254545?text=${text}`, '_blank');
  };

  const handleCallConnect = () => {
    window.open('tel:+918884254545', '_self');
  };

  return (
    <>
      {/* Top Banner (Timings & Quick CTA) */}
      <div className="glass-dark top-bar-container" style={{ color: 'white', fontSize: '0.85rem', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', position: 'relative', zIndex: 1000 }}>
        <div className="container top-bar-inner">
          <div className="top-bar-contact">
            <span>⏱️ Mon - Sat: 9:00 AM - 7:00 PM</span>
            <span className="top-bar-separator">|</span>
            <span>📍 Whitefield, Bangalore & Pattom, Trivandrum</span>
          </div>
          <div className="top-bar-actions">
            <a href="tel:+917593864264" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white' }}>
              <Phone size={14} style={{ color: 'white' }} /> +91 75938 64264
            </a>
            <button
              onClick={() => handleWhatsAppConnect('General')}
              style={{ background: 'none', border: 'none', color: 'var(--gold-300)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
            >
              <MessageSquare size={14} style={{ color: 'green' }} /> WhatsApp Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Header / Navigation */}
      <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 999, borderBottom: '1px solid var(--silk-200)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} 
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
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--plum-900)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Yogiraj Centre</span>
              <span style={{ fontSize: '0.65rem', color: 'var(--gold-600)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Dermatology & Cosmetology</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button 
              onClick={() => setCurrentPage('home')} 
              style={{ background: 'none', border: 'none', fontWeight: currentPage === 'home' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('about')} 
              style={{ background: 'none', border: 'none', fontWeight: currentPage === 'about' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              About Us
            </button>
            <button 
              onClick={() => setCurrentPage('treatments')} 
              style={{ background: 'none', border: 'none', fontWeight: currentPage === 'treatments' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              Treatments
            </button>
            <button 
              onClick={() => setCurrentPage('contact')} 
              style={{ background: 'none', border: 'none', fontWeight: currentPage === 'contact' ? 'bold' : '500', color: 'var(--plum-900)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              Contact Us
            </button>
            <button 
              onClick={() => {
                setCurrentPage('home');
                setTimeout(() => {
                  const el = document.getElementById('consultation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }} 
              style={{ background: 'none', border: 'none', fontWeight: '500', color: 'var(--plum-800)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              Virtual Diagnosis
            </button>
            <button
              onClick={() => { setBookingPrefills({}); setShowBookingModal(true); }}
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              Book Appointment
            </button>
          </nav>

          {/* Mobile Menu Icon */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="glass" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', padding: '20px 24px', borderTop: '1px solid var(--silk-200)', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: 'var(--shadow-md)', textAlign: 'left' }}>
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1.1rem', fontWeight: currentPage === 'home' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>Home</button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1.1rem', fontWeight: currentPage === 'about' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>About Us</button>
            <button onClick={() => { setCurrentPage('treatments'); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1.1rem', fontWeight: currentPage === 'treatments' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>Treatments & Services</button>
            <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1.1rem', fontWeight: currentPage === 'contact' ? 'bold' : '500', color: 'var(--plum-900)', cursor: 'pointer', padding: 0 }}>Contact Us</button>
            <button 
              onClick={() => { 
                setCurrentPage('home'); 
                setMobileMenuOpen(false); 
                setTimeout(() => {
                  const el = document.getElementById('consultation');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }} 
              style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: '1.1rem', fontWeight: '500', color: 'var(--plum-800)', cursor: 'pointer', padding: 0 }}
            >
              Virtual Diagnosis
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); setBookingPrefills({}); setShowBookingModal(true); }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>

      {currentPage === 'home' && (
        <>
          {/* Hero Section */}
          <section className="animate-fade-in" style={{
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
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="container hero-container">
          <div className="animate-fade-in-left">
            <span className="badge badge-premium animate-float" style={{ marginBottom: '20px', backgroundColor: '#7c631a', color: '#ffffff', borderColor: '#634f14' }}>
              ISO 9001:2015 Certified Dermatology Center
            </span>
            <h1 className="hero-title">
              Science-Driven <br />
              <span className="gold-gradient-text">Dermatology & Cosmetology</span>
            </h1>
            <p className="hero-desc">
              For over four decades, YCDC has blended clinical expertise with state-of-the-art aesthetic science to deliver exceptional care for your skin and hair under the leadership of Dr. K. Yogiraj.
            </p>
            <div className="hero-ctas">
              <button onClick={() => setShowBookingModal(true)} className="btn btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Schedule Appointment <Calendar size={16} />
              </button>
              <a href="#consultation" className="btn btn-outline-white" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Online Virtual Diagnosis
              </a>
            </div>

            {/* Features Row */}
            <div className="hero-features">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={20} style={{ color: 'var(--gold-400)' }} />
                <div>
                  <h6 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 'bold' }}>45+ Years Legacy</h6>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Founded by Dr. Yogiraj</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} style={{ color: 'var(--gold-400)' }} />
                <div>
                  <h6 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 'bold' }}>ISO Certified Quality</h6>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>Highest clinical standards</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Briefcase size={20} style={{ color: 'var(--gold-400)' }} />
                <div>
                  <h6 style={{ color: 'white', fontSize: '0.95rem', fontWeight: 'bold' }}>Advanced Lasers</h6>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>US-FDA approved equipment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual card showing quick branch appointment booking selection */}
          <div className="glass desktop-only animate-fade-in-right delay-200" style={{ padding: '30px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--charcoal)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--gold-600)', letterSpacing: '0.05em' }}>Instant Reservation</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--plum-900)', margin: '6px 0 20px' }}>Select Branch</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div
                onClick={() => { setShowBookingModal(true); }}
                style={{ background: 'white', padding: '16px', borderRadius: '6px', border: '1px solid var(--silk-200)', cursor: 'pointer', transition: 'var(--transition-fast)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <h6 style={{ fontWeight: 'bold', color: 'var(--plum-900)' }}>Whitefield Center</h6>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted-charcoal)' }}>Bengaluru, Karnataka</span>
                </div>
                <ChevronRight size={18} style={{ color: 'var(--gold-600)' }} />
              </div>
              <div
                onClick={() => { setShowBookingModal(true); }}
                style={{ background: 'white', padding: '16px', borderRadius: '6px', border: '1px solid var(--silk-200)', cursor: 'pointer', transition: 'var(--transition-fast)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <h6 style={{ fontWeight: 'bold', color: 'var(--plum-900)' }}>Pattom Center</h6>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted-charcoal)' }}>Thiruvananthapuram, Kerala</span>
                </div>
                <ChevronRight size={18} style={{ color: 'var(--gold-600)' }} />
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted-charcoal)', textAlign: 'center' }}>
              Prefer remote screening? Try our <a href="#consultation" style={{ color: 'var(--plum-800)', fontWeight: 'bold', textDecoration: 'underline' }}>Virtual Doctor diagnosis</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Treatments & Services Section */}
      <section id="services" className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-premium">Our Offerings</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
              Advanced Clinical & <span style={{ color: 'var(--plum-800)' }}>Cosmetic Care</span>
            </h2>
            <p style={{ maxWidth: '650px', margin: '12px auto 0', color: 'var(--muted-charcoal)' }}>
              Explore our structured treatments ranging from advanced medical trichology and hair transplants to skin correction and aesthetic procedures.
            </p>
          </div>

          {/* Treatment Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px', borderBottom: '1px solid var(--silk-200)', paddingBottom: '20px' }}>
            {TREATMENT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
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
                  transition: 'var(--transition-smooth)'
                }}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="treatment-layout">
            {/* Treatment List */}
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {TREATMENT_CATEGORIES.find(c => c.id === activeTab)?.treatments.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '20px',
                    borderRadius: '8px',
                    background: 'var(--silk-100)',
                    borderLeft: '4px solid var(--gold-500)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(6px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
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
                <button onClick={() => setShowBookingModal(true)} className="btn btn-accent" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Book For {TREATMENT_CATEGORIES.find(c => c.id === activeTab)?.title} <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Visual Treatment Graphic */}
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '420px', boxShadow: 'var(--shadow-md)' }}>
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
      <section id="doctors" className="section-padding" style={{ backgroundColor: 'var(--silk-100)' }}>
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
                  className="glass doctor-card"
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
      <section id="locations" className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-premium">Our Centers</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
              Our State-of-the-Art <span style={{ color: 'var(--plum-800)' }}>Clinic Centers</span>
            </h2>
            <p style={{ maxWidth: '650px', margin: '12px auto 0', color: 'var(--muted-charcoal)' }}>
              Visit our state-of-the-art facilities equipped with advanced infrastructure in Bengaluru or Thiruvananthapuram.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {/* Whitefield Branch */}
            <div className="glass" style={{ padding: '30px', borderRadius: '12px', border: '1px solid var(--silk-200)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--plum-900)' }}>Whitefield, Bangalore</h4>
                  <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Active Center</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '20px' }}>
                  <div>
                    <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Address</strong>
                    <span>4th Floor, Premium Square, Whitefield Main Road, Near ITPL, Whitefield, Bengaluru - 560066</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Hours</strong>
                    <span>Mon - Sat: 9:00 AM - 7:00 PM <br />(Sunday Closed)</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Direct Phone</strong>
                    <a href="tel:+917593864264" style={{ color: 'var(--gold-600)', fontWeight: 'bold' }}>+91 75938 64264</a>
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
                <button onClick={() => setShowBookingModal(true)} className="btn btn-primary" style={{ padding: '10px', fontSize: '0.8rem', textTransform: 'none' }}>
                  Book Whitefield
                </button>
              </div>
            </div>

            {/* Trivandrum Branch */}
            <div className="glass" style={{ padding: '30px', borderRadius: '12px', border: '1px solid var(--silk-200)', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--plum-900)' }}>Pattom, Trivandrum</h4>
                  <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Active Center</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', marginBottom: '20px' }}>
                  <div>
                    <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Address</strong>
                    <span>Marappalam Road, Opposite IndusInd Bank, Pattom, Thiruvananthapuram, Kerala - 695004</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--plum-800)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Hours</strong>
                    <span>Mon - Sat: 9:00 AM - 7:00 PM <br />(Sunday Closed)</span>
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
                <button onClick={() => setShowBookingModal(true)} className="btn btn-primary" style={{ padding: '10px', fontSize: '0.8rem', textTransform: 'none' }}>
                  Book Trivandrum
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Consultation / Diagnosis section */}
      <section id="consultation" className="section-padding" style={{ background: 'linear-gradient(var(--silk-200), var(--silk-100))' }}>
        <div className="container consultation-layout">
          <div style={{ textAlign: 'left' }}>
            <span className="badge badge-premium" style={{ marginBottom: '10px' }}>Remote Screening</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', fontSize: '2.5rem', lineHeight: '1.2', marginTop: '10px' }}>
              Request Online <br />
              <span style={{ color: 'var(--plum-800)' }}>Virtual Diagnosis</span>
            </h2>
            <p style={{ marginTop: '16px', fontSize: '1rem', color: 'var(--muted-charcoal)' }}>
              Can't make it to our Bangalore or Trivandrum clinic? YCDC offers a secure, virtual pre-screening consultation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--gold-100)', color: 'var(--gold-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold', fontSize: '0.8rem' }}>1</div>
                <div>
                  <h6 style={{ fontWeight: 'bold', color: 'var(--plum-900)' }}>Share Concerns & Symptoms</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)' }}>Fill out our diagnostic questionnaire regarding skin or hair concerns.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--gold-100)', color: 'var(--gold-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold', fontSize: '0.8rem' }}>2</div>
                <div>
                  <h6 style={{ fontWeight: 'bold', color: 'var(--plum-900)' }}>Secure Photo Upload</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)' }}>Upload clear pictures of the affected skin area for dermatologist evaluation.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--gold-100)', color: 'var(--gold-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold', fontSize: '0.8rem' }}>3</div>
                <div>
                  <h6 style={{ fontWeight: 'bold', color: 'var(--plum-900)' }}>Doctor Review & Treatment Path</h6>
                  <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)' }}>Our specialists review your details and contact you with custom prescriptions or clinic invitation.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ConsultationForm />
          </div>
        </div>
      </section>

      {/* Patient Reviews / Testimonials */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-premium">Patient Stories</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
              Trusted by Thousands of <span style={{ color: 'var(--plum-800)' }}>Happy Patients</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {REVIEWS.map((r, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--silk-100)',
                  border: '1px solid var(--silk-200)',
                  borderRadius: '10px',
                  padding: '24px',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Rating stars */}
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                    {[...Array(r.rating)].map((_, i) => (
                      <span key={i} style={{ color: 'var(--gold-500)', fontSize: '1.2rem' }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)', fontStyle: 'italic', marginBottom: '16px' }}>
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
      </section>
        </>
      )}

      {currentPage === 'about' && (
        <AboutUs onNavigateToContact={() => setCurrentPage('contact')} />
      )}

      {currentPage === 'treatments' && (
        <TreatmentsList onBookTreatment={handleBookTreatment} />
      )}

      {currentPage === 'contact' && (
        <ContactUs />
      )}

      {/* Footer */}
      <footer className="glass-dark" style={{ color: 'rgba(255,255,255,0.7)', padding: '60px 0 30px', borderTop: '1px solid var(--plum-800)' }}>
        <div className="container footer-main">
          <div>
            <h4 
              onClick={() => setCurrentPage('home')} 
              style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
            >
              YCDC
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '10px', lineHeight: '1.5' }}>
              Yogiraj Centre for Dermatology & Cosmetology (YCDC) is an ISO 9001:2015 certified aesthetic and clinical clinic group specializing in advanced skin, hair, and laser therapies.
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <button
                onClick={() => handleWhatsAppConnect('General')}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'white'
                }}
              >
                📱
              </button>
              <button
                onClick={handleCallConnect}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'white'
                }}
              >
                📞
              </button>
            </div>
          </div>

          <div className="footer-links-grid">
            <div>
              <h6 style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '16px' }}>Quick Links</h6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', alignItems: 'flex-start' }}>
                <button onClick={() => setCurrentPage('home')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Home</button>
                <button onClick={() => setCurrentPage('about')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>About Us</button>
                <button onClick={() => setCurrentPage('treatments')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Treatments & Services</button>
                <button onClick={() => setCurrentPage('contact')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}>Contact Us</button>
              </div>
            </div>
            <div>
              <h6 style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '16px' }}>Locations</h6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                <span>Whitefield, Bangalore</span>
                <span>Pattom, Trivandrum</span>
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
          <span>© {new Date().getFullYear()} Yogiraj Centre for Dermatology & Cosmetology (YCDC). All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}

      {/* 1. Floating WhatsApp Connect Button */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        zIndex: 998
      }}>
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
            💬
          </button>
        </div>
      </div>

      {/* 2. Receptionist Lead Dashboard Key Trigger (Secret Admin Icon) */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 998
      }}>
        <button
          onClick={() => setShowDashboardModal(true)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--plum-800)',
            color: 'var(--gold-300)',
            border: '1px solid var(--gold-500)',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            position: 'relative'
          }}
          title="Open Mock Reception CRM Dashboard"
        >
          <Layers size={22} />
          {/* Badge counter representing active leads */}
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            fontSize: '0.65rem',
            padding: '2px 6px',
            fontWeight: 'bold',
            border: '2px solid var(--plum-800)'
          }}>
            Demo
          </span>
        </button>
      </div>

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
                setShowBookingModal(false);
                setBookingPrefills({});
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
            <LeadDashboard onClose={() => setShowDashboardModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
