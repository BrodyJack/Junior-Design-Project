import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>His palms are sweaty</Text>
                <Text>Knees weak, arms are heavy</Text>
                <Text>{"There's vomit on his sweater already"}</Text>
                <Text>{"Mom's spaghetti"}</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
});
