"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const today = new Date()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4 w-fit rounded-xl bg-white", className)}
      classNames={{
        months: "flex flex-col",
        month: "space-y-4",

        caption: "flex justify-between items-center px-2",
        caption_label: "text-base font-semibold uppercase tracking-wide",

        nav: "flex items-center gap-2",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 rounded-full"
        ),

        table: "w-full border-collapse",
        head_row: "flex justify-between",
        head_cell:
          "w-10 text-xs text-muted-foreground font-medium text-center",

        row: "flex justify-between mt-2",

        cell: "w-10 h-10 text-center relative",

        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-10 w-10 rounded-full font-medium"
        ),

        day_selected:
          "bg-blue-500 text-white rounded-full hover:bg-blue-500",

        day_today:
          "border border-blue-500 text-blue-600 rounded-full",

        day_outside: "text-gray-300",

        ...classNames,
      }}
      formatters={{
        formatCaption: (date) =>
          date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }).toUpperCase(),
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      footer={
        <div className="text-center text-xs pt-3 border-t mt-3 text-blue-500 font-medium">
          TODAY {today.getDate()}
        </div>
      }
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"
export { Calendar }
