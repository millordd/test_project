import { Dialog, DialogPanel, Transition } from '@headlessui/react';

import { IModalProps } from './types';

export const Modal = ({ children, onClose, isOpen }: IModalProps) => {
  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-[9999] focus:outline-none" onClose={onClose}>
        <div className="fixed inset-0 z-[9999] w-screen overflow-y-auto bg-[#23232980] backdrop-blur-[2px]">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel>{children}</DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
