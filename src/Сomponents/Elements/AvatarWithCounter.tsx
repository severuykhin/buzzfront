import React from 'react'
import { Avatar } from '@vkontakte/vkui'

interface AvatarWithCounterProps {
    src: string,
    counter: number
}

export default (props: AvatarWithCounterProps) => {
    return (
        <div className="AvatarWithCounter">
            <Avatar
                src={props.src}
                size={64}/>
            <div className="AvatarWithCounter-count">
                {props.counter}
            </div>
        </div>
    );
}