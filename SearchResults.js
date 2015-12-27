'use strict';

var React = require('react-native');

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

  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },

  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4b8bec'
  },

  title: {
    fontSize: 20,
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

    var price = rowData.price_formatted.split(' ')[0];

    return (
      <TouchableHighlight underlayColor='#dddddd'>
        <View style={styles.rowContainer}>
          <Image style={styles.thumbnail} source={{uri: rowData.img_url}} />
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
            <Text style={styles.price}>{price}</Text>
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

}

// export module
module.exports = SearchResults;
