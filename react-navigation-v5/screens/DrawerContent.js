import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Text, Avatar, Title, Caption, Paragraph, Drawer, TouchableRipple, Switch, useTheme} from 'react-native-paper';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';


export const DrawerContent = props => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const toggleThemeHandler = () => {
        setIsDarkTheme(!isDarkTheme);
    }
    return(
        <View style={styles.screen}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        {/* Avatar and Caption */}
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image source={{uri: 'https://www.drupal.org/files/user-pictures/picture-2204516-1469808304.png'}} 
                            size={50} />
                            <View style={{marginLeft: 15}}>
                                <Title style={styles.title}>Ehtisham Tahir</Title>
                                <Caption style={styles.caption}>@shaamT</Caption>
                            </View>
                        </View>

                        {/* info related to following and followers */}
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={{...styles.paragraph, ...styles.caption}}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={{...styles.paragraph, ...styles.caption}}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>

                    {/* drawer navigation */}
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon = {({size, color}) => (
                                <Icon name="home-outline" size={size} color={color} />
                            )}
                            label="Home"
                            onPress={()=> {
                                props.navigation.navigate("Home");
                            }}
                        />

                        <DrawerItem 
                            icon = {({size, color}) => (
                                <Icon name="account-outline" size={size} color={color} />
                            )}
                            label="Profile"
                            onPress={()=> {
                                props.navigation.navigate("Profile");
                            }}
                        />

                        <DrawerItem 
                            icon = {({size, color}) => (
                                <Icon name="bookmark-outline" size={size} color={color} />
                            )}
                            label="Bookmarks"
                            onPress={()=> {
                                props.navigation.navigate("Bookmarks");
                            }}
                        />

                        <DrawerItem 
                            icon = {({size, color}) => (
                                <Icon name="settings-outline" size={size} color={color} />
                            )}
                            label="Settings"
                            onPress={()=> {
                                props.navigation.navigate("Settings");
                            }}
                        />

                        <DrawerItem 
                            icon = {({size, color}) => (
                                <Icon name="account-check-outline" size={size} color={color} />
                            )}
                            label="Support"
                            onPress={()=> {
                                props.navigation.navigate("Support");
                            }}
                        />
                    </Drawer.Section>

                    {/* switch */}
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={toggleThemeHandler}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="auto">
                                    <Switch value={isDarkTheme} onValueChange={toggleThemeHandler} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            {/* signOut Section */}
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                icon= {({size, color}) => (
                    <Icon name="exit-to-app" size={size} color={color} />
                )}
                label="Sign Out" 
                onPress={()=> {}}
                />
                
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });