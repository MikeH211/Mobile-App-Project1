import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function ReimbursementItem({ requestDate, amount, reason }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{requestDate}</Text>
      <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text> 
      <Text style={styles.textStyle}>{amount}</Text>
      <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
      <Text style={styles.textStyle}>{reason}</Text><Text>&nbsp;&nbsp;</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  textStyle: {
    fontSize: 15,
    color: colors.white,
    fontWeight: "bold",
    backgroundColor: colors.secondary,
  },
});

export default ReimbursementItem;
