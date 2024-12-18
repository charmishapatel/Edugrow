/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import AppNavigation from './components/navigation/AppNavigation';

AppRegistry.registerComponent(appName, () => AppNavigation);

