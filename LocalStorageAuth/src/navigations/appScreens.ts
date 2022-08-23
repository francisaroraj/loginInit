import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignScreen from "../screens/SignUpScreen/SignScreen";

export const AppScreens = {
    loginScreen: {
        component: LoginScreen,
        name: "loginScreen",
        title: "LoginScreen",
    },
    signUpScreen: {
        component: SignScreen,
        name: "signScreen",
        title: "SignScreen",
    },
    homeScreen: {
        component: HomeScreen,
        name: "homeScreen",
        title: "HomeScreen",
    },
}
