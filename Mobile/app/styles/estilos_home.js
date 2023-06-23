import { StyleSheet} from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    paddingTop: 3,
    backgroundColor: '#000',
  },
  tweetsListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    paddingTop: 1
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleBold: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
    color: 'white',
  },
  titleNormal: {
    fontWeight: 'normal',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
    color: 'white',
  },
  titleInactive: {
    fontWeight: 'normal',
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center',
    color: '#666',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 70,
    height: 70,
  },
});

export default homeStyles