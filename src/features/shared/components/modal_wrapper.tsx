import "./css/modal_wrapper.css";

export const ModalWrapper = ({
  id,
  children,
}: {
  id: string;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <div id={id} className="modal-background">
      <div id="modal-content">{children}</div>
    </div>
  );
};
