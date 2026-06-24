import React, { useState } from 'react';
import { Sparkles, Clock, Shield, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface TreatmentsListProps {
  onBookTreatment: (category: string, serviceId: string) => void;
}

const ALL_TREATMENTS = [
  // Clinical Care
  {
    id: 'acne-therapy',
    category: 'skin',
    categoryName: 'Clinical Dermatology',
    name: 'Advanced Acne & Scar Correction',
    desc: 'Targeted laser and RF therapies to clear active breakouts, balance sebum production, and smooth out deep acne pits or scars.',
    duration: '45 mins',
    price: '₹1,800 - ₹3,500',
    science: 'Uses sub-surface thermal energy and localized micro-peels to trigger collagen rebuilding in scar tissue.',
    treats: 'Active acne, post-inflammatory hyperpigmentation (PIH), rolling/boxcar scars.'
  },
  {
    id: 'peels',
    category: 'skin',
    categoryName: 'Clinical Dermatology',
    name: 'Premium Chemical Peels',
    desc: 'Medically formulated resurfacing glycolic, salicylic, or TCA peels administered by dermatologists to peel away pigmentation and reveal luminous skin.',
    duration: '30 mins',
    price: '₹2,500 - ₹5,000',
    science: 'Controlled chemical exfoliation targeting the epidermal layers to accelerate skin renewal.',
    treats: 'Sun spots, melasma, fine lines, dull complexion.'
  },
  {
    id: 'microderm',
    category: 'skin',
    categoryName: 'Clinical Dermatology',
    name: 'Microdermabrasion & Polish',
    desc: 'Gentle mechanical exfoliation using diamond-tipped wands to eliminate outer dead skin cells, refine texture, and stimulate microcirculation.',
    duration: '40 mins',
    price: '₹3,000',
    science: 'Vacuum-assisted abrasion that instantly buffs skin irregularities and boosts absorption of medical serums.',
    treats: 'Open pores, rough skin texture, superficial tan.'
  },
  
  // Hair & Scalp
  {
    id: 'prp',
    category: 'hair',
    categoryName: 'Hair & Scalp Care',
    name: 'PRP Hair Growth Therapy',
    desc: 'Platelet-rich plasma derived from your own blood, injected into the scalp to stimulate hair follicles, reverse thinning, and promote thickness.',
    duration: '60 mins',
    price: '₹4,500/session',
    science: 'Uses concentration of autologous growth factors (PDGF, VEGF) to activate dormant hair bulb stems.',
    treats: 'Androgenetic alopecia, telogen effluvium, general hair thinning.'
  },
  {
    id: 'transplant',
    category: 'hair',
    categoryName: 'Hair & Scalp Care',
    name: 'Follicular Hair Transplant (FUE)',
    desc: 'Advanced surgical hair restoration where individual healthy follicles are harvested and transplanted into balding areas for natural-looking density.',
    duration: '4-8 hours',
    price: 'Consultation Required',
    science: 'Micro-grafting technique ensuring minimal scarring, maximum graft survivability, and lifetime growth.',
    treats: 'Male pattern baldness, receding hairlines, crown balding.'
  },
  {
    id: 'scalp-regen',
    category: 'hair',
    categoryName: 'Hair & Scalp Care',
    name: 'Scalp Rejuvenation Treatment',
    desc: 'Deep cleansing, anti-fungal peeling, and nutritional infusion targeting scalp conditions like dandruff, dry scalp, and hair root inflammation.',
    duration: '50 mins',
    price: '₹3,200',
    science: 'Exfoliation of build-up followed by ozone steam and nutrient ampoule delivery.',
    treats: 'Stubborn dandruff, oily scalp, scalp folliculitis.'
  },

  // Lasers & RF
  {
    id: 'secret-rf',
    category: 'laser',
    categoryName: 'Laser & Aesthetics',
    name: 'Secret RF Microneedling',
    desc: 'Fractional radiofrequency combined with microneedling to deliver heat deep into the dermis, tightening loose skin and curing deep stretch marks.',
    duration: '60 mins',
    price: '₹8,000 - ₹12,000',
    science: 'Delivers fractional bipolar RF energy to deep layers, promoting profound collagen remodeling without surface downtime.',
    treats: 'Skin laxity, deep wrinkles, surgical scars, stretch marks.'
  },
  {
    id: 'hair-reduction',
    category: 'laser',
    categoryName: 'Laser & Aesthetics',
    name: 'Laser Hair Reduction (US-FDA Approved)',
    desc: 'Permanent, virtually pain-free hair reduction using medical-grade triple wavelength laser targeting hair follicles safely across all skin types.',
    duration: '30-90 mins',
    price: 'From ₹4,000',
    science: 'Selective photothermolysis where melanin absorbs laser heat, disabling future follicle growth.',
    treats: 'Unwanted facial hair, body hair, ingrown hair.'
  },
  {
    id: 'q-switch',
    category: 'laser',
    categoryName: 'Laser & Aesthetics',
    name: 'Q-Switched Laser Toning',
    desc: 'Laser treatment designed to breakdown deeper melanin pigments, curing stubborn melasma, birthmarks, and dark spots safely.',
    duration: '45 mins',
    price: '₹5,000 - ₹9,000',
    science: 'Nanosecond pulses create acoustic shockwaves to shatter pigment without heat damage to surrounding skin.',
    treats: 'Melasma, tattoo ink, freckles, dark underarms.'
  },

  // Cosmetic
  {
    id: 'botox',
    category: 'aesthetics',
    categoryName: 'Cosmetic Aesthetics',
    name: 'Botox Anti-Wrinkle Injections',
    desc: 'Targeted micro-injections of purified protein to relax dynamic facial muscles, softening crow\'s feet, forehead creases, and frown lines.',
    duration: '30 mins',
    price: 'Price on Consultation',
    science: 'Temporarily blocks neuromuscular signals to allow skin creases to flatten and heal.',
    treats: 'Forehead lines, crow\'s feet, bunny lines, jaw masseter slimming.'
  },
  {
    id: 'hydrafacial',
    category: 'aesthetics',
    categoryName: 'Cosmetic Aesthetics',
    name: 'Luxury Hydrafacial Medi-Facial',
    desc: 'Patented multi-step clinical facial to cleanse, extract impurities, and hydrate skin with advanced antioxidant and hyaluronic acid infusions.',
    duration: '60 mins',
    price: '₹5,500',
    science: 'Vortex-fusion technology that vacuums pores while simultaneously feeding the skin with customized botanical serums.',
    treats: 'Blackheads, dry dehydrated skin, clogged pores, pre-event glow.'
  },
  {
    id: 'carbon-peel',
    category: 'aesthetics',
    categoryName: 'Cosmetic Aesthetics',
    name: 'Hollywood Carbon Laser Glow Peel',
    desc: 'Carbon cream layer applied to skin, followed by laser treatment that vacuums the carbon particles, removing oils, contaminants, and dead cells instantly.',
    duration: '40 mins',
    price: '₹4,500',
    science: 'The carbon absorbs laser energy, vaporizing micro-impurities and tightening skin pores.',
    treats: 'Dull complexion, oily skin, enlarged pores.'
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Filter & Search logic
  const filteredTreatments = ALL_TREATMENTS.filter((t) => {
    const matchesCategory = activeFilter === 'all' || t.category === activeFilter;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        background: 'linear-gradient(rgba(43, 20, 39, 0.9), rgba(43, 20, 39, 0.8)), url("/skin_treatment_premium.png") no-repeat center center/cover', 
        color: 'white',
        textAlign: 'center',
        padding: '80px 0'
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
                      transition: 'var(--transition-fast)'
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
          {filteredTreatments.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
              {filteredTreatments.map((t) => (
                <div 
                  key={t.id}
                  className="glass"
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid var(--silk-200)',
                    padding: '30px',
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
                  <div>
                    {/* Badge showing category */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span className="badge badge-plum" style={{ fontSize: '0.65rem' }}>{t.categoryName}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold-600)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {t.duration}
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', fontSize: '1.4rem', marginBottom: '12px' }}>
                      {t.name}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted-charcoal)', lineHeight: '1.5', marginBottom: '16px' }}>
                      {t.desc}
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

                  <div style={{ borderTop: '1px solid var(--silk-200)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted-charcoal)', display: 'block', textTransform: 'uppercase' }}>Est. Cost</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--gold-600)' }}>{t.price}</span>
                    </div>
                    <button 
                      onClick={() => onBookTreatment(t.category, t.id)}
                      className="btn btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                    >
                      Book Enquiry
                    </button>
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
