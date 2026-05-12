"use client";
import * as React from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type SimpleCalendarProps = {
  value?: Date;
  onChange?: (date?: Date) => void;
  className?: string;
};

export function SimpleCalendar({ value, onChange, className }: SimpleCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState<Date>(value ?? today);
  React.useEffect(() => {
    if (value) setCurrentMonth(value);
  }, [value]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const weeks: React.ReactElement[] = [];
  let days: React.ReactElement[] = [];
  let day = startDate;
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const inMonth = isSameMonth(day, monthStart);
      const isSelected = value ? isSameDay(day, value) : false;
      const isToday = isSameDay(day, today);
      days.push(
        <button
          key={day.toISOString()}
          disabled={!inMonth}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal rounded-full",
            !inMonth && "opacity-0 pointer-events-none",
            isSelected && "bg-primary text-primary-foreground",
            !isSelected && isToday && "bg-accent text-accent-foreground"
          )}
          onClick={() => inMonth && onChange?.(day)}
        >
          {format(day, "d")}
        </button>
      );
      day = addDays(day, 1);
    }
    weeks.push(<div key={day.toISOString()} className="grid grid-cols-7 gap-1">{days}</div>);
    days = [];
  }

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-center items-center relative mb-2">
        <button
          className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1")}
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium">{format(currentMonth, "MMMM yyyy")}</div>
        <button
          className={cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1")}
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1 text-[0.8rem] text-muted-foreground">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="text-center rounded-md w-9">{d}</div>
        ))}
      </div>
      {weeks}
      <div className="text-center text-sm text-muted-foreground pt-2 border-t mt-2">
        <button
          type="button"
          onClick={() => onChange?.(today)}
          className={cn(buttonVariants({ variant: "link" }), "h-auto p-0 text-muted-foreground")}
        >
          Today
        </button>
      </div>
    </div>
  );
}
