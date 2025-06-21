import { useNavigate } from 'react-router';
import { ROUTES } from 'shared/constants';
import { BackIconButton } from 'shared/ui/buttons/BackIconButton/BackIconButton';
import Header from 'shared/ui/header/Header';

export const ProcessMapHeader = () => {
    const navigate = useNavigate();

    const onBackHandler = () => {
        navigate(ROUTES.PROJECTS_PATH);
    };

    return (
        <Header>
            <BackIconButton onClick={onBackHandler} />
        </Header>
    );
};
