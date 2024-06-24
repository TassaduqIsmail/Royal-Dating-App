/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Introduction from './src/screens/app/Introduction';
import Route from './src/routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, } from './src/store/Store/Store';
import {store } from "./src/store/Store/Store"
import Home from './src/screens/app/Home';

const Root = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Route />
            </PersistGate>
        
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => Root);
