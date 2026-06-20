import { useState, useEffect, useCallback } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer({ targetDate, onComplete, compact = false }) {
  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      if (newTime.expired && onComplete) onComplete();
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft, onComplete]);

  if (timeLeft.expired) {
    return <span className="text-red-600 font-bold text-sm">EXPIRED</span>;
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1 font-mono text-sm">
        <Clock size={14} />
        <span>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="animate-pulse">:</span>
        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="animate-pulse">:</span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {[
        { value: timeLeft.hours, label: 'HRS' },
        { value: timeLeft.minutes, label: 'MIN' },
        { value: timeLeft.seconds, label: 'SEC' },
      ].map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="text-center">
            <div className="bg-gray-900 text-white font-mono text-xl md:text-2xl font-bold rounded-lg w-14 h-14 flex items-center justify-center">
              {String(unit.value).padStart(2, '0')}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">{unit.label}</p>
          </div>
          {i < 2 && <span className="text-2xl font-bold text-gray-400 animate-pulse">:</span>}
        </div>
      ))}
    </div>
  );
}
