import styles from './Loading.module.scss';
import Code from '@/images/code.svg?react';
import c from 'clsx';

export type LoadingProps = {
    className?: string;
};

export function Loading({ className }: LoadingProps) {
    return (
        <div className={c(styles.loading, className)}>
            <div className={styles.content}>
                <Code />
                <div>Systematization is taking place...</div>
            </div>
        </div>
    );
}
