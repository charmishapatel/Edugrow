
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import PieChart from 'react-native-pie-chart';

interface AssignmentDetails {
  title: string;
  grade: string;
  marks: string;
}
function Grades() {
  // local state
  const [assignments, setAssignments] = useState<AssignmentDetails[]>([]); 
  const [loading, setLoading] = 
  useState<boolean>(true); 


  // fetching grades from firestore
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const snapshot = await firestore().collection("assignmentDetails").get();
        const assignmentList = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            title: doc.id, 
            grade: data.grade || "N/A",
            marks: data.marks || "0",
          };
        });
        
        setAssignments(assignmentList);
      } catch (error) {
        console.error("Error fetching assignments: ", error);
        Alert.alert("Error", "Failed to fetch assignments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []); 
  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {assignments.length === 0 ? (
        <Text style={styles.noData}>No assignments found.</Text>
      ) : (
        <FlatList
          data={assignments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.assignmentItem}>
              <Text style={styles.assignmentText}>Title: {item.title}</Text>
              <Text style={styles.assignmentText}>Grade: {item.grade}</Text>
              <Text style={styles.assignmentText}>Marks: {item.marks}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  assignmentItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#D2E0FB",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  assignmentText: {
    fontSize: 18,
    marginBottom: 5,
  },
  noData: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Grades;
