"use client"

import type * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/utils/cnUtils"
import { calendarVariants } from "@/utils/components/calendarUtils"
import type { DateRange } from "react-day-picker"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

/**
 * Calendar component that wraps the `DayPicker` from `react-day-picker` and provides custom styling.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} [props.className] - Additional custom class names to be applied to the calendar container.
 * @param {Record<string, string>} [props.classNames] - Custom class names for specific calendar elements (e.g., months, table, day).
 * @param {boolean} [props.showOutsideDays=true] - Whether to show days outside the current month in the calendar view.
 * @param {DateRange} [props.selected] - The selected date range (from and to date).
 *
 * @returns The rendered calendar component.
 */
function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: calendarVariants.baseMonth,
                month: calendarVariants.month,
                caption: calendarVariants.caption,
                caption_label: calendarVariants.captionLabel,
                nav: calendarVariants.nav,
                nav_button: calendarVariants.navButton,
                nav_button_previous: calendarVariants.navButtonPrevious,
                nav_button_next: calendarVariants.navButtonNext,
                table: calendarVariants.table,
                head_row: calendarVariants.headRow,
                head_cell: calendarVariants.headCell,
                row: calendarVariants.row,
                cell: calendarVariants.cell,
                day: calendarVariants.day,
                day_range_end: calendarVariants.dayRangeEnd,
                day_selected: calendarVariants.daySelected,
                day_today: calendarVariants.dayToday,
                day_outside: calendarVariants.dayOutside,
                day_disabled: calendarVariants.dayDisabled,
                day_range_middle: calendarVariants.dayRangeMiddle,
                day_hidden: calendarVariants.dayHidden,
                ...classNames,
            }}
            {...props}
        />
    )
}

Calendar.displayName = "Calendar"

export { Calendar, type DateRange }