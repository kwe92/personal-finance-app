import React, { useState } from "react"; // <-- Imported useState
import "./css/tabs_form.css";
import TextFormField from "../../shared/components/text_form_field";
import MainButton from "../../shared/components/main_button";
import * as gaps from "../../../app/constants/reusable";
import { useSettingsData } from "../context/settings_context";
import { useTabFormData } from "../context/tab_form_context";

// ! TODO: we need to make this component smaller and modular
export default function TabsForm(): JSX.Element {
  const {
    isLoading,
    error,
    successMessage,
    connectedInstitution,
    disconnectBankHandler,
  } = useSettingsData();

  const {
    activeTab,
    handleTabSwitch,
    name,
    email,
    nameError,
    emailError,
    setName,
    setEmail,
    setNameError,
    setEmailError,
    handleAccountSubmit,
    currentPassword,
    newPassword,
    confirmPassword,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    toggleShowCurrentPassword,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
    currentPasswordError,
    newPasswordError,
    isShortPassword,
    passwordMismatch,
    setCurrentPasswordError,
    setNewPasswordError,
    setIsShortPassword,
    setPasswordMismatch,
    handlePasswordSubmit,
  } = useTabFormData();

  // <-- NEW: Local state to toggle the disconnect warning confirmation
  const [showDisconnectConfirm, setShowDisconnectConfirm] =
    useState<boolean>(false);

  return (
    <div className="tab-container">
      {/* Tab Header Navigation */}
      <div className="tab-buttons" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 0}
          className={`tab-btn ${activeTab === 0 ? "active" : ""}`}
          onClick={() => handleTabSwitch(0)}
        >
          Account Info
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 1}
          className={`tab-btn ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabSwitch(1)}
        >
          Change Password
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 2}
          className={`tab-btn ${activeTab === 2 ? "active" : ""}`}
          onClick={() => {
            handleTabSwitch(2);
            setShowDisconnectConfirm(false); // Reset warning when switching tabs
          }}
        >
          Bank Connection
        </button>
      </div>

      <div className="tab-content">
        {/* Status Messages */}
        {error && <p className="error-text settings-banner-error">{error}</p>}
        {successMessage && (
          <p className="success-text settings-banner-success">
            {successMessage}
          </p>
        )}

        {/* ================= Panel 0: Account Information ================= */}
        <form
          className={`form-panel ${activeTab === 0 ? "active" : ""}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <TextFormField
            name="name"
            label="Name"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => {
              setNameError(false);
              setName(e.target.value);
            }}
          />
          {nameError && <p className="error-text">Name cannot be empty</p>}

          <gaps.GapH16 />

          <TextFormField
            name="email"
            label="Email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmailError(false);
              setEmail(e.target.value);
            }}
          />
          {emailError && (
            <p className="error-text">Enter a valid email address</p>
          )}

          <gaps.GapH32 />

          <MainButton
            type="submit"
            onTap={handleAccountSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </MainButton>
        </form>

        {/* ================= Panel 1: Change Password ================= */}
        <form
          className={`form-panel ${activeTab === 1 ? "active" : ""}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <TextFormField
            showPasswordIcon={true}
            name="currentPassword"
            label="Current Password"
            type={showCurrentPassword}
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPasswordError(false);
              setCurrentPassword(e.target.value);
            }}
            onIconTap={toggleShowCurrentPassword}
          />
          {currentPasswordError && (
            <p className="error-text">Current password is required</p>
          )}

          <gaps.GapH16 />

          <TextFormField
            showPasswordIcon={true}
            name="newPassword"
            label="New Password"
            type={showNewPassword}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => {
              setNewPasswordError(false);
              setIsShortPassword(false);
              setNewPassword(e.target.value);
            }}
            onIconTap={toggleShowNewPassword}
          />
          {newPasswordError && (
            <p className="error-text">New password is required</p>
          )}

          <gaps.GapH16 />

          <TextFormField
            showPasswordIcon={true}
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword}
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => {
              setPasswordMismatch(false);
              setConfirmPassword(e.target.value);
            }}
            onIconTap={toggleShowConfirmPassword}
          />
          {passwordMismatch && (
            <p className="error-text">Passwords do not match</p>
          )}

          <gaps.GapH12 />

          <p
            style={{
              textAlign: "right",
              color: !isShortPassword ? "#696868" : "red",
              fontSize: "12px",
              fontWeight: !isShortPassword ? "normal" : "bold",
            }}
          >
            Passwords must be at least 8 characters
          </p>

          <gaps.GapH32 />

          <MainButton
            type="submit"
            onTap={handlePasswordSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </MainButton>
        </form>

        {/* ================= Panel 2: Bank Connection ================= */}
        <div className={`form-panel ${activeTab === 2 ? "active" : ""}`}>
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: "16px",
                color: "#201f24",
              }}
            >
              Connected Institution
            </h3>
            {isLoading && connectedInstitution === null ? (
              <p style={{ margin: 0, color: "#696868", fontSize: "14px" }}>
                Loading...
              </p>
            ) : connectedInstitution ? (
              <p
                style={{
                  margin: 0,
                  color: "#277c78",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {connectedInstitution}
              </p>
            ) : (
              <p style={{ margin: 0, color: "#696868", fontSize: "14px" }}>
                No bank account currently connected.
              </p>
            )}
          </div>

          <gaps.GapH32 />

          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* <-- NEW: Inline Warning UI for Disconnecting --> */}
            {!showDisconnectConfirm ? (
              <button
                type="button"
                onClick={() => setShowDisconnectConfirm(true)}
                disabled={isLoading || !connectedInstitution}
                style={{
                  padding: "16px",
                  backgroundColor: "transparent",
                  color:
                    isLoading || !connectedInstitution ? "#a0aec0" : "#e53e3e",
                  border:
                    isLoading || !connectedInstitution
                      ? "1px solid #cbd5e0"
                      : "1px solid #e53e3e",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor:
                    isLoading || !connectedInstitution
                      ? "not-allowed"
                      : "pointer",
                  transition: "all 0.2s",
                }}
              >
                Disconnect Bank
              </button>
            ) : (
              <div
                style={{
                  padding: "16px",
                  backgroundColor: "#fff5f5",
                  border: "1px solid #fc8181",
                  borderRadius: "8px",
                }}
              >
                <p
                  style={{
                    color: "#c53030",
                    margin: "0 0 12px 0",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Are you sure you want to disconnect? This will stop syncing
                  your transactions.
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={async () => {
                      await disconnectBankHandler();
                      setShowDisconnectConfirm(false);
                    }}
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      padding: "12px",
                      backgroundColor: "#e53e3e",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      opacity: isLoading ? 0.7 : 1,
                    }}
                  >
                    {isLoading ? "Disconnecting..." : "Yes, Disconnect"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDisconnectConfirm(false)}
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      padding: "12px",
                      backgroundColor: "transparent",
                      color: "#4a5568",
                      border: "1px solid #cbd5e0",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: isLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
