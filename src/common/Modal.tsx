import "./Modal.css";

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => onClose()}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

interface ModalProps {
  onClose: Function;
}

export default Modal;
