import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const FilterSwitch = props => {
	return (
		<View style={styles.filterContainer}>
			<Text>{props.title}</Text>
			<Switch
				trackColor={{ true: Colors.primaryColor }}
				thumbColor={
					Platform.OS === "android" ? Colors.primaryColor : " "
				}
				value={props.value}
				onValueChange={props.onChange}
			/>
		</View>
	);
};

export default function FilterScreen(props) {
	const { navigation } = props;

	const [isGlutenFree, setIsGlutenFree] = useState(false);
	const [isLactoseFree, setIsLactoseFree] = useState(false);
	const [isVegan, setIsVeganFree] = useState(false);
	const [isVegetarian, setIsVegetarianFree] = useState(false);

	const saveFilters = useCallback(() => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,
			vegan: isVegan,
			vegetarian: isVegetarian
		};
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

	useEffect(() => {
		navigation.setParams({ save: saveFilters });
	}, [saveFilters]);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			<FilterSwitch
				title="Gluten-free"
				value={isGlutenFree}
				onChange={newValue => setIsGlutenFree(newValue)}
			/>
			<FilterSwitch
				title="Lactose-free"
				value={isLactoseFree}
				onChange={newValue => setIsLactoseFree(newValue)}
			/>
			<FilterSwitch
				title="Vegan"
				value={isVegan}
				onChange={newValue => setIsVeganFree(newValue)}
			/>
			<FilterSwitch
				title="Vegetarian"
				value={isVegetarian}
				onChange={newValue => setIsVegetarianFree(newValue)}
			/>
		</View>
	);
}

FilterScreen.navigationOptions = navData => {
	return {
		headerTitle: "Filter Meals",
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Save"
					iconName="ios-save"
					onPress={navData.navigation.getParam("save")}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center"
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "80%",
		marginVertical: 10
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		margin: 20,
		textAlign: "center"
	}
});
