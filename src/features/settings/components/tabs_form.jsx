import React, { useState } from 'react';
import './css/tabs_form.css';

export default function TabsForm() {
  const [activeTab, setActiveTab] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted for tab: ${activeTab}`);
  };

  return (
    <div className="tab-container">
      {/* Tab Navigation */}
      <div className="tab-buttons" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 0}
          className={`tab-btn ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Account Information
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 1}
          className={`tab-btn ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Change Passowrd
        </button>
      </div>

      {/* Form Panels */}
      <div className="tab-content">
        {/* Panel 1: Personal Info */}
        <form
          className={`form-panel ${activeTab === 0 ? 'active' : ''}`}
          onSubmit={handleSubmit}
        >
          <h3>Personal Details</h3>
          <div className="field">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" placeholder="john@example.com" />
          </div>
          <button type="submit">Save Personal</button>
        </form>

        {/* Panel 2: Billing Info */}
        <form
          className={`form-panel ${activeTab === 1 ? 'active' : ''}`}
          onSubmit={handleSubmit}
        >
          <h3>Billing Details</h3>
          <div className="field">
            <label>Card Number</label>
            <input type="text" placeholder="**** **** **** 1234" />
          </div>
          <div className="field">
            <label>Billing Address</label>
            <input type="text" placeholder="123 Main St" />
          </div>
          <button type="submit">Save Billing</button>
        </form>
      </div>
    </div>
  );
}