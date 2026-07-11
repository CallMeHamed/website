import React from 'react';

function ContactPage() {
  return (
    <main className="container py-5" style={{ textAlign: 'left' }}>
      <div className="p-4 rounded-4 shadow-sm" style={{ background: 'rgba(255,255,255,0.9)' }}>
        <h1 className="mb-3">Contact</h1>
        <p className="lead mb-3">
          This page can hold contact information, a form, or support details.
        </p>
        <p>
          You can add email, phone, social links, or a contact form later.
        </p>
      </div>
    </main>
  );
}

export default ContactPage;
