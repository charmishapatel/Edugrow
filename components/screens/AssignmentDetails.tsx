
import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox"; 
import * as Progress from 'react-native-progress';
import firestore from "@react-native-firebase/firestore";


function AssignmentDetails({ route, navigation } : { route: any; navigation: any }) {
  const { 
    title, 
    updateGrades, 
    existingGrade 
  } = route.params;

  // local state
  const [tasks, setTasks] = useState<{ task: string; isChecked: boolean }[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [showGradeInput, setShowGradeInput] = useState(false);
  const [marks, setMarks] = useState("");
  const [grade, setGrade] = useState("");


  useEffect(() => {
    const unsubscribe = firestore()
      .collection("assignmentDetails")
      .doc(title)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (data) { // Ensure data is not undefined
            setTasks(data.tasks || []); // Update tasks
            setMarks(data.marks || ""); // Update marks
            setGrade(data.grade || ""); // Update grade
          }
        }
      });
  
    return () => unsubscribe(); // Clean up listener when the component unmounts
  }, [title]);
  

  // add Task
  const addTask = async () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { task: newTask, isChecked: false }];
      setTasks(updatedTasks);
      setNewTask("");
      await firestore().collection("assignmentDetails").doc(title).set(
        { tasks: updatedTasks },
        { merge: true }
      );
    } else {
      Alert.alert("Error", "Task name cannot be empty.");
    }
  };
  

  const handleCheck = async (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
    setTasks(updatedTasks);
    await firestore().collection("assignmentDetails").doc(title).set(
      { tasks: updatedTasks },
      { merge: true }
    );
  };
  
  // Progress
  const calculateProgress = () => {
    return tasks.length > 0
      ? (tasks.filter((task) => task.isChecked).length / tasks.length) * 100
      : 0;
  };
  // grades
  const handleGradeInput = () => {
    setShowGradeInput(true);
  };

  // grades submission
  const handleSubmitGrade = async () => {
    if (marks.trim() && grade.trim()) {
      await firestore().collection("assignmentDetails").doc(title).set(
        { marks, grade },
        { merge: true }
      );
      Alert.alert("Success", "Grade submitted successfully.");
      setShowGradeInput(false);
    } else {
      Alert.alert("Input Required", "Both grade and marks are required.");
    }
  };
  
  // progress calculating 
  useEffect(() => {
    if (calculateProgress() === 100) {
      Alert.alert(
        "Assignment Complete",
        "Do you want to enter your grade?",
        [
          { text: "No", style: "cancel" },
          { text: "Yes", onPress: handleGradeInput },
        ]
      );
    }
  }, [tasks]);
  const progress = calculateProgress();
  return (
    <View style={styles.container}>
      {/* Assignment Title */}
      <Text style={styles.header}>{title}</Text>

      {/* Progress */}
      <Text style={styles.progressText}>Progress: {Math.round(progress)}%</Text>
      <Progress.Bar
        progress={progress / 100}
        width= {375}
        height={20}
        borderRadius={5}
        color="#4CAF50"
      />

      <View>
        {/*  Add task input */}
        <TextInput
          style={styles.input}
          placeholder="Add a task"
          value={newTask}
          onChangeText={setNewTask}
        />
        {/* Add task btn */}
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      
      {/* List of task being displayed */}
      {tasks.map((task, index) => (
        <View key={index} style={styles.taskItem}>
          <BouncyCheckbox
            size={25}
            fillColor="black"
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            isChecked={task.isChecked}
            onPress={() => handleCheck(index)}
            text={task.task}
          />
        </View>
      ))}
      {/* grades ? 100% progress */}
      {showGradeInput && (
        <View style={styles.gradeInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter grade (e.g., A, B, C)"
            value={grade}
            onChangeText={setGrade}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter marks"
            value={marks}
            onChangeText={setMarks}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitGrade}>
            <Text style={styles.submitText}>Submit Grade</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "white" 
  },
  header: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 16 
  },
  input: { 
    marginBottom: 15, 
    marginTop: 15, 
    padding: 10 ,
    backgroundColor: '#FEFAE0',
    height: 60,
  },
  addButton: { 
    backgroundColor: "#E8EFCF", 
    padding: 10, 
    borderRadius: 5 
  },
  addText: { 
    color: "black", 
    textAlign: "center" ,
    fontSize: 20,
  },
  taskItem: { 
    padding: 10, 
    backgroundColor: "#fff", 
    marginTop: 8, 
    borderRadius: 5 
  },
  progressText: { 
    //marginTop: 1, 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 10,
    textAlign: 'center',
  },
  gradeInputContainer: { 
    marginTop: 20 
  },
  submitButton: { 
    backgroundColor: "#4CAF50", 
    padding: 10, 
    borderRadius: 5, 
    marginTop: 10
  },
  submitText: { 
    color: "white", 
    textAlign: "center" 
  },
});
export default AssignmentDetails;
