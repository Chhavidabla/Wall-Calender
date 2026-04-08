'use client';
import { useState, useRef } from 'react';
import { HOLIDAY_COLORS } from '../data/holidays';

export default function DayCell({
  day, month, year,
  isOtherMonth, dow,
  dayState,
  holidays,
  showHolidays,
  onDayClick,
}) {
  const { isToday, isRangeStart, isRangeEnd, isInRange, hasNotes } = dayState;
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const ref = useRef(null);

  const isSunday = dow === 0;
  const isSaturday = dow === 6;

  const tooltipLines = [];
  if (showHolidays && holidays.length > 0) {
    holidays.forEach(h => tooltipLines.push(`${h.name} (${h.type})`));
  }
  if (hasNotes) tooltipLines.push('Has notes');

  let cellBg = '';
  let numColor = '';
  let borderStyle = '';

  if (isRangeStart) { cellBg = '#c0392b'; numColor = '#fff'; }
  else if (isRangeEnd) { cellBg = '#c9922a'; numColor = '#fff'; }
  else if (isInRange) { cellBg = 'var(--cal-range-bg)'; }
  else if (isToday) { borderStyle = '1.5px solid #c0392b'; }

  if (!numColor) {
    if (isOtherMonth) numColor = 'var(--cal-ink-light)';
    else if (isSunday) numColor = '#c0392b';
    else if (isSaturday) numColor = '#1a6b6b';
    else numColor = 'var(--cal-ink)';
  }

  return (
    <div
      ref={ref}
      onClick={() => onDayClick(year, month, day)}
      onMouseEnter={() => tooltipLines.length > 0 && setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: isInRange ? 0 : 4,
        background: cellBg,
        border: borderStyle || 'none',
        minHeight: 48,
        aspectRatio: '1',
        transition: 'background 0.12s, transform 0.1s',
        userSelect: 'none',
      }}
      onMouseOver={e => {
        if (!isRangeStart && !isRangeEnd) {
          e.currentTarget.style.transform = 'scale(1.06)';
          e.currentTarget.style.zIndex = '2';
          if (!isInRange && !cellBg) e.currentTarget.style.background = 'var(--cal-range-bg)';
        }
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.zIndex = '';
        if (!isRangeStart && !isRangeEnd && !isInRange) e.currentTarget.style.background = '';
      }}
    >
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 16,
        fontWeight: isToday ? 600 : 400,
        color: isRangeStart || isRangeEnd ? '#fff' : numColor,
        lineHeight: 1,
      }}>
        {day}
      </span>

      {/* Holiday dots */}
      {showHolidays && holidays.length > 0 && (
        <div style={{ display: 'flex', gap: 2, marginTop: 2, justifyContent: 'center' }}>
          {holidays.map((h, i) => (
            <div key={i} style={{
              width: 4, height: 4,
              borderRadius: '50%',
              background: HOLIDAY_COLORS[h.type] || '#888',
            }} />
          ))}
        </div>
      )}

      {/* Notes indicator */}
      {hasNotes && (
        <div style={{
          width: 3, height: 3,
          borderRadius: '50%',
          background: 'var(--cal-gold)',
          marginTop: 1,
        }} />
      )}

      {/* Tooltip */}
      {tooltipVisible && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(100% + 6px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--cal-ink)',
          color: '#fff',
          fontSize: 11,
          padding: '4px 8px',
          borderRadius: 4,
          whiteSpace: 'nowrap',
          zIndex: 999,
          pointerEvents: 'none',
          lineHeight: 1.5,
          textAlign: 'center',
          maxWidth: 160,
          whiteSpace: 'normal',
        }}>
          {tooltipLines.join(' · ')}
        </div>
      )}
    </div>
  );
}
