import { StyleSheet} from 'react-native';

const TweetStyles = StyleSheet.create({
    tweetWithActionsContainer: {
        padding: 3,
        margin: 2,
        backgroundColor: '#111111',
        borderColor: "#DDDDDD",
        borderWidth: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    tweetContainer: {
        padding: 5,
        marginTop: 2
    },
    retweetContainer: {
        padding: 2,
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: "green",
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: "green",
        marginTop: 5,
        marginLeft: 5,
    },
    replyContainer: {
        padding: 2,
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: "blue",
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: "blue",
        marginTop: 5,
        marginLeft: 5,
    },
    username: { 
        fontWeight: 'bold',
        fontSize: 20,
        color: "white"
    },
    tweetContent: {
        fontSize: 18,
        color: "#999999"
    },
    whiteText: { color: "white" },
    grayText: { color: "#999999" },
    greenText: { color: "green" },
    blueText: { color: "blue" }
});

export default TweetStyles;