import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";

export default function ContactScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSend = () => {
    const { name, email, subject, phone, message } = form;

    if (!name || !email || !subject || !phone || !message) {
      Alert.alert("Validation Error", "Please fill in all the fields.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }

    Alert.alert("Message Sent", "Thank you for contacting us!");

    // TODO: Send to backend/API when ready

    setForm({
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: "",
    });
  };

  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "This link cannot be opened.");
      }
    } catch (err) {
      console.error("Failed to open URL:", err);
      Alert.alert("Error", "Unable to open the link.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/mobile-logo1.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Image
              source={require("../../assets/images/mobile-logo2.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.heading}>Contact Us</Text>

          <View style={styles.contactCard}>
            <Image
              source={require("../../assets/images/contact-img.jpg")}
              style={styles.contactImage}
            />

            <View style={styles.formContainer}>
              <Text style={styles.subheading}>Leave us a message</Text>

              <View style={styles.row}>
                <TextInput
                  style={styles.inputHalf}
                  placeholder="Your Name"
                  value={form.name}
                  onChangeText={(text) => updateField("name", text)}
                  accessibilityLabel="Your Name"
                />
                <TextInput
                  style={styles.inputHalf}
                  placeholder="Your Email"
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={(text) => updateField("email", text)}
                  accessibilityLabel="Your Email"
                  autoCapitalize="none"
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Subject"
                value={form.subject}
                onChangeText={(text) => updateField("subject", text)}
                accessibilityLabel="Subject"
              />

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(text) => updateField("phone", text)}
                accessibilityLabel="Phone Number"
              />

              <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Message"
                multiline
                textAlignVertical="top"
                value={form.message}
                onChangeText={(text) => updateField("message", text)}
                accessibilityLabel="Message"
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleSend}
                accessibilityRole="button"
              >
                <Text style={styles.buttonText}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.subheading}>Our Offices</Text>

          <View style={styles.addressWrapper}>
            {[
              {
                title: "Lagos School Online",
                address:
                  "Ministry of Education Contact Office,\nBlock 5 Room 006 Secretariat Alausa,\nIkeja, Lagos, Nigeria",
                email: "info@lagosschoolsonline.com",
                phone: "(+234) 803 323 2771\n(+234) 818 760 9231",
              },
              {
                title: "Global Education Media (Nig) Ltd",
                address:
                  "11, Emina Crescent Off Toyin Street\nIkeja Lagos, Nigeria",
                email: "info@globaleducmedia.com",
                phone: "(+234) 812 120 1359\n(+234) 706 748 4223",
              },
              {
                title: "Global Education Media UK Contact Office",
                address:
                  "171, Shearwood Crescent Crayford,\nKent DA1 4TJ England",
                email: "info@globaleducmedia.com",
                phone: "(+44) 870 312 0374\n(+44) 798 411 1823",
              },
            ].map((office, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{office.title}</Text>
                <Text style={styles.cardText}>{office.address}</Text>
                <Text style={styles.cardText}>Email: {office.email}</Text>
                <Text style={styles.cardText}>Phone: {office.phone}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.footer}>
            © {new Date().getFullYear()} Global Education Media. All Rights Reserved | Designed by{" "}
            <Text
              style={styles.link}
              onPress={() => openLink("https://alabiansolutions.com/")}
            >
              Alabian Solutions
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    width: 100,
    height: 70,
    marginHorizontal: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#222",
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#0a84ff",
  },
  contactCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 10,
    elevation: 3,
    marginBottom: 20,
  },
  contactImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  formContainer: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  inputHalf: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  button: {
    backgroundColor: "#0a84ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  addressWrapper: {
    gap: 15,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#f0f8ff",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#444",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  link: {
    color: "#0a84ff",
    textDecorationLine: "underline",
  },
});
