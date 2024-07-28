import { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import styles from './Switch.module.scss';
import c from 'clsx';
import Dots from '@/images/dots.svg?react';
import Close from '@/images/close.svg?react';

export type SwitchProps = {
    values: [ReactNode, ReactNode];
    checked?: boolean;
    optionClassName?: string;
    activeOptionClassName?: string;
    inactiveOptionClassName?: string;
    optionsClassName?: string;
    loading?: boolean;
    disabled?: boolean;
    error?: boolean;
    onErrorClick?: () => void;
    onChange?: (checked: boolean) => void;
};

export function Switch({
    values,
    checked = false,
    optionClassName,
    optionsClassName,
    activeOptionClassName,
    inactiveOptionClassName,
    loading,
    disabled,
    error,
    onErrorClick,
    onChange,
}: SwitchProps) {
    const [width, setWidth] = useState<number | 'auto'>('auto');
    const switchRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!switchRef.current) return;

        setWidth(switchRef.current.offsetWidth);
    }, []);

    return (
        <div
            className={c(styles.switch, { [styles.loading]: loading, [styles.disabled]: disabled, [styles.error]: error })}
            ref={switchRef}
            style={{ width }}
        >
            <div className={c(styles.options, optionsClassName)}>
                {loading ? (
                    <div className={c(styles.option, optionClassName, styles.active, activeOptionClassName)}>
                        <Dots />
                    </div>
                ) : error ? (
                    <div className={c(styles.option, optionClassName, styles.active, activeOptionClassName)} onClick={onErrorClick}>
                        <Close />
                    </div>
                ) : (
                    values.map((value, index) => (
                        <div
                            key={index}
                            className={c(
                                styles.option,
                                optionClassName,
                                Boolean(index) === checked ? [styles.active, activeOptionClassName] : inactiveOptionClassName,
                                { [styles.disabled]: disabled }
                            )}
                            onClick={() => onChange?.(!checked)}
                        >
                            {value}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
