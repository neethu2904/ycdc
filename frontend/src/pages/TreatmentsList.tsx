import { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { API_BASE_URL } from '../config';
import type { Treatment, TreatmentsListProps } from '../types';

const TREATMENT_IMAGES: Record<string, string> = {
  'acne-therapy': 'https://ycdc.in/wp-content/uploads/2025/05/studio-portrait-of-an-attractive-young-woman-squee-2025-04-06-11-50-34-utc-scaled-700x500.jpg',
  'peels': 'https://ycdc.in/wp-content/uploads/2025/05/in-the-eternal-pursuit-of-perfection-composite-sh-2025-04-06-08-18-44-utc-scaled-700x500.jpg',
  'microderm': 'https://ycdc.in/wp-content/uploads/2025/05/procedure-removing-mole-radio-wave-electrocoagula-2025-04-01-20-38-48-utc-scaled-700x500.jpg',
  'prp': 'https://ycdc.in/wp-content/uploads/2025/05/treatment-of-hair-loss-injection-for-hair-growth-2025-04-29-00-57-22-utc-scaled-700x500.jpg',
  'transplant': 'https://ycdc.in/wp-content/uploads/2025/05/hair-transplant.webp',
  'scalp-regen': 'https://ycdc.in/wp-content/uploads/2025/05/dermatologist-trichologist-performs-the-procedure-2025-01-08-12-52-28-utc-scaled-700x500.jpg',
  'secret-rf': 'https://ycdc.in/wp-content/uploads/2025/05/secret-rf-505x500.webp',
  'hair-reduction': 'https://ycdc.in/wp-content/uploads/2025/05/beautician-doing-depilation-with-laser-hair-remova-2024-10-18-16-29-37-utc-scaled-700x500.jpg',
  'q-switch': 'https://ycdc.in/wp-content/uploads/revslider/video-media/cosmetic-procedure-in-the-salon-of-the-beauty-clin-2024-01-29-16-02-24-utc_2-scaled-700x500.jpeg',
  'botox': 'https://ycdc.in/wp-content/uploads/2025/05/a-scene-of-medical-cosmetology-treatments-botulinu-2025-01-07-18-28-35-utc-scaled-700x500.jpg',
  'hydrafacial': 'https://ycdc.in/wp-content/uploads/2025/05/beautician-using-professional-equipment-during-tre-2025-03-08-04-22-27-utc-scaled-700x500.jpg',
  'carbon-peel': 'https://ycdc.in/wp-content/uploads/2025/05/lamination-of-eyebrows-the-master-applies-a-cleans-2025-03-09-15-03-42-utc-scaled-700x500.jpg'
};

const MOCK_SERVICES: Treatment[] = [
  {
    id: 'acne-therapy',
    category: 'skin',
    category_name: 'Clinical Dermatology',
    name: 'Advanced Acne & Scar Correction',
    description: 'Targeted laser and RF therapies to clear active breakouts, balance sebum production, and smooth out deep acne pits or scars.',
    duration: '45 mins',
    price_range: '₹1,800 - ₹3,500',
    science: 'Uses sub-surface thermal energy and localized micro-peels to trigger collagen rebuilding in scar tissue.',
    treats: 'Active acne, post-inflammatory hyperpigmentation (PIH), rolling/boxcar scars.',
    active: true,
    image: TREATMENT_IMAGES['acne-therapy']
  },
  {
    id: 'peels',
    category: 'skin',
    category_name: 'Clinical Dermatology',
    name: 'Premium Chemical Peels',
    description: 'Medically formulated resurfacing glycolic, salicylic, or TCA peels administered by dermatologists to peel away pigmentation and reveal luminous skin.',
    duration: '30 mins',
    price_range: '₹2,500 - ₹5,000',
    science: 'Controlled chemical exfoliation targeting the epidermal layers to accelerate skin renewal.',
    treats: 'Sun spots, melasma, fine lines, dull complexion.',
    active: true,
    image: TREATMENT_IMAGES['peels']
  },
  {
    id: 'microderm',
    category: 'skin',
    category_name: 'Clinical Dermatology',
    name: 'Microdermabrasion & Polish',
    description: 'Gentle mechanical exfoliation using diamond-tipped wands to eliminate outer dead skin cells, refine texture, and stimulate microcirculation.',
    duration: '40 mins',
    price_range: '₹3,000',
    science: 'Vacuum-assisted abrasion that instantly buffs skin irregularities and boosts absorption of medical serums.',
    treats: 'Open pores, rough skin texture, superficial tan.',
    active: true,
    image: TREATMENT_IMAGES['microderm']
  },
  {
    id: 'prp',
    category: 'hair',
    category_name: 'Hair & Scalp Care',
    name: 'PRP Hair Growth Therapy',
    description: 'Platelet-rich plasma derived from your own blood, injected into the scalp to stimulate hair follicles, reverse thinning, and promote thickness.',
    duration: '60 mins',
    price_range: '₹4,500/session',
    science: 'Uses concentration of autologous growth factors (PDGF, VEGF) to activate dormant hair bulb stems.',
    treats: 'Androgenetic alopecia, telogen effluvium, general hair thinning.',
    active: true,
    image: TREATMENT_IMAGES['prp']
  },
  {
    id: 'transplant',
    category: 'hair',
    category_name: 'Hair & Scalp Care',
    name: 'Follicular Hair Transplant (FUE)',
    description: 'Advanced surgical hair restoration where individual healthy follicles are harvested and transplanted into balding areas for natural-looking density.',
    duration: '4-8 hours',
    price_range: 'Consultation Required',
    science: 'Micro-grafting technique ensuring minimal scarring, maximum graft survivability, and lifetime growth.',
    treats: 'Male pattern baldness, receding hairlines, crown balding.',
    active: true,
    image: TREATMENT_IMAGES['transplant']
  },
  {
    id: 'scalp-regen',
    category: 'hair',
    category_name: 'Hair & Scalp Care',
    name: 'Scalp Rejuvenation Treatment',
    description: 'Deep cleansing, anti-fungal peeling, and nutritional infusion targeting scalp conditions like dandruff, dry scalp, and hair root inflammation.',
    duration: '50 mins',
    price_range: '₹3,200',
    science: 'Exfoliation of build-up followed by ozone steam and nutrient ampoule delivery.',
    treats: 'Stubborn dandruff, oily scalp, scalp folliculitis.',
    active: true,
    image: TREATMENT_IMAGES['scalp-regen']
  },
  {
    id: 'secret-rf',
    category: 'laser',
    category_name: 'Laser & Aesthetics',
    name: 'Secret RF Microneedling',
    description: 'Fractional radiofrequency combined with microneedling to deliver heat deep into the dermis, tightening loose skin and curing deep stretch marks.',
    duration: '60 mins',
    price_range: '₹8,000 - ₹12,000',
    science: 'Delivers fractional bipolar RF energy to deep layers, promoting profound collagen remodeling without surface downtime.',
    treats: 'Skin laxity, deep wrinkles, surgical scars, stretch marks.',
    active: true,
    image: TREATMENT_IMAGES['secret-rf']
  },
  {
    id: 'hair-reduction',
    category: 'laser',
    category_name: 'Laser & Aesthetics',
    name: 'Laser Hair Reduction (US-FDA Approved)',
    description: 'Permanent, virtually pain-free hair reduction using medical-grade triple wavelength laser targeting hair follicles safely across all skin types.',
    duration: '30-90 mins',
    price_range: 'From ₹4,000',
    science: 'Selective photothermolysis where melanin absorbs laser heat, disabling future follicle growth.',
    treats: 'Unwanted facial hair, body hair, ingrown hair.',
    active: true,
    image: TREATMENT_IMAGES['hair-reduction']
  },
  {
    id: 'q-switch',
    category: 'laser',
    category_name: 'Laser & Aesthetics',
    name: 'Q-Switched Laser Toning',
    description: 'Laser treatment designed to breakdown deeper melanin pigments, curing stubborn melasma, birthmarks, and dark spots safely.',
    duration: '45 mins',
    price_range: '₹5,000 - ₹9,000',
    science: 'Nanosecond pulses create acoustic shockwaves to shatter pigment without heat damage to surrounding skin.',
    treats: 'Melasma, tattoo ink, freckles, dark underarms.',
    active: true,
    image: TREATMENT_IMAGES['q-switch']
  },
  {
    id: 'botox',
    category: 'aesthetics',
    category_name: 'Cosmetic Aesthetics',
    name: 'Botox Anti-Wrinkle Injections',
    description: 'Targeted micro-injections of purified protein to relax dynamic facial muscles, softening crow\'s feet, forehead creases, and frown lines.',
    duration: '30 mins',
    price_range: 'Price on Consultation',
    science: 'Temporarily blocks neuromuscular signals to allow skin creases to flatten and heal.',
    treats: 'Forehead lines, crow\'s feet, bunny lines, jaw masseter slimming.',
    active: true,
    image: TREATMENT_IMAGES['botox']
  },
  {
    id: 'hydrafacial',
    category: 'aesthetics',
    category_name: 'Cosmetic Aesthetics',
    name: 'Luxury Hydrafacial Medi-Facial',
    description: 'Patented multi-step clinical facial to cleanse, extract impurities, and hydrate skin with advanced antioxidant and hyaluronic acid infusions.',
    duration: '60 mins',
    price_range: '₹5,500',
    science: 'Vortex-fusion technology that vacuums pores while simultaneously feeding the skin with customized botanical serums.',
    treats: 'Blackheads, dry dehydrated skin, clogged pores, pre-event glow.',
    active: true,
    image: TREATMENT_IMAGES['hydrafacial']
  },
  {
    id: 'carbon-peel',
    category: 'aesthetics',
    category_name: 'Cosmetic Aesthetics',
    name: 'Hollywood Carbon Laser Glow Peel',
    description: 'Carbon cream layer applied to skin, followed by laser treatment that vacuums the carbon particles, removing oils, contaminants, and dead cells instantly.',
    duration: '40 mins',
    price_range: '₹4,500',
    science: 'The carbon absorbs laser energy, vaporizing micro-impurities and tightening skin pores.',
    treats: 'Dull complexion, oily skin, enlarged pores.',
    active: true,
    image: TREATMENT_IMAGES['carbon-peel']
  }
];

const FAQS = [
  {
    q: "How do I choose between Clinical and Cosmetic treatments?",
    a: "Clinical treatments target pathological skin diseases (like active acne, eczema, psoriasis, or clinical hair loss) and require diagnostic prescriptions. Cosmetic treatments focus on enhancement, glow, anti-aging, and skin tone rejuvenation. During your initial consultation, our doctor will map out a customized sequence combining both if necessary."
  },
  {
    q: "Are the laser treatments safe for sensitive Indian skin types?",
    a: "Absolutely. At YCDC, we use US-FDA approved laser systems specifically calibrated for Fitzpatrick skin types IV, V, and VI (typical of South Asian skin). This prevents complications like post-inflammatory hyperpigmentation (PIH) commonly caused by lower-grade cosmetic salon lasers."
  },
  {
    q: "What is the downtime after a chemical peel or RF microneedling?",
    a: "Downtime varies: for superficial chemical peels and Hydrafacials, there is zero downtime—you might experience mild redness for 1-2 hours. For deeper treatments like Secret RF microneedling or Q-Switched lasers, you may experience mild flaking and redness for 2-3 days. Our staff provides comprehensive post-care serums and sun protection protocols."
  },
  {
    q: "How many sessions of PRP are required for visible hair growth?",
    a: "Generally, we recommend a starting protocol of 4 to 6 sessions, spaced 4 weeks apart. Early signs of reduced hair fall are visible by session 2, while significant density improvement and new hair growth are typically visible 3 to 6 months after starting the therapy."
  },
  {
    q: "Can I book a same-day treatment?",
    a: "We recommend booking a diagnostic consultation first. However, simple treatments like Medi-Facials, light chemical peels, and laser sessions can often be performed on the same day if our dermatologist confirms suitability during the assessment."
  }
];

export default function TreatmentsList({ onBookTreatment }: TreatmentsListProps) {
  const [treatments, setTreatments] = useState<Treatment[]>(MOCK_SERVICES);
  const loading = false;
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map((t: any) => ({
            ...t,
            image: TREATMENT_IMAGES[t.id] || 'https://ycdc.in/wp-content/uploads/2025/07/beautiful-young-indian-woman-enjoying-face-lifting-2025-03-18-17-16-15-utc-scaled.jpg'
          }));
          setTreatments(mapped);
        }
      })
      .catch(err => {
        console.warn("Backend API not reachable, using high-fidelity local treatment data:", err);
      });
  }, []);

  // Filter & Search logic
  const filteredTreatments = treatments.filter((t) => {
    const matchesCategory = activeFilter === 'all' || t.category === activeFilter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.treats.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(prev => prev === index ? null : index);
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--silk-100)', paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="section-padding" style={{ 
        background: 'url("/skin_treatment_premium.png") no-repeat center center/cover', 
        color: 'white',
        textAlign: 'center',
        padding: '100px 0'
      }}>
        <div className="container">
          <span className="badge badge-premium" style={{ marginBottom: '16px', backgroundColor: '#7c631a', color: '#ffffff', borderColor: '#634f14' }}>
            Clinical & Aesthetic Services
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '3rem', marginBottom: '20px' }}>
            Our Dermatology & Cosmetology Treatments
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Browse our clinical trichology, medical lasers, chemical resurfacing, and cosmetic injections engineered for your health and confidence.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar Container */}
      <section style={{ marginTop: '-30px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="glass" style={{ padding: '24px 30px', borderRadius: '12px', background: 'white', boxShadow: 'var(--shadow-md)', border: '1px solid var(--silk-200)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              {/* Category buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['all', 'skin', 'hair', 'laser', 'aesthetics'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className="btn"
                    style={{
                      padding: '10px 18px',
                      fontSize: '0.85rem',
                      borderRadius: '30px',
                      textTransform: 'capitalize',
                      backgroundColor: activeFilter === cat ? 'var(--plum-800)' : 'var(--silk-100)',
                      color: activeFilter === cat ? 'white' : 'var(--plum-900)',
                      border: '1px solid transparent',
                      transition: 'var(--transition-fast)',
                      cursor: 'pointer'
                    }}
                  >
                    {cat === 'all' ? 'All Services' : cat === 'skin' ? 'Clinical Derm' : cat === 'hair' ? 'Hair Care' : cat === 'laser' ? 'Lasers & RF' : 'Cosmetics'}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-charcoal)' }} />
                <input
                  type="text"
                  placeholder="Search treatments, concerns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 16px 10px 38px',
                    borderRadius: '30px',
                    border: '1px solid var(--silk-200)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    backgroundColor: 'var(--silk-100)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Cards Grid */}
      <section className="section-padding" style={{ padding: '50px 0' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted-charcoal)' }}>Loading treatments...</div>
          ) : filteredTreatments.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
              {filteredTreatments.map((t) => (
                <div 
                  key={t.id}
                  className="glass"
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid var(--silk-200)',
                    overflow: 'hidden',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  {/* Card Cover Image */}
                  {t.image && (
                    <div style={{ height: '180px', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--silk-200)' }}>
                      <img 
                        src={t.image} 
                        alt={t.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                  )}

                  {/* Card Content Details */}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Badge showing category */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span className="badge badge-plum" style={{ fontSize: '0.65rem' }}>{t.category_name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-600)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> {t.duration}
                        </span>
                      </div>

                      <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', fontSize: '1.4rem', marginBottom: '12px' }}>
                        {t.name}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--muted-charcoal)', lineHeight: '1.5', marginBottom: '16px' }}>
                        {t.description}
                      </p>

                      {/* Scientific details */}
                      <div style={{ background: 'var(--silk-100)', padding: '12px 16px', borderRadius: '6px', marginBottom: '16px', fontSize: '0.8rem' }}>
                        <strong style={{ color: 'var(--plum-800)', display: 'block', marginBottom: '4px' }}>How it works:</strong>
                        <span style={{ color: 'var(--muted-charcoal)', fontStyle: 'italic' }}>{t.science}</span>
                      </div>

                      <div style={{ fontSize: '0.8rem', color: 'var(--charcoal)', marginBottom: '20px' }}>
                        <strong>Indicated for:</strong> <span style={{ color: 'var(--muted-charcoal)' }}>{t.treats}</span>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--silk-200)', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <button 
                        onClick={() => onBookTreatment(t.category, t.id)}
                        className="btn btn-primary"
                        style={{ padding: '8px 16px', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        Book Enquiry
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', background: 'white', borderRadius: '12px', border: '1px solid var(--silk-200)' }}>
              <p style={{ color: 'var(--muted-charcoal)', fontSize: '1.1rem' }}>No treatments found matching your criteria. Try another search or filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Treatments FAQ Section */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="badge badge-premium">Common Questions</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', marginTop: '10px' }}>
              Treatments FAQ
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                style={{ 
                  border: '1px solid var(--silk-200)', 
                  borderRadius: '8px', 
                  backgroundColor: 'var(--silk-100)',
                  overflow: 'hidden',
                  textAlign: 'left'
                }}
              >
                <div 
                  onClick={() => toggleFaq(idx)}
                  style={{ 
                    padding: '20px 24px', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <span style={{ fontWeight: '600', color: 'var(--plum-900)', fontSize: '0.95rem' }}>{faq.q}</span>
                  {expandedFaq === idx ? <ChevronUp size={18} style={{ color: 'var(--plum-800)' }} /> : <ChevronDown size={18} style={{ color: 'var(--plum-800)' }} />}
                </div>

                {expandedFaq === idx && (
                  <div style={{ padding: '0 24px 20px', fontSize: '0.9rem', color: 'var(--muted-charcoal)', lineHeight: '1.6', borderTop: '1px solid var(--silk-200)', paddingTop: '16px', backgroundColor: 'white' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
