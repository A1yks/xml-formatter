import styles from './Alert.module.scss';
import Close from '@/images/close.svg?react';
import c from 'clsx';

export type AlertProps = {
    opened: boolean;
    className?: string;
    children: React.ReactNode;
    onClose: () => void;
};

export function Alert({ opened, className, children, onClose }: AlertProps) {
    if (!opened) return null;

    return (
        <div className={c(styles.alert, className)}>
            {children}
            <Close className={styles.closeBtn} onClick={onClose} />
        </div>
    );
}
