import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { Calendar } from "@/components/ui/Calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

type AvailabilityMode = 'daily' | 'weekly' | 'monthly';

export interface AvailabilityData {
  mode: AvailabilityMode;
  data: string[] | DateRange;
}

interface AvailabilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveAction: (data: AvailabilityData) => void;
}


const AvailabilityDialog: React.FC<AvailabilityDialogProps> = ({
                                                                 onSaveAction
                                                               }) => {
  const [open, setOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<AvailabilityMode>('daily');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string[]>([]);
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });

  const timeSlots: string[] = Array.from({ length: 24 }, (_, i) =>
      `${i.toString().padStart(2, '0')}:00`
  );

  const weekDays: string[] = [
    'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì',
    'Venerdì', 'Sabato', 'Domenica'
  ];

  const getDisplayText = (): string => {
    if (selectedMode === 'daily' && selectedTimeRange.length === 2) {
      return `Daily: ${selectedTimeRange[0]} - ${selectedTimeRange[1]}`;
    }
    if (selectedMode === 'weekly' && selectedWeekDays.length > 0) {
      return `Weekly: ${selectedWeekDays.length} giorni selezionati`;
    }
    if (selectedMode === 'monthly' && selectedDateRange?.from && selectedDateRange?.to) {
      return `Monthly: ${selectedDateRange.from.toLocaleDateString()} - ${selectedDateRange.to.toLocaleDateString()}`;
    }
    return "Seleziona disponibilità";
  };

  const handleTimeSelect = (time: string): void => {
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

  const handleWeekDaySelect = (day: string): void => {
    setSelectedWeekDays(prev =>
        prev.includes(day)
            ? prev.filter(d => d !== day)
            : [...prev, day]
    );
  };

  const isTimeInRange = (time: string): boolean => {
    if (selectedTimeRange.length !== 2) return false;
    const [start, end] = selectedTimeRange;
    return time >= start && time <= end;
  };

  const handleModeChange = (mode: AvailabilityMode): void => {
    setSelectedMode(mode);
    setSelectedTimeRange([]);
    setSelectedWeekDays([]);
    setSelectedDateRange({ from: undefined, to: undefined });
  };

  const handleSave = (): void => {
    const isValid =
        (selectedMode === 'daily' && selectedTimeRange.length === 2) ||
        (selectedMode === 'weekly' && selectedWeekDays.length > 0) ||
        (selectedMode === 'monthly' && selectedDateRange?.from && selectedDateRange?.to);

    if (isValid) {
      onSaveAction({
        mode: selectedMode,
        data: selectedMode === 'daily' ? selectedTimeRange :
            selectedMode === 'weekly' ? selectedWeekDays :
                selectedDateRange as DateRange
      });
      setOpen(false);
    }
  };

  const handleCancel = (): void => {
    setSelectedTimeRange([]);
    setSelectedWeekDays([]);
    setSelectedDateRange({ from: undefined, to: undefined });
    setOpen(false);
  };

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
              variant="outline"
              className={cn(
                  "w-full justify-start text-left font-normal rounded-full",
                  (selectedTimeRange.length === 2 || selectedWeekDays.length > 0 || (selectedDateRange?.from && selectedDateRange?.to))
                      ? "text-foreground"
                      : "text-muted-foreground"
              )}
          >
            <CalendarIcon className="mr-2 h-5 w-5" />
            {getDisplayText()}
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
              <ScrollArea className="h-[348px] w-full rounded-lg border">
                <div className="grid grid-cols-3 gap-2 p-4">
                  {timeSlots.map((time) => (
                      <Button
                          key={time}
                          variant={isTimeInRange(time) ? "default" : "outline"}
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
              <div className="h-[348px] w-full rounded-lg border flex flex-col gap-2 p-4">
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
              <div className="flex justify-center h-[348px] w-full rounded-lg border p-4">
                <Calendar
                    mode="range"
                    selected={selectedDateRange}
                    onSelect={(range: DateRange | undefined) => setSelectedDateRange(range)}
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

export default AvailabilityDialog;