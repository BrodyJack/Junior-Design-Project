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
                        title="Events"
                        icon= {{
                                uri: events,
                                scale: 3.5
                        }}
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState(
                                {
                                    selectedTab: 'blueTab'
                                }
                            );
                        }}>

                        {this._renderContent('{rgb(20, 80, 180)}', 'Events')}

                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="Friends"
                        icon= {{
                                uri: friends,
                                scale: 3.5
                        }}
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

//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------

var events = 'data:image/png;base64,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'

var friends = 'data:image/png;base64,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'
