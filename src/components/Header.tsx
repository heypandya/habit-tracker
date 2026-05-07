import { isToday } from "date-fns";
import { useHabits } from "../context/useHabits";
import { Button } from "./Button";
import { format } from "date-fns";

type HeaderProps = {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
};
export function Header({ visibleDates, onNext, onPrev }: HeaderProps) {
  const { habits } = useHabits();

  const doneToday = habits.filter((h) =>
    h.completions.some((done) => isToday(done)),
  ).length;

  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`;
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <span className="text-zinc-400 text-sm">
          {doneToday} / {habits.length} done Today
        </span>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <span>{dateRange}</span>
        <div className="flex items-center gap-3">
          {/* <Button text="Prev" />
          <Button text="Next" /> */}
          <Button onClick={onPrev}>Prev</Button>
          <Button
            onClick={onNext}
            disabled={visibleDates.some((d) => isToday(d))}
          >
            Next
          </Button>
        </div>
      </div>
    </header>
  );
}
