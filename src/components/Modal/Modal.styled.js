import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(29, 28, 28, 0.8);
  z-index: 1200;
`;
export const ModalWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 420px;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
