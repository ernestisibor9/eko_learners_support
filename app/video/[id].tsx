import { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

export default function VideoScreen() {
  const { id } = useLocalSearchParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    fetch(`https://ekolearnerssupport.com/api/single-video.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch video", err);
        setLoading(false);
      });
  }, [id]);

  // 🛠 Custom header style
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "  Watch Video",
      headerStyle: {
        backgroundColor: "#303B79",
        shadowColor: "transparent",
        elevation: 0,
        height: 60,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 16,
      },
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0a84ff" style={{ flex: 1 }} />;
  }

  if (!video) {
    return (
      <View style={styles.center}>
        <Text>Video not found</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="#303B79" barStyle="light-content" />
      <View style={styles.container}>
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${video.youtube_id}` }}
          style={{ flex: 1 }}
          allowsFullscreenVideo
        />
        <Text style={styles.title}>{video.title}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    padding: 10,
    color: "#303B79",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
