'use client';
import { MONTH_HERO_IMAGES, HOLIDAY_COLORS, getHolidaysForMonth } from '../data/holidays';

const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function countWeekdays(year, month, weekday) {
  let count = 0;
  const days = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= days; d++) {
    if (new Date(year, month, d).getDay() === weekday) count++;
  }
  return count;
}

export default function LeftPanel({ viewYear, viewMonth, showHolidays }) {
  const hero = MONTH_HERO_IMAGES[viewMonth];
  const holidays = getHolidaysForMonth(viewYear, viewMonth);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const sundays = countWeekdays(viewYear, viewMonth, 0);

  return (
    <div style={{
      background: 'var(--cal-paper-dark)',
      borderRight: '1px solid var(--cal-border)',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'relative',
    }}>
      {/* Hero image */}
      <div style={{
        width: '100%',
        aspectRatio: '1',
        borderRadius: 4,
        overflow: 'hidden',
        border: '2px solid var(--cal-border)',
        boxShadow: '0 2px 8px rgba(60,40,10,0.13)',
        position: 'relative',
        flexShrink: 0,
      }}>
        <img
          src={hero.url}
          alt={hero.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.55))',
          color: '#fff',
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 13,
          padding: '20px 10px 8px',
          textAlign: 'center',
        }}>
          {hero.label}
        </div>
      </div>

      {/* Mini stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {[
          { label: 'Days in month', value: daysInMonth },
          { label: 'Sundays', value: sundays },
          { label: 'Festivals', value: holidays.length },
        ].map(stat => (
          <div key={stat.label} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--cal-ink-muted)',
            padding: '5px 9px',
            background: 'rgba(255,255,255,0.55)',
            borderRadius: 4,
            border: '1px solid var(--cal-border)',
          }}>
            <span>{stat.label}</span>
            <span style={{ fontWeight: 500, color: 'var(--cal-ink)', fontSize: 13 }}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Holiday legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div style={{
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--cal-ink-muted)',
          marginBottom: 2,
          fontWeight: 500,
        }}>
          Holiday types
        </div>
        {[
          { type: 'national', label: 'National holiday' },
          { type: 'religious', label: 'Religious festival' },
          { type: 'cultural', label: 'Cultural occasion' },
        ].map(({ type, label }) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--cal-ink-muted)' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: HOLIDAY_COLORS[type], flexShrink: 0 }} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* This month's holidays */}
      {showHolidays && holidays.length > 0 && (
        <div>
          <div style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--cal-ink-muted)',
            fontWeight: 500,
            marginBottom: 6,
          }}>
            This month
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {holidays.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: 'var(--cal-ink)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: HOLIDAY_COLORS[h.type], flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{h.name}</span>
                <span style={{ fontSize: 10, color: 'var(--cal-ink-muted)' }}>{h.day} {SHORT_MONTHS[viewMonth]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
