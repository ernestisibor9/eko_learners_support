import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [featuredSubjects, setFeaturedSubjects] = useState([]);
  const [popularSubjects, setPopularSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all subjects");

  const router = useRouter();

  useEffect(() => {
    registerForPushNotificationsAsync();

    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received:", notification);
    });

    return () => subscription.remove();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      const tokenData = await Notifications.getExpoPushTokenAsync();
      console.log("Push Token:", tokenData.data);
    } else {
      alert("Must use physical device for Push Notifications");
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const cachedFeatured = await AsyncStorage.getItem("featuredSubjects");
      const cachedPopular = await AsyncStorage.getItem("popularSubjects");

      if (cachedFeatured && cachedPopular) {
        setFeaturedSubjects(JSON.parse(cachedFeatured));
        setPopularSubjects(JSON.parse(cachedPopular));
        setLoading(false);
      }

      try {
        const [featuredData, popularData] = await Promise.all([
          fetch("https://ekolearnerssupport.com/api/featured.php").then((res) => res.json()),
          fetch("https://ekolearnerssupport.com/api/popular.php").then((res) => res.json()),
        ]);

        setFeaturedSubjects(featuredData);
        setPopularSubjects(popularData);

        await AsyncStorage.setItem("featuredSubjects", JSON.stringify(featuredData));
        await AsyncStorage.setItem("popularSubjects", JSON.stringify(popularData));
      } catch (err) {
        console.error("Error fetching videos", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleVideoPress = (videoId) => {
    Haptics.selectionAsync();
    router.push(`/video/${videoId}`);
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSearching(true);
    Keyboard.dismiss();

    try {
      const res = await fetch(
        `https://ekolearnerssupport.com/api/search.php?q=${encodeURIComponent(search.trim())}`
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setSearching(false);
    }
  };

  const renderVideoCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.videoCard}
      onPress={() => handleVideoPress(item.id)}
      accessibilityLabel={`Play video: ${item.title}`}
      accessibilityRole="button"
    >
      <Image
        source={{
          uri: `https://img.youtube.com/vi/${item.youtube_id.trim()}/hqdefault.jpg`,
        }}
        style={styles.videoThumbnail}
      />
      <Text numberOfLines={2} style={styles.videoTitle}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const tabs = ["all subjects", "featured", "popular"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logos */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/mobile-logo1.png")}
            style={styles.logo}
          />
          <Image
            source={require("../../assets/images/mobile-logo2.png")}
            style={styles.logo}
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search videos..."
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            placeholderTextColor="#aaa"
            accessibilityLabel="Search input field"
          />
        </View>

        {/* Tab Segments */}
        <View style={styles.segmentedControl}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.segmentButton,
                selectedTab === tab && styles.segmentButtonActive,
              ]}
              onPress={() => {
                Haptics.selectionAsync();
                setSelectedTab(tab);
                setSearchResults([]);
              }}
              accessibilityLabel={`Switch to ${tab} tab`}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.segmentText,
                  selectedTab === tab && styles.segmentTextActive,
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Search Results */}
        {search.trim() && !searching && (
          <>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {searchResults.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {searchResults.map(renderVideoCard)}
              </ScrollView>
            ) : (
              <Text style={styles.notFoundText}>
                No videos found for "{search}"
              </Text>
            )}
          </>
        )}

        {/* Content */}
        {searching || loading ? (
          <ActivityIndicator size="large" color="#0a84ff" />
        ) : (
          <>
            {(selectedTab === "all subjects" || selectedTab === "featured") && (
              <>
                <Text style={styles.sectionTitle}>Featured Subjects</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {featuredSubjects.map(renderVideoCard)}
                </ScrollView>
              </>
            )}
            {(selectedTab === "all subjects" || selectedTab === "popular") && (
              <>
                <Text style={styles.sectionTitle}>Popular Subjects</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {popularSubjects.map(renderVideoCard)}
                </ScrollView>
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  contentContainer: {
    paddingBottom: 50,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 2,
  },
  logo: {
    width: 90,
    height: 65,
    marginHorizontal: 8,
    resizeMode: "contain",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 20,
    padding: 3,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  segmentButtonActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },
  segmentTextActive: {
    color: "#0a84ff",
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    marginBottom: 10,
    marginTop: 15,
  },
  videoCard: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginRight: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  videoThumbnail: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  notFoundText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    paddingVertical: 20,
  },
});
