import { useOpen } from 'shared/hooks/useOpen';
import { Modal } from 'shared/ui/basics';
import { CreateCardButton } from 'shared/ui/buttons';
import { CreateReportForm } from './CreateReportForm/CreateReportForm';

export const CreateReportButton = () => {
    const { open, close, isOpen } = useOpen();

    const onCreateHandler = () => {
        open();
    };

    return (
        <>
            <CreateCardButton onClick={onCreateHandler} />
            <Modal isOpen={isOpen} onClose={close}>
                <CreateReportForm onCreate={close} />
            </Modal>
        </>
    );
};
