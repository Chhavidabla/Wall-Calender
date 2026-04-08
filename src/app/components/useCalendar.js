'use client';
import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'walcal_notes_v2';

function loadNotes() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveNotesToStorage(notes) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function noteKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function useCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [notes, setNotes] = useState({});
  const [showHolidays, setShowHolidays] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [animDir, setAnimDir] = useState(null);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  const goToPrevMonth = useCallback(() => {
    setAnimDir('left');
    setTimeout(() => setAnimDir(null), 320);
    setViewMonth(m => {
      if (m === 0) { setViewYear(y => y - 1); return 11; }
      return m - 1;
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setAnimDir('right');
    setTimeout(() => setAnimDir(null), 320);
    setViewMonth(m => {
      if (m === 11) { setViewYear(y => y + 1); return 0; }
      return m + 1;
    });
  }, []);

  const goToToday = useCallback(() => {
    const t = new Date();
    setViewYear(t.getFullYear());
    setViewMonth(t.getMonth());
  }, []);

  const handleDayClick = useCallback((y, m, d) => {
    if (!rangeStart) {
      setRangeStart({ y, m, d });
      setRangeEnd(null);
    } else if (!rangeEnd) {
      const rsTime = new Date(rangeStart.y, rangeStart.m, rangeStart.d).getTime();
      const clickedTime = new Date(y, m, d).getTime();
      if (clickedTime < rsTime) {
        setRangeStart({ y, m, d });
        setRangeEnd(null);
      } else {
        setRangeEnd({ y, m, d });
      }
    } else {
      setRangeStart({ y, m, d });
      setRangeEnd(null);
    }
  }, [rangeStart, rangeEnd]);

  const clearSelection = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
  }, []);

  const addNote = useCallback((year, month, day, text) => {
    const key = noteKey(year, month, day);
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
    setNotes(prev => {
      const updated = {
        ...prev,
        [key]: [...(prev[key] || []), { id: Date.now(), text, timestamp }],
      };
      saveNotesToStorage(updated);
      return updated;
    });
  }, []);

  const deleteNote = useCallback((year, month, day, id) => {
    const key = noteKey(year, month, day);
    setNotes(prev => {
      const updated = { ...prev };
      updated[key] = (updated[key] || []).filter(n => n.id !== id);
      if (updated[key].length === 0) delete updated[key];
      saveNotesToStorage(updated);
      return updated;
    });
  }, []);

  const getDayState = useCallback((y, m, d) => {
    const today = new Date();
    const isToday = y === today.getFullYear() && m === today.getMonth() && d === today.getDate();
    const cellTime = new Date(y, m, d).getTime();

    let isRangeStart = false, isRangeEnd = false, isInRange = false;

    if (rangeStart) {
      const rsTime = new Date(rangeStart.y, rangeStart.m, rangeStart.d).getTime();
      if (rangeEnd) {
        const reTime = new Date(rangeEnd.y, rangeEnd.m, rangeEnd.d).getTime();
        const minT = Math.min(rsTime, reTime), maxT = Math.max(rsTime, reTime);
        if (cellTime === minT) isRangeStart = true;
        else if (cellTime === maxT) isRangeEnd = true;
        else if (cellTime > minT && cellTime < maxT) isInRange = true;
      } else {
        if (cellTime === rsTime) isRangeStart = true;
      }
    }

    const key = noteKey(y, m, d);
    const hasNotes = (notes[key] || []).length > 0;

    return { isToday, isRangeStart, isRangeEnd, isInRange, hasNotes };
  }, [rangeStart, rangeEnd, notes]);

  const getNotesForDay = useCallback((y, m, d) => {
    return notes[noteKey(y, m, d)] || [];
  }, [notes]);

  const getActiveNotes = useCallback(() => {
    if (!rangeStart) return [];
    return getNotesForDay(rangeStart.y, rangeStart.m, rangeStart.d);
  }, [rangeStart, getNotesForDay]);

  const toggleDarkMode = useCallback(() => setDarkMode(d => !d), []);
  const toggleHolidays = useCallback(() => setShowHolidays(s => !s), []);

  return {
    viewYear, viewMonth,
    rangeStart, rangeEnd,
    notes, showHolidays, darkMode, animDir,
    goToPrevMonth, goToNextMonth, goToToday,
    handleDayClick, clearSelection,
    addNote, deleteNote,
    getDayState, getNotesForDay, getActiveNotes,
    toggleDarkMode, toggleHolidays,
    today,
  };
}
