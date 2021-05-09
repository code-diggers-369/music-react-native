import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

//
// import {getCategoryDataById} from '../../utils/fetchData/fetchCategorydata';

//
const ScreenWidth = Dimensions.get('window').width;
import Colors from '../../utils/colors';

function Category({categoryData, setSearchText}) {
  const displayCategory = async name => {
    try {
      await setSearchText(name);
    } catch (err) {
      console.log(err);
    }
  };

  const renderItems = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => displayCategory(item.name)}>
      <Image style={styles.imageContainer} source={{uri: item.icons[0].url}} />

      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryData}
        renderItem={renderItems}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  item: {
    width: (ScreenWidth - 40) / 2 - 10,
    backgroundColor: '#000',
    padding: 10,
    // marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Colors.Color1,
  },
  title: {
    color: '#fff',
    position: 'absolute',
    bottom: 25,
  },
  imageContainer: {
    height: 150,
    width: 150,
    borderRadius: 7,
  },
});

export default Category;
