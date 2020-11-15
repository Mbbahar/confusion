import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      smoking: false,
      isVisible: false,
      chosenDate: "",
      showModal: false,
    };
  }

  static navigationOptions = {
    title: "Reserve Table",
  };

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      chosenDate: "",
      showModal: false,
    });
  }

  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosenDate: moment(datetime).format("YYYY-MM-DD hh:mm:ss"),
    });
  };

  showPicker = () => {
    this.setState({
      isVisible: true,
    });
  };

  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  showAlert = () => {
    Alert.alert(
      "Your Reservation OK?",
      "Number of Guests: " +
        this.state.guests +
        "\n" +
        "Smoking? " +
        (this.state.smoking ? "Yes" : "No") +
        "\n" +
        "Date and Time: " +
        this.state.chosenDate,
      [
        {
          text: "Cancel",
          onPress: () => this.resetForm(),
          style: " cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.presentLocalNotification(this.state.chosenDate);
            this.resetForm();
          },
        },
      ],
      { cancelable: false }
    );
  };

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      }
    }
    return permission;
  }
  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Your Reservation",
        body: "Reservation for " + date + " requested",
      },
      trigger: null,
    });
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="zoomInUp" duration={2000} delay={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ guests: itemValue })
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              onTintColor="#512DA8"
              onValueChange={(value) => this.setState({ smoking: value })}
            ></Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <Icon name="calendar" type="font-awesome" size={24} />
            <TouchableOpacity
              style={{
                width: 200,
                height: 40,
                fontSize: 18,
                borderRadius: 3,
                borderColor: "#aaa",
                color: "#000",
                backgroundColor: "#fff",
                borderWidth: 1.5,
                paddingLeft: 15,
              }}
              onPress={this.showPicker}
            >
              <Text style={{ fontSize: 18, color: "#000" }}>
                {this.state.chosenDate}
              </Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isVisible}
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
              mode={"datetime"}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              onPress={() => this.showAlert()}
              title="Reserve"
              color="#512DA8"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default Reservation;
