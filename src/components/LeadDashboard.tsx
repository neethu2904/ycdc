import { useState, useEffect } from 'react';
import { 
  Search, 
  Users, 
  Download, 
  Trash2, 
  X,
  FileText,
  RefreshCw,
  Eye,
  Check
} from 'lucide-react';

interface LeadDashboardProps {
  onClose?: () => void;
}

const SEED_APPOINTMENTS = [
  {
    id: 'YCDC-304851',
    branch: 'Whitefield, Bangalore',
    category: 'Hair & Scalp',
    service: 'PRP Hair Growth Therapy',
    doctor: 'Dr. Vennela Reddy',
    date: '2026-06-25',
    timeSlot: '11:00 AM',
    patientName: 'Ramesh Kumar',
    patientPhone: '9845012345',
    patientEmail: 'ramesh.k@gmail.com',
    patientNotes: 'Experiencing severe hair thinning on the crown for the past 6 months.',
    status: 'Confirmed',
    timestamp: '2026-06-23 09:30 AM',
    type: 'Appointment'
  },
  {
    id: 'YCDC-940212',
    branch: 'Pattom, Trivandrum',
    category: 'Skin Care',
    service: 'Premium Chemical Peels',
    doctor: 'Dr. Maya Vincent',
    date: '2026-06-26',
    timeSlot: '02:45 PM',
    patientName: 'Ananya Pillai',
    patientPhone: '9447012345',
    patientEmail: 'ananya.p@yahoo.com',
    patientNotes: 'Looking to treat post-acne pigmentation and uneven skin tone.',
    status: 'Contacted',
    timestamp: '2026-06-23 10:15 AM',
    type: 'Appointment'
  }
];

const SEED_CONSULTATIONS = [
  {
    id: 'CONS-481952',
    branch: 'Whitefield, Bangalore',
    concernType: 'Acne, Pimples & Scars',
    patientName: 'Rohit Sharma',
    patientPhone: '9900012345',
    patientEmail: 'rohit.s@gmail.com',
    history: 'Frequent cystic acne breakouts on cheeks and jawline. No previous clinical treatments.',
    photoAttached: 'jawline_acne_left.jpg',
    status: 'Pending Review',
    timestamp: '2026-06-23 11:00 AM',
    type: 'Online Consultation'
  },
  {
    id: 'CONS-759281',
    branch: 'Pattom, Trivandrum',
    concernType: 'Fine Lines, Wrinkles & Anti-Aging',
    patientName: 'Meera Nair',
    patientPhone: '9496054321',
    patientEmail: 'meera.nair@hotmail.com',
    history: 'Interested in non-surgical anti-aging solutions. Noticeable fine lines around eyes.',
    photoAttached: 'forehead_wrinkles.jpg',
    status: 'Contacted',
    timestamp: '2026-06-23 11:45 AM',
    type: 'Online Consultation'
  }
];

export default function LeadDashboard({ onClose }: LeadDashboardProps) {
  const [activeTab, setActiveTab] = useState<'appointments' | 'consultations'>('appointments');
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize and load data
  const loadData = () => {
    // Appointments
    const localApps = localStorage.getItem('ycdc_appointments');
    if (!localApps) {
      localStorage.setItem('ycdc_appointments', JSON.stringify(SEED_APPOINTMENTS));
      setAppointments(SEED_APPOINTMENTS);
    } else {
      setAppointments(JSON.parse(localApps));
    }

    // Consultations
    const localConsults = localStorage.getItem('ycdc_consultations');
    if (!localConsults) {
      localStorage.setItem('ycdc_consultations', JSON.stringify(SEED_CONSULTATIONS));
      setConsultations(SEED_CONSULTATIONS);
    } else {
      setConsultations(JSON.parse(localConsults));
    }
  };

  useEffect(() => {
    loadData();
    // Listen for custom events triggered by forms
    const handleUpdate = () => {
      loadData();
      showToast('New lead data received!');
    };
    window.addEventListener('ycdc_data_update', handleUpdate);
    return () => window.removeEventListener('ycdc_data_update', handleUpdate);
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const updateLeadStatus = (id: string, newStatus: string) => {
    if (activeTab === 'appointments') {
      const updated = appointments.map(a => a.id === id ? { ...a, status: newStatus } : a);
      localStorage.setItem('ycdc_appointments', JSON.stringify(updated));
      setAppointments(updated);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    } else {
      const updated = consultations.map(c => c.id === id ? { ...c, status: newStatus } : c);
      localStorage.setItem('ycdc_consultations', JSON.stringify(updated));
      setConsultations(updated);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus });
      }
    }
    showToast(`Lead status updated to ${newStatus}`);
  };

  const deleteLead = (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return;
    
    if (activeTab === 'appointments') {
      const updated = appointments.filter(a => a.id !== id);
      localStorage.setItem('ycdc_appointments', JSON.stringify(updated));
      setAppointments(updated);
    } else {
      const updated = consultations.filter(c => c.id !== id);
      localStorage.setItem('ycdc_consultations', JSON.stringify(updated));
      setConsultations(updated);
    }
    setSelectedLead(null);
    showToast('Enquiry record deleted successfully');
  };

  const clearAll = () => {
    if (!confirm('CAUTION: This will remove all leads and reset to demo default data. Proceed?')) return;
    localStorage.removeItem('ycdc_appointments');
    localStorage.removeItem('ycdc_consultations');
    loadData();
    showToast('Data reset successfully');
  };

  const exportCSV = () => {
    const list = activeTab === 'appointments' ? appointments : consultations;
    if (list.length === 0) {
      showToast('No records to export');
      return;
    }
    
    // Simulate generation of download CSV
    const headers = activeTab === 'appointments' 
      ? 'ID,Patient Name,Phone,Email,Branch,Service,Doctor,Date,Time,Status,SubmittedAt\n'
      : 'ID,Patient Name,Phone,Email,Branch,Concern,History,Attachment,Status,SubmittedAt\n';
      
    const rows = list.map(item => {
      if (activeTab === 'appointments') {
        return `"${item.id}","${item.patientName}","${item.patientPhone}","${item.patientEmail}","${item.branch}","${item.service}","${item.doctor}","${item.date}","${item.timeSlot}","${item.status}","${item.timestamp}"`;
      } else {
        return `"${item.id}","${item.patientName}","${item.patientPhone}","${item.patientEmail}","${item.branch}","${item.concernType}","${item.history.replace(/"/g, '""')}","${item.photoAttached}","${item.status}","${item.timestamp}"`;
      }
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `YCDC_${activeTab}_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV report downloaded successfully!');
  };

  // Filter list based on search
  const filteredAppointments = appointments.filter(a => 
    a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.patientPhone.includes(searchQuery) ||
    a.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredConsultations = consultations.filter(c => 
    c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.patientPhone.includes(searchQuery) ||
    c.concernType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="glass" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--plum-100)', boxShadow: 'var(--shadow-lg)' }}>
      {/* Toast Alert */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'var(--plum-800)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '4px',
          boxShadow: 'var(--shadow-md)',
          zIndex: 9999,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Check size={16} style={{ color: 'var(--gold-300)' }} /> {notification}
        </div>
      )}

      {/* Header */}
      <div className="plum-gradient" style={{ padding: '24px 30px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1rem', color: 'var(--gold-300)', fontWeight: 'bold' }}>Mock Reception Portal</span>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'white', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={24} style={{ color: 'var(--gold-400)' }} /> Lead Enquiry Management
          </h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={clearAll} 
            title="Reset Data"
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', 
              color: 'rgba(255,255,255,0.8)', 
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={14} /> Reset
          </button>
          {onClose && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Analytics Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--silk-200)', borderBottom: '1px solid var(--silk-200)' }}>
        <div style={{ background: 'white', padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Inquiries</span>
          <h5 style={{ fontSize: '1.8rem', color: 'var(--plum-900)', fontWeight: 'bold', marginTop: '4px' }}>
            {appointments.length + consultations.length}
          </h5>
        </div>
        <div style={{ background: 'white', padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Appointments</span>
          <h5 style={{ fontSize: '1.8rem', color: 'green', fontWeight: 'bold', marginTop: '4px' }}>
            {appointments.length}
          </h5>
        </div>
        <div style={{ background: 'white', padding: '20px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted-charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Virtual Screenings</span>
          <h5 style={{ fontSize: '1.8rem', color: 'var(--gold-600)', fontWeight: 'bold', marginTop: '4px' }}>
            {consultations.length}
          </h5>
        </div>
      </div>

      {/* Main Workspace */}
      <div style={{ padding: '24px 30px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', background: 'var(--silk-200)', padding: '4px', borderRadius: '6px' }}>
            <button
              onClick={() => { setActiveTab('appointments'); setSelectedLead(null); }}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.85rem',
                backgroundColor: activeTab === 'appointments' ? 'white' : 'transparent',
                color: activeTab === 'appointments' ? 'var(--plum-900)' : 'var(--muted-charcoal)',
                transition: 'var(--transition-fast)'
              }}
            >
              Appointments
            </button>
            <button
              onClick={() => { setActiveTab('consultations'); setSelectedLead(null); }}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.85rem',
                backgroundColor: activeTab === 'consultations' ? 'white' : 'transparent',
                color: activeTab === 'consultations' ? 'var(--plum-900)' : 'var(--muted-charcoal)',
                transition: 'var(--transition-fast)'
              }}
            >
              Virtual Screenings
            </button>
          </div>

          {/* Search & Export */}
          <div style={{ display: 'flex', gap: '12px', flex: 1, justifySelf: 'flex-end', maxWidth: '400px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-charcoal)' }} />
              <input 
                type="text" 
                placeholder={`Search by name, phone...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '4px',
                  border: '1px solid var(--silk-200)',
                  outline: 'none',
                  fontSize: '0.85rem'
                }}
              />
            </div>
            <button 
              onClick={exportCSV} 
              className="btn btn-outline" 
              style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* Lead Table */}
        <div style={{ display: 'grid', gridTemplateColumns: selectedLead ? '3fr 2fr' : '1fr', gap: '20px', transition: 'var(--transition-smooth)' }}>
          
          {/* Table Container */}
          <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', border: '1px solid var(--silk-200)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'var(--silk-100)', borderBottom: '1px solid var(--silk-200)', color: 'var(--plum-900)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Patient</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>{activeTab === 'appointments' ? 'Treatment & Doctor' : 'Concern'}</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Branch</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: '600' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeTab === 'appointments' ? (
                  filteredAppointments.length > 0 ? (
                    filteredAppointments.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid var(--silk-100)' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ fontWeight: '500', color: 'var(--charcoal)' }}>{lead.patientName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--muted-charcoal)' }}>+91 {lead.patientPhone}</div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ color: 'var(--plum-800)', fontWeight: '500' }}>{lead.service}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gold-600)' }}>{lead.doctor}</div>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '0.85rem' }}>
                          {lead.branch.split(',')[0]}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '30px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            backgroundColor: lead.status === 'Confirmed' ? 'rgba(0,128,0,0.1)' : lead.status === 'Contacted' ? 'rgba(196,158,108,0.15)' : 'rgba(0,0,0,0.05)',
                            color: lead.status === 'Confirmed' ? 'green' : lead.status === 'Contacted' ? 'var(--gold-600)' : 'var(--muted-charcoal)'
                          }}>
                            {lead.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <button 
                            onClick={() => setSelectedLead(lead)} 
                            style={{ background: 'none', border: 'none', color: 'var(--plum-800)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}
                          >
                            <Eye size={14} /> View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--muted-charcoal)' }}>
                        No appointments found. Use the booking form to capture leads.
                      </td>
                    </tr>
                  )
                ) : (
                  filteredConsultations.length > 0 ? (
                    filteredConsultations.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid var(--silk-100)' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ fontWeight: '500', color: 'var(--charcoal)' }}>{lead.patientName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--muted-charcoal)' }}>+91 {lead.patientPhone}</div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ color: 'var(--plum-800)', fontWeight: '500' }}>{lead.concernType}</div>
                          <div style={{ fontSize: '0.75rem', color: 'green' }}>Photo: {lead.photoAttached}</div>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: '0.85rem' }}>
                          {lead.branch.split(',')[0]}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '30px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            backgroundColor: lead.status === 'Pending Review' ? 'rgba(255,165,0,0.1)' : lead.status === 'Contacted' ? 'rgba(196,158,108,0.15)' : 'rgba(0,128,0,0.1)',
                            color: lead.status === 'Pending Review' ? 'orange' : lead.status === 'Contacted' ? 'var(--gold-600)' : 'green'
                          }}>
                            {lead.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <button 
                            onClick={() => setSelectedLead(lead)} 
                            style={{ background: 'none', border: 'none', color: 'var(--plum-800)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}
                          >
                            <Eye size={14} /> View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--muted-charcoal)' }}>
                        No online consultations found. Use the consultation form to capture screening leads.
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Details Sidebar */}
          {selectedLead && (
            <div className="animate-fade-in" style={{ background: 'var(--silk-100)', borderRadius: '8px', border: '1px solid var(--silk-200)', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--silk-200)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <span className="badge badge-plum" style={{ fontSize: '0.65rem' }}>{selectedLead.type}</span>
                  <h6 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', color: 'var(--plum-900)', marginTop: '4px' }}>
                    Enquiry Details
                  </h6>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted-charcoal)' }}>ID: {selectedLead.id}</span>
                </div>
                <button onClick={() => setSelectedLead(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-charcoal)' }}>
                  <X size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--muted-charcoal)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Patient</span>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--charcoal)' }}>{selectedLead.patientName}</strong>
                  <div style={{ color: 'var(--muted-charcoal)' }}>Mobile: +91 {selectedLead.patientPhone}</div>
                  {selectedLead.patientEmail && <div style={{ color: 'var(--muted-charcoal)' }}>Email: {selectedLead.patientEmail}</div>}
                </div>

                <div>
                  <span style={{ color: 'var(--muted-charcoal)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Location</span>
                  <span style={{ fontWeight: '500' }}>{selectedLead.branch}</span>
                </div>

                {selectedLead.type === 'Appointment' ? (
                  <>
                    <div>
                      <span style={{ color: 'var(--muted-charcoal)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Doctor Requested</span>
                      <span style={{ fontWeight: '500' }}>{selectedLead.doctor}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted-charcoal)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Treatment</span>
                      <span style={{ fontWeight: '500', color: 'var(--plum-800)' }}>{selectedLead.service}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted-charcoal)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Preferred Slot</span>
                      <span style={{ fontWeight: '600', color: 'var(--plum-900)' }}>{selectedLead.date} at {selectedLead.timeSlot}</span>
                    </div>
                    {selectedLead.patientNotes && (
                      <div>
                        <span style={{ color: 'var(--muted-charcoal)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Concerns</span>
                        <div style={{ background: 'white', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--silk-200)', marginTop: '4px', fontStyle: 'italic' }}>
                          "{selectedLead.patientNotes}"
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <span style={{ color: 'var(--muted-charcoal)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Concern Area</span>
                      <span style={{ fontWeight: '500', color: 'var(--plum-800)' }}>{selectedLead.concernType}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted-charcoal)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Medical Symptoms</span>
                      <div style={{ background: 'white', padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--silk-200)', marginTop: '4px', fontStyle: 'italic' }}>
                        "{selectedLead.history || 'No medical history provided.'}"
                      </div>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted-charcoal)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase' }}>Diagnostic Photo</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'green', marginTop: '4px', fontWeight: '500' }}>
                        <FileText size={14} /> {selectedLead.photoAttached}
                      </span>
                    </div>
                  </>
                )}

                <div style={{ borderTop: '1px solid var(--silk-200)', paddingTop: '12px', marginTop: '6px' }}>
                  <span style={{ color: 'var(--muted-charcoal)', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Lead Management Action
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <button 
                      onClick={() => updateLeadStatus(selectedLead.id, 'Contacted')}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '4px',
                        border: '1px solid var(--gold-500)',
                        backgroundColor: selectedLead.status === 'Contacted' ? 'var(--gold-100)' : 'white',
                        color: 'var(--gold-600)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      Mark Contacted
                    </button>
                    {selectedLead.type === 'Appointment' ? (
                      <button 
                        onClick={() => updateLeadStatus(selectedLead.id, 'Confirmed')}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid green',
                          backgroundColor: selectedLead.status === 'Confirmed' ? 'rgba(0,128,0,0.1)' : 'white',
                          color: 'green',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                      >
                        Confirm Slot
                      </button>
                    ) : (
                      <button 
                        onClick={() => updateLeadStatus(selectedLead.id, 'Reviewed')}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid green',
                          backgroundColor: selectedLead.status === 'Reviewed' ? 'rgba(0,128,0,0.1)' : 'white',
                          color: 'green',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                      >
                        Mark Reviewed
                      </button>
                    )}
                    <button 
                      onClick={() => deleteLead(selectedLead.id)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '4px',
                        border: '1px solid red',
                        backgroundColor: 'white',
                        color: 'red',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
