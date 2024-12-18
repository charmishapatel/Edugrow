import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import firestore from "@react-native-firebase/firestore";

interface MarkedDate {
  marked: boolean;
  dotColor: string;
  title: string;
}

function CalendarScreen({ route, navigation }: { route: any; navigation: any }): React.JSX.Element {

  // local state
  const [selectedDate, setSelectedDate] = useState<string>(""); 
  const [markedDates, setMarkedDates] = useState<Record<string, MarkedDate[]>>({}); 
  const [events, setEvents] = useState<any[]>([]);

  // Fetch assignments from Firestore
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const snapshot = await firestore().collection("assignment").get();
        const fetchedData: Record<string, MarkedDate[]> = {};

        snapshot.forEach((doc) => {
          const { dueDate, title } = doc.data();
          if (dueDate && title) {
            fetchedData[dueDate] = [
              ...(fetchedData[dueDate] || []),
              { marked: true, dotColor: "blue", title }
            ];
          }
        });

        setMarkedDates(fetchedData);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

 
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    const eventsForDay = markedDates[day.dateString] || [];
    setEvents(eventsForDay);
  };

  const handleEventClick = (title: string, dueDate: string) => {
    navigation.navigate("AssignmentDetails", { title, dueDate });
  };

  return (
    <View style={styles.container}>
      {/* Calendar  */}
      <Calendar
        onDayPress={handleDayPress}
        markedDates={Object.fromEntries(
          Object.keys(markedDates).map((key) => [key, { marked: true, dotColor: "blue" }])
        )}
        style={styles.Calendar}
      />

      {/* Events for Selected Date */}
      <View style={styles.eventsContainer}>
        <Text style={styles.eventsHeader}>
          Events for {selectedDate || "Selected Date"}:
        </Text>
        {events.length > 0 ? (
          <FlatList
            data={events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.eventItem}
                onPress={() => handleEventClick(item.title, selectedDate)}
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style = {styles.txt}>No events for this date</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 20 
  },
  Calendar: {
    marginHorizontal: 10, 
    elevation: 3, 
    shadowColor: "#000", 
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: 400, 
  },
  eventsContainer: { 
    marginTop: 20, 
    padding: 10,
    backgroundColor: '#E8EFCF'
  },
  eventsHeader: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  eventItem: {
    marginTop: 5,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 5,
  },
  txt : {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 5,
  }
});

export default CalendarScreen;
