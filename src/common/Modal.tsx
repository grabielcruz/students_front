import "./Modal.css";

const Modal: React.FC<ModalProps> = ({ content, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => onClose()}>
          &times;
        </span>
        {content}
      </div>
    </div>
  );
};

interface ModalProps {
  content: any;
  onClose: Function;
}

export default Modal;
