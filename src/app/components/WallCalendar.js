'use client';
import { useEffect } from 'react';
import { useCalendar } from './useCalendar';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import LeftPanel from './LeftPanel';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function WallCalendar() {
  const {
    viewYear, viewMonth,
    rangeStart, rangeEnd,
    showHolidays, darkMode, animDir,
    goToPrevMonth, goToNextMonth, goToToday,
    handleDayClick,
    addNote, deleteNote,
    getDayState, getActiveNotes,
    toggleDarkMode, toggleHolidays,
  } = useCalendar();

  const activeNotes = getActiveNotes();

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.matches('textarea, input')) return;
      if (e.key === 'ArrowLeft') goToPrevMonth();
      if (e.key === 'ArrowRight') goToNextMonth();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goToPrevMonth, goToNextMonth]);

  const cssVars = darkMode ? {
    '--cal-paper': '#2a2218',
    '--cal-paper-dark': '#241e15',
    '--cal-ink': '#a88627',
    '--cal-ink-muted': '#d5cfc4',
    '--cal-ink-light': '#ce6c1d',
    '--cal-border': '#3a3020',
    '--cal-range-bg': '#f8eea2',
    '--cal-note-bg': '#251f16',
    '--cal-gold': '#c9922a',
  } : {
    '--cal-paper': '#fdf8f0',
    '--cal-paper-dark': '#f5ede0',
    '--cal-ink': '#1a1208',
    '--cal-ink-muted': '#6b5c42',
    '--cal-ink-light': '#b8a48a',
    '--cal-border': '#e0d0b8',
    '--cal-range-bg': '#f0e6d8',
    '--cal-note-bg': '#fffbf5',
    '--cal-gold': '#c9922a',
  };

  // Spiral holes
  const holes = Array.from({ length: 14 });

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: darkMode ? '#1a1410' : '#e8ddd0',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23c4b49a' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 16,
        fontFamily: "'DM Sans', sans-serif",
        transition: 'background 0.3s',
      }}>
        <div style={{
          ...cssVars,
          background: 'var(--cal-paper)',
          borderRadius: 4,
          maxWidth: 1060,
          width: '100%',
          boxShadow: darkMode
            ? '0 8px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)'
            : '0 8px 40px rgba(60,40,10,0.22), 0 2px 8px rgba(60,40,10,0.12)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.3s',
        }}>
          {/* Spiral binding top strip */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: 12,
            backgroundImage: 'repeating-linear-gradient(90deg, #888 0, #888 2px, transparent 2px, transparent 40px)',
            opacity: 0.18,
            zIndex: 10,
            pointerEvents: 'none',
          }} />

          {/* Spiral holes */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            display: 'flex',
            justifyContent: 'space-around',
            padding: '0 32px',
            zIndex: 11,
            pointerEvents: 'none',
          }}>
            {holes.map((_, i) => (
              <div key={i} style={{
                width: 18, height: 18,
                borderRadius: '50%',
                background: darkMode ? '#1a1410' : '#e8ddd0',
                border: `1.5px solid ${darkMode ? '#4a4030' : '#b0a090'}`,
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                marginTop: -1,
              }} />
            ))}
          </div>

          {/* Top bar */}
          <div style={{
            background: '#c0392b',
            padding: '18px 28px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <button onClick={goToPrevMonth} style={{
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                width: 34, height: 34,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>←</button>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#fff',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                }}>
                  {MONTHS[viewMonth]}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.78)',
                  letterSpacing: '0.18em',
                }}>
                  {viewYear}
                </div>
              </div>

              <button onClick={goToNextMonth} style={{
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                width: 34, height: 34,
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>→</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                color: 'rgba(255,255,255,0.85)',
                cursor: 'pointer',
                userSelect: 'none',
              }}>
                <input
                  type="checkbox"
                  checked={showHolidays}
                  onChange={toggleHolidays}
                  style={{ accentColor: '#fff', width: 13, height: 13, cursor: 'pointer' }}
                />
                Festivals
              </label>

              <button onClick={toggleDarkMode} title="Toggle dark mode" style={{
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                width: 32, height: 32,
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {darkMode ? '☀' : '☽'}
              </button>

              <button onClick={goToToday} title="Go to today" style={{
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                width: 32, height: 32,
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: 11,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Today
              </button>
            </div>
          </div>

          {/* Body */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 220px) 1fr minmax(0, 220px)',
          }}>
            {/* Left panel - hidden on small screens via media queries aren't available inline, but we render it */}
            <LeftPanel viewYear={viewYear} viewMonth={viewMonth} showHolidays={showHolidays} />

            {/* Calendar grid */}
            <CalendarGrid
              viewYear={viewYear}
              viewMonth={viewMonth}
              getDayState={getDayState}
              onDayClick={handleDayClick}
              showHolidays={showHolidays}
              animDir={animDir}
            />

            {/* Notes panel */}
            <NotesPanel
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              activeNotes={activeNotes}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
            />
          </div>
        </div>
      </div>
    </>
  );
}
