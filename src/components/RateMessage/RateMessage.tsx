import { Alert, AlertProps, Rating } from '@/components';
import styles from './RateMessage.module.scss';
import c from 'clsx';

export type RateMessageProps = {
    onRateClick: (value: number) => void;
} & Omit<AlertProps, 'children'>;

export function RateMessage({ className, onRateClick, ...alertProps }: RateMessageProps) {
    return (
        <Alert className={c(styles.rateMessage, className)} {...alertProps}>
            <div className={styles.title}>
                Did you like the extension?<div>Rate us!</div>
            </div>
            <div className={styles.buttons}>
                <Rating allowFraction iconSize={30} onRateClick={onRateClick} className={styles.rating} iconClassName={styles.ratingIcon} />
            </div>
        </Alert>
    );
}
