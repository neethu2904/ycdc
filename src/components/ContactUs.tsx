import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactUs() {
  const [branch, setBranch] = useState('bangalore');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('skin');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || phone.length < 10) {
      alert('Please fill in valid contact details.');
      return;
    }

    const branchName = branch === 'bangalore' ? 'Whitefield, Bangalore' : 'Pattom, Trivandrum';
    const catName = category === 'skin' ? 'Skin Care' : category === 'hair' ? 'Hair & Scalp' : category === 'laser' ? 'Laser & RF' : 'Cosmetic Aesthetics';

    const newInquiryId = 'INQ-' + Math.floor(100000 + Math.random() * 900000);
    const newInquiry = {
      id: newInquiryId,
      branch: branchName,
      concernType: `Inquiry: ${catName}`,
      patientName: name,
      patientPhone: phone,
      patientEmail: email,
      history: message || 'General inquiry regarding clinic services.',
      photoAttached: 'No Photo',
      status: 'Pending Review',
      timestamp: new Date().toLocaleString(),
      type: 'Contact Inquiry' // Identified as an inquiry lead in lead dashboard!
    };

    // Save to localStorage under ycdc_consultations to feed LeadDashboard!
    const existing = JSON.parse(localStorage.getItem('ycdc_consultations') || '[]');
    localStorage.setItem('ycdc_consultations', JSON.stringify([newInquiry, ...existing]));

    // Dispatch update event
    window.dispatchEvent(new Event('ycdc_data_update'));

    setIsSuccess(true);
    // Reset form fields
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--silk-100)', paddingBottom: '60px' }}>
      {/* Page Header */}
      <section className="section-padding" style={{ 
        background: 'linear-gradient(rgba(43, 20, 39, 0.9), rgba(43, 20, 39, 0.8)), url("/locations_banner.jpg") no-repeat center center/cover', 
        color: 'white',
        textAlign: 'center',
        padding: '80px 0'
      }}>
        <div className="container">
          <span className="badge badge-premium" style={{ marginBottom: '16px', backgroundColor: '#7c631a', color: '#ffffff', borderColor: '#634f14' }}>
            Get In Touch
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: 'white', fontSize: '3rem', marginBottom: '20px' }}>
            Contact YCDC Clinics
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Have questions about a treatment or need scheduling support? Connect with our Whitefield or Pattom branches directly.
          </p>
        </div>
      </section>

      {/* Split Form & Details Grid */}
      <section className="section-padding" style={{ padding: '60px 0' }}>
        <div className="container consultation-layout">
          {/* Contact Form */}
          <div className="glass" style={{ padding: '40px', borderRadius: '12px', background: 'white', border: '1px solid var(--silk-200)', textAlign: 'left', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--plum-900)', marginBottom: '8px' }}>
              Send a Direct Message
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted-charcoal)', marginBottom: '24px' }}>
              Our medical receptionists will review your message and contact you within 2 business hours.
            </p>

            {isSuccess ? (
              <div className="animate-fade-in" style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ color: 'green', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <CheckCircle2 size={56} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', fontSize: '1.5rem', marginBottom: '8px' }}>
                  Message Sent Successfully!
                </h4>
                <p style={{ color: 'var(--muted-charcoal)', fontSize: '0.95rem', marginBottom: '24px' }}>
                  Thank you for contacting YCDC. We have registered your enquiry and will connect with you shortly.
                </p>
                <button onClick={() => setIsSuccess(false)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Preferred Branch</label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <label style={{ flex: 1, padding: '12px', borderRadius: '4px', border: branch === 'bangalore' ? '2px solid var(--plum-800)' : '1px solid var(--silk-200)', backgroundColor: branch === 'bangalore' ? 'var(--plum-100)' : 'white', cursor: 'pointer', textAlign: 'center', fontWeight: '500', fontSize: '0.9rem' }}>
                      <input type="radio" name="branch" value="bangalore" checked={branch === 'bangalore'} onChange={() => setBranch('bangalore')} style={{ display: 'none' }} />
                      Bangalore
                    </label>
                    <label style={{ flex: 1, padding: '12px', borderRadius: '4px', border: branch === 'trivandrum' ? '2px solid var(--plum-800)' : '1px solid var(--silk-200)', backgroundColor: branch === 'trivandrum' ? 'var(--plum-100)' : 'white', cursor: 'pointer', textAlign: 'center', fontWeight: '500', fontSize: '0.9rem' }}>
                      <input type="radio" name="branch" value="trivandrum" checked={branch === 'trivandrum'} onChange={() => setBranch('trivandrum')} style={{ display: 'none' }} />
                      Trivandrum
                    </label>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name</label>
                  <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Phone Number</label>
                    <input type="tel" placeholder="10-digit number" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-input" pattern="[0-9]{10}" required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address (Optional)</label>
                    <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Treatment Area of Interest</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                    <option value="skin">Clinical Dermatology (Skin/Acne)</option>
                    <option value="hair">Hair & Scalp Care (PRP/FUE)</option>
                    <option value="laser">Laser & RF Rejuvenation</option>
                    <option value="aesthetics">Cosmetic Injections & Aesthetics</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Your Message / Inquiry Details</label>
                  <textarea placeholder="Write your questions or describe your concerns here..." value={message} onChange={(e) => setMessage(e.target.value)} className="form-textarea" required />
                </div>

                <button type="submit" className="btn btn-accent" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}>
                  Send Message <Send size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'left' }}>
            {/* Whitefield branch details */}
            <div className="glass" style={{ padding: '30px', borderRadius: '12px', background: 'white', border: '1px solid var(--silk-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--plum-900)' }}>Whitefield, Bangalore</h4>
                <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Main Clinic</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={16} style={{ color: 'var(--plum-800)', flexShrink: 0 }} />
                  <span>4th Floor, Premium Square, Whitefield Main Road, Near ITPL, Bengaluru - 560066</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Phone size={16} style={{ color: 'var(--plum-800)', flexShrink: 0 }} />
                  <a href="tel:+917593864264" style={{ color: 'var(--gold-600)', fontWeight: 'bold' }}>+91 75938 64264</a>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Mail size={16} style={{ color: 'var(--plum-800)', flexShrink: 0 }} />
                  <a href="mailto:info@ycdcdermatology.com">info@ycdcdermatology.com</a>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Clock size={16} style={{ color: 'var(--plum-800)', flexShrink: 0 }} />
                  <span>Mon - Sat: 9:00 AM - 7:00 PM (Sunday Closed)</span>
                </div>
              </div>
              <div style={{ marginTop: '16px', fontSize: '0.8rem' }}>
                <a href="https://maps.google.com" target="_blank" style={{ textDecoration: 'underline', color: 'var(--gold-600)', fontWeight: 'bold' }}>Open Bangalore Map Navigation &rarr;</a>
              </div>
            </div>

            {/* Pattom branch details */}
            <div className="glass" style={{ padding: '30px', borderRadius: '12px', background: 'white', border: '1px solid var(--silk-200)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--plum-900)' }}>Pattom, Trivandrum</h4>
                <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>Active Center</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <MapPin size={16} style={{ color: 'var(--plum-800)', flexShrink: 0 }} />
                  <span>Marappalam Road, Opposite IndusInd Bank, Pattom, Thiruvananthapuram - 695004</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Phone size={16} style={{ color: 'var(--plum-800)', flexShrink: 0 }} />
                  <a href="tel:+914713100707" style={{ color: 'var(--gold-600)', fontWeight: 'bold' }}>+91 471 310 0707</a>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Mail size={16} style={{ color: 'var(--plum-800)', flexShrink: 0 }} />
                  <a href="mailto:trivandrum@ycdcdermatology.com">trivandrum@ycdcdermatology.com</a>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Clock size={16} style={{ color: 'var(--plum-800)', flexShrink: 0 }} />
                  <span>Mon - Sat: 9:00 AM - 7:00 PM (Sunday Closed)</span>
                </div>
              </div>
              <div style={{ marginTop: '16px', fontSize: '0.8rem' }}>
                <a href="https://maps.google.com" target="_blank" style={{ textDecoration: 'underline', color: 'var(--gold-600)', fontWeight: 'bold' }}>Open Trivandrum Map Navigation &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
