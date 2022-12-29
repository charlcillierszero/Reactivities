import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";

const ModalContainer = () => {
  const {
    modalStore: { modal, closeModal },
  } = useStore();
  return (
    <Modal open={modal.open} onClose={closeModal} size="mini">
      <Modal.Content>{modal.body}</Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);
