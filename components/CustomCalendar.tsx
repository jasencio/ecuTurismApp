import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

const schedule = {
  daysWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  daysWeekDisabled: ["Sunday"],
};

export default function CustomCalendar() {
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const marks = {};
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
      const dateStr = d.toISOString().split("T")[0];

      if (schedule.daysWeekDisabled.includes(dayName)) {
        marks[dateStr] = { disabled: true, disableTouchEvent: true };
      }
    }
    const min = today.toISOString().split("T")[0];
    const maxDateObj = new Date();
    maxDateObj.setDate(today.getDate() + 14);
    const max = maxDateObj.toISOString().split("T")[0];

    setMinDate(min);
    setMaxDate(max);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        hideArrows={true}
        minDate={minDate}
        maxDate={maxDate}
        markedDates={{
          [selected]: {
            selected: true,
            selectedColor: "#008000",
          },
        }}
        disableAllTouchEventsForDisabledDays={true}
        onDayPress={(day) => {
          console.log("Selected day", day.dateString);
          setSelected(day.dateString);
        }}
      />
    </View>
  );
}
