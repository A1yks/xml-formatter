import { XMLWorkerResponse } from '@/workers/xml';
import { memo, startTransition, useEffect, useMemo, useState } from 'react';

export type HighlightProps = {
    code: string;
    disabled?: boolean;
};

function HighlightComponent({ code, disabled }: HighlightProps) {
    const xmlWorker = useMemo(() => new Worker(new URL('../../workers/xml.ts', import.meta.url), { type: 'module' }), []);
    const [highlightedCode, setHighlightedCode] = useState<string>('');

    useEffect(() => {
        if (!disabled) {
            xmlWorker.postMessage({ code, type: 'highlight' });
        }
    }, [code, disabled, xmlWorker]);

    useEffect(() => {
        function onMessage(e: MessageEvent<XMLWorkerResponse>) {
            startTransition(() => {
                if (e.data.type === 'highlight') {
                    setHighlightedCode(e.data.result);
                }
            });
        }

        if (window.Worker) {
            xmlWorker.addEventListener('message', onMessage);
        }

        return () => {
            xmlWorker.removeEventListener('message', onMessage);
        };
    }, [xmlWorker]);

    if (disabled || !highlightedCode) {
        return <code style={{ all: 'inherit' }}>{code}</code>;
    }

    return <code dangerouslySetInnerHTML={{ __html: highlightedCode }} style={{ all: 'inherit', color: 'var(--code-text-color)' }} />;
}

export const Highlight = memo(HighlightComponent);
