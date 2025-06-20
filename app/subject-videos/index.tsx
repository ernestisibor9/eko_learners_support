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
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 45) / 2;

export default function SubjectVideos() {
  const { id, name } = useLocalSearchParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();

  // Fetch videos by subject ID
  useEffect(() => {
    fetch(`https://ekolearnerssupport.com/api/videos-by-subject.php?subject_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch videos", err);
        setLoading(false);
      });
  }, [id]);

  // Set dynamic header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `  ${name} Videos`,
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
        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, name]);

  const handleVideoPress = (videoId) => {
    router.push(`/video/${videoId}`);
  };

  return (
    <>
      <StatusBar backgroundColor="#303B79" barStyle="light-content" />
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>{name} Videos</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0a84ff" />
        ) : (
          <View style={styles.videoList}>
            {videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoCard}
                onPress={() => handleVideoPress(video.id)}
              >
                <Image
                  source={{
                    uri: `https://img.youtube.com/vi/${video.youtube_id.trim()}/hqdefault.jpg`,
                  }}
                  style={styles.thumbnail}
                  onError={(e) => {
                    console.log("Image failed to load", e.nativeEvent.error);
                  }}
                />
                <Text numberOfLines={2} style={styles.title}>
                  {video.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
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
    gap: 10,
    justifyContent: "space-between",
  },
  videoCard: {
    width: cardWidth,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingBottom: 10,
    marginBottom: 15,
    elevation: 2,
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
});
