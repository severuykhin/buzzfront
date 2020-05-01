import React from 'react'
import { Spinner, Footer, Div, List, Cell, Separator, Counter } from '@vkontakte/vkui'
import { AchivmentInterface } from '../../includes/Constants'
import FadeIn from 'react-fade-in';
import Icon56LockOutline from '@vkontakte/icons/dist/56/lock_outline';


interface AchivmentsProps {
    errors: string[],
    items: AchivmentInterface[],
    isPending: boolean
}

const getAchivmentIcon = (achivment: AchivmentInterface) => {
    let content = '';

    if (achivment.active === false) {
        return(
            <div className={`achivment achivment_locked`}>
                <Icon56LockOutline fill="#b7b5b5" />
            </div>
        )    
    }

    if (achivment.count) {
        content = achivment.count.toString();
    } else if (achivment.score) {
        content = achivment.score.toString()
    }

    return(
        <div className={`achivment achivment-${achivment.type}`}>
            <span>{ content }</span>
        </div>
    )
}

export default (props: AchivmentsProps) => {

    const { isPending, errors, items } = props;

    if (isPending) return <Spinner size="regular"/>

    if (errors && errors.length > 0) {
        return <Footer>{ errors[0] }</Footer>
    }

    return (
            <>
            <br/>
            { items.map((achivment, index) => {

                let lastInType = items[index + 1] && items[index + 1].type !== achivment.type;

                return (
                    <>
                        <FadeIn 
                            key={`achivment-${achivment.id}`}
                            transitionDuration={300} 
                            delay={50 * index}>
                            <Cell
                                className={`Cell_achivment ${achivment.active ? '' : 'Cell_achivment_muted'}`}
                                style={{ 
                                    opacity: achivment.active ? 1 : 0.2,
                                    marginBottom: 20 
                                }}
                                size="l"
                                description={achivment.desc}
                                before={getAchivmentIcon(achivment)}
                                key={`achivment-item-${achivment.id}`}>
                                {achivment.name}
                                {achivment.active && achivment.watched === 0 
                                    ? <Counter size="s"  mode="prominent">NEW</Counter> 
                                    : null}
                            </Cell>
                        </FadeIn>
                        { lastInType === true && <Separator  key={`separator-${achivment.id}`} style={{ marginBottom: 20 }}/>}
                    </>
                )
            })}
            </>
    )
}