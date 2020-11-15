import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { CONTACTS } from "../shared/contacts";
import * as Animatable from 'react-native-animatable';

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000} >  
      <Card title="Contact Information">
        <Text style={{ margin: 5 }}>{item.name}</Text>
        <Text style={{ margin: 5 }}>{item.image}</Text>
        <Text style={{ margin: 5 }}>{item.label}</Text>
        <Text style={{ margin: 5 }}>Tel: {item.price}</Text>
        <Text style={{ margin: 5 }}>Fax: {item.featured}</Text>
        <Text style={{ margin: 5 }}>Email: {item.description}</Text>
      </Card>
      </Animatable.View>
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
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.state.contacts.filter((contact) => contact.featured)[0]}
        />
      </ScrollView>
    );
  }
}
export default Contact;
