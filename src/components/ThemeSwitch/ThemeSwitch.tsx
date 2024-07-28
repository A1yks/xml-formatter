import { Switch } from '@/components';
import { useLocalStorage } from '@/hooks';
import styles from './ThemeSwitch.module.scss';
import Sun from '@/images/sun.svg?react';
import Moon from '@/images/moon.svg?react';
import { useEffect } from 'react';

export function ThemeSwitch() {
    const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useLocalStorage('darkThemeEnabled', false);

    useEffect(() => {
        if (isDarkThemeEnabled) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
    }, [isDarkThemeEnabled]);

    return (
        <Switch
            values={[<Sun className={styles.themeSwitchIcon} />, <Moon className={styles.themeSwitchIcon} />]}
            activeOptionClassName={styles.activeThemeSwitchOption}
            inactiveOptionClassName={styles.inactiveThemeSwitchOption}
            optionClassName={styles.themeSwitchOption}
            optionsClassName={styles.themeSwitchOptions}
            onChange={setIsDarkThemeEnabled}
            checked={isDarkThemeEnabled}
        />
    );
}
