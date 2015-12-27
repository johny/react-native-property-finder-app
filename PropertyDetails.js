'use strict';

var React = require('react-native');

var {
  Component,
  Image,
  StyleSheet,
  Text,
  View
} = React;

var styles = StyleSheet.create({

  container: {
    marginTop: 65
  },

  image: {
    width: 400,
    height: 300
  },

  heading: {
    backgroundColor: '#f8f8f8',
    padding: 5,

    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',

    marginBottom: 10

  },

  price: {
    fontSize: 20,
    color: '#656565'
  },

  title: {
    fontSize: 18,
    color: '#656565'
  },

  stats: {
    padding: 5,
    fontSize: 18,
    color: '#656565'
  },

  description: {
    fontSize: 18,
    padding: 5,
    color: '#656565'
  }

});

class PropertyDetails extends Component {

  render() {

    var property = this.props.property;
    var stats = `${property.bedroom_number} bed ${property.property_type}`;
    if (property.bathroom_number) {
      stats += `, ${property.bathroom_number} bathroom(s)`;
    }

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: property.img_url}} />
        <View style={styles.heading}>
          <Text style={styles.price}>{property.price_formatted}</Text>
          <Text style={styles.title}>{property.title}</Text>
        </View>
        <Text style={styles.stats}>{stats}</Text>
        <Text style={styles.description}>{property.summary}</Text>
      </View>
    );

  }

}

// exports
module.exports = PropertyDetails;
