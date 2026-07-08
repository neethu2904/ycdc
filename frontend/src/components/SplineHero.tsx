import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineHero() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSceneValid, setIsSceneValid] = useState<boolean | null>(null);
  const sceneUrl = "https://prod.spline.design/kZDDjACwkyLyCMMw/scene.splinecode";

  useEffect(() => {
    fetch(sceneUrl)
      .then((res) => {
        if (res.ok) {
          setIsSceneValid(true);
        } else {
          throw new Error(`HTTP status ${res.status}`);
        }
      })
      .catch((err) => {
        console.warn('Failed to pre-fetch Spline scene:', err);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '16px',
        background: 'transparent',
      }}
    >
      {/* Premium Glassmorphic Loader */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(43, 20, 39, 0.45)', // Matching YCDC Plum color with transparency
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            zIndex: 10,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--silk-200)',
              borderTop: '3px solid var(--gold-500)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '16px',
            }}
          />
          <span
            style={{
              fontSize: '0.85rem',
              color: 'white',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: '600',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Loading 3D Experience...
          </span>
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(43, 20, 39, 0.8), rgba(26, 8, 21, 0.9))',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✨</span>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-400)', marginBottom: '8px' }}>
            Elevating Skin & Hair Science
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', maxWidth: '280px', margin: 0 }}>
            US-FDA Approved Clinical Lasers & State-of-the-Art Aesthetic Care.
          </p>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.8s ease',
          }}
        >
          {/* Interactive Abstract 3D Glass Scene */}
          {isSceneValid && (
            <Spline
              scene={sceneUrl}
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </div>
      )}

      {/* Inject Keyframes for the spinner in style tag */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
