import { Popup, Formatter } from '@/pages';

export function App() {
    const isFormatterOpened = new URLSearchParams(window.location.search).get('formatter') === '1';

    if (isFormatterOpened) {
        return <Formatter />;
    }

    return <Popup />;
}
