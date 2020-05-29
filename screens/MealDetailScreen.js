import React from "react";
import {
	Image,
	View,
	Text,
	StyleSheet,
	Button,
	ScrollView
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { MEALS } from "../data/dummy-data";
import HeaderButton from "../components/HeaderButton";
import defaultStyles from "../constants/default-styles";

const ListItem = props => {
	return (
		<View style={styles.listItem}>
			<Text style={{ ...defaultStyles.text }}>{props.children}</Text>
		</View>
	);
};

export default function MealDetailScreen(props) {
	const mealId = props.navigation.getParam("mealId");
	const selectedMeal = MEALS.find(meal => meal.id === mealId);
	return (
		<ScrollView>
			<Image
				source={{ uri: selectedMeal.imageUrl }}
				style={styles.image}
			/>
			<View style={styles.details}>
				<Text style={{ ...defaultStyles.text }}>
					{selectedMeal.duration}m
				</Text>
				<Text style={{ ...defaultStyles.text }}>
					{selectedMeal.complexity.toUpperCase()}
				</Text>
				<Text style={{ ...defaultStyles.text }}>
					{selectedMeal.affordability.toUpperCase()}
				</Text>
			</View>
			<Text style={styles.title}>Ingredients</Text>
			{selectedMeal.ingredients.map(ingredient => (
				<ListItem key={ingredient}>{ingredient}</ListItem>
			))}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal.steps.map(step => (
				<ListItem key={step}>{step}</ListItem>
			))}
			<View style={styles.screen}>
				<Button
					title="Go Back"
					onPress={() => {
						props.navigation.popToTop();
					}}
				/>
			</View>
		</ScrollView>
	);
}

MealDetailScreen.navigationOptions = navigationData => {
	const mealId = navigationData.navigation.getParam("mealId");
	const selectedMeal = MEALS.find(meal => meal.id === mealId);
	return {
		headerTitle: selectedMeal.title,
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item title="Favorite" iconName="ios-star" onPress={() => {}} />
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	image: {
		width: "100%",
		height: 200
	},
	details: {
		flexDirection: "row",
		padding: 15,
		justifyContent: "space-around"
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		textAlign: "center"
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10
	},
});
