import { useEffect, useRef, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { ModalWrapper } from "./modal_wrapper";
import { ToastService } from "../services/toast_service";
import {
  createUpdateLinkToken,
  registerReauthHandler,
} from "../services/backend_service";
import MainButton from "./main_button";
import { ModalId } from "../../../app/constants/constants";

export const PlaidUpdateListener = (): JSX.Element => {
  const modalId = ModalId.plaidReauthModal;
  const toastService = ToastService.getInstance();

  const [updateToken, setUpdateToken] = useState<string | null>(null);
  const [isOpeningLink, setIsOpeningLink] = useState(false);

  const resolverRef = useRef<{
    resolve: () => void;
    reject: (err: Error) => void;
  } | null>(null);

  const handleCancel = () => {
    toastService.closeModal(modalId);
    setUpdateToken(null);
    setIsOpeningLink(false);

    resolverRef.current?.reject(
      new Error("Plaid update was cancelled by the user."),
    );
    resolverRef.current = null;
  };

  const { open, ready } = usePlaidLink({
    token: updateToken ?? "",
    onSuccess: () => {
      setUpdateToken(null);
      setIsOpeningLink(false);
      resolverRef.current?.resolve();
      resolverRef.current = null;
    },
    onExit: (error) => {
      setUpdateToken(null);
      setIsOpeningLink(false);
      if (error) {
        resolverRef.current?.reject(new Error(error.error_message));
      } else {
        resolverRef.current?.reject(
          new Error("Plaid update was exited without completing."),
        );
      }
      resolverRef.current = null;
    },
  });

  // Register with backend_service interceptor
  useEffect(() => {
    registerReauthHandler(() => {
      return new Promise<void>(async (resolve, reject) => {
        resolverRef.current = { resolve, reject };

        try {
          // 1. Fetch the update token
          const res = await createUpdateLinkToken();
          setUpdateToken(res.linkToken);

          // 2. Display the modal explaining why reauth is required
          toastService.toogleModal(modalId, handleCancel);
        } catch (err) {
          resolverRef.current = null;
          reject(
            err instanceof Error
              ? err
              : new Error("Failed to create update token"),
          );
        }
      });
    });
  }, [modalId]);

  const handleReconnect = () => {
    if (!ready) return;

    setIsOpeningLink(true);
    toastService.closeModal(modalId);
    open();
  };

  return (
    <ModalWrapper id={modalId}>
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "480px",
          width: "90vw",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>🔐</span>
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 700,
              color: "#201F24",
            }}
          >
            Bank Reconnection Required
          </h2>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: "14px",
            lineHeight: "1.6",
            color: "#696868",
          }}
        >
          For your security, your financial institution requires you to
          re-authenticate or update your login details. Please reconnect your
          account to resume syncing your balances, transactions, and budgets.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          <MainButton
            type="button"
            disabled={!ready || isOpeningLink}
            onTap={handleReconnect}
          >
            {isOpeningLink ? "Opening Plaid…" : "Reconnect Bank"}
          </MainButton>

          <button
            type="button"
            onClick={handleCancel}
            style={{
              background: "transparent",
              border: "none",
              color: "#696868",
              cursor: "pointer",
              fontSize: "14px",
              padding: "10px",
              fontWeight: 600,
            }}
          >
            I'll do this later
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
