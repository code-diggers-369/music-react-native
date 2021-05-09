import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../utils/colors';
import SearchBar from 'react-native-dynamic-search-bar';
import {Wave} from 'react-native-animated-spinkit';

// fetch data
import {getCategoryData} from '../../utils/fetchData/fetchCategorydata';
import {getSearchdata} from '../../utils/fetchData/fetchSearchdata';

// fetch component
import Category from '../../components/Category/Category';
import SearchResult from '../../components/SearchResult/SearchResult';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchDataResult, setSearchDataResult] = useState([]);

  const [categoryList, setCategoryList] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(async () => {
    try {
      const categoryData = await getCategoryData();

      setCategoryList(categoryData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(async () => {
    try {
      if (searchText) {
        const data = await getSearchdata(searchText, pageNo);

        setSearchDataResult(data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [searchText]);

  useEffect(async () => {
    try {
      if (searchText) {
        setTimeout(async () => {
          const data = await getSearchdata(searchText, pageNo);

          setSearchDataResult(searchDataResult.concat(data));
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  }, [pageNo]);

  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>Search</Text>

      <SearchBar
        placeholder="Search song here"
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          setPageNo(1);
        }}
        onClearPress={() => {
          setSearchText('');
          setPageNo(1);
        }}
      />

      <View style={{flex: 1}}>
        {searchText.length <= 0 ? (
          <View style={{flex: 1}}>
            {categoryList.length > 0 ? (
              <Category
                categoryData={categoryList}
                setSearchText={setSearchText}
              />
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
          <View style={{flex: 1, marginTop: 20}}>
            <SearchResult
              searchDataResult={searchDataResult}
              setPageNo={setPageNo}
              pageNo={pageNo}
            />
          </View>
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
