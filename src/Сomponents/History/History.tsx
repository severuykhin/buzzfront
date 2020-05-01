import React, { useState, useEffect } from 'react'
import HistoryItemElement from './HistoryItemElement'
import { Div, Spinner, Search, Footer } from '@vkontakte/vkui'
import { Header } from '@vkontakte/vkui'
import { HistoryProps, HistoryItem } from '../../includes/Constants'
import FadeIn from 'react-fade-in';

export default (props: HistoryProps) => {

    const { data, isPending, handleSearch, getData } = props; 

    const [timer, setTimer] = useState(null);
    const [val, setVal] = useState('');
    const [getDataEffected, setGetDataEffected] = useState(false);

    const [touched, setTouched] = useState(false);

    useEffect(() => {
        
        if (timer) {
            clearTimeout(timer);
        }

        if (val === '' && touched && props.totalCount > 0) {
            setGetDataEffected(true);
            getData && getData();
            return;
        }

        if (val !== '' && props.totalCount > 0) {
            const t = setTimeout(() => {
                handleSearch && handleSearch(val);
                setTimer(null);
            }, 500);
    
            setTimer(t);
        }

    }, [val]);

    const handleChange = e => {
        const val = e.target.value;

        setTouched(true);
        setVal(val);
    }

    const handleBlur = e => {
        if (timer) {
            clearTimeout(timer);
        }
        setVal('');
        !isPending && getData && getData();
    }

    const renderData = () => {

        if (props.totalCount === 0) {
            return <Footer>В вашем словаре пока ничего нет</Footer>;
        }

        if (data.length === 0) {
            return <Footer>Ничего не найдено</Footer>;
        }
        return data.map((item: HistoryItem, index: number) => {
            return (
                <HistoryItemElement key={index} item={item}/>
            )
        });
    }

    return (<>

        <Header>
            <span className="History__heading">Ваш словарь </span> { props.totalCount }
        </Header>

        <Search
            value={val}
            // onBlur={handleBlur}
            onChange={handleChange}/>

        {isPending && <Div><Spinner size="medium"/></Div>}
        {!isPending && <Div className="History__inner">
            <FadeIn transitionDuration={500} delay={150}>
                {renderData()}
            </FadeIn>
        </Div>}

    </>);
}