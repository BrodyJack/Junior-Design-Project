var React = require('react');
var ReactNative = require('react-native');
var { StyleSheet, TabBarIOS, Text, View, } = ReactNative;

var TabBarExample = React.createClass(
{
    statics: {
        title: 'Test TabBar',
        description: 'Tab-based navigation.',
    },

    displayName: 'TabBarExample',

    getInitialState: function()
    {
        return {
            selectedTab: 'redTab'
        };
    },
    _renderContent: function(color: string, pageText: string) {
        return (
            <View style={[styles.tabContent, {backgroundColor: color}]}>
                <Text style={styles.tabText}>
                    {pageText}
                </Text>
                <Text style={styles.tabText}>
                    This is the {pageText}
                </Text>
            </View>
        );
    },
    render: function()
    {
        return (
            <TabBarIOS
                unselectedTintColor="gray"
                tintColor="#007aff"
                barTintColor="white">

                    <TabBarIOS.Item
                        title="Blue Tab"
                        systemIcon="history"
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState(
                                {
                                    selectedTab: 'blueTab'
                                }
                            );
                        }}>

                        {this._renderContent('{rgb(20, 80, 180)}', 'Blue Tab')}

                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="Yellow Tab"
                        systemIcon="favorites"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.setState(
                                {
                                    selectedTab: 'yellowTab'
                                }
                            );
                        }}>

                        {this._renderContent('{rgb(190, 180, 0)}', 'Yellow Tab')}

                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="Purple Tab"
                        systemIcon="downloads"
                        selected={this.state.selectedTab === 'purpleTab'}
                        onPress={() => {
                            this.setState(
                                {
                                    selectedTab: 'purpleTab'
                                }
                            );
                        }}>

                        {this._renderContent('{rgb(160, 20, 180)}', 'Purple Tab')}

                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        systemIcon="contacts"
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState(
                                {
                                    selectedTab: 'redTab'
                                }
                            );
                        }}>

                        {this._renderContent('{rgb(240, 50, 50)}', 'Red Tab')}
                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        systemIcon="search"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState(
                                {
                                    selectedTab: 'greenTab',
                                }
                            );
                        }}>

                        {this._renderContent('{rgb(20, 240, 20)}', 'Green Tab')}
                    </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
});

var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center', },
    tabText: {
        color: 'black',
        margin: 50, }, }
);

module.exports = TabBarExample;
