import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import CategoriesScreen from "../screens/CategoriesScreen.js";
import CategoryMealsScreen from "../screens/CategoryMealScreen.js";
import MealDetailScreen from "../screens/MealDetailScreen.js";
import Colors from "../constants/Colors";

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen,
			navigationOptions: {
				headerTitle: "Meal Categories"
			}
		},
		CategoryMeals: {
			screen: CategoryMealsScreen
		},
		MealDetail: MealDetailScreen
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white"
			},
			headerTintColor:
				Platform.OS === "android" ? "white" : Colors.primaryColor
		}
	}
);

export default createAppContainer(MealsNavigator);
