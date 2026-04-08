// Indian Holidays & Festivals 2025-2026
// type: 'national' | 'religious' | 'cultural'

export const HOLIDAYS = {
  '2025': {
    0: [
      { day: 14, name: 'Makar Sankranti', type: 'cultural' },
      { day: 26, name: 'Republic Day', type: 'national' },
    ],
    1: [
      { day: 19, name: 'Maha Shivratri', type: 'religious' },
      { day: 26, name: 'Holi', type: 'religious' },
    ],
    2: [
      { day: 30, name: 'Ram Navami', type: 'religious' },
    ],
    3: [
      { day: 14, name: 'Dr. Ambedkar Jayanti', type: 'national' },
    ],
    4: [
      { day: 12, name: 'Eid al-Adha', type: 'religious' },
      { day: 23, name: 'Buddha Purnima', type: 'religious' },
    ],
    5: [
      { day: 7, name: 'Rath Yatra', type: 'cultural' },
    ],
    6: [
      { day: 9, name: 'Muharram', type: 'religious' },
    ],
    7: [
      { day: 15, name: 'Independence Day', type: 'national' },
      { day: 16, name: 'Raksha Bandhan', type: 'religious' },
      { day: 24, name: 'Janmashtami', type: 'religious' },
    ],
    8: [
      { day: 2, name: 'Ganesh Chaturthi', type: 'religious' },
      { day: 5, name: "Teacher's Day", type: 'cultural' },
      { day: 22, name: 'Navratri Begins', type: 'religious' },
    ],
    9: [
      { day: 2, name: 'Gandhi Jayanti', type: 'national' },
      { day: 2, name: 'Dussehra', type: 'religious' },
      { day: 20, name: 'Diwali', type: 'religious' },
      { day: 23, name: 'Bhai Dooj', type: 'cultural' },
    ],
    10: [
      { day: 5, name: 'Guru Nanak Jayanti', type: 'religious' },
    ],
    11: [
      { day: 25, name: 'Christmas', type: 'religious' },
      { day: 31, name: "New Year's Eve", type: 'cultural' },
    ],
  },
  '2026': {
    0: [
      { day: 1, name: "New Year's Day", type: 'cultural' },
      { day: 14, name: 'Makar Sankranti', type: 'cultural' },
      { day: 26, name: 'Republic Day', type: 'national' },
    ],
    1: [
      { day: 8, name: 'Maha Shivratri', type: 'religious' },
      { day: 28, name: 'Holi', type: 'religious' },
    ],
    2: [
      { day: 20, name: 'Ram Navami', type: 'religious' },
    ],
    3: [
      { day: 6, name: 'Eid al-Fitr', type: 'religious' },
      { day: 14, name: 'Dr. Ambedkar Jayanti', type: 'national' },
    ],
    4: [
      { day: 1, name: 'Labour Day', type: 'cultural' },
      { day: 13, name: 'Buddha Purnima', type: 'religious' },
    ],
    5: [
      { day: 18, name: 'Eid al-Adha', type: 'religious' },
    ],
    6: [],
    7: [
      { day: 5, name: 'Raksha Bandhan', type: 'religious' },
      { day: 15, name: 'Independence Day', type: 'national' },
    ],
    8: [
      { day: 5, name: "Teacher's Day", type: 'cultural' },
      { day: 20, name: 'Navratri Begins', type: 'religious' },
    ],
    9: [
      { day: 2, name: 'Gandhi Jayanti', type: 'national' },
      { day: 9, name: 'Dussehra', type: 'religious' },
      { day: 27, name: 'Diwali', type: 'religious' },
      { day: 29, name: 'Bhai Dooj', type: 'cultural' },
    ],
    10: [
      { day: 24, name: 'Guru Nanak Jayanti', type: 'religious' },
    ],
    11: [
      { day: 25, name: 'Christmas', type: 'religious' },
      { day: 31, name: "New Year's Eve", type: 'cultural' },
    ],
  },
};

export const HOLIDAY_COLORS = {
  national: '#c0392b',
  religious: '#7b3fa0',
  cultural: '#c9922a',
};

export const MONTH_HERO_IMAGES = [
  { url: 'https://images.pexels.com/photos/6408282/pexels-photo-6408282.jpeg', label: 'Start the year with courage, and the rest will follow.' },
  { url: 'https://images.pexels.com/photos/36244533/pexels-photo-36244533.jpeg', label: 'Small steps every day lead to big results.' },
  { url: 'https://images.pexels.com/photos/31709325/pexels-photo-31709325.jpeg', label: 'March forward with courage and confidence.' },
  { url: 'https://images.pexels.com/photos/5498353/pexels-photo-5498353.jpeg', label: 'Grow through every season.' },
  { url: 'https://images.pexels.com/photos/32469801/pexels-photo-32469801.jpeg', label: 'Rise stronger every day.' },
  { url: 'https://images.pexels.com/photos/30220736/pexels-photo-30220736.jpeg', label: 'Embrace the journey, rain or shine' },
  { url: 'https://images.pexels.com/photos/1482812/pexels-photo-1482812.jpeg', label: 'Keep going, keep growing' },
  { url: 'https://images.pexels.com/photos/3699921/pexels-photo-3699921.jpeg', label: 'Freedom begins with discipline' },
  { url: 'https://images.pexels.com/photos/28443488/pexels-photo-28443488.jpeg', label: 'Focus fuels success' },
  { url: 'https://images.pexels.com/photos/30203560/pexels-photo-30203560.jpeg', label: 'Shine from within.' },
  { url: 'https://images.pexels.com/photos/9969175/pexels-photo-9969175.jpeg', label: 'Gratitude changes everything' },
  { url: 'https://images.pexels.com/photos/5499125/pexels-photo-5499125.jpeg', label: "Finish strong, start stronger" },
];

export function getHolidaysForMonth(year, month) {
  const y = String(year);
  return (HOLIDAYS[y] && HOLIDAYS[y][month]) ? HOLIDAYS[y][month] : [];
}

export function getHolidaysForDay(year, month, day) {
  return getHolidaysForMonth(year, month).filter(h => h.day === day);
}
