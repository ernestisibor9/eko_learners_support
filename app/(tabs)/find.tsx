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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
    const fetchFeatured = fetch("https://ekolearnerssupport.com/api/featured.php").then((res) => res.json());
    const fetchPopular = fetch("https://ekolearnerssupport.com/api/popular.php").then((res) => res.json());

    Promise.all([fetchFeatured, fetchPopular])
      .then(([featuredData, popularData]) => {
        setFeaturedSubjects(featuredData);
        setPopularSubjects(popularData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching videos", err);
        setLoading(false);
      });
  }, []);

  const handleVideoPress = (videoId) => {
    router.push(`/video/${videoId}`);
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/images/mobile-logo1.png")} style={styles.logo2} resizeMode="contain" />
        <Image source={require("../../assets/images/mobile-logo2.png")} style={styles.logo2} resizeMode="contain" />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search videos..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.doubleButtonRow}>
        {["all subjects", "featured", "popular"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterButton, selectedTab === tab && styles.active]}
            onPress={() => {
              setSelectedTab(tab);
              setSearchResults([]);
            }}
          >
            <Text style={[styles.filterText, selectedTab === tab && styles.activeText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Results */}
      {search.trim().length > 0 && !searching && (
        <>
          <Text style={styles.sectionTitle}>Search Results</Text>
          {searchResults.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {searchResults.map(renderVideoCard)}
            </ScrollView>
          ) : (
            <Text style={styles.notFoundText}>No videos found for "{search}"</Text>
          )}
        </>
      )}

      {/* Main Content */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  logo2: {
    width: 110,
    height: 85,
    marginHorizontal: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 45,
  },
  searchInput: {
    flex: 1,
    paddingRight: 10,
  },
  doubleButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 15,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#0a84ff",
    alignItems: "center",
    marginHorizontal: 5,
  },
  filterText: {
    fontSize: 14,
    color: "#0a84ff",
  },
  active: {
    backgroundColor: "#0a84ff",
    borderColor: "#0a84ff",
  },
  activeText: {
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  videoCard: {
    width: 220,
    marginRight: 15,
  },
  videoThumbnail: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 5,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  notFoundText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    paddingVertical: 20,
  },
});
