import { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StatusBar as RNStatusBar,
  Platform,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 45) / 2;

export default function SubjectVideos() {
  const { id, name } = useLocalSearchParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    fetchVideos();
  }, [id]);

  const fetchVideos = async () => {
    try {
      const res = await fetch(
        `https://ekolearnerssupport.com/api/videos-by-subject.php?subject_id=${id}`
      );
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Failed to fetch videos", err);
      Alert.alert("Error", "Unable to load videos. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${name} Videos`,
      headerStyle: {
        backgroundColor: "#303B79",
        shadowColor: "transparent",
        elevation: 0,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
      },
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginLeft: 10 }}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, name]);

  const handleVideoPress = (videoId) => {
    router.push(`/video/${videoId}`);
  };

  const renderVideoCard = (video) => (
    <TouchableOpacity
      key={video.id}
      style={styles.videoCard}
      onPress={() => handleVideoPress(video.id)}
      accessibilityRole="button"
      accessibilityLabel={`Play ${video.title}`}
    >
      <Image
        source={{
          uri: `https://img.youtube.com/vi/${video.youtube_id.trim()}/hqdefault.jpg`,
        }}
        style={styles.thumbnail}
        resizeMode="cover"
        onError={(e) => {
          console.warn("Image load error:", e.nativeEvent.error);
        }}
      />
      <Text numberOfLines={2} style={styles.title}>
        {video.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <RNStatusBar
        backgroundColor="#303B79"
        barStyle={Platform.OS === "ios" ? "light-content" : "default"}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>{name} Videos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0a84ff" />
        ) : videos.length > 0 ? (
          <View style={styles.videoList}>
            {videos.map(renderVideoCard)}
          </View>
        ) : (
          <Text style={styles.noVideosText}>
            No videos found for "{name}"
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 10 : RNStatusBar.currentHeight,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#303B79",
    textAlign: "center",
  },
  videoList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  videoCard: {
    width: cardWidth,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingBottom: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  thumbnail: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    padding: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  noVideosText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 40,
  },
});
