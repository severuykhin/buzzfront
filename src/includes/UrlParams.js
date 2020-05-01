export default class UrlParams {
    get_url_params() {
        let a = window.location.search;
        let b = {};

        a = a.substring(1);
        if (!a) return b;

        a = a.split("&");
        for (let i = 0; i < a.length; i++) {
            let c = a[i].split("=");
            b[c[0]] = c[1];
        }

        b.vk_app_id = parseInt(b.vk_app_id);
        b.vk_are_notifications_enabled = parseInt(b.vk_are_notifications_enabled);
        b.vk_is_app_user = parseInt(b.vk_is_app_user);
        b.vk_user_id = parseInt(b.vk_user_id);

        return b;
    }

    get_hash_params() {
        let a = window.location.hash;
        let b = {};

        a = a.substring(1);
        if (!a) return b;

        a = a.split("&");
        for (let i = 0; i < a.length; i++) {
            let c = a[i].split("=");
            b[c[0]] = c[1];
        }
        return b;
    }

    load() {
        this.gets = this.get_url_params();
        for (let name in this.gets) {
            if (this.gets.hasOwnProperty(name)) {
                this.params[name] = this.gets[name];
            }
        }

        this.hash = this.get_hash_params();
        for (let name in this.hash) {
            if (this.hash.hasOwnProperty(name)) {
                this.params[name] = this.hash[name];
            }
        }
    }

    replaceState() {
        window.history.replaceState(null, null, window.location.href.replace('#', '&'));
    }

    constructor() {
        this.gets = {};
        this.hash = {};
        this.params = {
            vk_user_id: 0,
            vk_app_id: 0,
            utm_source: '',
            utm_medium: '',
            utm_campaign: '',
            utm_term: '',
            utm_content: '',
            utm_id: '',
            rs: '',
            roistat: ''
        };

        this.load();
        this.replaceState();

        console.log(this.gets);
        console.log(this.hash);
        console.log(this.params);
    }
}