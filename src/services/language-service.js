import TokenService from "../services/token-service";
import config from "../config";

const LanguageApiService = {
    getWords() {
        return fetch(`${config.API_ENDPOINT}/language`, {
            headers: {
                Authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        }).then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      );
    }
}

export default LanguageApiService;