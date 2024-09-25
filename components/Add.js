import React, { useState } from 'react';
import { View, Text, Button, TextInput,StyleSheet } from 'react-native';


export default function Add({ add }) {
	const [name, setName] = useState('');
	const save = () => {
		add(name);
		setName('');
 	}
	return (
		<View style={StyleSheet.container}>
			<TextInput
				placeholder="Add a new item"
				onChangeText={text=>setName(text)}
				value={name}
				style={styles.input}

			/>
			<Button title="Add" onPress={() => save(name)} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 20,
		width: '80%',
	},
});