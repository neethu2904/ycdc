import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Sparkles, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  X,
  Smartphone,
  Mail,
  UserCheck
} from 'lucide-react';

interface BookingWidgetProps {
  onClose?: () => void;
  initialBranch?: string;
  initialCategory?: string;
  initialService?: string;
}

const BRANCHES = [
  { id: 'bangalore', name: 'Whitefield, Bangalore', address: '4th Floor, Premium Square, Whitefield Main Road' },
  { id: 'trivandrum', name: 'Pattom, Trivandrum', address: 'Marappalam Road, Opp. IndusInd Bank, Pattom' }
];

const CATEGORIES = [
  { 
    id: 'skin', 
    name: 'Skin Care', 
    services: [
      { id: 'acne-therapy', name: 'Advanced Anti-Acne Therapy', price: '₹1,800 - ₹3,500' },
      { id: 'peels', name: 'Premium Chemical Peels', price: '₹2,500 - ₹5,000' },
      { id: 'microderm', name: 'Microdermabrasion & Polish', price: '₹3,000' }
    ] 
  },
  { 
    id: 'hair', 
    name: 'Hair & Scalp', 
    services: [
      { id: 'prp', name: 'PRP Hair Growth Therapy', price: '₹4,500/session' },
      { id: 'transplant', name: 'Follicular Hair Transplant Consultation', price: '₹500 (Consultation)' },
      { id: 'scalp-regen', name: 'Scalp Rejuvenation Treatment', price: '₹3,200' }
    ] 
  },
  { 
    id: 'laser', 
    name: 'Laser & RF', 
    services: [
      { id: 'secret-rf', name: 'Secret RF Microneedling (Scar/Aging)', price: '₹8,000 - ₹12,000' },
      { id: 'hair-reduction', name: 'Laser Hair Reduction (Full Face)', price: '₹4,000' },
      { id: 'q-switch', name: 'Q-Switched Laser (Pigment/Tattoo)', price: '₹5,000 - ₹9,000' }
    ] 
  },
  { 
    id: 'aesthetics', 
    name: 'Cosmetic Aesthetics', 
    services: [
      { id: 'botox', name: 'Anti-Wrinkle Botox & Dermal Fillers', price: 'Price on Consultation' },
      { id: 'hydrafacial', name: 'Luxurious Hydrafacial Medi-Facial', price: '₹5,500' },
      { id: 'carbon-peel', name: 'Hollywood Carbon Laser Glow Peel', price: '₹4,500' }
    ] 
  }
];

const DOCTORS = [
  { id: 'yogiraj', name: 'Dr. K. Yogiraj', role: 'Chairman & Director', branches: ['bangalore', 'trivandrum'], specialty: ['skin', 'hair', 'laser', 'aesthetics'] },
  { id: 'niranjana', name: 'Dr. Niranjana Raj', role: 'Chief Dermatologist', branches: ['bangalore'], specialty: ['skin', 'laser', 'aesthetics'] },
  { id: 'yasmin', name: 'Dr. Yasmin Abdul Rahman', role: 'Senior Cosmetic Dermatologist', branches: ['bangalore'], specialty: ['skin', 'aesthetics'] },
  { id: 'vennela', name: 'Dr. Vennela Reddy', role: 'Hair Transplant Specialist', branches: ['bangalore'], specialty: ['hair'] },
  { id: 'maya', name: 'Dr. Maya Vincent', role: 'Senior Consultant Dermatologist', branches: ['trivandrum'], specialty: ['skin', 'laser'] },
  { id: 'devi', name: 'Dr. Devi Menon', role: 'Dermatologist & Trichologist', branches: ['trivandrum'], specialty: ['skin', 'hair'] },
  { id: 'sunil', name: 'Dr. Sunil Menon', role: 'Aesthetic Surgeon', branches: ['trivandrum'], specialty: ['aesthetics', 'laser'] }
];

const TIME_SLOTS = [
  '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', 
  '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM', '05:00 PM'
];

export default function BookingWidget({ onClose, initialBranch, initialCategory, initialService }: BookingWidgetProps) {
  const [step, setStep] = useState(initialCategory ? 3 : 1);
  const [branch, setBranch] = useState(initialBranch || 'bangalore');
  const [category, setCategory] = useState(initialCategory || 'skin');
  const [service, setService] = useState(initialService || 'acne-therapy');
  const [doctor, setDoctor] = useState('yogiraj');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:15 AM');
  
  // Patient details
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  
  // Success states
  const [bookingId, setBookingId] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Filtered lists
  const availableServices = CATEGORIES.find(c => c.id === category)?.services || [];
  const availableDoctors = DOCTORS.filter(d => 
    d.branches.includes(branch) && d.specialty.includes(category)
  );

  // Auto select service when category changes
  const handleCategoryChange = (catId: string) => {
    setCategory(catId);
    const services = CATEGORIES.find(c => c.id === catId)?.services || [];
    if (services.length > 0) {
      setService(services[0].id);
    }
    // Update doctor filter based on branch and new category
    const docs = DOCTORS.filter(d => d.branches.includes(branch) && d.specialty.includes(catId));
    if (docs.length > 0) {
      setDoctor(docs[0].id);
    } else {
      setDoctor('yogiraj'); // Fallback to MD
    }
  };

  const handleNext = () => {
    if (step === 3) {
      // Validate date
      if (!date) {
        alert('Please select a preferred date.');
        return;
      }
    }
    if (step === 4) {
      // Validate patient details
      if (!patientName.trim()) {
        alert('Please enter patient name.');
        return;
      }
      if (!patientPhone.trim() || patientPhone.length < 10) {
        alert('Please enter a valid phone number.');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const branchName = BRANCHES.find(b => b.id === branch)?.name || branch;
    const catName = CATEGORIES.find(c => c.id === category)?.name || category;
    const servName = availableServices.find(s => s.id === service)?.name || service;
    const docName = DOCTORS.find(d => d.id === doctor)?.name || doctor;
    
    const newId = 'YCDC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(newId);

    const newBooking = {
      id: newId,
      branch: branchName,
      category: catName,
      service: servName,
      doctor: docName,
      date,
      timeSlot,
      patientName,
      patientPhone,
      patientEmail,
      patientNotes,
      status: 'Confirmed',
      timestamp: new Date().toLocaleString(),
      type: 'Appointment'
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('ycdc_appointments') || '[]');
    localStorage.setItem('ycdc_appointments', JSON.stringify([newBooking, ...existing]));

    // Trigger local lead event to update LeadDashboard in real-time
    window.dispatchEvent(new Event('ycdc_data_update'));

    setIsSuccess(true);
  };

  // Get tomorrow's date for date picker min value
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  if (isSuccess) {
    const branchDetail = BRANCHES.find(b => b.id === branch);
    const selectedService = availableServices.find(s => s.id === service);
    const selectedDoctor = DOCTORS.find(d => d.id === doctor);

    return (
      <div className="glass animate-fade-in" style={{ padding: '40px', borderRadius: '12px', border: '1px solid var(--gold-400)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--gold-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: 'var(--gold-600)'
          }}>
            <UserCheck size={36} />
          </div>
          <h3 style={{ fontSize: '2rem', color: 'var(--plum-900)' }}>Appointment Confirmed</h3>
          <p style={{ color: 'var(--muted-charcoal)', marginTop: '8px' }}>Your premium consultation slot has been reserved.</p>
        </div>

        {/* Elegant Receipt */}
        <div style={{
          background: '#fff',
          border: '1px dashed var(--gold-500)',
          borderRadius: '8px',
          padding: '24px',
          fontFamily: 'var(--font-sans)',
          marginBottom: '30px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0edf0', paddingBottom: '12px', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Receipt ID</span>
              <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--plum-900)' }}>{bookingId}</h5>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</span>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'green', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'green', display: 'inline-block' }}></span>
                CONFIRMED
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--muted-charcoal)', fontSize: '0.9rem' }}>Patient Name</span>
              <span style={{ fontWeight: '500', color: 'var(--charcoal)' }}>{patientName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--muted-charcoal)', fontSize: '0.9rem' }}>Branch Clinic</span>
              <span style={{ fontWeight: '500', color: 'var(--charcoal)' }}>{branchDetail?.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--muted-charcoal)', fontSize: '0.9rem' }}>Specialist Doctor</span>
              <span style={{ fontWeight: '500', color: 'var(--charcoal)' }}>{selectedDoctor?.name} ({selectedDoctor?.role})</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--muted-charcoal)', fontSize: '0.9rem' }}>Treatment</span>
              <span style={{ fontWeight: '500', color: 'var(--charcoal)' }}>{selectedService?.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0edf0', paddingTop: '12px', marginTop: '4px' }}>
              <span style={{ color: 'var(--muted-charcoal)', fontSize: '0.9rem' }}>Date & Time</span>
              <span style={{ fontWeight: '600', color: 'var(--plum-800)' }}>{date} at {timeSlot}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button 
            onClick={() => {
              // Open WhatsApp notification mockup
              const text = encodeURIComponent(`Hi, I just booked an appointment at YCDC. Receipt ID: ${bookingId}. Name: ${patientName}. Service: ${selectedService?.name}. Date: ${date} at ${timeSlot}. Please confirm.`);
              window.open(`https://wa.me/917593864264?text=${text}`, '_blank');
            }} 
            className="btn btn-accent"
          >
            Notify via WhatsApp
          </button>
          {onClose && (
            <button onClick={onClose} className="btn btn-outline">
              Close Window
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="glass" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
      {/* Widget Header */}
      <div className="plum-gradient" style={{ padding: '24px 30px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-300)', fontWeight: 'bold' }}>Interactive Booking System</span>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'white', marginTop: '4px' }}>Schedule Appointment</h4>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div style={{ display: 'flex', height: '4px', backgroundColor: 'var(--silk-200)' }}>
        <div style={{ 
          width: `${(step / 5) * 100}%`, 
          backgroundColor: 'var(--gold-500)', 
          transition: 'width 0.4s ease' 
        }} />
      </div>

      {/* Form Steps */}
      <div style={{ padding: '30px 40px' }}>
        {step === 1 && (
          <div className="animate-fade-in">
            <h5 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', marginBottom: '16px' }}>
              Step 1: Choose Clinic Location
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {BRANCHES.map((b) => (
                <div 
                  key={b.id}
                  onClick={() => setBranch(b.id)}
                  style={{
                    padding: '20px',
                    borderRadius: '8px',
                    border: branch === b.id ? '2px solid var(--plum-800)' : '1px solid var(--silk-200)',
                    backgroundColor: branch === b.id ? 'var(--plum-100)' : 'white',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: branch === b.id ? 'var(--plum-800)' : 'var(--silk-200)',
                    color: branch === b.id ? 'white' : 'var(--plum-700)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MapPin size={20} />
                  </div>
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <h6 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--plum-900)' }}>{b.name}</h6>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)' }}>{b.address}</p>
                  </div>
                  {branch === b.id && (
                    <div style={{ color: 'var(--plum-800)' }}>
                      <Check size={20} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h5 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', marginBottom: '16px' }}>
              Step 2: Select Specialty & Treatment
            </h5>
            <div className="form-group">
              <label className="form-label">Category</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCategoryChange(c.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '4px',
                      border: category === c.id ? '1px solid var(--plum-800)' : '1px solid var(--silk-200)',
                      backgroundColor: category === c.id ? 'var(--plum-800)' : 'white',
                      color: category === c.id ? 'white' : 'var(--charcoal)',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Available Treatments</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {availableServices.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setService(s.id)}
                    style={{
                      padding: '14px 20px',
                      borderRadius: '6px',
                      border: service === s.id ? '1px solid var(--gold-500)' : '1px solid var(--silk-200)',
                      backgroundColor: service === s.id ? 'var(--gold-100)' : 'white',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Sparkles size={16} style={{ color: service === s.id ? 'var(--gold-600)' : 'var(--plum-600)' }} />
                      <span style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--plum-900)' }}>{s.name}</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gold-600)', fontWeight: 'bold' }}>{s.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h5 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', marginBottom: '16px' }}>
              Step 3: Select Doctor & Schedule
            </h5>
            
            <div className="form-group">
              <label className="form-label">Specialist Doctor</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto', paddingRight: '4px', marginBottom: '20px' }}>
                {availableDoctors.length > 0 ? (
                  availableDoctors.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => setDoctor(d.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: doctor === d.id ? '1px solid var(--plum-800)' : '1px solid var(--silk-200)',
                        backgroundColor: doctor === d.id ? 'var(--plum-100)' : 'white',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--plum-800)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        <User size={16} />
                      </div>
                      <div style={{ textAlign: 'left', flex: 1 }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--plum-900)' }}>{d.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)', marginLeft: '8px' }}>({d.role})</span>
                      </div>
                      {doctor === d.id && <Check size={16} style={{ color: 'var(--plum-800)' }} />}
                    </div>
                  ))
                ) : (
                  <div
                    onClick={() => setDoctor('yogiraj')}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '6px',
                      border: '1px solid var(--plum-800)',
                      backgroundColor: 'var(--plum-100)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--plum-800)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={16} />
                    </div>
                    <div style={{ textAlign: 'left', flex: 1 }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--plum-900)' }}>Dr. K. Yogiraj</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)', marginLeft: '8px' }}>(Chairman & Director)</span>
                    </div>
                    <Check size={16} style={{ color: 'var(--plum-800)' }} />
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarIcon size={14} /> Select Date
                </label>
                <input 
                  type="date" 
                  min={getMinDate()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} /> Select Time Slot
                </label>
                <select 
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="form-select"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={handleSubmit} className="animate-fade-in">
            <h5 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', marginBottom: '16px' }}>
              Step 4: Contact & Details
            </h5>
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter patient's full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="form-input" 
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Smartphone size={14} /> Phone Number
                </label>
                <input 
                  type="tel" 
                  placeholder="10-digit number"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="form-input" 
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} /> Email (Optional)
                </label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="form-input" 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Describe Skin / Hair Concerns</label>
              <textarea 
                placeholder="Mention any symptoms, ongoing medications, or specific details..."
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                className="form-textarea"
              />
            </div>
          </form>
        )}

        {/* Step Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: step > 1 ? 'space-between' : 'flex-end', 
          marginTop: '30px', 
          paddingTop: '20px', 
          borderTop: '1px solid var(--silk-200)' 
        }}>
          {step > 1 && (
            <button 
              type="button" 
              onClick={handleBack} 
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ChevronLeft size={16} /> Back
            </button>
          )}
          
          {step < 4 ? (
            <button 
              type="button" 
              onClick={handleNext} 
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button 
              type="submit" 
              onClick={handleSubmit}
              className="btn btn-accent"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Confirm Reservation <Check size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
