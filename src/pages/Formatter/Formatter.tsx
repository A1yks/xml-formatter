import { Editor, RateMessage, Switch, ThemeSwitch, Title } from '@/components';
import styles from './Formatter.module.scss';
import { ValidationError } from 'fast-xml-parser';
import { Loading } from './Loading';
import { useFormatter } from './hooks/useFormatter';

function getErrorText(error: ValidationError['err'] | null) {
    if (!error) return null;

    return `Error on line ${error.line}: ${error.msg}`;
}

export function Formatter() {
    const {
        displayedCode,
        error,
        isInParsedMode,
        loading,
        isRateMessageOpened,
        openExtensionPage,
        closeAlert,
        clearError,
        handleChange,
        handleSwitchChange,
    } = useFormatter();

    return (
        <div className={styles.formatter}>
            <div className={styles.container}>
                <Title className={styles.title} />
                <div className={styles.panel}>
                    <span className={styles.prompt}>Paste Your XML Code:</span>
                    <div className={styles.switches}>
                        <ThemeSwitch />
                        <Switch
                            values={['Raw', 'Parsed']}
                            error={!!error}
                            onErrorClick={clearError}
                            checked={isInParsedMode}
                            optionClassName={styles.mainSwitchOption}
                            loading={loading}
                            onChange={handleSwitchChange}
                        />
                    </div>
                </div>
                <div className={styles.editorWrapper}>
                    <Editor
                        code={displayedCode}
                        onChange={isInParsedMode ? undefined : handleChange}
                        error={getErrorText(error)}
                        readonly={isInParsedMode}
                        showCopyButton={isInParsedMode}
                        onErrorClose={clearError}
                        highlightDisabled={!isInParsedMode}
                    />
                    {loading && <Loading className={styles.loading} />}
                </div>
                <RateMessage opened={isRateMessageOpened} onRateClick={openExtensionPage} onClose={closeAlert} className={styles.rateMessage} />
            </div>
        </div>
    );
}
