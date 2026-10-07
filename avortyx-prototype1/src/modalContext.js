import { createContext, useContext } from 'react';

export const ModalContext = createContext({ open: () => {}, close: () => {} });
export const useModal = () => useContext(ModalContext);
