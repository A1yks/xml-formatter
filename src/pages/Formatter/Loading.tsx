import styles from './Loading.module.scss';
import Code from '@/images/code.svg?react';
import c from 'clsx';

export type LoadingProps = {
    className?: string;
    text?: string;
};

export function Loading({ className, text = 'Systematization is taking place...' }: LoadingProps) {
    return (
        <div className={c(styles.loading, className)}>
            <div className={styles.content}>
                <Code />
                <div>{text}</div>
            </div>
        </div>
    );
}
