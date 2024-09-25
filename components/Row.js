import { Text, Pressable, StyleSheet } from 'react-native';
import React from 'react'
import Ionicicons from 'react-native-vector-icons/Ionicons';
export default function Row({ item, selectedId, select, data, setData }) {

const backgroundColor = item.id === selectedId ? '#f0f0f0' : '#ffffff';

// const remove = () => {
// 	const updatedData = data.filter((item) =>
// 		item.id !== selectedId );
// 	setData(updatedData);
// 	select(null);
// 	}

	const remove = () => {
		const updatedData = data.map((item) =>
			item.id === selectedId ? { ...item, removed: true } : item
		);
		setData(updatedData);
		select(null);
	}

	return (
		<Pressable 	onPress={() => select(item.id)}>
			<Text style={[item.removed ? styles.removedText : styles.rowText, { backgroundColor }]}>{item.name}</Text>
			{
				item.id === selectedId && <Ionicicons name="trash" size={24} color="red" onPress={()=>remove()}/>
			}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rowText: {
		fontSize: 16,
		padding: 4,
		margin: 4,

	},
	removedText: {
		fontSize: 16,
		textDecorationLine: 'line-through',
		color: 'gray',
	},
});