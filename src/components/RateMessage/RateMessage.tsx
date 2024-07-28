import { Button, Alert, AlertProps } from '@/components';
import styles from './RateMessage.module.scss';
import Star from '@/images/star.svg?react';
import c from 'clsx';

export type RateMessageProps = {
    onRateClick: () => void;
} & Omit<AlertProps, 'children'>;

export function RateMessage({ className, onRateClick, ...alertProps }: RateMessageProps) {
    return (
        <Alert className={c(styles.rateMessage, className)} {...alertProps}>
            <div className={styles.title}>Did you like the extension? Rate us!</div>
            <div className={styles.buttons}>
                <Button className={styles.rateBtn} variant="secondary" onClick={onRateClick}>
                    <Star />
                    Rate the extension
                </Button>
                <Button className={styles.cancelBtn} onClick={alertProps.onClose}>
                    Not now
                </Button>
            </div>
        </Alert>
    );
}
