import React, { useState, useEffect } from 'react'
import { 
    Header, 
    Placeholder, 
    Button, 
    FormLayout, 
    FormLayoutGroup, 
    Input, 
    Textarea,
    Tabs,
    TabsItem, 
    Select, 
    Checkbox, List, Cell, Group, Div, Footer } from '@vkontakte/vkui'
import { AllowActionsInterface } from '../../includes/Constants'
import WordService from '../../includes/Services/WordService'
import UserService from '../../includes/Services/UserService'
import Icon28ReportOutline from '@vkontakte/icons/dist/28/report_outline';
import FadeIn from 'react-fade-in';

interface SuggestInterface {
    allowActions: AllowActionsInterface
    mainPopout: any
    mainSnackbar: any
}

export default (props: SuggestInterface) => {

    const { allowActions } = props;

    const [activeTab, setActiveTab] = useState('form');

    const [text, setText] = useState('');
    const [textError, setTextError] = useState('');
    const [variant, setVariant] = useState('');
    const [variantError, setVariantError] = useState('');
    const [desc, setDesc] = useState('');
    const [descError, setDescError] = useState('');
    const [category, setCategory] = useState(0);
    const [categoryError, setCategoryError] = useState(0);
    const [categoryComment, setCategoryComment] = useState('');
    const [categoryCommentError, setCategoryCommentError] = useState('');
    const [timer, setTimer] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isPendingForm, setIsPendingForm] = useState(false);
    const [words, setWords] = useState([]);
    const [categories, setCategories] = useState([]);
    const [noCategory, setNoCategory] = useState(false);
    const [success, setSuccess] = useState(false);
    const [requests, setRequests] = useState([]);
    const [isPendingRequests, setIsPendingRequests] = useState(true);

    useEffect(() => {
        getCategories();
        getRequests();
    }, [])

    useEffect(() => {
        if (activeTab === 'requests') {
            setSuccess(false);
        }
    }, [activeTab])

    useEffect(() => {

        if (text.trim() === '') {
            clearTimeout(timer);
            setWords([]);
            return;
        }

        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            searchWord(text);
        }, 300);

        setTimer(newTimer);

    }, [text]);

    const getStatus = (status) => {
        switch(status) {
            case 0:
                return 'Проходит модерацию';
            case 1:
                return 'Принято';
            default:
                return 'Проходит модерацию';
        }
    }

    const getCategories = async () => {
        const response = await WordService.getCategories();
        if (response.result === 'success') {
            setCategories(response.data);
        }
    }

    const getRequests = async () => {
        const response = await UserService.getRequests();
        if (response.result === 'success') {
            setRequests(response.data.requests);
        } else {
            console.log(response);
        }
    }

    const searchWord = async (query) => {

        setIsPending(true);

        const response = await WordService.search(query.toLowerCase());

        if (response.result === 'success') {
            setWords(response.data);
        }

        setIsPending(false);
    }

    const handleChange = (name: string, value: string) => {
        switch (name) {
            case 'text':
                setText(value);
                if (value.trim().length > 0) setTextError(''); 
                break;
            case 'variant':
                setVariant(value);
                if (value.trim().length > 0) setVariantError('');
                break;
            case 'desc':
                setDesc(value);
                if (value.trim().length > 0) setDescError('');
                break;
            default:
                break;
        }
    }

    const submitForm = () => {

        const wordExists = words.filter(w => w.text.toLowerCase() === text.toLowerCase()).length > 0;

        let errors = 0;

        if (!text.trim()) {
            setTextError('Необходимо заполнить');
            errors++;
        } else if (wordExists) {
            setTextError('Такое слово уже существует');
            errors++;
        } else if(text.length > 50) {
            setTextError('Слишком длинное слово');
            errors++;
        } else {
            setTextError('');
        }

        // if (!variant.trim()) {
        //     setVariantError('Необходимо заполнить');
        //     errors++;
        // } else {
        //     setVariantError('');
        // }

        if (!desc.trim()) {
            setDescError('Необходимо заполнить');
            errors++;
        } else if (desc.length > 300) {
            setDescError('Слишком длинное описание');
            errors++;
        } else {
            setDescError('');
        }

        if (errors <= 0 && !isPending) {
            sendForm();
        }

    }

    const sendForm = async () => {
        const data = {
            text, desc, variant, category, categoryComment
        };

        setIsPendingForm(true);
        try {
            const response = await WordService.suggest(data);
            if (response.result === 'success') {
                setSuccess(true);
                setText('');
                setTextError('');
                setDesc('');
                setDescError('');
                setRequests(response.data.requests)
            } else {
                props.mainSnackbar.showError(response.message);
            }
        } catch (e) {
            props.mainSnackbar.showError(e.message);
        } finally {
            setIsPendingForm(false);
        }
        
    }

    const cancelRequest = (r) => {
        props.mainPopout.confirmDelete(() => {
            cancelRequestAccept(r);
        });
    }

    const cancelRequestAccept = async (r) => {
        props.mainPopout.loading();

        const response = await UserService.cancelRequest(r.id)
        
        if (response.result === 'success') {
            setRequests(requests.filter(req => req.id !== r.id));
            // props.mainSnackbar.showSuccess('Удалено');
        } else {
            props.mainSnackbar.showError('Ошибка. Попробуйте позднее.');
        }

        props.mainPopout.close();
    }

    const renderRequests = () => {

        if (requests.length === 0) {
            return <FadeIn>
                    <Footer>Здесь будут слова, которые вы добавили</Footer>
                </FadeIn>
        }

        return (<>
            <br/>
            <List>
                {requests.map(r => {
                    return (
                        <Cell
                            description={getStatus(r.status)}
                            asideContent={r.status === 0 &&
                                <Button 
                                    onClick={() => { cancelRequest(r) }}
                                    size="m" 
                                    mode="secondary">Отменить</Button>
                            }
                            key={r.id}>
                            {r.text}
                        </Cell>
                    );
                })}
            </List>
            <br/>
        </>);
    }

    const renderForm = () => {

        if (success) {
            return <Placeholder>
                Отправлено модераторам. Вы можете узнать статус заявки во вкладке 
                <span
                    style={{ marginLeft: 6, color: 'var(--button_secondary_foreground)', textDecoration: 'underline' }}
                    onClick={() => { setActiveTab('requests') }}>история</span>
            </Placeholder>
        }

        return (
            <FormLayout>
            <FormLayoutGroup top="Слово\Выражение">
                <Input
                    type="text"
                    readOnly={isPendingForm}
                    name="text"
                    maxLength={50}
                    value={text}
                    onChange={(e) => {
                        handleChange('text', e.currentTarget.value);
                    }}
                    status={textError ? 'error' : 'valid'} />
                    {textError
                        ? <Div className="Input--bottom Input--bottom_error">
                            <span>{textError}</span>
                        </Div> 
                        : <Div className="Input--bottom">
                            <span>{`Введено ${text.length} из 50 символов`}</span>
                        </Div>
                    }
            </FormLayoutGroup>
            {/* <FormLayoutGroup top="Правильный вариант ответа">
                <Input
                    type="text"
                    readOnly={isPendingForm}
                    name="variant"
                    maxLength={100}
                    value={variant}
                    onChange={(e) => {
                        handleChange('variant', e.currentTarget.value);
                    }}
                    status={variantError ? 'error' : 'valid'} />
                    {variantError
                        ? <Div className="Input--bottom Input--bottom_error">
                            <span>{variantError}</span>
                        </Div> 
                        : <Div className="Input--bottom">
                            <span>{`Введено ${variant.length} из 100 символов`}</span>
                        </Div>
                    }
            </FormLayoutGroup> */}
            <FormLayoutGroup top="Описание">
                <Textarea
                    name="desc"
                    readOnly={isPendingForm}
                    value={desc}
                    maxLength={300}
                    onChange={(e) => {
                        handleChange('desc', e.currentTarget.value);
                    }}
                    status={descError ? 'error' : 'valid'} />
                    {descError
                        ? <Div className="Input--bottom Input--bottom_error">
                            <span>{descError}</span>
                        </Div> 
                        : <Div className="Input--bottom">
                            <span>{`Введено ${desc.length} из 300 символов`}</span>
                        </Div>
                    }
            </FormLayoutGroup>
            {/* <FormLayoutGroup top="Категория">
                <Select
                    disabled={noCategory}
                    onChange={(e) => setCategory(parseInt(e.currentTarget.value, 10))} 
                    placeholder="Выбрать">
                    {categories.map((item) => {
                        return (
                            <option 
                                key={item.id}
                                value={item.id}>{ item.name }</option>
                        )
                    })}
                </Select>
                <Checkbox
                    checked={noCategory}
                    onChange={(e) => { 
                        if (e.currentTarget.checked) {
                            setNoCategory(true);
                            setCategory(0);
                        } else {
                            setNoCategory(false)
                        }
                    }}>
                        Категории нет среди представленных
                </Checkbox>

            </FormLayoutGroup>
            {noCategory && 
                <FormLayoutGroup top="Предложите название категории">
                    <Input
                        type="text"
                        name="category_comment"
                        value={categoryComment}
                        onChange={(e) => {
                            setCategoryComment(e.currentTarget.value);
                        }}
                        status={categoryCommentError ? 'error' : 'valid'}/>
                </FormLayoutGroup>
            } */}



            <Button
                onClick={submitForm}
                disabled={isPendingForm}
                size="xl">Отправить</Button>
        </FormLayout>
        );
    }

    if (!allowActions.isAllowSuggestWord) {
        return (
            <Placeholder
                icon={<Icon28ReportOutline width={40} height={40} />}
                stretched
            >
                Отгадайте 10 слов, <br /> чтобы получить возможность добавлять свои
            </Placeholder>
        )
    }

    return (<>
        <Tabs mode="default">
            <TabsItem onClick={() => { setActiveTab('form') }} selected={activeTab === 'form'}>
                Добавить
            </TabsItem>
            <TabsItem onClick={() => {setActiveTab('requests')}} selected={activeTab === 'requests'}>
                История
            </TabsItem>
        </Tabs>
        {activeTab === 'form'
            ? renderForm()
            : renderRequests()
        }
    </>);
}