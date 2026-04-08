'use client';
import { useState } from 'react';

const SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatRange(rangeStart, rangeEnd) {
  if (!rangeStart) return null;
  const fmt = (o) => `${o.d} ${SHORT_MONTHS[o.m]} ${o.y}`;
  if (!rangeEnd || (rangeStart.y === rangeEnd.y && rangeStart.m === rangeEnd.m && rangeStart.d === rangeEnd.d)) {
    return { label: fmt(rangeStart), days: 1 };
  }
  const rs = new Date(rangeStart.y, rangeStart.m, rangeStart.d);
  const re = new Date(rangeEnd.y, rangeEnd.m, rangeEnd.d);
  const minO = rs <= re ? rangeStart : rangeEnd;
  const maxO = rs <= re ? rangeEnd : rangeStart;
  const days = Math.round(Math.abs(re - rs) / 86400000) + 1;
  return { label: `${fmt(minO)} – ${fmt(maxO)}`, days };
}

export default function NotesPanel({ rangeStart, rangeEnd, activeNotes, onAddNote, onDeleteNote }) {
  const [inputOpen, setInputOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const rangeInfo = formatRange(rangeStart, rangeEnd);

  const handleSave = () => {
    if (!noteText.trim() || !rangeStart) return;
    onAddNote(rangeStart.y, rangeStart.m, rangeStart.d, noteText.trim());
    setNoteText('');
    setInputOpen(false);
  };

  const handleCancel = () => {
    setInputOpen(false);
    setNoteText('');
  };

  const handleAddClick = () => {
    if (!rangeStart) return;
    setInputOpen(true);
  };

  return (
    <div style={{
      borderLeft: '1px solid var(--cal-border)',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--cal-note-bg)',
      minWidth: 0,
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px 10px',
        borderBottom: '1px solid var(--cal-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
      }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: 'var(--cal-ink)' }}>
            Notes
          </div>
          <div style={{ fontSize: 11, color: 'var(--cal-ink-muted)', marginTop: 2 }}>
            {rangeInfo ? rangeInfo.label : 'Select a date to add notes'}
          </div>
        </div>
        <button
          onClick={handleAddClick}
          disabled={!rangeStart}
          style={{
            background: rangeStart ? '#c0392b' : '#e0d0b8',
            color: rangeStart ? '#fff' : '#b8a48a',
            border: 'none',
            borderRadius: 4,
            fontSize: 12,
            padding: '5px 10px',
            cursor: rangeStart ? 'pointer' : 'not-allowed',
            fontFamily: "'DM Sans', sans-serif",
            transition: 'background 0.15s',
            flexShrink: 0,
          }}
        >
          + Add
        </button>
      </div>

      {/* Selection info bar */}
      <div style={{
        padding: '7px 12px',
        background: 'var(--cal-range-bg)',
        borderBottom: '1px solid var(--cal-border)',
        fontSize: 11.5,
        color: 'var(--cal-ink-muted)',
        minHeight: 32,
        display: 'flex',
        alignItems: 'center',
      }}>
        {rangeInfo
          ? <span><strong style={{ color: 'var(--cal-ink)' }}>{rangeInfo.label}</strong>{rangeInfo.days > 1 ? ` · ${rangeInfo.days} days` : ''}</span>
          : 'No date selected'
        }
      </div>

      {/* Notes list */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minHeight: 180,
        maxHeight: 280,
      }}>
        {!rangeStart ? (
          <div style={{
            color: 'var(--cal-ink-light)',
            fontSize: 14,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            textAlign: 'center',
            padding: '28px 16px',
            lineHeight: 1.7,
          }}>
            Select a date on the calendar<br/>to view or add notes.
          </div>
        ) : activeNotes.length === 0 ? (
          <div style={{
            color: 'var(--cal-ink-light)',
            fontSize: 14,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            textAlign: 'center',
            padding: '28px 16px',
            lineHeight: 1.7,
          }}>
            No notes for this date yet.<br/>Click "+ Add" to create one.
          </div>
        ) : (
          activeNotes.map(note => (
            <div key={note.id} style={{
              background: '#fff',
              border: '1px solid var(--cal-border)',
              borderRadius: 4,
              padding: '8px 10px',
              position: 'relative',
              boxShadow: '0 1px 4px rgba(60,40,10,0.06)',
            }}>
              <div style={{
                fontSize: 12.5,
                color: 'var(--cal-ink)',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                paddingRight: 18,
              }}>
                {note.text}
              </div>
              <div style={{ fontSize: 10, color: 'var(--cal-ink-light)', marginTop: 4 }}>
                {note.timestamp}
              </div>
              <button
                onClick={() => onDeleteNote(rangeStart.y, rangeStart.m, rangeStart.d, note.id)}
                style={{
                  position: 'absolute',
                  top: 6, right: 6,
                  background: 'none',
                  border: 'none',
                  color: 'var(--cal-ink-light)',
                  cursor: 'pointer',
                  fontSize: 13,
                  lineHeight: 1,
                  padding: 2,
                }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* Input area */}
      {inputOpen && (
        <div style={{
          padding: '10px 12px 12px',
          borderTop: '1px solid var(--cal-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          animation: 'fadeIn 0.15s ease',
        }}>
          <textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder="Write a note for this date..."
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter' && e.ctrlKey) handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            style={{
              width: '100%',
              border: '1px solid var(--cal-border)',
              borderRadius: 4,
              padding: '7px 9px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12.5,
              color: 'var(--cal-ink)',
              background: '#fff',
              resize: 'vertical',
              minHeight: 68,
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
            <button onClick={handleCancel} style={{
              background: 'none',
              color: 'var(--cal-ink-muted)',
              border: '1px solid var(--cal-border)',
              borderRadius: 4,
              fontSize: 12,
              padding: '5px 10px',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}>Cancel</button>
            <button onClick={handleSave} style={{
              background: '#c0392b',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              fontSize: 12,
              padding: '5px 12px',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
            }}>Save note</button>
          </div>
        </div>
      )}
    </div>
  );
}
