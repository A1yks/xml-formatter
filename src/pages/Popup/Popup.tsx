import { Rating } from 'react-simple-star-rating';
import styles from './Popup.module.scss';
import Star from '@/images/star.svg?react';
import FilledStar from '@/images/filled-star.svg?react';
import Arrow from '@/images/arrow.svg?react';
import { useState } from 'react';
import c from 'clsx';
import { Title } from '@/components';

export function Popup() {
    const [starsVisible, setStarsVisible] = useState(false);

    function openFormatterTab() {
        chrome.tabs.create({ url: chrome.runtime.getURL('../index.html') + '?formatter=1' });
    }

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
                            <Rating
                                allowFraction
                                fillIcon={<FilledStar className={styles.starIcon} />}
                                emptyIcon={<Star fill="#ccc" className={styles.starIcon} />}
                                onClick={(value) => {
                                    if (value > 3) {
                                        chrome.tabs.create({ url: import.meta.env.VITE_EXTENSION_URL });
                                    } else {
                                        chrome.tabs.create({ url: import.meta.env.VITE_SURVEY_URL });
                                    }
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
