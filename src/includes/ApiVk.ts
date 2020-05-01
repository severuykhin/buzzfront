import connect, { WidgetType } from '@vkontakte/vk-connect';
import { scopeReplace, getPublicToken, setPublicToken } from './Helpers';

export interface wiget {
    type: WidgetType,
    code: string
}
export default class ApiVk {
    private static instance;
    static getInstance(props): ApiVk {
        if(!this.instance)
            this.instance = new ApiVk(props);
        
        return this.instance; 
    }

    private setting: any;
    private token: string;
    private ver: string;
    private access_token_public: string;

    constructor(props) {
        this.setting = props;
        this.access_token_public =  getPublicToken(this.setting.vk_group_id);
        // Бесполезное присвоение, токен получается и присваивается в lc асинхронно. 
        // Есть возможность, что он никогда не окажется в переменной
        this.token = localStorage.getItem('token'); 
        this.ver = "5.103";
    }    

    getToken() {
        if (this.token)
            return this.token;
        return localStorage.getItem('token');
    }

    getImgUser(id: number, type: string){
        if(type == 'user'){
            return connect
                .sendPromise('VKWebAppCallAPIMethod', 
                        {method: "users.get", "params": {
                            user_ids: id, v: this.ver, 
                            fields: "photo_200", access_token: this.token}
                    });
        } else {
            return connect
                .sendPromise('VKWebAppCallAPIMethod', 
                        {"method": "groups.getById", "params": 
                        {"group_id": id, v: this.ver, "access_token": this.token}
                    });
        }        
    }
    async getImgDocument(id: number){  
        const scope = await this.getScope("docs");
        this.token = scope.access_token;
        const data = await connect.sendPromise('VKWebAppCallAPIMethod', {
            "method": "docs.get", 
            "params": {
                "owner_id": this.setting.vk_user_id, 
                "v": this.ver, 
                "count": "2000", 
                "type": "4", 
                "access_token": this.getToken()
            }})       
        return data;   
    }

    getScope(val: string) {
        let scope = '';
        if(this.setting.vk_access_token_settings.length > 0){
            scope = scopeReplace(this.setting.vk_access_token_settings, val);
        } else {
            scope = val; 
        }
        return connect.sendPromise("VKWebAppGetAuthToken", {"app_id": this.setting.vk_app_id, "scope": scope});
    }

    getScopePublic(){
        return connect.sendPromise("VKWebAppGetCommunityAuthToken", {
                    app_id: this.setting.vk_app_id, 
                    group_id: this.setting.vk_group_id,
                    scope: 'app_widget',   
                });
    }

    async isTokenPublic(){
        if(this.access_token_public === null){
            try{
                const token = await this.getScopePublic();
                setPublicToken(token.access_token, this.setting.vk_group_id);
                this.access_token_public = token.access_token;
                return this.access_token_public;
            } catch(e){
                throw new Error('error');
            }
        } 
    }
 
    wigetPreview(wiget: wiget){
        return connect.sendPromise("VKWebAppShowCommunityWidgetPreviewBox", {
            group_id: this.setting.vk_group_id, 
            type: wiget.type, 
            code: wiget.code,
        });
    }

    update_vkApi(wiget: wiget){
        return connect.sendPromise('VKWebAppCallAPIMethod', 
                {method: "appWidgets.update", "params": {
                    group_id: this.setting.vk_group_id, 
                    v: this.ver, 
                    type: wiget.type, 
                    code: wiget.code, 
                    access_token: this.access_token_public}
                })
    }

    async widgetUpdate(wiget: wiget){
        try{
            return this.update_vkApi(wiget);
        } catch(e){
            const token = await this.isTokenPublic();
            return this.update_vkApi(wiget);
        }        
    }

    async wigetHidden(wiget: wiget){
        wiget.code = 'return false;'
        try{
            return this.update_vkApi(wiget);
        } catch(e){
            const token = await this.isTokenPublic();
            return this.update_vkApi(wiget);
        }
    }

    getImageWidget(){
        return connect.sendPromise('VKWebAppCallAPIMethod',{
            method: "appWidgets.getAppImages", "params": { 
                group_id: this.setting.vk_group_id, 
                v: this.ver, 
                access_token: this.access_token_public
            }
        })
    }

    async getUploadServer(body){
        try {
            const data = await connect.sendPromise('VKWebAppCallAPIMethod',{
                method: "appWidgets.getGroupImageUploadServer", "params": { 
                    image_type: '160x240',
                    group_id: this.setting.vk_group_id, 
                    v: this.ver, 
                    access_token: this.access_token_public
                }
            })      
            return data;        
        } catch (error) {
            try {
                const scope = await this.getScopePublic();
                this.access_token_public = scope.access_token;
                setPublicToken(scope.access_token, this.setting.vk_group_id);
                return connect.sendPromise('VKWebAppCallAPIMethod',{
                    method: "appWidgets.getGroupImageUploadServer", "params": { 
                        image_type: '160x240',
                        group_id: this.setting.vk_group_id, 
                        v: this.ver, 
                        access_token: this.access_token_public
                    }
                })    
            } catch (error) {
                return error;
            }
        }  
    }

    async commentApi(group_id: number, topic_id: number, comment_id: number, wall: boolean){
        return await connect.sendPromise('VKWebAppCallAPIMethod',{
            method: "wall.getComment", "params": {
                owner_id: group_id,
                comment_id: comment_id,
                extended: 1,
                v: this.ver,
                access_token: this.token
            }
        });      
    }

    async getComent(group_id: number, topic_id: number, comment_id: number, wall: boolean){
        if(wall){
            try {
                const scope = await this.getScope("wall");
                this.token = scope.access_token;
                return this.commentApi(group_id, topic_id, comment_id, wall);  
            } catch (error) {
                return error;
            }   
        } else {
            return connect.sendPromise('VKWebAppCallAPIMethod',{
                method: "board.getComments", "params": {
                    group_id,
                    topic_id,
                    start_comment_id: comment_id,
                    count: 1,
                    extended: 1,
                    v: this.ver,
                    access_token: this.token
                }
            }) 
        }
    }

    getPublicInfo(group_id: number){
        return connect.sendPromise('VKWebAppCallAPIMethod',{
            method: "groups.getById", "params": {
                group_id,
                v: this.ver,
                access_token: this.token
            }
        }) 
    }

    /**
     * Получение всех стран из базы данных VK
     */
    async getCountries() {

        let params = { 
            need_all: 1, 
            count: 234,
            v: this.ver, 
            access_token: localStorage.getItem('token')
        };

        try {
            const data = await connect.sendPromise('VKWebAppCallAPIMethod',{
                method: "database.getCountries", 
                params: params
            });

            return data;
        } catch(e) {
            return {
                result: 'error',
                message: e.message
            }
        }
    }

    /**
     * Поиск городов по базе данных VK в пределах определенный страны
     * @param query запрос
     * @param country_id идентификатор страны
     * По умолчанию ищем все города по России
     */
    async getCities(query: string = '', country_id: number = 1, offset: number = 0, count: number = 100) {
        let params = {
            q: query,
            country_id: country_id,
            need_all: 1,
            v: this.ver, 
            access_token: localStorage.getItem('token'),
            offset: offset,
            count: count
        };

        try {
            const data = await connect.sendPromise('VKWebAppCallAPIMethod',{
                method: "database.getCities", 
                params: params
            });
    
            return data;
        } catch (e) {
            return {
                result: 'error',
                message: e.message
            }
        }
    }

    /**
     * Поиск по сообществам VK
     * Пока ограничен только публичными страницами
     * @param query 
     */
    async searchGroups(query: string = '') {

        let params = {
            q: query,
            v: this.ver, 
            access_token: localStorage.getItem('token'),
            type: 'page'
        };

        try {
            const data = await connect.sendPromise('VKWebAppCallAPIMethod',{
                method: "groups.search", 
                params: params
            });
    
            return data;
        } catch (e) {
            return {
                result: 'error',
                message: e.message
            }
        }

    }

    async searchUsers(queryParams: any) {
        let params = {
            q: queryParams.query,
            v: this.ver, 
            access_token: localStorage.getItem('token'),
            count: 100,
            fields: 'photo_50,sex',
            sex: queryParams.sex
        };

        try {
            const data = await connect.sendPromise('VKWebAppCallAPIMethod',{
                method: "users.search", 
                params: params
            });
    
            return data;
        } catch (e) {
            return {
                result: 'error',
                message: e.message
            }
        }
    }

    async resolveScreenName(string: string) {
        let params = {
            screen_name: string,
            v: this.ver, 
            access_token: localStorage.getItem('token'),
        };

        try {
            const data = await connect.sendPromise('VKWebAppCallAPIMethod',{
                method: "utils.resolveScreenName", 
                params: params
            });
    
            return data.response;
        } catch (e) {
            return {
                result: 'error',
                message: e.error_data
            }
        }
    }

    async getCommunityById(community_id: number) {
        let params = {
            group_id: community_id,
            v: this.ver, 
            access_token: localStorage.getItem('token')
        };

        try {
            const data = await connect.sendPromise('VKWebAppCallAPIMethod',{
                method: "groups.getById", 
                params: params
            });
    
            return data.response;
        } catch (e) {
            return {
                result: 'error',
                message: e.error_data
            }
        }
    }
}   