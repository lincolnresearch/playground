// useConfirm.ts
import { useState } from 'react';
import {Button, Modal} from "@heroui/react";

export function useConfirm() {
    const [visible, setVisible] = useState(false);
    const [resolver, setResolver] = useState<((val: boolean) => void) | null>(null);

    const confirm = () =>
        new Promise<boolean>((resolve) => {
            setVisible(true);
            setResolver(() => resolve);
        });

    const ConfirmModal = () =>
        visible && (
            <Modal onClose={() => handleClose(false)} title="Confirm Action">
                <p className="text-sm text-default-500">Are you sure you want to continue?</p>
                <div className="flex justify-end mt-4 gap-2">
                    <Button onClick={() => handleClose(true)}>Yes</Button>
                    <Button variant="ghost" onClick={() => handleClose(false)}>Cancel</Button>
                </div>
            </Modal>
        );

    const handleClose = (result: boolean) => {
        setVisible(false);
        resolver?.(result);
    };

    return { confirm, ConfirmModal };
}
