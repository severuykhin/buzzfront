import UrlParams from '../UrlParams';
import Config from '../Config';

const _UrlParams = new UrlParams();

class LeadersService {

    constructor() {

    }

    async get() {
        const data = this._createRequestData({});
        const response = await fetch(`${Config.getLeaders}`, {
            method: 'POST',
            body: data
        });
        return this._formattedResponse(response);
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

export default new LeadersService;