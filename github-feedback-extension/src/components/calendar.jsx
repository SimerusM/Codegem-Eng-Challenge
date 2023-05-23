import React from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import './calendar.css';

export const CurrentStreak = () => {
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 17, 18, 20, 21, 22]);

    var currDate = new Date(), date = currDate.getDate();

    // calculates the current streak
    let streak = 0
    let currentStreak = 0
    let previousDay = date;

    // break is not supported in .forEach so switch to traditional for loop
    highlightedDays.reverse();
    for (let i = 0; i < highlightedDays.length; i++) {
        const day = highlightedDays[i];

        if (previousDay === day || day === previousDay - 1) {
            currentStreak += 1;
            if (currentStreak > streak) {
                streak = currentStreak;
            }
        } else {
            break;
        }

        previousDay = day;
    }

    return (
        <div>
          {(streak !== 1) ? (
            <div>{streak} Days</div>
          ) : (
            <div>{streak} Day</div>
          )}
        </div>
    );
}

export const LongestStreak = () => {
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 17, 18, 20, 21, 22]);
  
    // calculates the longest streak
    let streak = 0;
    let longestStreak = 0;
    let previousDay = null;
  
    highlightedDays.forEach((day) => {
        if (previousDay === null || day === previousDay + 1) {
            longestStreak += 1;
            if (longestStreak > streak) {
                streak = longestStreak;
            }
        } else {
            longestStreak = 1;
        }
        previousDay = day;
    });
  
    return (
        <div>
            {(streak !== 1) ? (
            <div>{streak} Days</div>
        ) : (
            <div>{streak} Day</div>
        )}
        </div>
    );
};

export default function Calendar() {
    const [value, setValue] = React.useState(new Date());

    // This would come through the user's database info
    const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 17, 18, 20, 21, 22]);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    orientation='portrait'
                    openTo='day'
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    renderDay={(day, _value, DayComponentProps) => {
                        const isSelected = 
                            !DayComponentProps.outsideCurrentMonth &&
                            highlightedDays.indexOf(day.getDate()) >= 0;
                        return (
                            <Badge
                                key={day.toString()}
                                overlap="circular"
                                badgeContent={isSelected ? '✔️' : undefined}
                            >
                                <PickersDay {...DayComponentProps} />
                            </Badge>
                        );
                    }}    
                />
            </LocalizationProvider>
        </div>
    );
}
