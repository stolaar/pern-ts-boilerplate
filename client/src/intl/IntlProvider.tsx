import React from "react";
import {IntlProvider as Provider} from "react-intl";
import {useSelector} from "react-redux";

import messages_en from "../translations/en.json";
import messages_mk from "../translations/mk.json";

import {RootReducer} from "../store/rootReducer";

interface IMessage {
    en: {[k: string]: string},
    mk: {[k: string]: string}
}

const messages: IMessage = {
    en: messages_en,
    mk: messages_mk
};

function IntlProvider(props: any) {
    const {lang} = useSelector((state: RootReducer) => state.lang)

    return <Provider defaultLocale="en" locale="en" messages={messages[lang || "en"]}>
        {props.children}
    </Provider>
}


export default IntlProvider;
