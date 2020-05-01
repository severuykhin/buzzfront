import React, {Component} from 'react';
import { connect as connectRedux } from 'react-redux';
import { history } from './redux/reducer'
import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import IndexRoute from './Routes/IndexRoute.jsx'
import UrlParams from './includes/UrlParams'
import UserService from './includes/Services/UserService'
import { Placeholder, View, Panel, Button, Spinner, ScreenSpinner } from '@vkontakte/vkui'
import Icon56WifiOutline from '@vkontakte/icons/dist/56/wifi_outline';
import Icon56FireOutline from '@vkontakte/icons/dist/56/fire_outline';

import store from './redux/index'

class App extends Component {
    
    constructor(props) {
        super(props);
        
        connect.send('VKWebAppInit', {});

        if (connect.supports("VKWebAppResizeWindow")) {
            connect.send("VKWebAppResizeWindow", {"height": Math.min(4050, window.outerHeight - 370)});
        } else {
            console.log('Event VKWebAppResizeWindow not supported');
        }

        if (connect.supports("VKWebAppGetClientVersion")) {
            connect.send("VKWebAppGetClientVersion", {});
        } else {
            console.log('Event VKWebAppGetClientVersion not supported');
        }

        connect.subscribe((e) => {
            if ((e.detail) && (e.detail.type)) {
                switch (e.detail.type) {
                    
                }
            }
        });

        const uParams = new UrlParams();
        if (uParams.gets.secret) {
            localStorage.setItem('secret', uParams.gets.secret);
        }

        this.state = {
            isPendingGreet: false
        }

    }

    handleGreeting = async () => {

        this.setState({ isPendingGreet: true });

        const uParams = new UrlParams();
        const resp = await UserService.greet({vk_user_id: uParams.gets.vk_user_id});
        if (resp.result === 'success') {
            store.dispatch({
                type: 'user/PUT_USER_DATA',
                payload: resp.data.user
            })
        } else {
            alert('Произошла ошибка. Попробуйте позже');
        }

        this.setState({ isPendingGreet: false });

    }

    render() {

        const { user } = this.props;

        if (!user.data) {
            return (
                <View id="load" activePanel="load">
                    <Panel id="load">
                        <Placeholder icon={<Icon56WifiOutline/>} stretched={true}>
                            Загружаемся
                        </Placeholder>
                    </Panel>
                </View>
            );
        }

        if (user.data.greeting === 0) {
            return (
                <View id="load" activePanel="load">
                    <Panel id="load">
                        <Placeholder 
                            icon={<Icon56FireOutline/>} 
                            stretched={true}
                            header="Привет">
                            Это <b>ULang</b> - тут мы переводим с русского на русский и собираем словать современного сленга.
                            <br/>
                            <br/>
                            {this.state.isPendingGreet 
                                ? <Spinner/>
                                : <Button size="xl" onClick={this.handleGreeting}>Понятно</Button>
                            }
                        </Placeholder>
                    </Panel>
                </View>
            );
        }

        return (
            <Router>
                <Route path="/" exact component={IndexRoute} />
                <Route path="/:story" component={IndexRoute} />
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: {...state.user}
    };
}

const mapDispatchToProps = () => {
    return {
        
    }
}

export default connectRedux(mapStateToProps, mapDispatchToProps)(App);
