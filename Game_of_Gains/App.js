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

                        {this._renderContent('{rgb(190, 180, 0)}', 'Friends')}

                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="Home"
                        icon= {{
                                uri: home,
                                scale: 3.5
                        }}
                        selected={this.state.selectedTab === 'purpleTab'}
                        onPress={() => {
                            this.setState(
                                {
                                    selectedTab: 'purpleTab'
                                }
                            );
                        }}>

                        {this._renderContent('{rgb(160, 20, 180)}', 'Home')}

                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="Challenge"
                        icon= {{
                                uri: chal,
                                scale: 3.5
                        }}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState(
                                {
                                    selectedTab: 'redTab'
                                }
                            );
                        }}>

                        {this._renderContent('{rgb(240, 50, 50)}', 'Challenge')}
                    </TabBarIOS.Item>

                    <TabBarIOS.Item
                        title="Leaderboard"
                        icon= {{
                                uri: leaderboard,
                                scale: 3.5
                        }}
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState(
                                {
                                    selectedTab: 'greenTab',
                                }
                            );
                        }}>

                        {this._renderContent('{rgb(20, 240, 20)}', 'Leaderboard')}
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

var home = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABcCAYAAAD50zLWAAAAAXNSR0IArs4c6QAAA7tJREFUeAHt2j9uE0EYBXA7UEBjIVoEJ+AESPQ0QYLCcAAXQeIS5AzIIPmf5AocKtIg2kScgCvQUrihss031hLlxex43uzsH6+eJUf5vPPNzvw8sp+idDoNfkwmk1P3bPASO90mLm6xWNxaLpcfN5vNwK2v2+2Oe73eSb/fXzVtvY0DNLy7hvfJ8J5fxzLEr4b42hD/XH+97t8bBTgej+8b3LmhPMmB+WGQx4PB4HfO9cpfPqr8jjk3nE6nD+3SpT3z8Fynu3aZjXV17Y9GnEA7eY/t5H0zjQeBIr/sJD6zk/gzcHxpw2o/gbPZ7Knt7sKeoXgOw429yHpdXdujVkCLKC9Wq9V3O333WAHX43rdHGxvyvG1AdrGT9br9ReDuBO7Idfr5nBzxc5RtK8WQPvMe2cb/2CLT3H/IzeXm7MoRkx/pV8iNwNyzIJ9PXUE7soA8wKyDyTmWtWBuxLAgIAcY+XrqSxwp/gM8m2kExiQvXNEXKwscJd6AiMCcoSVt6X0wF3aCYwMyF6NiIulB+5SAIsE5Agkb0vZgTs5YIqA7BWJuFhm4E4KaHinCQNyBJW3ZRu43Rq9o8iLSb5Eyg7I5J72Dk8ZuAsDVhWQ96qQA1IF7kKANQRkkmnv8MKBO/ozcD6fP7Ll7fsL8t4d1DxgG7izvUQtJeoENiAgR23W0xQduOkT2JCA7LGIuhQduCnA0Wj0MvYvyFHbqrDpX+B2e2RuGwxoE7+xic9cKGVucEhjs72dZXsNWnoQYBY+hzZj0PigOzd3kNvjMDRwe79EDi0gp35PQgJ3LmAWkD/bsT5OvbBDms8Qz+1fSl7l/UvJfwFbEJBTv0e5gXvnM60lATk1YG7ghhPYwoCcGnIncF+dwJYG5NSAO4F7C9jmgJxa8Gbg7mah8b3d6Oo0pr5pS+db277e3rYfLiDrwQu4AzfUqePhoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoEOAwMEXAuTNoOMv0ZZ2jzolf7cAAAAASUVORK5CYII='

var chal = 'data:image/png;base64,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'

var leaderboard = 'data:image/png;base64,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'

var friends = 'data:image/png;base64,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'
