import { action, observable, makeAutoObservable } from 'mobx';
import { FormatNumberOptions } from 'react-intl';
import enMessages from '../translations/en.json';

export class IntlStore {
    public static readonly DEFAULT_LOCAL = 'en';

    public static readonly FORMAT_NUMBER_OPTIONS: FormatNumberOptions = {
        currency: 'USD',
        style: 'currency'
    };
    public static readonly FORMAT_NUMBER_OPTIONS_AS_INT: FormatNumberOptions = {
        currency: 'USD',
        style: 'currency',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    };

    @observable locale: string = IntlStore.DEFAULT_LOCAL;
    @observable messages: Record<string, string> | undefined = enMessages;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    setLocal(locale: string) {
        this.locale = locale;
    }

    @action
    setMessages(messages: Record<string, string> | undefined) {
        this.messages = messages;
    }
}
