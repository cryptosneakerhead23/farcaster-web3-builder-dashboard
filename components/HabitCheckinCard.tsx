'use client';

import { useEffect, useState } from 'react';

type HabitState = {
  lastCheckin: string | null;
  streak: number;
};

const STORAGE_KEY = 'builder-habit';

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function HabitCheckinCard() {
  const [state, setState] = useState<HabitState>({
    lastCheckin: null,
    streak: 0,
  });

  useEffect(() => {
    const raw =
      typeof window !== 'undefined'
        ? localStorage.getItem(STORAGE_KEY)
        : null;
    if (raw) {
      setState(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const today = new Date();

  const handleCheckin = () => {
    if (state.lastCheckin) {
      const last = new Date(state.lastCheckin);

      if (isSameDay(last, today)) {
        return;
      }

      const diffDays = Math.floor(
        (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        setState({
          lastCheckin: today.toISOString(),
          streak: state.streak + 1,
        });
      } else {
        setState({ lastCheckin: today.toISOString(), streak: 1 });
      }
    } else {
      setState({ lastCheckin: today.toISOString(), streak: 1 });
    }
  };

  const canCheckIn =
    !state.lastCheckin ||
    !isSameDay(new Date(state.lastCheckin), today);

  return (
    <section className="border rounded-lg p-4 max-w-md w-full">
      <h2 className="text-lg font-semibold mb-2">Daily Builder Habit</h2>
      <p className="mb-2">Streak: {state.streak} day(s)</p>
      <button
        onClick={handleCheckin}
        disabled={!canCheckIn}
        className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-gray-400"
      >
        {canCheckIn ? 'Check in for today' : 'Already checked in today'}
      </button>
    </section>
  );
}
