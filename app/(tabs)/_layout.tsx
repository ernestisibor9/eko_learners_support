import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const TabLayouts = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#0065F8" : "gray"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="subject"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome5
                name={focused ? "book" : "book"}
                size={24}
                color={focused ? "#0065F8" : "gray"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="find"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome
                name={focused ? "search" : "search"}
                size={24}
                color={focused ? "#0065F8" : "gray"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome
                name={focused ? "envelope" : "envelope"}
                size={24}
                color={focused ? "#0065F8" : "gray"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="useful_link"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome
                name={focused ? "link" : "link"}
                size={24}
                color={focused ? "#0065F8" : "gray"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayouts;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    marginTop: 3,
  },
  iconText: {
    fontSize: 10,
  },
});
