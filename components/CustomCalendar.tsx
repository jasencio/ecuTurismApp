import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

interface MarkedDates {
  [date: string]: {
    disabled?: boolean;
    disableTouchEvent?: boolean;
    selected?: boolean;
    selectedColor?: string;
  };
}

interface TimeSlot {
  label: string;
  value: string;
}

interface CustomCalendarProps {
  daysWeekEnabled?: string[];
  timeOpenWeek?: string | null;
  timeCloseWeek?: string | null;
  timeOpenSaturday?: string | null;
  timeCloseSaturday?: string | null;
  timeOpenSunday?: string | null;
  timeCloseSunday?: string | null;
  routeMinutes?: number;
  onTimeSlotsChange?: (slots: TimeSlot[]) => void;
}

export default function CustomCalendar({
  daysWeekEnabled = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  timeOpenWeek,
  timeCloseWeek,
  timeOpenSaturday,
  timeCloseSaturday,
  timeOpenSunday,
  timeCloseSunday,
  routeMinutes = 60,
  onTimeSlotsChange
}: CustomCalendarProps) {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [selected, setSelected] = useState("");
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const generateTimeSlots = (startTime: string, endTime: string): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    let currentTime = new Date();
    currentTime.setHours(startHour, startMinute, 0);
    
    const endDateTime = new Date();
    endDateTime.setHours(endHour, endMinute, 0);
    
    while (currentTime < endDateTime) {
      const slotStart = new Date(currentTime);
      const slotEnd = new Date(currentTime.getTime() + routeMinutes * 60000);
      
      if (slotEnd <= endDateTime) {
        const startStr = slotStart.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        const endStr = slotEnd.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        
        slots.push({
          label: `${startStr} a ${endStr}`,
          value: `${startStr}-${endStr}`
        });
      }
      
      currentTime.setMinutes(currentTime.getMinutes() + routeMinutes);
    }
    
    return slots;
  };

  const getTimeSlotsForDay = (dateString: string): TimeSlot[] => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    
    let startTime: string | null = null;
    let endTime: string | null = null;
    
    if (dayName === "Saturday") {
      startTime = timeOpenSaturday || null;
      endTime = timeCloseSaturday || null;
    } else if (dayName === "Sunday") {
      startTime = timeOpenSunday || null;
      endTime = timeCloseSunday || null;
    } else {
      startTime = timeOpenWeek || null;
      endTime = timeCloseWeek || null;
    }
    
    if (!startTime || !endTime) return [];
    
    return generateTimeSlots(startTime, endTime);
  };

  useEffect(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const marks: MarkedDates = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
      const dateStr = d.toISOString().split("T")[0];

      if (!daysWeekEnabled.includes(dayName)) {
        marks[dateStr] = { disabled: true, disableTouchEvent: true };
      }
    }

    const min = today.toISOString().split("T")[0];
    const maxDateObj = new Date();
    maxDateObj.setDate(today.getDate() + 14);
    const max = maxDateObj.toISOString().split("T")[0];

    setMinDate(min);
    setMaxDate(max);
    setMarkedDates(marks);
  }, [daysWeekEnabled]);

  useEffect(() => {
    if (selected) {
      const timeSlots = getTimeSlotsForDay(selected);
      onTimeSlotsChange?.(timeSlots);
    } else {
      onTimeSlotsChange?.([]);
    }
  }, [selected, timeOpenWeek, timeCloseWeek, timeOpenSaturday, timeCloseSaturday, timeOpenSunday, timeCloseSunday, routeMinutes]);

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        hideArrows={true}
        minDate={minDate}
        maxDate={maxDate}
        markedDates={{
          ...markedDates,
          [selected]: {
            ...markedDates[selected],
            selected: true,
            selectedColor: "#008000",
          },
        }}
        disableAllTouchEventsForDisabledDays={true}
        onDayPress={(day: { dateString: string }) => {
          console.log("Selected day", day.dateString);
          setSelected(day.dateString);
        }}
      />
    </View>
  );
}
