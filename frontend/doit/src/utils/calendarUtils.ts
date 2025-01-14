import { cn } from "@/lib/utils"

export const calendarVariants = {
    baseMonth: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center",
    captionLabel: "text-sm font-medium",
    nav: "space-x-1 flex items-center",
    navButton: cn(
        "flex items-center justify-center h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-full border text-sm [&>svg]:h-2 [&>svg]:w-2"
    ),
    navButtonPrevious: "absolute left-1",
    navButtonNext: "absolute right-1",
    table: "w-full border-collapse space-y-1",
    headRow: "flex",
    headCell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
    row: "flex w-full mt-2",
    cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-transparent [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
    day: cn(
        "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-transparent"
    ),
    dayRangeEnd: "day-range-end",
    daySelected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
    dayToday: "bg-accent text-accent-foreground",
    dayOutside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
    dayDisabled: "text-muted-foreground opacity-50",
    dayRangeMiddle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
    dayHidden: "invisible",
}