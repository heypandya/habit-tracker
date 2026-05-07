import { isSameDay } from "date-fns";
import { type ReactNode } from "react";
import { HabitContext, type Habit } from "./useHabits";
import { useLocalStorage } from "../hooks/useLocalStorage";
type HabitProviderProps = {
  children: ReactNode;
};

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", []);

  function addHabit(name: string) {
    // setHabits([...habits, { id: crypto.randomUUID(), name }]);// or
    setHabits((curr) => [
      ...curr,
      { id: crypto.randomUUID(), name, completions: [] },
    ]);
  }

  function deleteHabit(id: string) {
    setHabits((curr) => curr.filter((habit) => habit.id !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits((curr) =>
      curr.map((habit) => {
        if (habit.id !== id) return habit;

        const alreadyDone = habit.completions.some((done) =>
          isSameDay(done, date),
        );
        const completions = alreadyDone
          ? habit.completions.filter((done) => !isSameDay(done, date))
          : [...habit.completions, date];

        return { ...habit, completions };
      }),
    );
  }

  return (
    <HabitContext value={{ habits, addHabit, toggleHabit, deleteHabit }}>
      {children}
    </HabitContext>
  );
}
