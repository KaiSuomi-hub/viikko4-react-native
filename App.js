import React, { useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';
import Add from './components/Add';
import Row from './components/Row';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'; // Corrected import
const STORAGE_KEY = '@items_key';

export default function App () {
  const [data, setData] = React.useState([]);
  const [selectedId, select] = React.useState(null);

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    storeData(data)
  }, [data])

  const add = useCallback((name) => {
    const newItem = { id: uuidv4(), name: name }
    const tempData = [...data, newItem]
    setData(tempData)
    console.log('Added:', newItem)
  }
    , [data]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (e) {
      console.log(e)
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <Add add={add} setData={setData} />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Row
          item={item}
          selectedId={selectedId}
          select={select}
          data={data}
          setData={setData}

        />}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingTop: 10,
    padding: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
