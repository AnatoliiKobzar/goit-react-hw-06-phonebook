import { ModalWindow, Overlay } from './Modal.styled';

export const Modal = ({ children }) => {
  return (
    <Overlay>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>
  );
};
