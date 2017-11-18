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
            selectedTab: 'redTab',
            notifCount: 0,
            presses: 0,
        };
    },
    _renderContent: function(color: string, pageText: string, num?: number) {
        return (
            <View style={[styles.tabContent, {backgroundColor: color}]}>
                <Text style={styles.tabText}>
                    {pageText}
                </Text>
                <Text style={styles.tabText}>
                    {num} re-renders of the {pageText}
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
                        onPress={() => { this.setState({ selectedTab: 'blueTab', }); }}>

                        {this._renderContent('{rgb(20, 80, 180)}', 'Blue Tab')}

                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="Yellow Tab"
                        systemIcon="favorites"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => { this.setState({ selectedTab: 'yellowTab', }); }}>

                        {this._renderContent('{rgb(190, 180, 0)}', 'Yellow Tab')}

                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="Purple Tab"
                        systemIcon="downloads"
                        selected={this.state.selectedTab === 'purpleTab'}
                        onPress={() => { this.setState({ selectedTab: 'purpleTab', }); }}>

                        {this._renderContent('{rgb(160, 20, 180)}', 'Purple Tab')}

                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        systemIcon="contacts"
                        badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => { this.setState({ selectedTab: 'redTab', notifCount: this.state.notifCount + 1, }); }}>

                        {this._renderContent('{rgb(240, 50, 50)}', 'Red Tab', this.state.notifCount)}
                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        systemIcon="search"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => { this.setState({ selectedTab: 'greenTab', presses: this.state.presses + 1 }); }}>

                        {this._renderContent('{rgb(20, 240, 20)}', 'Green Tab', this.state.presses)}
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
