import { useState, useEffect } from 'react';
import { Play, X, Image as ImageIcon, Video, Layers } from 'lucide-react';
import { API_BASE_URL } from '../config';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  category: 'infrastructure' | 'treatments';
  title: string;
  thumbnail_path: string;
  video_path?: string;
  description: string;
}

const MOCK_GALLERY: GalleryItem[] = [
  {
    id: 'before-after-4',
    type: 'image',
    category: 'treatments',
    title: 'Before After - Hair Transplant Density',
    thumbnail_path: 'https://ycdc.in/wp-content/uploads/2025/08/eed5800b-c58f-4e3d-a7cf-36350a19166c.jpg',
    description: 'Excellent density and natural hairline restoration 6 months after a FUE hair transplant session.'
  },
  {
    id: 'before-after-3',
    type: 'image',
    category: 'treatments',
    title: 'Before After - Hair Line Restoration',
    thumbnail_path: 'https://ycdc.in/wp-content/uploads/2025/05/ycdc-before-after2-880x808.jpeg',
    description: 'Frontal hairline restoration showing significant density and natural growth.'
  },
  {
    id: 'before-after-2',
    type: 'image',
    category: 'treatments',
    title: 'Before After - Acne Scar Correction',
    thumbnail_path: 'https://ycdc.in/wp-content/uploads/2025/08/eed5800b-c58f-4e3d-a7cf-36350a19166c.jpg',
    description: 'Visible skin smoothing and reduction of deep pitted acne scars after 3 sessions of Secret RF Microneedling.'
  },
  {
    id: 'image-1',
    type: 'image',
    category: 'treatments',
    title: 'Trichoscopy Scalp Examination',
    thumbnail_path: 'https://ycdc.in/wp-content/uploads/2025/05/cosmetologist-doing-trichoscopy-and-watching-resul-2024-10-18-10-16-52-utc-scaled.jpg',
    description: 'Digital trichoscopy scalp analysis to evaluate hair root health and map out custom treatments.'
  },
  {
    id: 'clinic-lobby',
    type: 'image',
    category: 'infrastructure',
    title: 'YCDC Luxury Lobby & Reception',
    thumbnail_path: 'https://ycdc.in/wp-content/uploads/2025/05/DSC09954-scaled.jpg',
    description: 'Our welcoming reception lounge designed to provide patients with a calming and premium clinical environment.'
  },
  {
    id: 'before-after-6',
    type: 'image',
    category: 'treatments',
    title: 'Before After - Pigmentation Treatment',
    thumbnail_path: 'https://ycdc.in/wp-content/uploads/2025/05/ycdc-before-after6-880x808.jpeg',
    description: 'Advanced Q-Switched laser toning and chemical peel results for melasma and dark spots.'
  },
  {
    id: 'treatment-showcase-video',
    type: 'video',
    category: 'treatments',
    title: 'YCDC Clinic Experience Tour',
    thumbnail_path: 'https://ycdc.in/wp-content/uploads/2025/05/Dr.-NR-Opd.jpg',
    video_path: 'https://www.youtube.com/watch?v=RWr8XeBUxTU',
    description: 'Detailed clinical video tour demonstrating our professional environment, FDA-approved lasers, and workflows.'
  }
];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(MOCK_GALLERY);
  const loading = false;
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'infrastructure' | 'treatments'>('all');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/gallery`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setGalleryItems(data);
        }
      })
      .catch(err => {
        console.warn("Backend API not reachable, using high-fidelity local gallery data:", err);
      });
  }, []);

  const filteredItems = galleryItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'image' || filter === 'video') return item.type === filter;
    return item.category === filter;
  });

  const getMediaUrl = (path: string | undefined) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    if (path.startsWith('/uploads') || path.startsWith('uploads')) {
      return `http://localhost:8000${path.startsWith('/') ? '' : '/'}${path}`;
    }
    // Return relative path (static fallback assets)
    return path;
  };

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--silk-100)', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Title Hero Banner */}
      <section style={{
        position: 'relative',
        padding: '120px 0 80px',
        background: 'url("/skin_treatment_premium.png") no-repeat center center/cover',
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
            Inside YCDC
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'white', marginBottom: '10px' }}>
            Media Gallery
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '650px', margin: '0 auto' }}>
            Take a look at our clinical workspaces, premium diagnostic infrastructure, lasers, and procedures in action.
          </p>
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="section-padding" style={{ padding: '60px 0' }}>
        <div className="container">
          {/* Media Filtering Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '40px',
            borderBottom: '1px solid var(--silk-200)',
            paddingBottom: '20px'
          }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                border: '1px solid var(--silk-200)',
                backgroundColor: filter === 'all' ? 'var(--plum-900)' : 'white',
                color: filter === 'all' ? 'white' : 'var(--plum-900)',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'var(--transition-fast)'
              }}
            >
              <Layers size={14} /> All Media
            </button>
            <button
              onClick={() => setFilter('infrastructure')}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                border: '1px solid var(--silk-200)',
                backgroundColor: filter === 'infrastructure' ? 'var(--plum-900)' : 'white',
                color: filter === 'infrastructure' ? 'white' : 'var(--plum-900)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              Clinic Infrastructure
            </button>
            <button
              onClick={() => setFilter('treatments')}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                border: '1px solid var(--silk-200)',
                backgroundColor: filter === 'treatments' ? 'var(--plum-900)' : 'white',
                color: filter === 'treatments' ? 'white' : 'var(--plum-900)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              Treatments & Clinical
            </button>
            <button
              onClick={() => setFilter('video')}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                border: '1px solid var(--silk-200)',
                backgroundColor: filter === 'video' ? 'var(--plum-900)' : 'white',
                color: filter === 'video' ? 'white' : 'var(--plum-900)',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'var(--transition-fast)'
              }}
            >
              <Video size={14} /> Videos
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted-charcoal)' }}>Loading media files...</div>
          ) : (
            /* Grid Layout */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveMedia(item)}
                  className="glass animate-fade-in-up"
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid var(--silk-200)',
                    boxShadow: 'var(--shadow-sm)',
                    backgroundColor: 'white',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  {/* Thumbnail Wrapper */}
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#e2e2e2' }}>
                    <img
                      src={getMediaUrl(item.thumbnail_path)}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* Icon Indicator Overlay */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(43, 20, 39, 0.75)',
                      color: 'white',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}>
                      {item.type === 'video' ? <Play size={14} fill="white" /> : <ImageIcon size={14} />}
                    </div>

                    {/* Dark transparent tint on hover */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(43, 20, 39, 0.1)',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(43, 20, 39, 0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(43, 20, 39, 0.1)'}
                    />
                  </div>

                  {/* Info Text */}
                  <div style={{ padding: '20px', textAlign: 'left' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--gold-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.category === 'infrastructure' ? 'Clinic Facility' : 'Clinical Treatment'}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--plum-900)', marginTop: '4px', marginBottom: '8px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted-charcoal)', lineHeight: '1.4' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox / Video Player Modal */}
      {activeMedia && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(23, 5, 20, 0.95)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}
        onClick={() => setActiveMedia(null)}
        >
          {/* Close Button */}
          <button style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: 'white',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'var(--transition-fast)',
            zIndex: 10
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onClick={() => setActiveMedia(null)}
          >
            <X size={24} />
          </button>

          {/* Modal Container */}
          <div style={{
            maxWidth: '900px',
            width: '100%',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
          onClick={(e) => e.stopPropagation()} // Prevent close on outer click
          >
            {/* Display Video or Image */}
            {activeMedia.type === 'video' ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', boxShadow: '0 12px 30px rgba(0,0,0,0.5)' }}>
                {(() => {
                  const url = activeMedia.video_path || '';
                  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                  const match = url.match(regExp);
                  const youtubeId = (match && match[2].length === 11) ? match[2] : null;

                  if (youtubeId) {
                    return (
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                        title={activeMedia.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', backgroundColor: 'black' }}
                      />
                    );
                  }

                  return (
                    <video
                      src={getMediaUrl(activeMedia.video_path)}
                      controls
                      autoPlay
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', backgroundColor: 'black' }}
                    />
                  );
                })()}
              </div>
            ) : (
              <img
                src={getMediaUrl(activeMedia.thumbnail_path)}
                alt={activeMedia.title}
                style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 12px 30px rgba(0,0,0,0.5)' }}
              />
            )}

            {/* Description Overlay */}
            <div style={{ color: 'white', textAlign: 'left', padding: '10px 0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--plum-800)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {activeMedia.category === 'infrastructure' ? 'Infrastructure facility' : 'clinical session'}
              </span>
              <h3 style={{ color: 'white', fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginTop: '4px', marginBottom: '8px' }}>
                {activeMedia.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                {activeMedia.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
