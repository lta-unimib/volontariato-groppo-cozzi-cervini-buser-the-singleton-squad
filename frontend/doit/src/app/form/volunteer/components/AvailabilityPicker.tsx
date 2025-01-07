import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Calendar } from "@/components/ui/Calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";
import { MdCalendarMonth } from "react-icons/md";
import { useAvailabilityDialog } from '@/app/form/volunteer/hooks/useAvailabilityDialog';
import { timeSlots, weekDays, getDisplayText } from '@/app/form/volunteer/utils/formUtils';
import { isTimeInRange, isAvailabilityValid } from '@/app/form/volunteer/utils/formValidation';
import { AvailabilityMode, AvailabilityDialogProps } from "@/types/availabilityData";
import { DateRange } from "react-day-picker";

export const AvailabilityDialog: React.FC<AvailabilityDialogProps> = ({ onSaveAction }) => {
  const {
    open,
    setOpen,
    selectedMode,
    selectedTimeRange,
    selectedWeekDays,
    selectedDateRange,
    setSelectedTimeRange,
    setSelectedWeekDays,
    setSelectedDateRange,
    handleModeChange,
    handleSave,
    handleCancel
  } = useAvailabilityDialog(onSaveAction);

  const handleTimeSelect = (time: string) => {
    if (selectedTimeRange.length === 2) {
      setSelectedTimeRange([time]);
    } else if (selectedTimeRange.length === 1) {
      const start = selectedTimeRange[0];
      const end = time;
      if (start <= end) {
        setSelectedTimeRange([start, end]);
      } else {
        setSelectedTimeRange([end, start]);
      }
    } else {
      setSelectedTimeRange([time]);
    }
  };

  const handleWeekDaySelect = (day: string) => {
    setSelectedWeekDays(prev =>
        prev.includes(day)
            ? prev.filter(d => d !== day)
            : [...prev, day]
    );
  };

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
              variant="outline"
              className={cn(
                  "w-full justify-start text-left font-normal rounded-full",
                  isAvailabilityValid(selectedMode, selectedTimeRange, selectedWeekDays, selectedDateRange)
                      ? "text-foreground"
                      : "text-muted-foreground"
              )}
          >
            <MdCalendarMonth className="mr-2 h-5 w-5" />
            {getDisplayText(selectedMode, selectedTimeRange, selectedWeekDays, selectedDateRange)}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[90%] sm:max-w-[425px] w-full p-6 sm:mx-0 rounded-2xl">
          <DialogHeader>
            <DialogTitle>Seleziona Disponibilità</DialogTitle>
          </DialogHeader>

          <Tabs value={selectedMode} onValueChange={(value) => handleModeChange(value as AvailabilityMode)} className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-3 rounded-full p-1">
              <TabsTrigger value="daily" className="rounded-full">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="rounded-full">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="rounded-full">Monthly</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="mt-4">
              <ScrollArea className="h-[348px] w-full rounded-2xl border">
                <div className="grid grid-cols-3 gap-2 p-4">
                  {timeSlots.map((time) => (
                      <Button
                          key={time}
                          variant={isTimeInRange(time, selectedTimeRange) ? "default" : "outline"}
                          onClick={() => handleTimeSelect(time)}
                          className={cn(
                              "rounded-full w-full",
                              selectedTimeRange.includes(time) && "bg-primary text-primary-foreground"
                          )}
                      >
                        {time}
                      </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="weekly" className="mt-4">
              <div className="h-[348px] w-full rounded-2xl border flex flex-col gap-2 p-4">
                {weekDays.map((day) => (
                    <Button
                        key={day}
                        variant={selectedWeekDays.includes(day) ? "default" : "outline"}
                        onClick={() => handleWeekDaySelect(day)}
                        className="rounded-full w-full"
                    >
                      {day}
                    </Button>
                ))}
              </div>
            </TabsContent>


            <TabsContent value="monthly" className="mt-4">
              <div className="flex justify-center h-[348px] w-full rounded-2xl border p-4">
                <Calendar
                    mode="range"
                    selected={selectedDateRange}
                    onSelect={(range: DateRange | undefined) => {
                      if (range) {
                        setSelectedDateRange(range);
                      }
                    }}
                    className="rounded-md"
                    showOutsideDays={false}
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto rounded-full"
            >
              Annulla
            </Button>
            <Button
                onClick={handleSave}
                className="w-full sm:w-auto rounded-full"
                disabled={
                    (selectedMode === 'daily' && selectedTimeRange.length !== 2) ||
                    (selectedMode === 'weekly' && selectedWeekDays.length === 0) ||
                    (selectedMode === 'monthly' && (!selectedDateRange?.from || !selectedDateRange?.to))
                }
            >
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};