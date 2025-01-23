import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = ({ selectedDate, onSelectDate }) => {
  const currentDate = new Date();
  const [displayDate, setDisplayDate] = useState(currentDate);

  const generateDates = () => {
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const dates = [];
    for (let i = 0; i < firstDay; i++) {
      dates.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }
    
    return dates;
  };

  const isSelectedDate = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date) => {
    if (!date) return false;
    return date.toDateString() === new Date().toDateString();
  };

  const handleDatePress = (date) => {
    if (date) {
      onSelectDate(date);
    }
  };

  const changeMonth = (increment) => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setDisplayDate(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.arrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.monthYear}>
          {displayDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.daysHeader}>
        {DAYS.map(day => (
          <Text key={day} style={styles.dayLabel}>{day}</Text>
        ))}
      </View>

      <View style={styles.datesContainer}>
        {generateDates().map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateButton,
              isSelectedDate(date) && styles.selectedDate,
              isToday(date) && styles.today,
            ]}
            onPress={() => handleDatePress(date)}
            disabled={!date}
          >
            <Text style={[
              styles.dateText,
              isSelectedDate(date) && styles.selectedDateText,
              isToday(date) && styles.todayText,
              !date && styles.emptyDate,
            ]}>
              {date ? date.getDate() : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthYear: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  arrow: {
    color: '#fff',
    fontSize: 24,
    padding: 10,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayLabel: {
    color: 'rgba(255,255,255,0.8)',
    width: width / 7 - 10,
    textAlign: 'center',
    fontSize: 14,
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dateButton: {
    width: width / 7 - 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 20,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedDate: {
    backgroundColor: '#fff',
  },
  selectedDateText: {
    color: '#6200ee',
    fontWeight: '600',
  },
  today: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  todayText: {
    fontWeight: '600',
  },
  emptyDate: {
    color: 'transparent',
  },
});

export default Calendar; 