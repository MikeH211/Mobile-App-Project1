import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ReimbursementsScreen from "./app/screens/ReimbursementsScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { Employee } from "./app/dtos/dtos";

export default function App() {
  const [employee, setEmployee] = useState<Employee>({
    id: "",
    username: "",
    password: "",
    fname: "",
    lname: "",
    isManager: false,
    reimbursements: [],
  });
  // const [ifManager, setIfManager] = useState(null);
  // function employeeStatus() {
  //   !employee.isManager ? setIfManager(false) : setIfManager(true);
  // }

  useEffect(() => {
    AsyncStorage.getItem("employee").then((json) => {
      if (json) {
        setEmployee(JSON.parse(json));

      }
    });
  }, []);

  return (
    <View>
      {employee.isManager ? 
        <ReimbursementsScreen />
       : 
        <WelcomeScreen setEmployee={setEmployee} />
      }
      
    </View>
  );
}
