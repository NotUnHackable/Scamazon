import { useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

export default function ImageZoom({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const toggleZoom = () => {
    setZoom(prev => prev === 1 ? 2 : 1);
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10"
      >
        <ZoomIn size={32} className="text-white drop-shadow-lg" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => { setIsOpen(false); setZoom(1); }}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={() => { setIsOpen(false); setZoom(1); }}
          >
            <X size={32} />
          </button>

          <button
            className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors z-10 flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg"
            onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
          >
            {zoom === 1 ? <ZoomIn size={20} /> : <ZoomOut size={20} />}
            <span className="text-sm">{zoom === 1 ? 'Zoom In' : 'Zoom Out'}</span>
          </button>

          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
