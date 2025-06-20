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
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 45) / 2; // For 2 cards per row with padding

export default function SubjectsScreen() {
  const [search, setSearch] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetch("https://ekolearnerssupport.com/api/all-subjects.php")
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch subjects", err);
        setLoading(false);
      });
  }, []);

  const renderSubjectCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.subjectCard}
      onPress={() =>
        router.push({
          pathname: "/subject-videos",
          params: { id: item.id, name: item.name },
        })
      }
    >
      <Image
        source={{ uri: `https://ekolearnerssupport.com/images/${item.photo}` }}
        style={styles.subjectThumbnail}
      />
      <Text numberOfLines={2} style={styles.subjectTitle}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const filteredSubjects = subjects.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/mobile-logo1.png")}
          style={styles.logo2}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/images/mobile-logo2.png")}
          style={styles.logo2}
          resizeMode="contain"
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#555"
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search subjects..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#888"
        />
      </View>

      <Text style={styles.sectionTitle}>All Subjects</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0a84ff" />
      ) : filteredSubjects.length > 0 ? (
        <View style={styles.subjectList}>
          {filteredSubjects.map(renderSubjectCard)}
        </View>
      ) : (
        <Text style={styles.notFoundText}>
          No subjects found for "{search}"
        </Text>
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
    backgroundColor: "#eaf1f8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  logo2: {
    width: 100,
    height: 70,
    marginHorizontal: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
  },
  subjectList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  subjectCard: {
    width: cardWidth,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  subjectThumbnail: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  subjectTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    padding: 10,
    textAlign: "center",
  },
  notFoundText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 30,
  },
});
