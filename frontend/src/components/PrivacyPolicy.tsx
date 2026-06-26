import { Shield, Lock, Eye, CheckCircle2, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--silk-100)', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Title Hero Banner */}
      <section style={{
        position: 'relative',
        padding: '100px 0 60px',
        background: 'linear-gradient(to right, #3b102f, #23071b)',
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
          backgroundImage: 'radial-gradient(var(--plum-800) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge badge-premium" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', background: 'rgba(255,255,255,0.1)', marginBottom: '16px' }}>
            Clinical Compliance
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', color: 'white', marginBottom: '10px' }}>
            Privacy Policy & Terms
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem' }}>
            Learn how YCDC protects patient confidentiality, handles medical screening details, and complies with healthcare standards.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass" style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid var(--silk-200)',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'left'
          }}>
            {/* Intro Header */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid var(--silk-200)', paddingBottom: '20px' }}>
              <Shield size={40} style={{ color: 'var(--plum-800)', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--plum-900)', margin: 0 }}>
                  Patient Data Commitment
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', marginTop: '4px' }}>
                  Last Updated: June 24, 2026 | Compliant with Medical Practitioner Codes
                </p>
              </div>
            </div>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', color: 'var(--charcoal)', lineHeight: '1.7' }}>
              
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--plum-900)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Lock size={18} style={{ color: 'var(--gold-500)' }} /> 1. Patient Confidentiality
                </h4>
                <p>
                  At Yogiraj Centre for Dermatology & Cosmetology (YCDC), we hold your medical information and clinical diagnostic photos with the highest degree of confidentiality. Under no circumstances are clinical photos, consultation summaries, or physical records shared, rented, or sold to third-party marketing entities.
                </p>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--plum-900)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Eye size={18} style={{ color: 'var(--gold-500)' }} /> 2. Information We Collect
                </h4>
                <p>
                  We collect essential information to facilitate clinical appointments, provide accurate remote screenings, and maintain coordinate care. This includes:
                </p>
                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Booking Details:</strong> Full Name, Email, Phone Number, Selected Branch Location (Bangalore or Trivandrum), and preferred Date/Time.</li>
                  <li><strong>Virtual Diagnosis Details:</strong> Self-disclosed skin or hair concerns, medical history summaries, and uploaded clinical evaluation photos.</li>
                  <li><strong>CRM Logs:</strong> Inquiry messages and follow-up consultation details synced with our receptionist CRM Lead Dashboard (via local browser cache synchronization).</li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--plum-900)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--gold-500)' }} /> 3. How We Use Patient Data
                </h4>
                <p>
                  Your diagnostic details and contact details are used strictly to:
                </p>
                <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Process, confirm, and reschedule clinical consultation bookings.</li>
                  <li>Perform remote preliminary screening using our Virtual Diagnosis engine to assist YCDC doctors with initial assessment.</li>
                  <li>Update our receptionist CRM Lead Dashboard to coordinate callbacks, follow-ups, and patient support.</li>
                  <li>Send newsletter offers, clinical guidelines, and safety alerts (only if explicit newsletter opt-in is confirmed).</li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--plum-900)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Shield size={18} style={{ color: 'var(--gold-500)' }} /> 4. Data Security & Storage
                </h4>
                <p>
                  All self-scheduled bookings, virtual screening inquiries, and receptionist CRM data are stored in a secured environment. We implement administrative and physical controls to safeguard against unauthorized access or disclosure of patient health details.
                </p>
              </div>

            </div>

            {/* Social Icons inside Privacy Policy */}
            <div style={{
              marginTop: '40px',
              paddingTop: '30px',
              borderTop: '1px solid var(--silk-200)',
              textAlign: 'center'
            }}>
              <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--plum-900)', marginBottom: '12px' }}>
                Follow YCDC on Social Media
              </h5>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <a href="https://www.instagram.com/ycdc_india?igsh=MXFmYnBwdnFqdDltaA==" target="_blank" rel="noopener noreferrer" style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--silk-100)',
                  color: 'var(--plum-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--plum-800)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--silk-100)'; e.currentTarget.style.color = 'var(--plum-800)'; }}
                title="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--silk-100)',
                  color: 'var(--plum-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--plum-800)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--silk-100)'; e.currentTarget.style.color = 'var(--plum-800)'; }}
                title="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--silk-100)',
                  color: 'var(--plum-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--plum-800)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--silk-100)'; e.currentTarget.style.color = 'var(--plum-800)'; }}
                title="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--silk-100)',
                  color: 'var(--plum-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--plum-800)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--silk-100)'; e.currentTarget.style.color = 'var(--plum-800)'; }}
                title="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
