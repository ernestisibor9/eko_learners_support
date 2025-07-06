import { StyleSheet, View, Platform } from "react-native";
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
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 5,
          borderTopWidth: 0.5,
          borderTopColor: "#ddd",
          backgroundColor: "#fff",
          elevation: 5,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#0a84ff", // iOS Blue
        tabBarInactiveTintColor: "#ccc",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarAccessibilityLabel: "Home Tab",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="subject"
        options={{
          title: "Subjects",
          tabBarAccessibilityLabel: "Subjects Tab",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="find"
        options={{
          title: "Find",
          tabBarAccessibilityLabel: "Find Tab",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarAccessibilityLabel: "Contact Tab",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="envelope" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="useful_link"
        options={{
          title: "Useful Links",
          tabBarAccessibilityLabel: "Links Tab",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="link" size={size} color={color} />
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
    justifyContent: "center",
    minHeight: 40,
    minWidth: 40,
  },
});
