import { useState } from 'react';
import { Modal, Button } from "@heroui/react";

type ConfirmOptions = {
    title?: string;
    message?: string;
};

export function useConfirmModal() {
    const [visible, setVisible] = useState(false);
    const [resolver, setResolver] = useState<(result: boolean) => void>();
    const [options, setOptions] = useState<ConfirmOptions>({});

    const confirm = (opts: ConfirmOptions = {}) => {
        return new Promise<boolean>((resolve) => {
            setOptions(opts);
            setVisible(true);
            setResolver(() => resolve);
        });
    };

    const handleClose = (result: boolean) => {
        setVisible(false);
        resolver?.(result);
    };

    const ConfirmModal = visible ? (
        <Modal title={options.title || "Are you sure?"} onClose={() => handleClose(false)}>
            <div className="text-default-500 text-sm mb-4">
                {options.message || "This action cannot be undone."}
            </div>
            <div className="flex justify-end gap-2">
                <Button onClick={() => handleClose(true)}>Confirm</Button>
                <Button variant="ghost" onClick={() => handleClose(false)}>Cancel</Button>
            </div>
        </Modal>
    ) : null;

    return { confirm, ConfirmModal };
}
