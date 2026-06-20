import { useState, useEffect, useCallback } from 'react';
import { Keyboard, X, Command } from 'lucide-react';

const shortcuts = [
  { keys: ['/', 'or', 'Ctrl+K'], action: 'Focus search bar' },
  { keys: ['Esc'], action: 'Close modals / Clear search' },
  { keys: ['G', 'then', 'H'], action: 'Go to Homepage' },
  { keys: ['G', 'then', 'C'], action: 'Go to Cart' },
  { keys: ['G', 'then', 'O'], action: 'Go to Orders' },
  { keys: ['G', 'then', 'D'], action: 'Go to Deals' },
  { keys: ['?'], action: 'Toggle this help' },
];

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingKey, setPendingKey] = useState(null);

  const handleKeyDown = useCallback((e) => {
    // Don't trigger when typing in inputs
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

    // ? to toggle help
    if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      setIsOpen(prev => !prev);
      return;
    }

    // Esc to close
    if (e.key === 'Escape') {
      setIsOpen(false);
      setPendingKey(null);
      return;
    }

    // / or Ctrl+K for search
    if (e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      const searchInput = document.querySelector('input[placeholder*="Search"]');
      if (searchInput) searchInput.focus();
      return;
    }

    // G + key combos
    if (pendingKey === 'g') {
      setPendingKey(null);
      switch (e.key.toLowerCase()) {
        case 'h': window.location.href = '/'; break;
        case 'c': window.location.href = '/cart'; break;
        case 'o': window.location.href = '/orders'; break;
        case 'd': window.location.href = '/deals'; break;
        default: break;
      }
      return;
    }

    if (e.key.toLowerCase() === 'g' && !e.ctrlKey && !e.metaKey) {
      setPendingKey('g');
      setTimeout(() => setPendingKey(null), 1000);
    }
  }, [pendingKey]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Floating help button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-16 z-40 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Keyboard shortcuts"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard size={18} className="text-gray-600 dark:text-gray-300" />
      </button>

      {/* Help Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Keyboard size={22} /> Keyboard Shortcuts
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {shortcuts.map(shortcut => (
                <div key={shortcut.action} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{shortcut.action}</span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, i) => (
                      <span key={i} className="flex items-center gap-1">
                        {key === 'or' ? (
                          <span className="text-xs text-gray-400">or</span>
                        ) : key === 'then' ? (
                          <span className="text-xs text-gray-400">then</span>
                        ) : (
                          <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border dark:border-gray-600 text-gray-700 dark:text-gray-300">
                            {key}
                          </kbd>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
              Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">?</kbd> anytime to toggle this help
            </p>
          </div>
        </div>
      )}
    </>
  );
}
