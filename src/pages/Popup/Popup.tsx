import styles from './Popup.module.scss';
import FilledStar from '@/images/filled-star.svg?react';
import Arrow from '@/images/arrow.svg?react';
import { useState } from 'react';
import c from 'clsx';
import { Rating, Title } from '@/components';
import { openFormatterTab } from '@/utils/openFormatterTab';

export function Popup() {
    const [starsVisible, setStarsVisible] = useState(false);

    return (
        <div className={styles.popup}>
            <div className={styles.link} onClick={openFormatterTab}>
                <Title className={styles.title} />
                <Arrow />
            </div>
            <div className="divider" />
            <div className={styles.ratingWrapper}>
                <div className={c(styles.rateText, { [styles.active]: starsVisible })} onClick={() => setStarsVisible((v) => !v)}>
                    <span>Rate us</span>
                    <FilledStar width={15} height={15} />
                </div>
                {starsVisible && (
                    <>
                        <div className="divider" />
                        <div className={styles.rating}>
                            <Rating allowFraction defaultIconClassName={styles.starIcon} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
