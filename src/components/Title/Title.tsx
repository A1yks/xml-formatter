import styles from './Title.module.scss';
import c from 'clsx';
import GreenLogo from '@/images/logo-green.svg?react';

export type TitleProps = {
    className?: string;
};

export function Title({ className }: TitleProps) {
    return (
        <div className={c(styles.title, className)}>
            <GreenLogo />
            <span>XML Formatter</span>
        </div>
    );
}
