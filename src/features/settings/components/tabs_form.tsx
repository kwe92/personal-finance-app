import React from "react";
import "./css/tabs_form.css";
import TextFormField from "../../shared/components/text_form_field";
import MainButton from "../../shared/components/main_button";
import * as gaps from "../../../app/constants/reusable";
import { useSettingsData } from "../context/settings_context";
import { useTabFormData } from "../context/tab_form_context";

export default function TabsForm(): JSX.Element {
  const { isLoading, error, successMessage, updateAccountInfoHandler } =
    useSettingsData();
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
      </div>
    </div>
  );
}
