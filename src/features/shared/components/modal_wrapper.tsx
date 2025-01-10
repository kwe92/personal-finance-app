import "./css/modal_wrapper.css";

export const ModalWrapper = ({
  id,
  contentId,
  children,
}: {
  id: string;
  contentId: string;
  children?: React.ReactNode;
}): JSX.Element => {
  return (
    <div id={id} className="modal-background">
      <div id={contentId}>{children}</div>
    </div>
  );
};
