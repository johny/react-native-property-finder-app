'use strict';

var React = require('react-native');
var PropertyDetails= require('./PropertyDetails');

var {
  Component,
  Image,
  ListView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({

  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10
  },

  textContainer: {
    flex: 1
  },

  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#464646'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#464646'
  },

  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }

});

class SearchResults extends Component {

  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid !== r2.guid
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listing)
    };
  }

  renderRow(rowData, sectionID, rowID) {

    return (
      <TouchableHighlight underlayColor='#dddddd' onPress={() => this.onRowPress(rowData.guid)}>
        <View style={styles.rowContainer}>
          <Image style={styles.thumbnail} source={{uri: rowData.img_url}} />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
            <Text style={styles.price}>{rowData.price_formatted}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} />
    );
  }

  // UI events
  onRowPress(propertyGUID) {
    var property = this.props.listing.filter(prop => prop.guid === propertyGUID)[0]

    this.props.navigator.push({
      title: 'Property',
      component: PropertyDetails,
      passProps: {property: property}
    })

  }

}

// export module
module.exports = SearchResults;
