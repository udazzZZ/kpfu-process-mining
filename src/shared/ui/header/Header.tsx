import { useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import menuButtonImg from '../../../../public/menu-button.svg';
import styles from './Header.module.css';
import overlayStyles from 'widgets/ui/NavigationPanel/Overlay.module.css';
import { NavigationPanel } from 'widgets/ui/NavigationPanel/NavigationPanel';
import clsx from 'clsx';

type HeaderProps = {
    containerClassName?: string;
} & PropsWithChildren;

const Header: FC<HeaderProps> = ({ containerClassName, children }) => {
    const [isNavigationVisible, setIsNavigationVisible] = useState(false);

    const toggleNavigation = () => {
        setIsNavigationVisible((prev) => !prev);
    };

    if (!children)
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

    return (
        <header className={clsx(styles.container, containerClassName)}>
            {children}
        </header>
    );
};

export default Header;
