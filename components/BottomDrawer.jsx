import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function BottomDrawer ({open, onClose, children}) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={onClose}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-black opacity-30 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-x-0 bottom-0 max-w-full flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-y-full"
                            enterTo="translate-y-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-y-0"
                            leaveTo="translate-y-full"
                        >
                            <div className="relative w-screen">
                                <div className="h-fit rounded-t-2xl p-4 overflow-x-hidden bg-white shadow-xl overflow-y-scroll">
                                    <button
                                        type="button"
                                        className="rounded-md text-gray-600 hover:text-gray-500 focus:outline-none transition duration-200 ease-in"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>

                                    <div className="mt-2">
                                        {children}
                                    </div>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}