import React, { useState, useEffect } from "react";
import "./css/tabs_form.css";
import TextFormField from "../../shared/components/text_form_field";
import MainButton from "../../shared/components/main_button";
import * as gaps from "../../../app/constants/reusable";
import { useAuth } from "../../auth/context/auth_context";
import { useSettingsData } from "../context/settings_context";

export default function TabsForm(): JSX.Element {
  const { user } = useAuth();
  const {
    isLoading,
    error,
    successMessage,
    clearMessages,
    updateAccountInfoHandler,
    updatePasswordHandler,
  } = useSettingsData();

  const [activeTab, setActiveTab] = useState<number>(0);

  // Account Information Fields
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  // Password Fields
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Password Visibility State
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<string>("password");
  const [showNewPassword, setShowNewPassword] = useState<string>("password");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<string>("password");

  // Password Error State
  const [currentPasswordError, setCurrentPasswordError] =
    useState<boolean>(false);
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [isShortPassword, setIsShortPassword] = useState<boolean>(false);
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

  // Populate user data with safe empty string fallback for missing name in DB
  useEffect(() => {
    if (user) {
      const dbUser = user as unknown as { name?: string };
      setName(dbUser.name ?? user.displayName ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  // Tab Switching Handler
  const handleTabSwitch = (tabIndex: number) => {
    clearMessages();
    setActiveTab(tabIndex);
  };

  // Submit: Account Information
  const handleAccountSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const isNameInvalid = trimmedName.length === 0;
    const isEmailInvalid = trimmedEmail.length === 0;

    setNameError(isNameInvalid);
    setEmailError(isEmailInvalid);

    if (isNameInvalid || isEmailInvalid) return;

    await updateAccountInfoHandler(trimmedName, trimmedEmail);
  };

  // Submit: Change Password
  const handlePasswordSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    const hasCurrentPassword = currentPassword.length > 0;
    const hasValidLength = newPassword.length >= 8;
    const doPasswordsMatch = newPassword === confirmPassword;

    setCurrentPasswordError(!hasCurrentPassword);
    setNewPasswordError(newPassword.length === 0);
    setIsShortPassword(newPassword.length > 0 && !hasValidLength);
    setPasswordMismatch(!doPasswordsMatch);

    if (!hasCurrentPassword || !hasValidLength || !doPasswordsMatch) {
      return;
    }

    await updatePasswordHandler(currentPassword, newPassword);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

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
          Account Information
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
          onSubmit={handleAccountSubmit}
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
          onSubmit={handlePasswordSubmit}
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
            onIconTap={() =>
              setShowCurrentPassword((prev) =>
                prev === "text" ? "password" : "text",
              )
            }
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
            onIconTap={() =>
              setShowNewPassword((prev) =>
                prev === "text" ? "password" : "text",
              )
            }
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
            onIconTap={() =>
              setShowConfirmPassword((prev) =>
                prev === "text" ? "password" : "text",
              )
            }
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
      </div>
    </div>
  );
}
