import { Award, ShieldCheck, Heart } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import type { AboutUsProps } from '../types';

export default function AboutUs({ onNavigateToContact }: AboutUsProps) {
  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--silk-100)', paddingBottom: '60px' }}>
      {/* Page Hero */}
      <section className="section-padding" style={{ 
        background: 'url("/clinic_lobby_premium.png") no-repeat center center/cover', 
        color: 'white',
        textAlign: 'center',
        padding: '80px 0'
      }}>
        <div className="container">
          <span className="badge badge-premium" style={{ marginBottom: '16px', backgroundColor: '#7c631a', color: '#ffffff', borderColor: '#634f14' }}>
            Our Legacy
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '3rem', marginBottom: '20px' }}>
            Over <AnimatedCounter target={4} /> Decades of Healing & Aesthetic Science
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Yogiraj Centre for Dermatology & Cosmetology (YCDC) is built on a foundation of clinical excellence, safety, and natural-looking rejuvenation.
          </p>
        </div>
      </section>

      {/* Legacy Story Section */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container treatment-layout">
          <div className="reveal reveal-left" style={{ textAlign: 'left' }}>
            <span className="badge badge-premium" style={{ marginBottom: '12px' }}>The Journey</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', marginBottom: '20px' }}>
              The Pioneer of Clinical Dermatology
            </h2>
            <p style={{ color: 'var(--muted-charcoal)', marginBottom: '16px', lineHeight: '1.7' }}>
              Founded in 1978 by the legendary practitioner <strong>Dr. K. Yogiraj</strong>, YCDC has evolved from a single clinical dermatology chamber into a state-of-the-art multi-specialty center across Karnataka and Kerala.
            </p>
            <p style={{ color: 'var(--muted-charcoal)', marginBottom: '16px', lineHeight: '1.7' }}>
              Under his visionary guidance, we were among the first in South India to introduce medical hair restoration (FUE hair transplants) and FDA-approved laser skin treatments. We bridge the gap between pure clinical pathology and high-end aesthetic medicine.
            </p>
            <p style={{ color: 'var(--muted-charcoal)', lineHeight: '1.7' }}>
              Today, YCDC operates modern ISO-certified clinics in Pattom (Trivandrum) and Whitefield (Bengaluru), combining advanced diagnostic tools with personalized, evidence-based therapy.
            </p>
          </div>
          <div className="reveal reveal-right" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '380px', boxShadow: 'var(--shadow-lg)' }}>
            <img 
              src="/doctor_yogiraj.png" 
              alt="Dr. K. Yogiraj" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '20px',
              background: 'linear-gradient(transparent, rgba(43, 20, 39, 0.95))',
              color: 'white',
              textAlign: 'left'
            }}>
              <h5 style={{ color: 'white', fontWeight: 'bold' }}>Dr. K. Yogiraj</h5>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-400)' }}>Founder & Chief Director</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Principles Grid */}
      <section className="section-padding" style={{ backgroundColor: 'var(--silk-100)' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-premium">Our Philosophy</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', marginTop: '10px' }}>
              The Foundations of Our Care
            </h2>
          </div>

          <div className="reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="glass hover-premium" style={{ padding: '30px', borderRadius: '10px', background: 'white', border: '1px solid var(--silk-200)', textAlign: 'left' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--plum-100)', color: 'var(--plum-800)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', marginBottom: '20px' }}>
                <ShieldCheck size={24} />
              </div>
              <h5 style={{ fontWeight: 'bold', color: 'var(--plum-900)', fontSize: '1.2rem', marginBottom: '10px' }}>ISO Certified Protocols</h5>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted-charcoal)', lineHeight: '1.5' }}>
                Our clinics maintain strict ISO 9001:2015 certified standards for sanitization, laser safety, and records management to ensure patient safety first.
              </p>
            </div>

            <div className="glass hover-premium" style={{ padding: '30px', borderRadius: '10px', background: 'white', border: '1px solid var(--silk-200)', textAlign: 'left' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--plum-100)', color: 'var(--plum-800)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', marginBottom: '20px' }}>
                <Heart size={24} />
              </div>
              <h5 style={{ fontWeight: 'bold', color: 'var(--plum-900)', fontSize: '1.2rem', marginBottom: '10px' }}>Patient-First Ethos</h5>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted-charcoal)', lineHeight: '1.5' }}>
                No cookie-cutter treatments. We design specific prescriptions and customized skincare schedules mapped to your genetic skin profile.
              </p>
            </div>

            <div className="glass hover-premium" style={{ padding: '30px', borderRadius: '10px', background: 'white', border: '1px solid var(--silk-200)', textAlign: 'left' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--plum-100)', color: 'var(--plum-800)', display: 'flex', alignItems: 'center', justifySelf: 'flex-start', justifyContent: 'center', marginBottom: '20px' }}>
                <Award size={24} />
              </div>
              <h5 style={{ fontWeight: 'bold', color: 'var(--plum-900)', fontSize: '1.2rem', marginBottom: '10px' }}>Expert Practitioners</h5>
              <p style={{ fontSize: '0.9rem', color: 'var(--muted-charcoal)', lineHeight: '1.5' }}>
                All procedures are overseen by board-certified dermatologists, plastic surgeons, and specialized transplant technicians with global credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Detailed */}
      <section className="section-padding reveal reveal-scale" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="reveal reveal-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-premium">Specialist Roster</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', marginTop: '10px' }}>
              Meet Our Board-Certified Team
            </h2>
            <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--muted-charcoal)' }}>
              Consult our team of qualified dermatologists and surgeons representing decades of academic and clinical research.
            </p>
          </div>

          <div className="reveal-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {/* Doctor 1 */}
            <div className="glass hover-premium" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--silk-200)', display: 'flex', flexDirection: 'column', textAlign: 'left', background: 'white' }}>
              <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                <img src="/doctor_yogiraj.png" alt="Dr. Yogiraj" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', zIndex: 2 }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Chairman</span>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--plum-900)' }}>Dr. K. Yogiraj</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-600)', fontWeight: '600', display: 'block', margin: '4px 0 10px' }}>
                  MD, DVD, DHA (<AnimatedCounter target={48} suffix="+" /> Years Exp)
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', lineHeight: '1.5' }}>
                  A pioneer in hair transplant surgeries and pediatric clinical dermatology in India. Directs global operations for both clinics.
                </p>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="glass hover-premium" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--silk-200)', display: 'flex', flexDirection: 'column', textAlign: 'left', background: 'white' }}>
              <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                <img src="/doctor_niranjana.png" alt="Dr. Niranjana Raj" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', zIndex: 2 }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Chief Consultant</span>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--plum-900)' }}>Dr. Niranjana Raj</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-600)', fontWeight: '600', display: 'block', margin: '4px 0 10px' }}>
                  MD (Derm), FAM (<AnimatedCounter target={12} suffix="+" /> Years Exp)
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', lineHeight: '1.5' }}>
                  Specialist in medical lasers, chemical peels, dermal fillers, and custom bridal glow cosmetic care. Operates in Whitefield, Bangalore.
                </p>
              </div>
            </div>

            {/* Doctor 3 */}
            <div className="glass hover-premium" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--silk-200)', display: 'flex', flexDirection: 'column', textAlign: 'left', background: 'white' }}>
              <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                <img src="/doctor_vennela.png" alt="Dr. Vennela Reddy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', zIndex: 2 }}>
                  <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Surgeon</span>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--plum-900)' }}>Dr. Vennela Reddy</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-600)', fontWeight: '600', display: 'block', margin: '4px 0 10px' }}>
                  MS, MCh (Plastic Surgery) (<AnimatedCounter target={9} suffix="+" /> Years Exp)
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', lineHeight: '1.5' }}>
                  Specialize in FUE hair transplantations, hairline designs, eyebrow hair restoration, and post-traumatic scars correction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action banner */}
      <section className="container reveal reveal-scale" style={{ marginTop: '40px' }}>
        <div className="plum-gradient" style={{ padding: '40px', borderRadius: '12px', color: 'white', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '1.8rem', marginBottom: '12px' }}>
            Experience Premium Skincare at YCDC
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
            Book a physical appointment or secure virtual screening to consult with Dr. Yogiraj and team.
          </p>
          <button onClick={onNavigateToContact} className="btn btn-accent">
            Connect With Our Center
          </button>
        </div>
      </section>
    </div>
  );
}
