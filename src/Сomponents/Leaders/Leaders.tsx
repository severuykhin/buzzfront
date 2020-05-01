import React from 'react'
import { Header, Footer, List, Cell, Avatar, Button, Separator } from '@vkontakte/vkui'
import AvatarWithCounter from '../Elements/AvatarWithCounter'
import FadeIn from 'react-fade-in';
import Icon24MoreHorizontal from '@vkontakte/icons/dist/24/more_horizontal';

interface LeadersProps {
    errors: Array<string>,
    data: Array<LeaderboardItem>,
    currentUser: LeaderboardItem,
    statuses: any,
    maxAvailableCount: number
}

interface LeaderboardItem {
    first_name: string,
    last_name: string,
    img: string,
    id: number,
    vk_user_id: number,
    count: number,
    score: number,
    place?: number
}

export default function Leaders(props: LeadersProps) {
    const { errors } = props;

    const getUserStatus = (score, statuses, maxAvailableCount) => {

        if (maxAvailableCount <= 0 || score <= 0) {
            return statuses[0];
        }

        let percentOfTheTotal = Math.floor(score / (maxAvailableCount / 100));
        let bottomRange = Math.floor(percentOfTheTotal / 10) * 10;

        if (statuses[bottomRange]) {
            return statuses[bottomRange];
        }

        return '';
    }

    const renderErrors = () => {
        return <Footer>{errors[0]}</Footer>
    }

    const renderData = () => {
        
        const { data, currentUser, statuses, maxAvailableCount } = props;

        return (
            <List>
                { data.map((item: LeaderboardItem, index: number) => {
                    return (
                            <Cell
                                key={`leaders-${index}`}
                                before={
                                    <Avatar
                                        className={`Leaderboard-place Leaderboard-place-${index + 1}`}
                                        data-place={index}
                                        src={item.img} 
                                        size={64} />
                                }
                                size="l"
                                href={`https://vk.com/id${item.vk_user_id}`}
                                target="_blank"
                                description={getUserStatus(item.score, statuses, maxAvailableCount)}
                                asideContent={<span className="Leaderboard-score">{item.score}</span>}
                            >
                                {`${item.first_name} ${item.last_name}`}
                            </Cell>
                    )
                })}
                {currentUser && (
                    <>
                        <Separator key="leaders-separator" style={{margin: '12px 0'}}/>
                        <Cell
                            key={currentUser.id}
                            before={
                                <Avatar
                                    className={`Leaderboard-place Leaderboard-place-${currentUser.place}`}
                                    data-place={currentUser.place}
                                    src={currentUser.img} 
                                    size={64} />
                            }
                            size="l"
                            description={getUserStatus(currentUser.score, statuses, maxAvailableCount)}
                            asideContent={<span className="Leaderboard-score">{currentUser.score}</span>}
                        >
                            {`${currentUser.first_name} ${currentUser.last_name}`}
                        </Cell>
                    </>
                )}
            </List>
        );
    }

    return (<>
        <Header>
            Лидеры
        </Header>
        {errors.length > 0
            ? renderErrors()
            : renderData()
        }
    </>);
}
