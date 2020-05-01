import UrlParams from '../UrlParams';
import Config from '../Config';

const _UrlParams = new UrlParams();

class WidgetService {

    constructor() {

    }

    async get() {
        try {
            const data = this._createRequestData({});
            const response = await fetch(`${Config.getWordUrl}`, {
                method: 'POST',
                body: data
            });
            return this._formattedResponse(response);
        } catch (e) {
            return {
                result: 'error',
                message: e.message
            }
        }
    }

    async attempt(payload) {

        try {
            const data = this._createRequestData(payload);
            const response = await fetch(`${Config.attemptUrl}`, {
                method: 'POST',
                body: data
            });
            return this._formattedResponse(response);
        } catch (e) {
            return {
                result: 'error'
            }
        }
    }

    async search(query: string) {
        try {
            const data = this._createRequestData({ query });
            const response = await fetch(`${Config.searchWordUrl}`, {
                method: 'POST',
                body: data
            });
            return this._formattedResponse(response);
        } catch (e) {
            return {
                result: 'error'
            }
        }
    }

    async getCategories() {
        try {
            const data = this._createRequestData({});
            const response = await fetch(`${Config.getCategoriesUrl}`, {
                method: 'POST',
                body: data
            });
            return this._formattedResponse(response);
        } catch (e) {
            return {
                result: 'error'
            }
        }
    }

    async suggest(config) {
        try {
            const data = this._createRequestData(config);
            const response = await fetch(`${Config.suggestUrl}`, {
                method: 'POST',
                body: data
            });
            return this._formattedResponse(response);
        } catch (e) {
            return {
                result: 'error'
            }
        }
    }

    async getAll() {

        let secret = localStorage.getItem('secret');

        try {
            const response = await fetch(`${Config.getAllUrl}?secret=${secret}`, {
                method: 'GET',
            });
            return this._formattedResponse(response);
        } catch (e) {
            return {
                result: 'error'
            }
        }
    }

    async sendVariants(items, word_id: number) {
        let secret = localStorage.getItem('secret');

        try {

            const data = this._createRequestData({
                variants: JSON.stringify(items)
            });

            const response = await fetch(`${Config.sendVariantsUrl}/${word_id}?secret=${secret}`, {
                method: 'POST',
                body: data
            });
            
            return this._formattedResponse(response);
        } catch (e) {
            return {
                result: 'error'
            }
        }
    }

    /**
     * Generate data for the request in FormData object
     * @param data object
     * @returns requestData object
     */
    _createRequestData(data: object) {

        let requestData = new FormData();

        for (let key in data) {
            if (data[key] !== null && typeof data[key] !== 'undefined' && data[key] !== '') {
                if (Array.isArray(data[key])) {
                    if (data[key].length === 0) {
                        requestData.append(`${key}[]`, '');
                    } else {
                        data[key].forEach(i => {
                            requestData.append(`${key}[]`, i);    
                        });
                    }

                } else {
                    requestData.append(key, data[key]);
                }
            }
        }

        requestData.append('vk_user_id', _UrlParams.params.vk_user_id.toString());

        try {
            requestData.append('params', JSON.stringify(_UrlParams.params));
        } catch (e) {   
            console.log(e);
        }

        return requestData;
    }

    async _formattedResponse (response) {
        const result = await response.json();
        if (response.status === 200) {
            return result;
        } else {
            /**
             * @TODO handle error
             */
            return {
                'result': 'error',
                'message': result.errors ? result.errors[0] : result.message
            }
        }
    }

}

export default new WidgetService;