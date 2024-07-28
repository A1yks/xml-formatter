import styles from './Editor.module.scss';
import CodeEditor from 'react-simple-code-editor';
import c from 'clsx';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import SimpleBarCore from 'simplebar-core';
import { Button, Error } from '@/components';
import { Highlight } from './Highlight';
import Copy from '@/images/copy.svg?react';

export type EditorProps = {
    code: string;
    error?: string | null;
    readonly?: boolean;
    highlightDisabled?: boolean;
    className?: string;
    showCopyButton?: boolean;
    onChange?: (code: string) => void;
    onErrorClose?: () => void;
};

function EditorComponent({ code, error, readonly, highlightDisabled, className, showCopyButton, onChange, onErrorClose }: EditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const linesRef = useRef<HTMLDivElement>(null);
    const simpleBarRef = useRef<SimpleBarCore>(null);
    const [linesCount, setLinesCount] = useState(1);
    const [lastActiveLine, setLastActiveLine] = useState(() => code.split('\n').length);
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    useLayoutEffect(() => {
        if (!editorRef.current) return;

        const editor = editorRef.current;
        const lineHeight = 28;
        const editorHeight = editor.clientHeight;
        const codeLines = code.split('\n').length;
        const newLinesCount = Math.max(Math.floor(editorHeight / lineHeight) - 1, codeLines);

        setLinesCount(newLinesCount);
        setLastActiveLine(codeLines);
    }, [code]);

    useEffect(() => {
        function onScroll(e: Event) {
            if (!linesRef.current) return;

            linesRef.current.scrollTop = (e as unknown as React.UIEvent<HTMLElement>).currentTarget.scrollTop;
        }

        const scrollElement = simpleBarRef.current?.getScrollElement();

        scrollElement?.addEventListener('scroll', onScroll);

        return () => {
            scrollElement?.removeEventListener('scroll', onScroll);
        };
    }, []);

    useEffect(() => {
        setIsErrorVisible(!!error);
    }, [error]);

    function copyCode() {
        navigator.clipboard.writeText(code);
    }

    return (
        <div className={c(styles.editorContent, className)} ref={editorRef}>
            <div className={styles.lines} ref={linesRef}>
                {Array.from({ length: linesCount }).map((_, index) => (
                    <div key={index} className={c(styles.line, { [styles.active]: index < lastActiveLine })}>
                        {index + 1}
                    </div>
                ))}
            </div>
            <div className={styles.editorWrapper}>
                <SimpleBar className={styles.simpleBar} ref={simpleBarRef} onScroll={console.log}>
                    <CodeEditor
                        readOnly={readonly}
                        value={code}
                        onValueChange={(code) => {
                            const newLinesCount = code.split('\n').length;

                            setLastActiveLine(newLinesCount);
                            setLinesCount((prev) => Math.max(prev, newLinesCount));
                            onChange?.(code);
                        }}
                        highlight={(code) => <Highlight code={code} disabled={highlightDisabled} />}
                        className={styles.editor}
                        textareaClassName={styles.textarea}
                    />
                </SimpleBar>
                {isErrorVisible && (
                    <div className={styles.errorWrapper}>
                        <Error
                            title="Unable to parse XML input"
                            message={error as string}
                            onClose={() => {
                                setIsErrorVisible(false);
                                onErrorClose?.();
                            }}
                        />
                    </div>
                )}
                {showCopyButton && (
                    <Button wrapperClassName={styles.copyBtnWrapper} className={styles.copyBtn} onClick={copyCode} tooltip="Copied!">
                        <Copy />
                        Copy
                    </Button>
                )}
            </div>
        </div>
    );
}

export const Editor = memo(EditorComponent);
