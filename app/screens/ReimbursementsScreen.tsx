import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControlComponent,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import colors from "../config/colors";

import { Reimbursement } from "../dtos/dtos";
import ReimbursementItem from "./ReimbursementItem";

function ReimbursementsScreen(props) {
  const [reimbursements, setReimbursements] = useState([]);
  const [comment, setComment] = useState(null);

  async function approveStatus(id: string) {
    const response = await axios(
      `https://a347-2600-1702-1af0-13a0-d087-9bc8-f2e8-a591.ngrok.io/reimbursements/${id}`,
      {
        method: "PATCH",
        data: JSON.stringify({ status: "approved" }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updatedReimbursement = await response.data;
    alert("Reimbursement has been approved");
  }
  async function denyStatus(id: string) {
    const response = await axios(
      `https://a347-2600-1702-1af0-13a0-d087-9bc8-f2e8-a591.ngrok.io/reimbursements/${id}`,
      {
        method: "PATCH",
        data: JSON.stringify({ status: "denied" }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updatedReimbursement = await response.data;
    alert("Reimbursement has been denied");
  }
  async function submitComment(id: string) {
    const response = await axios(
      `https://a347-2600-1702-1af0-13a0-d087-9bc8-f2e8-a591.ngrok.io/reimbursementsmessage/${id}`,
      {
        method: "PATCH",
        data: JSON.stringify({ message: comment }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updatedReimbursement = await response.data;
    alert("Your comment has been submitted");
  }

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://a347-2600-1702-1af0-13a0-d087-9bc8-f2e8-a591.ngrok.io/pendingreimbursements"
      );
      const myReimbursements = response.data;
      setReimbursements(myReimbursements);
    })();
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={{
        uri: "https://picsum.photos/id/1031/200/300",
      }}
    >
      <View>
        <Text style={styles.titleText}>Pending Reimbursements</Text>
      </View>
      <View style={styles.headingsContainer}>
        <Text style={styles.textHeading}>Date</Text>
        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
        <Text style={styles.textHeading}>Amount</Text>
        <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
        <Text style={styles.textHeading}>Reason</Text>
      </View>
      <View>
        <FlatList
          data={reimbursements}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <ReimbursementItem
                requestDate={item.requestDate}
                amount={item.amount}
                reason={item.reason}
              />
              <View>
                <Pressable
                  onPress={() => {
                    approveStatus(item.id);
                  }}
                  style={styles.approveButton}
                >
                  <Text style={styles.textStyle}>APPROVE</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    denyStatus(item.id);
                  }}
                  style={styles.denyButton}
                >
                  <Text style={styles.textStyle}>DENY</Text>
                </Pressable>
                <Text style={styles.inputLabel}>
                  add comment:
                  <TextInput
                    onChangeText={(comment) => setComment(comment)}
                    // key={item.id}
                    style={styles.input}
                  />
                  <Pressable
                    // key={item.id}
                    onPress={() => {
                      submitComment(item.id);
                    }}
                    style={styles.submitButton}
                  >
                    <Text>submit</Text>
                  </Pressable>
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,

    justifyContent: "flex-end",
    alignItems: "center",
  },
  titleText: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  approveButton: {
    backgroundColor: "#36C227",
    padding: 4,
    margin: 2,
    borderRadius: 40,
  },
  denyButton: {
    backgroundColor: colors.red,
    padding: 4,

    borderRadius: 30,
  },
  inputLabel: {
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
  input: {
    height: 26,
    margin: 2,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.white,
    marginBottom: 10,
    borderRadius: 2,
  },
  submitButton: {
    backgroundColor: colors.primary,
    height: 26,
    borderRadius: 30,
    fontSize: 16,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 2,
  },

  textStyle: {
    fontSize: 15,
    color: colors.white,
    fontWeight: "bold",
    alignSelf: "center",
  },
  headingsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: -100,
    marginBottom: 10,
  },
  textHeading: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ReimbursementsScreen;
