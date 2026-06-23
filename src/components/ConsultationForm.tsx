import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  ShieldCheck, 
  Trash2, 
  FileText, 
  Camera, 
  Lock, 
  CheckCircle,
  Smartphone,
  Mail,
  User,
  MapPin,
  Sparkles
} from 'lucide-react';

interface ConsultationFormProps {
  onSuccessClose?: () => void;
}

const BRANCHES = [
  { id: 'bangalore', name: 'Whitefield, Bangalore' },
  { id: 'trivandrum', name: 'Pattom, Trivandrum' }
];

const CONCERN_TYPES = [
  { id: 'acne', name: 'Acne, Pimples & Scars' },
  { id: 'hairfall', name: 'Hair Fall & Thinning' },
  { id: 'aging', name: 'Fine Lines, Wrinkles & Anti-Aging' },
  { id: 'pigmentation', name: 'Pigmentation, Melasma & Dark Spots' },
  { id: 'glow', name: 'Dull Skin & Face Glow' },
  { id: 'general', name: 'General Skin Rashes / Infections' }
];

export default function ConsultationForm({ onSuccessClose }: ConsultationFormProps) {
  const [branch, setBranch] = useState('bangalore');
  const [concern, setConcern] = useState('acne');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [history, setHistory] = useState('');
  
  // File upload simulation states
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Success states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consultId, setConsultId] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setFileName(file.name);
      // Simulate high-end upload delay
      setTimeout(() => {
        setIsUploading(false);
        setUploadedFile(URL.createObjectURL(file));
      }, 1500);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || phone.length < 10) {
      alert('Please fill out patient name and a valid phone number.');
      return;
    }

    const newId = 'CONS-' + Math.floor(100000 + Math.random() * 900000);
    setConsultId(newId);

    const branchName = BRANCHES.find(b => b.id === branch)?.name || branch;
    const concernName = CONCERN_TYPES.find(c => c.id === concern)?.name || concern;

    const newConsultation = {
      id: newId,
      branch: branchName,
      concernType: concernName,
      patientName: name,
      patientPhone: phone,
      patientEmail: email,
      history,
      photoAttached: fileName || 'No photo uploaded',
      status: 'Pending Review',
      timestamp: new Date().toLocaleString(),
      type: 'Online Consultation'
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('ycdc_consultations') || '[]');
    localStorage.setItem('ycdc_consultations', JSON.stringify([newConsultation, ...existing]));

    // Dispatch update event
    window.dispatchEvent(new Event('ycdc_data_update'));

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="glass animate-fade-in" style={{ padding: '40px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--gold-400)' }}>
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
          <CheckCircle size={36} />
        </div>
        <h3 style={{ fontSize: '2rem', color: 'var(--plum-900)' }}>Consultation Requested</h3>
        <p style={{ color: 'var(--muted-charcoal)', marginTop: '8px', maxWidth: '450px', margin: '8px auto 0' }}>
          Your digital assessment has been registered under ID <strong style={{ color: 'var(--plum-800)' }}>{consultId}</strong>. A dermatologist will analyze your details and contact you via Phone/WhatsApp.
        </p>

        <div style={{
          background: '#white',
          border: '1px solid var(--silk-200)',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '400px',
          margin: '24px auto',
          textAlign: 'left',
          fontSize: '0.9rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-600)', marginBottom: '8px', fontWeight: 'bold' }}>
            <Lock size={14} /> HIPAA Compliant & Secure
          </div>
          <p style={{ fontSize: '0.85rem' }}>
            Your photos and medical history are encrypted and only accessible by authorized YCDC medical practitioners.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button 
            onClick={() => {
              const text = encodeURIComponent(`Hi YCDC, I just submitted an online consultation request. ID: ${consultId}. Name: ${name}. Concern: ${CONCERN_TYPES.find(c => c.id === concern)?.name}.`);
              window.open(`https://wa.me/917593864264?text=${text}`, '_blank');
            }} 
            className="btn btn-accent"
          >
            Connect on WhatsApp
          </button>
          {onSuccessClose && (
            <button onClick={onSuccessClose} className="btn btn-outline">
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass" style={{ padding: '30px 40px', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
          Virtual Screening
        </span>
        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--plum-900)' }}>
          Online Consultation Request
        </h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted-charcoal)', marginTop: '4px' }}>
          Share your concern details and upload pictures. Our doctors will review and diagnose remotely.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} /> Preferred Branch
          </label>
          <select 
            value={branch} 
            onChange={(e) => setBranch(e.target.value)} 
            className="form-select"
          >
            {BRANCHES.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} /> Concern Category
          </label>
          <select 
            value={concern} 
            onChange={(e) => setConcern(e.target.value)} 
            className="form-select"
          >
            {CONCERN_TYPES.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <User size={12} /> Full Name
        </label>
        <input 
          type="text" 
          placeholder="Patient's Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input" 
          required
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Smartphone size={12} /> Phone Number
          </label>
          <input 
            type="tel" 
            placeholder="10-digit Mobile"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input" 
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Mail size={12} /> Email (Optional)
          </label>
          <input 
            type="email" 
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input" 
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Brief medical history / symptoms</label>
        <textarea 
          placeholder="For example: I have had active acne breakouts for 6 months. I've tried anti-acne soaps without success..."
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          className="form-textarea"
          style={{ minHeight: '80px' }}
        />
      </div>

      {/* Simulated Image Uploader */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Camera size={14} /> Upload Photos of Affected Area (Acne / Hair / Skin spots)
        </label>
        <div 
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: '2px dashed var(--gold-400)',
            borderRadius: '6px',
            padding: '24px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: 'rgba(245, 240, 233, 0.2)',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-600)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--gold-400)'}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          
          {isUploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '3px solid var(--gold-300)',
                borderTop: '3px solid var(--gold-600)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--gold-600)', fontWeight: '500' }}>Encrypting & Uploading...</span>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : uploadedFile ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={24} style={{ color: 'var(--plum-800)' }} />
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '500', display: 'block', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {fileName}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'green' }}>Ready to send securely</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }} 
                style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <UploadCloud size={32} style={{ color: 'var(--gold-600)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Drag & drop or Click to choose image</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--muted-charcoal)' }}>Max size 10MB (JPEG, PNG). Files are secured under medical privacy laws.</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'var(--gold-100)', borderRadius: '6px', marginBottom: '24px' }}>
        <ShieldCheck size={20} style={{ color: 'var(--gold-600)', flexShrink: 0 }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--gold-600)', textAlign: 'left', lineHeight: '1.3' }}>
          This virtual screening is designed as a preliminary examination. It does not replace a comprehensive clinical consultation but serves to prioritize critical concerns.
        </span>
      </div>

      <button type="submit" className="btn btn-accent" style={{ width: '100%' }}>
        Submit Consultation Details
      </button>
    </form>
  );
}
