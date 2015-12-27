'use strict';

var React = require('react-native');
var {
  Component,
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight
} = React;

// define styles
var styles = StyleSheet.create({

  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },

  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },

  searchBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 10
  },

  searchInput: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 4,
    padding: 4,
    marginRight: 8,
    height: 36,
    flex: 4,
  },

  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    padding: 4
  },

  buttonText: {
    fontSize: 18,
    alignSelf: 'center'
  },

  locationBox: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 10
  },

  image: {
    marginTop: 10,
    width: 217,
    height: 138
  }

});

// search page component
class SearchPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchString: 'London'
    };

  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>

        <View style={styles.searchBox}>
          <TextInput
            onChange={this.onSearchTextChanged.bind(this)}
            style={styles.searchInput}
            placeholder="Search via name or postcode"
            value={this.state.searchString}
          />
          <TouchableHighlight style={styles.button} underlayColor="#99d9f4">
            <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.locationBox}>
          <TouchableHighlight style={styles.button} underlayColor="#99d9f4">
            <Text style={styles.buttonText}>Seach in my location</Text>
          </TouchableHighlight>
        </View>

        <Image source={require('image!house')} style={styles.image} />

      </View>
    );
  }

  onSearchTextChanged(event) {
    this.setState({searchString: event.nativeEvent.text });
  }

}

// export
module.exports = SearchPage;
