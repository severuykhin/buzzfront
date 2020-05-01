import React from 'react'
import App from './App'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store from './redux/index'
import { history } from './redux/reducer'

class Root extends React.Component {
    render() {
        return(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <App/>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default Root;