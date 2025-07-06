import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  SafeAreaView,
} from "react-native";

export default function UsefulLinksScreen() {
  const openURL = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Invalid Link", "Sorry, this link is not supported.");
      }
    } catch (err) {
      console.error("Failed to open URL:", err);
      Alert.alert("Error", "Could not open the link. Please try again later.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Logos */}
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

        <Text style={styles.description}>
          An Internet community for all schools in the Public sector as well as
          Private sector in Lagos State.
        </Text>

        {/* Our Company Section */}
        <Text style={styles.sectionTitle}>Our Company</Text>
        <View style={styles.linkGroup}>
          <LinkItem
            label="Register a School"
            url="https://www.lagosschoolsonline.com/backend/register/"
            onPress={openURL}
          />
          <LinkItem label="Terms and Conditions" />
          <LinkItem label="Privacy Policy" />
          <LinkItem label="FAQs" />
        </View>

        {/* Lagos State Links */}
        <Text style={styles.sectionTitle}>Lagos State Links</Text>
        <View style={styles.linkGroup}>
          <LinkItem label="Lagos State Government" url="http://www.lagosstate.gov.ng/" onPress={openURL} />
          <LinkItem label="Lagos State Universal Basic Education Board" url="https://lasubeb.lg.gov.ng/" onPress={openURL} />
          <LinkItem label="Lagos State Examinations Board" url="http://www.lasgmoed.com/mda/lagos-state-examination-board/" onPress={openURL} />
          <LinkItem label="Lagos State Scholarship Board" url="http://www.lagosscholarship.org/" onPress={openURL} />
          <LinkItem label="Lagos State College of Primary Education" url="http://www.lagosstate.gov.ng/entities.php?k=130" onPress={openURL} />
          <LinkItem label="Lagos State Library Board" url="http://www.lasgmoed.com/mda/lagos-state-library-board/" onPress={openURL} />
          <LinkItem label="Lagos State Sports Council" url="http://www.lagosstate.gov.ng/entities.php?k=154" onPress={openURL} />
          <LinkItem label="Lagos State Teachers Establishment and Pensions Office" url="http://www.lasgmoed.com/mda/lagos-state-teachers-establishment-and-pensions-office/" onPress={openURL} />
          <LinkItem label="Lagos State University" url="http://www.lasu.edu.ng/" onPress={openURL} />
          <LinkItem label="Lagos State Teaching Hospital" url="http://www.lasuth.org.ng/index.php?id=37" onPress={openURL} />
          <LinkItem label="Adeniran Ogunsanya College of Education" url="http://www.aocoed.edu.ng/" onPress={openURL} />
          <LinkItem label="Oluwole Awokoya Chemistry Competition" url="https://www.lagosschoolsonline.com/chemistry-competition" onPress={openURL} />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          © {new Date().getFullYear()} Global Education Media. All Rights Reserved | Designed by{" "}
          <Text
            style={styles.link}
            onPress={() => openURL("https://alabiansolutions.com/")}
          >
            Alabian Solutions
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const LinkItem = ({ label, url, onPress }) => {
  const handlePress = () => {
    if (url) {
      onPress(url);
    } else {
      Alert.alert("Notice", `No URL is available for "${label}".`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.linkItem} accessibilityRole="link">
      <Text style={styles.linkText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 60 : 50,
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
  description: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
    color: "#444",
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#0a84ff",
  },
  linkGroup: {
    marginBottom: 20,
  },
  linkItem: {
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 15,
    color: "#0066cc",
    textDecorationLine: "underline",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    marginTop: 30,
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  link: {
    color: "#0a84ff",
    textDecorationLine: "underline",
  },
});
