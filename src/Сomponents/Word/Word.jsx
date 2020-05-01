import React, { useRef } from 'react'
import { Header, Div, UsersStack, Button, Footer, Spinner } from '@vkontakte/vkui'
import FadeIn from 'react-fade-in';
import {} from '../../redux/word/actions'
import { getRandomGradient } from '../../includes/Helpers'
import { format, fromUnixTime } from 'date-fns'
import ruLocale from "date-fns/locale/ru"
import ResultAnimation from '../../includes/Helpers/ResultAnimation'
import CountUp from 'react-countup';

export default class Word extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            background: getRandomGradient(),
            lastWordScore: 0
        }
    }

    componentDidUpdate(prevProps) {

        const { status, getData, user, word } = this.props;

        if (status !== prevProps.status) {
            if (status === 'success' || status === 'fail') {

                if (status === 'success') {
                    ResultAnimation('success', word.score);
                } else if (status === 'fail') {
                    ResultAnimation('fail', word.score);
                }

                setTimeout(() => {
                    getData && getData();
                    this.setState({ background: getRandomGradient() });
                }, 1000);
            } 
        }
    }

    handleMakeAttempt = variant => {
        const { word, makeAttempt, isPending } = this.props;
        !isPending && makeAttempt && makeAttempt({
            wordId: word.id,
            variantId: variant.id
        });
    }

    getBackground = () => {
        const { word } = this.props;

        if (word && typeof word.background === 'string') {
            return word.background;
        } else {
            return getRandomGradient();
        }
    }

    isAllowPlay = () => {
        // const { limitlog } = this.props;
        // const now = new Date();
        // const activateDateTime = fromUnixTime(limitlog.activate_at)
        // const allowPlay = isAfter(now, activateDateTime);
        // return allowPlay;

        return true;

    }

    render() {

        const { word, isPending, limitlog, user, gameStatus, status } = this.props;

        const gameIsActive = gameStatus === 'active';
        const outOfData = gameStatus === 'out_of_data';
        const isAllowPlay = this.isAllowPlay();


        if (isPending) {
            return <>
                {this.renderHeader()}
                <br />
                <Spinner size="xl" />
            </>
        }

        if (false === isAllowPlay) {
            return <>
                {this.renderHeader()}
                {this.renderLimitStub()}
            </>
        }

        return (<>
            {this.renderHeader()}
            <FadeIn transitionDuration={400} delay={100}>
            <Div className="word-inner">
                <div
                    className={`word-card ${status}`} 
                    style={{
                        backgroundImage: this.getBackground(),
                        minHeight: 140,
                        display: 'flex',
                        flexWrap: 'wrap',
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 12,
                        paddingTop: 50,
                        paddingBottom: 50
                    }}>

                    {gameIsActive && <> 
                        
                            <div className="word-epoch">
                                    { word.themeModel ? word.themeModel.name : null }
                            </div>
                        
                        <div className="word-main">
                            {word.text}
                        </div>

                        <div className="variants-container">
                                {this.renderVariants()}
                        </div>

                        { this.renderUserStack() }
                    </>}

                    {outOfData &&
                        <div className="word-info">
                            Ого! Кажется, вы отгадали все слова. Загляните позже.
                            Или <b>предложите свои вариант</b>!
                        </div>
                    }

                </div>
            </Div>
            </FadeIn>
        </>);
    }

    renderHeader() {
        const { user, word } = this.props;
        
        if (!user.scores) {
            return null;
        }

        let start, end;

        if (this.props.status === 'success') {
            start = user.scores - word.score;
            end = user.scores;
        } else {
            start = user.scores;
            end = user.scores;
        }
        
        return (
            <Header>
                {/* <CountUp
                    prefix="Счёт: "
                    start={start} 
                    end={end}/> */}
                    Счёт: {user.scores}
            </Header>
        )
    }

    renderLimitStub() {

        const { limitlog, user } = this.props;
        const activateDate = fromUnixTime(limitlog.activate_at);
        const formattedDate = format(activateDate, 'HH:mm', { locale: ruLocale });

        return (
            <>
                <FadeIn transitionDuration={400} delay={100}>
                <Div className="word-inner">
                    <div style={{
                        backgroundImage: this.getBackground(),
                        minHeight: 140,
                        display: 'flex',
                        flexWrap: 'wrap',
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 12,
                        paddingTop: 50,
                        paddingBottom: 50
                    }}>
                        <div style={{ color: '#fff', textAlign: 'center' }}>
                            Вы сделали 10 попыток. Вы сможете вернуться к игре
                            <div>{ formattedDate }</div>

                        </div>

                    </div>
                </Div>
                </FadeIn>
                <FadeIn delay={400} transitionDuration={400}>
                    <Footer 
                        style={{ marginTop: 0 }}>
                            {`Попыток: ${user.limit} из ${user.limit}`}
                    </Footer>
                </FadeIn>
            </>
        )
    }

    renderVariants() {
        const { variants, currentVariant, status } = this.props;

        return variants.map(v => {
            
            let statusClass = '';

            if (status === 'success' && currentVariant === v.id) statusClass = 'success';
            else if (status === 'fail' && currentVariant === v.id) statusClass = 'fail';
            else statusClass = 'neutral';

            return (
                <div
                    onClick={() => { this.handleMakeAttempt(v) }}
                    className={`variants-container-item ${statusClass}`}
                    key={v.id}>
                    {v.text}
                </div>
            )
        });
    }

    getWordName(count) {
        if ((count >= 2 && count <= 5)) {
            return 'человека';
        } else if ((count % 10 >= 2 && count % 10 <= 5) && (count) > 15) {
            return 'человека';
        } else {
            return 'человек';
        }
    }

    renderUserStack() {

        const { word } = this.props;

        let photos = word.successUserAvatars && word.successUserAvatars.length > 0 ? word.successUserAvatars : [];

        return (
            <div className="word-userstack">
                <FadeIn>
                    <UsersStack
                        photos={photos}
                        style={{ color: "#fff" }}>
                        Уже отгадали: {word.successCount} 
                    </UsersStack>
                </FadeIn>
            </div>
        );
    }
}