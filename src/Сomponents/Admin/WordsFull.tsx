import React, { useEffect, useState } from 'react'
import WordFull from './WordFull'
import WordService from '../../includes/Services/WordService'

export default (props) => {

    const [words, setWords] = useState([]);

    useEffect(() => {
        getWords();
    }, []);

    const getWords = async () => {
        const response = await WordService.getAll();
        if (response.data && response.data.words) {
            setWords(response.data.words);
        } else {
            alert('Ошибка');
        }
    }

    return (
        <>
            { words.map(w => {
                return <div key={w.id}><WordFull index={w.id} key={`sdf-${w.id}`} word={w}/></div>;
            }) }
        </>
    )
}