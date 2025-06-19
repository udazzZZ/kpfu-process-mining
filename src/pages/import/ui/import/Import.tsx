import type { FC } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "../header/Header";
import styles from "./Import.module.css";
import SidePanel from "../sidePanel/SidePanel";
import { ButtonWithArrow } from "shared/ui/buttons/BackForwardButton/ButtonWithArrow";
import { stepToIndex } from "pages/import/lib/steps";

const Import: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathSegments = location.pathname.split("/");
    const currentPage =
        pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : "";

    const currentStepIndex = stepToIndex[currentPage] || 0;
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === 3;

    const handleBack = () => {
        if (isFirstStep) return;
        const previousStep = Object.keys(stepToIndex).find(
            (step) => stepToIndex[step] === currentStepIndex - 1
        );
        navigate(`/import/${previousStep}`);
    };

    const handleForward = () => {
        if (isLastStep) return;
        const nextStep = Object.keys(stepToIndex).find(
            (step) => stepToIndex[step] === currentStepIndex + 1
        );
        navigate(`/import/${nextStep}`);
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <SidePanel />
                <div className={styles.importContainer}>
                    <Outlet />
                    <div className={styles.buttonsContainer}>
                        <ButtonWithArrow
                            direction="left"
                            onClick={handleBack}
                        ></ButtonWithArrow>
                        <ButtonWithArrow
                            direction="right"
                            onClick={handleForward}
                        ></ButtonWithArrow>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Import;
