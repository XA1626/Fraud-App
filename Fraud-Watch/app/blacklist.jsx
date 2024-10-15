import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Modal,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const Blacklist = ({ onNavigateBack }) => {
  const navigation = useNavigation();
  const [blacklist, setBlacklist] = useState([
    { id: "1", number: "+1234567890" },
    { id: "2", number: "+0987654321" },
    { id: "3", number: "+1123456789" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [reportContact, setReportContact] = useState("");
  const [reportImage, setReportImage] = useState(null);

  const handleBlockOptions = (number) => {
    setSelectedNumber(number);
    setBlockModalVisible(true);
  };

  const confirmBlockNumber = () => {
    Alert.alert(
      "Blocked",
      `The number ${selectedNumber} has been blocked from calling you.`
    );
    setBlockModalVisible(false);
  };

  const copyNumber = () => {
    Alert.alert(
      "Copied",
      `${selectedNumber} has been copied to your clipboard.`
    );
    setBlockModalVisible(false);
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setReportImage(result.uri);
    }
  };

  const submitReport = () => {
    Alert.alert("Report Submitted", `Reported: ${reportContact}`);
    setModalVisible(false);
    setReportContact("");
    setReportImage(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.phoneNumber}>{item.number}</Text>
      <TouchableOpacity
        style={styles.blockButton}
        onPress={() => handleBlockOptions(item.number)}
      >
        <FontAwesome name="ban" size={16} color="white" />
        <Text style={styles.blockButtonText}>Block</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
        <FontAwesome name="arrow-left" size={24} color="#000" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.title}>Blacklist of Known Scam Numbers</Text>

      {/* Display the blacklist */}
      <FlatList
        data={blacklist}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />

      {/* Report Scam Button with Gradient */}
      <LinearGradient
        colors={["#6a11cb", "#f7971e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.reportButtonGradient}
      >
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="flag" size={18} color="white" />
          <Text style={styles.reportButtonText}>Report Scam Contact</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Block Options Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={blockModalVisible}
        onRequestClose={() => setBlockModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Option</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={confirmBlockNumber}
            >
              <Text style={styles.optionText}>Block</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={copyNumber}>
              <Text style={styles.optionText}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setBlockModalVisible(false)}
            >
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Report Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Report Scam Contact</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter email or phone number"
              value={reportContact}
              onChangeText={(text) => setReportContact(text)}
            />

            <TouchableOpacity style={styles.photoButton} onPress={selectImage}>
              <Text style={styles.photoButtonText}>
                {reportImage ? "Change Photo" : "Attach Proof Photo"}
              </Text>
            </TouchableOpacity>

            {reportImage && (
              <Image source={{ uri: reportImage }} style={styles.reportImage} />
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitReport}
            >
              <Text style={styles.submitButtonText}>Submit Report</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styling for the Blacklist component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#000",
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  phoneNumber: {
    fontSize: 18,
  },
  blockButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff3b30",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  blockButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  reportButtonGradient: {
    borderRadius: 10,
    marginTop: 20,
  },
  reportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  reportButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  photoButtonText: {
    color: "white",
    fontSize: 16,
  },
  reportImage: {
    width: "100%",
    height: 150,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  optionButton: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#000",
  },
  cancelText: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});

export default Blacklist;
