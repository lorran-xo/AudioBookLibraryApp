import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    containerTabBar: {
        alignItems: 'center',
    },

    tabBar: {
        position: 'absolute',
        height: 90,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.7,
    },

    tabBarInline: {
        backgroundColor: 'rgba(241, 241, 241, 0.8)',
        position: 'absolute',
        elevation: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        height: 90,
    },

    containerTabBarIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
