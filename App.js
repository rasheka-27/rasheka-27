import React, { useState, useCallback } from 'react';
import { SectionList, StyleSheet, Text, View, Image, StatusBar, Dimensions, TextInput, RefreshControl, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { data } from './android/component/data';

// Transform data into sections
const transformData = (data) => {
  const sections = data.reduce((acc, item) => {
    const section = acc.find(sec => sec.title === item.title);
    if (section) {
      section.data.push(item);
    } else {
      acc.push({ title: item.title, data: [item] });
    }
    return acc;
  }, []);
  
  return sections;
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sections, setSections] = useState(transformData(data));
  const [refreshing, setRefreshing] = useState(false);

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredSections = transformData(data.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
    setSections(filteredSections);
  };

  // Refresh handler function
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request to fetch new data
    setTimeout(() => {
      // In a real-world scenario, fetch new data from an API here
      // For demonstration, we'll just reset the data
      setSections(transformData(data));
      setRefreshing(false);
    }, 2000); // Simulate a 2-second delay
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image style={styles.image} source={{ uri: item.imageuri }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rate}>{item.rate}</Text>
        <View style={styles.buttoncontainer}>
         <TouchableOpacity>
          <Text style={styles.buttontext}>Add to cart</Text>
         </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
    {/* StatusBar component for customizing the status bar */}
    <StatusBar barStyle="light-content" backgroundColor="green" />
    <View>
      
      <View style={styles.headingtextcontainer}>
        <Icon name='menu' size={35} />
        <Text style={styles.headingtext}>Wood Furniture</Text>
      </View>
      <View style={styles.searchcontainer}>
        <Icon name="search" size={25} />
        <TextInput
          placeholder='Search'
          fontSize={20}
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
      </View>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => item.id + index}
        contentContainerStyle={{
          paddingVertical: 40
        }}
        style={{
          paddingBottom: 50,
          marginBottom: 100
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey"
  },
  rate: {
    fontSize: 20,
    fontWeight: "500",
    color: "red",
  },
  image: {
    width: 405,
    height: 200,
    borderRadius: 35
  },
  imagecontainer: {
    width: "100%",
    margin: 1,
    height: 200,
    bottom: 20,
  },
  headingtextcontainer: {
    backgroundColor: "green",
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30
  },
  headingtext: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    textAlign: "center",
    paddingLeft:40
  },
  container: {
    backgroundColor: 'white',
    margin: 5,
    height: Dimensions.get('window').height / 2.6,
    width: Dimensions.get('window').width / 1.0,
    paddingVertical: 20,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 60,
  },
  buttoncontainer: {
    paddingVertical:20,
    backgroundColor:"green",
    borderRadius:35
  },
  searchcontainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingtop:20
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 20,
    width: '80%'
  },
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#f4f4f4'
  },
  sectionHeaderText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  buttontext:{
fontSize:20,
textAlign:"center",
color:"white"
  }
});