import type { FC } from 'react';
import { useOpen } from 'shared/hooks/useOpen';
import { Modal } from 'shared/ui/basics';
import { PlusButton } from 'shared/ui/buttons';
import { CreateProjectForm } from '../createProjectForm/CreateProjectForm';

type CreateProjectButtonProps = {
    currentProjectId: number;
};

export const CreateProjectButton: FC<CreateProjectButtonProps> = () => {
    const { open, close, isOpen } = useOpen();

    const onCreateHandler = () => {
        open();
    };

    return (
        <>
            <PlusButton onClick={onCreateHandler} />
            <Modal onClose={close} isOpen={isOpen}>
                <CreateProjectForm onCreate={close} />
            </Modal>
        </>
    );
};
