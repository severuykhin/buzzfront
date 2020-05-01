import React from 'react'
import { Epic, Tabbar, TabbarItem, View, Panel, PanelHeader, Tooltip, Alert, Div, ScreenSpinner, Snackbar } from '@vkontakte/vkui'
import { history } from '../redux/reducer'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getActiveStory } from '../redux/router/selectors'
import { getUnreadLog } from '../redux/history/selectors'
import { HistoryItem } from '../includes/Constants'

import Icon24Newsfeed from '@vkontakte/icons/dist/24/newsfeed';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import Icon24List from '@vkontakte/icons/dist/24/list';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';

import WordContainer from '../Сomponents/Word/WordContainer'
import HistoryContainer from '../Сomponents/History/HistoryContainer'
import LeadersContainer from '../Сomponents/Leaders/LeadersContainer'
import SettingContainer from '../Сomponents/Settings/SettingsContainer'
import SuggestContainer from '../Сomponents/Suggest/SuggestContainer'
import AchivmentsContainer from '../Сomponents/Achivments/AchivmentsContainer'
import WordsFull from '../Сomponents/Admin/WordsFull'
import Icon24Report from '@vkontakte/icons/dist/24/report';
import Icon28CheckCircleOutline from '@vkontakte/icons/dist/28/check_circle_outline';

import UrlParams from '../includes/UrlParams'

import { AllowActionsInterface } from '../includes/Constants'

import FadeIn from 'react-fade-in';

class IndexRoute extends React.Component {

    mainSnackbar = {
      open: (component) => {
          this.setState({snackbar: component});
      },
      close: (callback) => {
          this.setState({snackbar: null}, () => {
              callback && callback()
          });
      },
      showError: (message, action = {}) => {
          const snackbar = <Snackbar
                              onClose={() => { this.mainSnackbar.close(null); return {}}}
                              before={<Icon24Report fill={`var(--dynamic_red)`}/>}
                              >
                              {message}
                          </Snackbar>
          this.mainSnackbar.open(snackbar);
      },
      showSuccess: (message, action = {}) => {
          const snackbar = <Snackbar
                              onClose={() => {this.mainSnackbar.close(null); return {}}}
                              action={action.text ? action.text : null}
                              onActionClick={action.callback ? action.callback : () => {}}
                              before={<Icon28CheckCircleOutline width={24} height={24} fill={`var(--dynamic_green)`}/>}
                              >
                              {message}
                          </Snackbar>
          this.mainSnackbar.open(snackbar);
      }
  };

    mainPopout = {
      open: (component, type = 'alert') => {
          this.setState({popout: component});
          if (type === 'context') {
              window.history.pushState(null, document.title, window.location.href);
          }
      },
      loading: () => {
          this.setState({popout: <ScreenSpinner size="regular"/>})
      },
      close: (callback) => {
          this.setState({popout: null}, () => {
              callback && callback();
          });
      },
      error: (text, title = 'Ошибка') => {
          this.setState({
              popout: (
                  <Alert 
                          actions={[{title: 'Закрыть', autoclose: true, mode: 'cancel'}]}
                          actionsLayout="vertical"
                          onClose={() => this.setState({popout: null})}>
                      <h2>{title}</h2>
                      <Div>{text}</Div>
                  </Alert>
              )
          });
      },
      confirmDelete: (action) => {
          this.setState({
              popout: (
                  <Alert 
                          actions={[
                            {title: 'Удалить',  mode: 'destructive', autoclose: true, action: () => { action && action() }},
                            {title: 'Закрыть', autoclose: true, mode: 'cancel'}
                          ]}
                          actionsLayout="vertical"
                          onClose={() => this.setState({popout: null})}>
                      <h2>Вы уверены?</h2>
                      {/* {text && <Div>{text}</Div>} */}
                  </Alert>
              )
          });
      },
      isActive: () => {
          return !!this.state.popout;
      }
  };

    constructor(props) {
      super(props);

      this.state = {
        showSuggestNotification: false,
        urlParams: new UrlParams(),
        popout: null,
        snackbar: null
      }
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps.allowActions.isAllowSuggestWord === false
        && this.props.allowActions.isAllowSuggestWord === true) {
          this.setState({ showSuggestNotification: true })
        }

      if (this.props.activeStory === 'suggest' && prevProps.activeStory !== 'suggest') {
        this.setState({ showSuggestNotification: false })
      }
    }

    render() {
        const { activeStory, unreadLog, totalCount, unreadAchivmentsCount, totalAchivmentsCount } = this.props;
        
        return (
            <Epic activeStory={activeStory} tabbar={

                <Tabbar>
                  <TabbarItem
                    onClick={() => { history.push(`/` + window.location.search) }}
                    selected={activeStory === 'main'}
                    text="Играть"
                  ><Icon24Newsfeed/></TabbarItem>
                  <TabbarItem
                    onClick={() => { history.push('/guessed' + window.location.search) }}
                    selected={activeStory === 'guessed'}
                    text="Словарь"
                    label={unreadLog > 0 ? 
                      <FadeIn>
                        <span>{unreadLog}</span>
                      </FadeIn> : null
                    }
                  >
                    {unreadLog === 1 && totalCount === 1 &&
                      <FadeIn>
                          <div className="tooltip tooltip-history">
                            <div>Вы всегда можете вернуться</div> 
                            <div>к отгаданным словам</div>
                          </div>
                        </FadeIn>}
                    <Icon24List/>
                  </TabbarItem>
                  <TabbarItem
                    onClick={() => { history.push('/leaders' + window.location.search) }}
                    selected={activeStory === 'leaders'}
                    text="Лидеры"
                  >
                  <Icon28UsersOutline/>
                  </TabbarItem>
                  <TabbarItem
                    onClick={() => { history.push('/suggest' + window.location.search) }}
                    selected={activeStory === 'suggest'}
                    text="Добавить"
                  >
                    { this.state.showSuggestNotification === true
                      && <FadeIn>
                            <div className="tooltip tooltip-suggest">
                              <div>Супер! Теперь у вас есть возможость</div> 
                              <div>предлагать свои варианты!</div>
                            </div>
                          </FadeIn>}
                    <Icon28Messages/>
                  </TabbarItem>
                  <TabbarItem
                    onClick={() => { history.push('/achivments' + window.location.search) }}
                    selected={activeStory === 'achivments'}
                    text="Достижения"
                    label={unreadAchivmentsCount > 0 ? 
                      <FadeIn>
                        <span>{unreadAchivmentsCount}</span>
                      </FadeIn> : null
                    }
                  >
                    { unreadAchivmentsCount > 0 && totalAchivmentsCount === 1
                      && <FadeIn>
                        <div className="tooltip tooltip-achivments">
                          <div>Ого, кажется у вас</div> 
                          <div>новые достижения!</div>
                        </div>
                        </FadeIn> }
                    <Icon28FavoriteOutline/>
                  </TabbarItem>
                  {this.state.urlParams.gets.vk_user_id === 4871362 &&
                    <TabbarItem
                      onClick={() => { history.push('/admin' + window.location.search) }}
                      selected={activeStory === 'admin'}
                      text="Админка"
                    >
                    </TabbarItem>
                  }
                </Tabbar>
                
              }>
                <View id="main" activePanel="main">
                  <Panel id="main">
                    <PanelHeader>ULang</PanelHeader>
                    <WordContainer/>
                  </Panel>
                </View>
                <View id="guessed" activePanel="guessed">
                  <Panel id="guessed">
                    <PanelHeader>ULang</PanelHeader>
                    <HistoryContainer />
                  </Panel>
                </View>
                <View id="leaders" activePanel="leaders">
                  <Panel id="leaders">
                    <PanelHeader>ULang</PanelHeader>
                    <LeadersContainer/>
                  </Panel>
                </View>
                <View id="suggest" activePanel="suggest" popout={this.state.popout}>
                  <Panel id="suggest">
                    <PanelHeader>ULang</PanelHeader>
                    <SuggestContainer 
                      mainPopout={this.mainPopout} 
                      mainSnackbar={this.mainSnackbar}/>
                    {this.state.snackbar}
                  </Panel>
                </View>
                <View id="achivments" activePanel="achivments">
                  <Panel id="achivments">
                    <PanelHeader>ULang</PanelHeader>
                    <AchivmentsContainer/>
                  </Panel>
                </View>
                {this.state.urlParams.gets.vk_user_id === 4871362 && <View id="admin" activePanel="admin">
                  <Panel id="admin">
                    <PanelHeader>Admin</PanelHeader>
                    <WordsFull/>
                  </Panel>
                </View>}
              </Epic>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeStory: getActiveStory(state),
        unreadLog: getUnreadLog(state),
        totalCount: state.history.totalCount,
        unreadAchivmentsCount: state.achivments.unreadCount,
        totalAchivmentsCount: state.achivments.totalCount,
        allowActions: {...state.user.allowActions}
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(IndexRoute);