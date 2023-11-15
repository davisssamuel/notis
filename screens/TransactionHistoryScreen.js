import * as React from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import jsonData from "../data/transacions.json";

const TransactionHistoryScreen = () => {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.transactionPage}>

        {/* <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#FFF"
        /> */}

        <View style={styles.transactionList}>
          {jsonData.map((jsonData, index) => (
            <View style={styles.transactionBlock} key={index}>
              <View style={styles.transactionSection}>
                {jsonData.type === "Payment Sent" ? (
                  <Text style={styles.sent}>{jsonData.type}</Text>
                ) : (
                  <Text style={styles.received}>{jsonData.type}</Text>
                )}
                <Text style={styles.timestamp}>{jsonData.timestamp}</Text>
              </View>
              <View style={styles.transactionBlock} key={index}>
                {jsonData.type === "Payment Sent" ? (
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>To: </Text>
                      <Pressable
                        onPress={() => {
                          navigate("contactScreen");
                        }}
                      >
                        <Text style={{ textDecorationLine: "underline" }}>
                          {jsonData.name}
                        </Text>
                      </Pressable>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Amount: </Text>
                      <Text style={{ color: "red" }}>{jsonData.amount}</Text>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>From: </Text>
                      <Pressable
                        onPress={() => {
                          navigate("contactScreen");
                        }}
                      >
                        <Text style={{ textDecorationLine: "underline" }}>
                          {jsonData.name}
                        </Text>
                      </Pressable>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Amount: </Text>
                      <Text style={{ color: "green" }}>{jsonData.amount}</Text>
                    </View>
                  </View>
                )}
              </View>
              <View style={styles.transactionBlock} key={index}>
                <Text style={styles.notes}>Note: {jsonData.note}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(28,28,30)",
  },
  transactionPage: {
    flex: 1,
    flexDirection: "column",
  },
  navBar: {
    width: "100%",
    height: 50,
    backgroundColor: "rgb(28,28,30)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  searchBar: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgb(58,58,60)",
    borderRadius: 10,
    color: "white",
  },
  transactionList: {
    flex: 1,
    padding: 10,
  },
  transactionBlock: {
    backgroundColor: "rgb(246, 246, 246)",
    margin: 5,
    borderRadius: 10,
    padding: 5,
  },
  transactionSection: {
    flexDirection: "row",
  },
  sent: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  received: {
    color: "green",
    fontSize: 20,
    fontWeight: "bold",
  },
  timestamp: {
    color: "#808080",
    marginLeft: "auto",
    fontSize: 14,
  },
  notes: {
    color: "#808080",
    fontSize: 14,
  },
});

export default TransactionHistoryScreen;
