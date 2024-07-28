import styles from './Error.module.scss';
import Bug from '@/images/bug.svg?react';
import Close from '@/images/close.svg?react';
import c from 'clsx';

export type ErrorProps = {
    title: string;
    message: string;
    className?: string;
    onClose?: () => void;
};

export function Error({ title, message, className, onClose }: ErrorProps) {
    return (
        <div className={c(styles.error, className)}>
            <Bug className={styles.bug} />
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.message}>{message}</div>
            </div>
            <Close className={styles.closeBtn} onClick={onClose} />
        </div>
    );
}
