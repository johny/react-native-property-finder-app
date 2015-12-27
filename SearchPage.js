'use strict';

var React = require('react-native');
var {
  ActivityIndicatorIOS,
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

// Helper function for API query
function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return `http://api.nestoria.co.uk/api?${querystring}`;
};

// search page component
class SearchPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchString: 'London',
      isLoading: false,
      message: ''
    };

  }

  render() {

    var spinner = this.state.isLoading ?
      (<ActivityIndicatorIOS hidden='true' size='large' />) : (<View />);

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
            value={this.state.searchString} />
          <TouchableHighlight
            style={styles.button}
            underlayColor="#99d9f4"
            onPress={this.onSearchPressed.bind(this)}>
              <Text style={styles.buttonText}>Search</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.locationBox}>
          <TouchableHighlight style={styles.button} underlayColor="#99d9f4">
            <Text style={styles.buttonText}>Seach in my location</Text>
          </TouchableHighlight>
        </View>

        <Image source={require('image!house')} style={styles.image} />
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>

      </View>
    );
  }

  // UI methods

  onSearchTextChanged(event) {
    this.setState({searchString: event.nativeEvent.text });
  }

  onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  // Private methods
  _executeQuery(query) {
    console.log(`Execute query: ${query}`);
    this.setState({isLoading: true});

    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: `Something went wrong: ${error}`
        })
      );
  }

  _handleResponse(response) {
    this.setState({isLoading: false, message: ''});

    if(response.application_response_code.substr(0,1) === '1') {
      console.log(`Found properties: ${response.listings.length}`);
    } else {
      this.setState({message: 'Location not recognized. Please try again!'});
    }

  }

}

// export
module.exports = SearchPage;
