import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { CONTACTS } from "../shared/contacts";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      
        <Card title="Contact Information">
          <Text style={{ margin: 5 }}>{item.name}</Text>
          <Text style={{ margin: 5 }}>{item.image}</Text>
          <Text style={{ margin: 5 }}>{item.label}</Text>
          <Text style={{ margin: 5 }}>Tel: {item.price}</Text>
          <Text style={{ margin: 5 }}>Fax: {item.featured}</Text>
          <Text style={{ margin: 5 }}>Email: {item.description}</Text>
          
        </Card>
    
    );
  } else {
    return <View></View>;
  }
}

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: CONTACTS,
    };
  }

  static navigationOptions = {
    title: "Contact",
  };

  sendMail() {
    MailComposer.composeAsync({
      recipients: ["confusion@food.net"],
      subject: "Enquiry",
      body: "To whom it may concern:",
    });
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <RenderItem
          item={this.state.contacts.filter((contact) => contact.featured)[0]}
        />
        <Button
          title="Send Email"
          buttonStyle={{ backgroundColor: "#512DA8" }}
          icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
          onPress={this.sendMail}
        />
        </Animatable.View>
      </ScrollView>
    );
  }
}
export default Contact;
