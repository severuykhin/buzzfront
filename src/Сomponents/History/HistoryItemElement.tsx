import React from 'react'
import {Div} from '@vkontakte/vkui'
import { HistoryItem } from '../../includes/Constants'
import posed from "react-pose";

const Item = posed.div({
    on: { opacity: 1, y: 0 },
    off: { opacity: 0, y: 30, transition: { type: "spring" } }
});

export default (props) => {

    const item: HistoryItem = {...props.item}

    return (
        <Item>
            <Div
                style={{ 
                    background: item.background
                }} 
                className="History__item">
                <div className="History__item-heading">
                    {item.text}
                </div>
                <div className="History__item-description">
                    {item.description}
                </div>
                <div className="History__item-score">
                    Баллов: {item.score}
                </div>
                <div className="History__item-category">
                    { item.themeName ? item.themeName : '' }
                </div>
            </Div>
        </Item>
    )
}