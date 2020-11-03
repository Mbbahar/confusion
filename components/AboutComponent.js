import React, { Component } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { ABOUTS } from "../shared/about";
import { LEADERS } from "../shared/leaders";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Card title="Our History">
        <Text style={{ margin: 10 }}>{item.name}</Text>
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

const renderLeader = ({ item, index }) => {
  return (
    <ListItem
      key={index}
      title={item.name}
      subtitle={item.description}
      hideChevron={true}
      leftAvatar={{ source: { uri: baseUrl + item.image } }}
    />
  );
};

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abouts: ABOUTS,
      leaders: LEADERS,
    };
  }

  static navigationOptions = {
    title: "About",
  };
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.state.abouts.filter((about) => about.featured)[0]}
        />
        <Card title="Corporate Leadership">
          <FlatList
            data={this.props.leaders.leaders}
            renderItem={renderLeader}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(About);
