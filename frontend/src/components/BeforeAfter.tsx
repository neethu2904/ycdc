import { useState, useRef, useEffect } from 'react';
import { Sparkles, Calendar, ChevronRight } from 'lucide-react';

interface CaseStudy {
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

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "gfc-treatment",
    category: "hair",
    categoryLabel: "GFC Therapy",
    title: "Growth Factor Concentrate (GFC) Treatment",
    description: "Growth Factor Concentrate (GFC) treatment is a cutting-edge therapy primarily used in dermatology to promote hair regrowth and skin rejuvenation. It harnesses the body's natural growth factors extracted from the patient's blood, concentrating them into a highly potent solution. At YCDC, our expert dermatologists use state-of-the-art technology and customized treatment plans to ensure optimal outcomes tailored to individual needs.",
    beforeImg: "/gfc_before.jpg",
    afterImg: "/gfc_after.jpg",
    details: {
      doctor: "Dr. K. Yogiraj & Team",
      technology: "GFC Extraction & Micro-Needling",
      sessions: "3 - 4 Sessions (spaced 4 weeks apart)",
      concern: "Moderate Hair Thinning & Scalp Rejuvenation"
    }
  },
  {
    id: "acne-correction",
    category: "skin",
    categoryLabel: "Clinical Dermatology",
    title: "Deep Acne Scar Resurfacing",
    description: "Profound texture improvement and post-inflammatory erythema clearing using fractional radiofrequency and customized peeling.",
    beforeImg: "/acne_before.png",
    afterImg: "/acne_after.png",
    details: {
      doctor: "Dr. Niranjana Raj",
      technology: "Secret Fractional RF Microneedling & Glycolic Peels",
      sessions: "3 Sessions (spaced 4 weeks apart)",
      concern: "Severe rolling scars, icepick scarring, active blemishes."
    }
  }
];

const HAIRLINE_GLOWUP_GALLERY = [
  "https://ycdc.in/wp-content/uploads/2023/03/5fddb6f0-402d-419a-ac5d-9b4716d93447.jpg",
  "https://ycdc.in/wp-content/uploads/2023/03/95ffc2a7-ed00-42df-82ec-fd27d074fd22.jpg",
  "https://ycdc.in/wp-content/uploads/2023/03/448ec6aa-652a-421b-88e3-282fd3dd90ec.jpg",
  "https://ycdc.in/wp-content/uploads/2023/03/e589a126-2d7a-425b-bfa7-bc9ed4351008.jpg",
  "https://ycdc.in/wp-content/uploads/2023/03/3ff92a54-3c57-4a85-a97a-e9848865b800.jpg",
  "https://ycdc.in/wp-content/uploads/2023/03/a5e2e768-8737-4e0f-8758-00888c7d85fe.jpg"
];

const VERTEX_TRANSPLANT_GALLERY = [
  "https://ycdc.in/wp-content/uploads/2025/08/d622b3e5-e69c-4a27-8227-644dfc48477b.jpg",
  "https://ycdc.in/wp-content/uploads/2025/08/ba45cceb-bd4b-4ff5-bd86-dd506556a671.jpg",
  "https://ycdc.in/wp-content/uploads/2025/08/eed5800b-c58f-4e3d-a7cf-36350a19166c.jpg",
  "https://ycdc.in/wp-content/uploads/2025/08/8089c362-8010-4254-8c4b-a686eec46660.jpg",
  "https://ycdc.in/wp-content/uploads/2025/08/4a056277-5f78-4db8-8f94-14f27003c12e.jpg"
];

export default function BeforeAfter({ onBookTreatment }: { onBookTreatment: (category: string, serviceId: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<string>("hair");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const currentCase = CASE_STUDIES.find(c => c.category === activeCategory) || CASE_STUDIES[0];

  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    setContainerWidth(containerRef.current.offsetWidth);

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Check with ResizeObserver if available
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [activeCategory]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--silk-100)', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Hero Header Banner */}
      <section style={{
        position: 'relative',
        padding: '120px 0 80px',
        background: 'url("/laser_treatment_premium.png") no-repeat center center/cover',
        color: 'white',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(var(--brand-pink) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge badge-premium" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', background: 'rgba(255,255,255,0.1)', marginBottom: '16px' }}>
            Proven Transformations
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'white', marginBottom: '10px' }}>
            Clinical Before & Afters
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '650px', margin: '0 auto' }}>
            Explore scientific, authentic results of clinical dermatology and hair restoration treatments performed by our leading specialists.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-padding" style={{ padding: '60px 0' }}>
        <div className="container">
          {/* Category Tabs */}
          <div className="reveal reveal-up" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
            {CASE_STUDIES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCategory(c.category);
                  setSliderPosition(50);
                }}
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  border: '1px solid var(--silk-200)',
                  backgroundColor: activeCategory === c.category ? 'var(--plum-900)' : 'white',
                  color: activeCategory === c.category ? 'white' : 'var(--plum-900)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {c.categoryLabel}
              </button>
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}>
            {/* Interactive Slider Card */}
            <div className="glass reveal reveal-left hover-premium" style={{
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid var(--silk-200)',
              backgroundColor: 'white',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                className="shimmer-bg"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '420px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'ew-resize',
                  userSelect: 'none'
                }}
              >
                {/* BEFORE Image (Underneath, showing right half) */}
                <img
                  src={currentCase.beforeImg}
                  alt="Before Treatment"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none'
                  }}
                />
                
                {/* BEFORE Overlay Badge */}
                <div style={{
                  position: 'absolute',
                  right: '16px',
                  bottom: '16px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}>
                  BEFORE
                </div>

                {/* AFTER Image Wrapper (Left cropped side) */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${sliderPosition}%`,
                  height: '100%',
                  overflow: 'hidden',
                  borderRight: '2px solid white',
                  zIndex: 1,
                  pointerEvents: 'none'
                }}>
                  <img
                    src={currentCase.afterImg}
                    alt="After Treatment"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: containerWidth || 500,
                      height: '100%',
                      objectFit: 'cover',
                      maxWidth: 'none'
                    }}
                  />
                  
                  {/* AFTER Overlay Badge */}
                  <div style={{
                    position: 'absolute',
                    left: '16px',
                    bottom: '16px',
                    backgroundColor: 'var(--plum-800)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    pointerEvents: 'none'
                  }}>
                    AFTER
                  </div>
                </div>

                {/* Slider Handle Line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: `${sliderPosition}%`,
                  width: '2px',
                  backgroundColor: 'white',
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                  pointerEvents: 'none'
                }}>
                  {/* Handle Circular Button */}
                  <div 
                    className="slider-handle-glow"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      border: '2px solid var(--plum-900)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                    }}
                  >
                    <span style={{ color: 'var(--plum-900)', fontWeight: 'bold', fontSize: '1rem' }}>↔</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)', textAlign: 'center', marginTop: '12px', fontStyle: 'italic' }}>
                👈 Drag or swipe across the image to compare results 👉
              </p>
            </div>

            {/* Case Details Card */}
            <div className="reveal reveal-right" style={{ textAlign: 'left' }}>
              <span className="badge badge-premium" style={{ marginBottom: '14px' }}>
                Verified Transformation Case
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--plum-900)', marginBottom: '12px' }}>
                {currentCase.title}
              </h3>
              <p style={{ color: 'var(--muted-charcoal)', lineHeight: '1.6', marginBottom: '24px' }}>
                {currentCase.description}
              </p>

              {/* Technical Specifications */}
              <div style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid var(--silk-200)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '30px'
              }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--plum-800)', letterSpacing: '0.05em' }}>Primary Concern</strong>
                  <span style={{ fontSize: '0.95rem', color: 'var(--charcoal)', fontWeight: '500' }}>{currentCase.details.concern}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--plum-800)', letterSpacing: '0.05em' }}>Treating Physician</strong>
                  <span style={{ fontSize: '0.95rem', color: 'var(--charcoal)', fontWeight: '500' }}>{currentCase.details.doctor}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--plum-800)', letterSpacing: '0.05em' }}>Technology/Therapy Used</strong>
                  <span style={{ fontSize: '0.95rem', color: 'var(--charcoal)', fontWeight: '500' }}>{currentCase.details.technology}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--plum-800)', letterSpacing: '0.05em' }}>Total Treatment Duration</strong>
                  <span style={{ fontSize: '0.95rem', color: 'var(--charcoal)', fontWeight: '500' }}>{currentCase.details.sessions}</span>
                </div>
              </div>

              {/* Book Consultation */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onBookTreatment(currentCase.category, currentCase.id)}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Book Consultation <Calendar size={16} />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('consultation');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn-outline-gold"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  Virtual Diagnosis <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Quality Certifications */}
      <section style={{ backgroundColor: 'white', padding: '60px 0', borderTop: '1px solid var(--silk-200)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '50px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={24} style={{ color: 'var(--plum-800)' }} />
            <div>
              <h5 style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--plum-900)' }}>Authentic Patient Results</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)' }}>No retouching or enhancement filters applied.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={24} style={{ color: 'var(--plum-800)' }} />
            <div>
              <h5 style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--plum-900)' }}>ISO Certified Standards</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)' }}>State-of-the-art diagnostic and clinical equipment.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={24} style={{ color: 'var(--plum-800)' }} />
            <div>
              <h5 style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--plum-900)' }}>Personalized Protocols</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)' }}>Tailored settings customized for Indian skin types.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Galleries Section */}
      <section className="section-padding" style={{ backgroundColor: 'white', borderTop: '1px solid var(--silk-200)', borderBottom: '1px solid var(--silk-200)', padding: '60px 0' }}>
        <div className="container">
          {/* Gallery 1 */}
          <div className="reveal reveal-up" style={{ marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="badge badge-premium">Results Gallery</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
                Hairline <span style={{ color: 'var(--plum-800)' }}>Glowup Outcomes</span>
              </h2>
              <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--muted-charcoal)' }}>
                View our clinical cases showing progress and post-procedure hairline density improvement.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
              {HAIRLINE_GLOWUP_GALLERY.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  className="hover-premium" 
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{ 
                    cursor: 'pointer', 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    border: '1px solid var(--silk-200)',
                    aspectRatio: '1/1',
                    background: 'var(--silk-100)',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <img 
                    src={imgUrl} 
                    alt={`Hairline Glowup ${idx + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gallery 2 */}
          <div className="reveal reveal-up">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="badge badge-premium">Results Gallery</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-500)', marginTop: '10px' }}>
                Vertex Hair <span style={{ color: 'var(--plum-800)' }}>Transplantation Results</span>
              </h2>
              <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--muted-charcoal)' }}>
                Clinical results demonstrating crown and vertex area coverage following FUE hair transplants.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
              {VERTEX_TRANSPLANT_GALLERY.map((imgUrl, idx) => (
                <div 
                  key={idx} 
                  className="hover-premium" 
                  onClick={() => setSelectedImage(imgUrl)}
                  style={{ 
                    cursor: 'pointer', 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    border: '1px solid var(--silk-200)',
                    aspectRatio: '1/1',
                    background: 'var(--silk-100)',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <img 
                    src={imgUrl} 
                    alt={`Vertex Transplant ${idx + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(26, 8, 21, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100000,
            padding: '20px'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <img 
              src={selectedImage} 
              alt="High resolution clinical case result" 
              style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px', border: '2px solid var(--gold-500)', boxShadow: 'var(--shadow-lg)' }} 
            />
            <p style={{ color: 'white', textAlign: 'center', marginTop: '12px', fontSize: '0.9rem', opacity: 0.8 }}>
              Click anywhere to close preview
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
