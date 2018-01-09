
import intl from "react-intl-universal";
import _ from "lodash";
import http from "axios";
import SUPPOER_LOCALES from './support_locales';


//load intl resources at the very beginning or from cache
//path = `/static/assets/locales/`    for pilot
export function loadIntlResources(callback, path = `locales/`) {
    let currentLocale = intl.determineLocale({
        urlLocaleKey: "lang",
        cookieLocaleKey: "lang"
    });

    if (!_.find(SUPPOER_LOCALES, { value: currentLocale })) {
        currentLocale = "en-US";
    }

    //because in the project setting , front end source are only located under assets folder
    http.get(`locales/${currentLocale}.json`)
        .then(res => {
            return intl.init({
                currentLocale,
                locales: {
                    [currentLocale]: res.data
                }
            });
        })
        .then(() => {
            // After loading CLDR locale data, start to render
            callback && callback();
        });
}