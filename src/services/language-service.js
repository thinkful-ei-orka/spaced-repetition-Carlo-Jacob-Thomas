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
    },
    getHead() {
        return fetch(`${config.API_ENDPOINT}/language/head`, {
            headers: {
                Authorization: `bearer ${TokenService.getAuthToken()}`,
            },
        }).then((res) => 
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      );
    },
    postGuess(guess) {
        const guessStringify = JSON.stringify(guess)
        console.log(guessStringify)
        return fetch(`${config.API_ENDPOINT}/language/guess`, {
            method: 'POST',
            headers: {
                Authorization: `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(guess)
        }).then((res) => 
            !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
        )
    }
}

export default LanguageApiService;