import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function UsefulLinksScreen() {
  const openURL = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView style={styles.container}>
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
        Private sector in Lagos State
      </Text>

      {/* Our Company Section */}
      <Text style={styles.sectionTitle}>Our Company</Text>
      <View style={styles.linkGroup}>
        <LinkItem
          label="Register a School"
          onPress={() =>
            openURL("https://www.lagosschoolsonline.com/backend/register/")
          }
        />
        <LinkItem label="Terms and Conditions" />
        <LinkItem label="Privacy Policy" />
        <LinkItem label="FAQs" />
      </View>

      {/* Lagos State Links */}
      <Text style={styles.sectionTitle}>Lagos State Links</Text>
      <View style={styles.linkGroup}>
        <LinkItem label="Lagos State Government" url="http://www.lagosstate.gov.ng/" />
        <LinkItem label="Lagos State Universal Basic Education Board" url="https://lasubeb.lg.gov.ng/" />
        <LinkItem label="Lagos State Examinations Board" url="http://www.lasgmoed.com/mda/lagos-state-examination-board/" />
        <LinkItem label="Lagos State Scholarship Board" url="http://www.lagosscholarship.org/" />
        <LinkItem label="Lagos State College of Primary Education" url="http://www.lagosstate.gov.ng/entities.php?k=130" />
        <LinkItem label="Lagos State Library Board" url="http://www.lasgmoed.com/mda/lagos-state-library-board/" />
        <LinkItem label="Lagos State Sports Council" url="http://www.lagosstate.gov.ng/entities.php?k=154" />
        <LinkItem label="Lagos State Teachers Establishment and Pensions Office" url="http://www.lasgmoed.com/mda/lagos-state-teachers-establishment-and-pensions-office/" />
        <LinkItem label="Lagos State University" url="http://www.lasu.edu.ng/" />
        <LinkItem label="Lagos State Teaching Hospital" url="http://www.lasuth.org.ng/index.php?id=37" />
        <LinkItem label="Adeniran Ogunsanya College of Education" url="http://www.aocoed.edu.ng/" />
        <LinkItem label="Oluwole Awokoya Chemistry Competition" url="https://www.lagosschoolsonline.com/chemistry-competition" />
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        © {new Date().getFullYear()} Global Education Media All Rights Reserved | Designed by{" "}
        <Text
          style={styles.link}
          onPress={() => openURL("https://alabiansolutions.com/")}
        >
          Alabian Solutions
        </Text>
      </Text>
    </ScrollView>
  );
}

const LinkItem = ({ label, url = "#", onPress }) => (
  <TouchableOpacity
    onPress={onPress || (() => Linking.openURL(url))}
    style={styles.linkItem}
  >
    <Text style={styles.linkText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 50,
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
    marginVertical: 30,
  },
  link: {
    color: "#0a84ff",
    textDecorationLine: "underline",
  },
});
