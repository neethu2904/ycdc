import React, { useState, useRef } from 'react';
import { 
  X, 
  Briefcase, 
  MapPin, 
  Mail, 
  Smartphone, 
  UploadCloud, 
  FileText, 
  Trash2, 
  CheckCircle2, 
  Award,
  MessageSquare,
  User
} from 'lucide-react';
import { API_BASE_URL } from '../config';

interface ApplyNowModalProps {
  onClose: () => void;
}

const BRANCHES = [
  { id: 'trivandrum', name: 'Pattom Center, Thiruvananthapuram' },
  { id: 'bangalore', name: 'Whitefield Center, Bengaluru' }
];

export default function ApplyNowModal({ onClose }: ApplyNowModalProps) {
  const [branch, setBranch] = useState('trivandrum');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');
  
  // File Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setFileName(file.name);
      // Simulate file upload decryption/delay
      setTimeout(() => {
        setIsUploading(false);
        setUploadedFile(URL.createObjectURL(file));
      }, 800);
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
      alert('Please enter your name and a valid 10-digit mobile number.');
      return;
    }

    if (!fileInputRef.current?.files?.[0]) {
      alert('Please upload your resume / CV.');
      return;
    }

    setSubmitting(true);
    const selectedBranch = BRANCHES.find(b => b.id === branch)?.name || branch;

    const formData = new FormData();
    formData.append('patient_name', name);
    formData.append('patient_phone', phone);
    formData.append('patient_email', email);
    formData.append('branch', selectedBranch);
    formData.append('type', 'Contact');
    formData.append('concern_type', 'Careers / Job Application');
    formData.append('medical_history', `Experience: ${experience}`);
    formData.append('notes', `Message: ${message}`);
    
    if (fileInputRef.current.files[0]) {
      formData.append('photo_attached', fileInputRef.current.files[0]);
    }

    fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setSubmitting(false);
        if (data.success) {
          setIsSubmitted(true);
          // Trigger global lead update event to sync dashboard
          window.dispatchEvent(new CustomEvent('ycdc_data_update'));
        } else {
          alert(data.message || 'Error submitting application.');
        }
      })
      .catch(err => {
        console.error("Error submitting application:", err);
        setSubmitting(false);
        alert('Server error occurred. Please try again.');
      });
  };

  return (
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
      <div 
        className="animate-scale-up"
        style={{
          width: '100%',
          maxWidth: '520px',
          background: '#fcf9f7',
          borderRadius: '12px',
          border: '1px solid var(--silk-200)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--silk-200)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={20} style={{ color: 'var(--plum-800)' }} />
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-800)', fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
              Join the YCDC Team
            </h4>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-charcoal)' }}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          /* Success Screen */
          <div style={{ padding: '40px 24px', textAlign: 'center', backgroundColor: 'white' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(37, 211, 102, 0.1)',
              color: '#25D366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--plum-800)', fontSize: '1.5rem', marginBottom: '12px' }}>
              Application Submitted!
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)', lineHeight: '1.6', marginBottom: '24px' }}>
              Thank you, <strong>{name}</strong>. Your career application has been successfully registered. Our administrative team will review your resume and experience and contact you soon.
            </p>
            <button 
              onClick={onClose} 
              className="btn btn-primary"
              style={{ padding: '12px 36px', fontSize: '0.85rem' }}
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: '75vh' }}>
            {/* Preferred Center Choice */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--plum-800)' }}>
                <MapPin size={12} /> Target Clinic Center
              </label>
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                {BRANCHES.map(b => (
                  <label 
                    key={b.id}
                    style={{ 
                      flex: 1, 
                      padding: '10px', 
                      borderRadius: '6px', 
                      border: branch === b.id ? '2px solid var(--plum-800)' : '1px solid var(--silk-200)', 
                      backgroundColor: branch === b.id ? 'var(--plum-100)' : 'white', 
                      cursor: 'pointer', 
                      textAlign: 'center', 
                      fontWeight: '500', 
                      fontSize: '0.8rem',
                      color: branch === b.id ? 'var(--plum-800)' : 'var(--charcoal)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="career-branch" 
                      value={b.id} 
                      checked={branch === b.id}
                      onChange={() => setBranch(b.id)}
                      style={{ display: 'none' }} 
                    />
                    {b.id === 'trivandrum' ? 'Trivandrum (Pattom)' : 'Bengaluru (Whitefield)'}
                  </label>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--plum-800)' }}>
                <User size={12} /> Full Name
              </label>
              <input 
                type="text" 
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input" 
                style={{ marginTop: '4px' }}
                required 
              />
            </div>

            {/* Contact Grid (Email & Phone) */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div className="form-group" style={{ flex: 1, margin: 0 }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--plum-800)' }}>
                  <Mail size={12} /> Email Address
                </label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input" 
                  style={{ marginTop: '4px' }}
                  required 
                />
              </div>
              <div className="form-group" style={{ flex: 1, margin: 0 }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--plum-800)' }}>
                  <Smartphone size={12} /> Mobile Number
                </label>
                <input 
                  type="tel" 
                  placeholder="10-digit Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input" 
                  style={{ marginTop: '4px' }}
                  pattern="[0-9]{10}"
                  required 
                />
              </div>
            </div>

            {/* Experience Summary */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--plum-800)' }}>
                <Award size={12} /> Professional Experience
              </label>
              <input 
                type="text" 
                placeholder="e.g. 3 years as Consultant Dermatologist / Staff Nurse"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="form-input" 
                style={{ marginTop: '4px' }}
                required 
              />
            </div>

            {/* Message / Cover Letter */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--plum-800)' }}>
                <MessageSquare size={12} /> Cover Message (Optional)
              </label>
              <textarea 
                rows={3}
                placeholder="Tell us about yourself and why you'd like to join YCDC..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-input" 
                style={{ marginTop: '4px', resize: 'vertical' }}
              />
            </div>

            {/* Resume Upload Box */}
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--plum-800)' }}>
                <UploadCloud size={12} /> Upload Resume (PDF / Word)
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed var(--gold-400)',
                  borderRadius: '6px',
                  padding: '16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  transition: 'var(--transition-fast)',
                  marginTop: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gold-600)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--gold-400)'}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept=".pdf,.doc,.docx,image/*" 
                  style={{ display: 'none' }} 
                />
                
                {isUploading ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      border: '3px solid var(--gold-300)',
                      borderTop: '3px solid var(--gold-600)',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--gold-600)', fontWeight: '500' }}>Uploading CV...</span>
                  </div>
                ) : uploadedFile ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText size={20} style={{ color: 'var(--plum-800)' }} />
                      <div style={{ textAlign: 'left' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '500', display: 'block', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {fileName}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'green' }}>Ready to submit</span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }} 
                      style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}
                      title="Remove file"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <UploadCloud size={24} style={{ color: 'var(--gold-600)' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--charcoal)' }}>Choose PDF or Docx file</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--muted-charcoal)' }}>Max file size 5MB</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submission Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button 
                type="button" 
                onClick={onClose} 
                className="btn btn-outline" 
                style={{ flex: 1 }}
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={submitting} 
                className="btn btn-accent" 
                style={{ flex: 2 }}
              >
                {submitting ? 'Sending Application...' : 'Send Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
