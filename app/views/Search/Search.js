import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../utils/colors';
import SearchBar from 'react-native-dynamic-search-bar';
import {Wave} from 'react-native-animated-spinkit';

// fetch data
import {getCategoryData} from '../../utils/fetchData/fetchCategorydata';

// fetch component
import Category from '../../components/Category/Category';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  useEffect(async () => {
    try {
      const categoryData = await getCategoryData();

      setCategoryList(categoryData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>Search</Text>

      <SearchBar
        placeholder="Search song here"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />

      <View style={{flex: 1}}>
        {searchText.length <= 0 ? (
          <View style={{flex: 1}}>
            {categoryList.length > 0 ? (
              <Category categoryData={categoryList} />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Wave color="#fff" size={70} />
              </View>
            )}
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color1,
  },
  searchText: {
    color: '#fff',
    marginVertical: 20,
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    height: 20,
    width: 20,
  },
});
