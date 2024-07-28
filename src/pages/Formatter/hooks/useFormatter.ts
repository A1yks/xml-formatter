import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { XMLWorkerResponse } from '@/workers/xml';
import { ValidationError } from 'fast-xml-parser';
import { useLocalStorage } from '@/hooks';

export function useFormatter() {
    const xmlWorker = useMemo(() => new Worker(new URL('../../../workers/xml.ts', import.meta.url), { type: 'module' }), []);
    const [isLoading, setIsLoading] = useState(false);
    const [sourceCode, setSourceCode] = useState('');
    const [formattedCode, setFormattedCode] = useState('');
    const [error, setError] = useState<ValidationError['err'] | null>(null);
    const [isInParsedMode, setIsInParsedMode] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [parsedCount, setParsedCount] = useLocalStorage('parsedCount', 0);
    const [userRated, setUserRated] = useLocalStorage('userRated', false);
    const [isRateMessageOpened, setIsRateMessageOpened] = useState(!userRated);
    const displayedCode = isInParsedMode ? formattedCode : sourceCode;
    const loading = isLoading || isPending;
    const sourceCodeChangedRef = useRef(true);

    useEffect(() => {
        function onMessage(e: MessageEvent<XMLWorkerResponse>) {
            if (e.data.type === 'format') {
                const { result } = e.data;

                if (result.error) {
                    setError(result.error);
                    setIsInParsedMode(false);
                }

                if (result.code) {
                    startTransition(() => {
                        setFormattedCode(result.code);
                        setIsInParsedMode(true);
                    });

                    setError(null);
                    sourceCodeChangedRef.current = false;
                }

                setIsLoading(false);
            }
        }

        xmlWorker.addEventListener('message', onMessage);

        return () => {
            xmlWorker.removeEventListener('message', onMessage);
        };
    }, [xmlWorker]);

    const clearError = useCallback(() => setError(null), []);

    function showAlert() {
        if (userRated) return;

        const newParsedCount = parsedCount + 1;

        setParsedCount(newParsedCount);

        if (newParsedCount % 3 === 0) {
            setIsRateMessageOpened(true);
        }
    }

    function closeAlert() {
        setIsRateMessageOpened(false);
        setParsedCount(0);
    }

    function openExtensionPage() {
        chrome.tabs.create({ url: import.meta.env.VITE_EXTENSION_URL });
        setUserRated(true);
        setIsRateMessageOpened(false);
    }

    function handleSwitchChange(value: boolean) {
        const sourceCodeChanged = sourceCodeChangedRef.current;

        if (sourceCodeChanged) setIsLoading(value);

        if (value) {
            if (!sourceCodeChanged) {
                setIsInParsedMode(true);
            } else {
                xmlWorker.postMessage({ code: sourceCode, type: 'format' });
                showAlert();
            }
        } else {
            setIsInParsedMode(false);
        }
    }

    const handleChange = useCallback((code: string) => {
        setSourceCode(code);
        sourceCodeChangedRef.current = true;
    }, []);

    return {
        displayedCode,
        error,
        isInParsedMode,
        loading,
        isRateMessageOpened,
        clearError,
        closeAlert,
        openExtensionPage,
        handleSwitchChange,
        handleChange,
    };
}
