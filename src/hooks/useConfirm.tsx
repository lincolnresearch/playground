import { useState } from 'react';
import {Button, Modal} from "@heroui/react";

export function useConfirm() {
    const [visible, setVisible] = useState(false);
    const [resolver, setResolver] = useState<(result: boolean) => void>();

    const confirm = () =>
        new Promise<boolean>((resolve) => {
            setVisible(true);
            setResolver(() => resolve);
        });

    const handleClose = (result: boolean) => {
        setVisible(false);
        resolver?.(result);
    };

    const ConfirmModal = () =>
        visible ? (
            <Modal onClose={() => handleClose(false)} title="Confirm">
                <p>Are you sure you want to proceed?</p>
                <div className="flex gap-2 justify-end mt-4">
                    <Button onClick={() => handleClose(true)}>Yes</Button>
                    <Button onClick={() => handleClose(false)} variant="ghost">
                        Cancel
                    </Button>
                </div>
            </Modal>
        ) : null;

    return { confirm, ConfirmModal };
}
