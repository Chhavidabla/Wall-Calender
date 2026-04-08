'use client';
import { useMemo } from 'react';
import DayCell from './DayCell';
import { getHolidaysForDay } from '../data/holidays';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({ viewYear, viewMonth, getDayState, onDayClick, showHolidays, animDir }) {
  const cells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevDays = new Date(viewYear, viewMonth, 0).getDate();

    const result = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevDays - i;
      const date = new Date(viewYear, viewMonth - 1, d);
      result.push({ day: d, month: date.getMonth(), year: date.getFullYear(), other: true });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      result.push({ day: d, month: viewMonth, year: viewYear, other: false });
    }

    const remaining = 42 - result.length;
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(viewYear, viewMonth + 1, d);
      result.push({ day: d, month: date.getMonth(), year: date.getFullYear(), other: true });
    }

    return result;
  }, [viewYear, viewMonth]);

  return (
    <div style={{ padding: '16px 12px' }}>
      {/* Weekday headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        marginBottom: 6,
      }}>
        {WEEKDAYS.map((wd, i) => (
          <div key={wd} style={{
            textAlign: 'center',
            fontSize: 11,
            fontWeight: 500,
            color: i === 0 ? '#c0392b' : i === 6 ? '#1a6b6b' : 'var(--cal-ink-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '4px 0',
          }}>
            {wd}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
          animation: animDir ? `slideIn${animDir === 'right' ? 'Right' : 'Left'} 0.22s cubic-bezier(0.22,1,0.36,1)` : 'none',
        }}
      >
        {cells.map((c, idx) => {
          const holidays = getHolidaysForDay(c.year, c.month, c.day);
          const dayState = getDayState(c.year, c.month, c.day);
          return (
            <DayCell
              key={`${c.year}-${c.month}-${c.day}-${idx}`}
              day={c.day}
              month={c.month}
              year={c.year}
              isOtherMonth={c.other}
              dow={idx % 7}
              dayState={dayState}
              holidays={holidays}
              showHolidays={showHolidays}
              onDayClick={onDayClick}
            />
          );
        })}
      </div>
    </div>
  );
}
