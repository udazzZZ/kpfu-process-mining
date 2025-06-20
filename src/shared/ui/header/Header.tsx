import { useState } from 'react';
import type { FC } from 'react';
import menuButtonImg from '../../../../public/menu-button.svg';
import styles from './Header.module.css';
import overlayStyles from 'widgets/ui/NavigationPanel/Overlay.module.css';
import { NavigationPanel } from 'widgets/ui/NavigationPanel/NavigationPanel';
import clsx from 'clsx';

type HeaderProps = {
    containerClassName?: string;
};

const Header: FC<HeaderProps> = ({ containerClassName }) => {
    const [isNavigationVisible, setIsNavigationVisible] = useState(false);

    const toggleNavigation = () => {
        setIsNavigationVisible((prev) => !prev);
    };

    return (
        <>
            <header className={clsx(styles.container, containerClassName)}>
                <div
                    className={styles.buttonContainer}
                    onClick={toggleNavigation}
                >
                    <img
                        className={styles.buttonImage}
                        src={menuButtonImg}
                        alt="Menu"
                    />
                </div>
            </header>
            <NavigationPanel isVisible={isNavigationVisible} />
            <div
                className={`${overlayStyles.overlay} ${
                    isNavigationVisible ? overlayStyles.overlayVisible : ''
                }`}
                onClick={() => setIsNavigationVisible(false)}
            ></div>
        </>
    );
};

export default Header;
