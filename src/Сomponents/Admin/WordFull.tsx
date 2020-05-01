import React, { useState, useEffect } from 'react'
import { Div, Header, Input, Button } from '@vkontakte/vkui'
import WordService from '../../includes/Services/WordService'

export default (props) => {

    const { word } = props;
    const [variants, setVariants] = useState(word.variants ? word.variants : []);

    const changeValue = (value, index) => {
        const newVariants = [...variants];
        const v = {...newVariants[index]};
        v.text = value;
        newVariants[index] = v;
        setVariants(newVariants);
    }

    const item = {
        text: ""
    };

    const addVariant = () => {
        const newVariants = [...variants];
        newVariants.push(item);
        setVariants(newVariants);
    }

    const sendVariants = async () => {
        const request_variants = variants.map((v, index) => {
            if (index === 0) {
                v.success = 1;
            }

            return v;
        });
        const response = await WordService.sendVariants(request_variants, word.id);
        console.log(response);
    }

    const deleteVariant = (index) => {
        const newVariants = [...variants].filter((v, i) => i !== index);
        setVariants(newVariants);
    }

    const renderVariants = () => {
        return variants.map((v, i) => {
            return <div key={i} style={{ display:"flex" }}>
                <div style={{flexGrow: 1, flexBasis: '80%'}}>
                    <Input value={v.text} onChange={(e) => { 
                        changeValue(e.target.value, i); 
                    }} key={i}/>
                </div>
                {i > 0 && <Button onClick={() => { deleteVariant(i) }}>x</Button>}
            </div>
        })
    }

    return (
        <Div key={props.index}>
            <Header>
                {word.text}
            </Header>
            { renderVariants() }
            <Button onClick={addVariant}>Добавить</Button>
            <Button onClick={sendVariants}>Сохранить</Button>
        </Div>
    )
}