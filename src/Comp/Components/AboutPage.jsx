import React from 'react';

function AboutPage() {
  return (
    <main className="container py-5" style={{ textAlign: 'left' }}>
      <div className="p-4 rounded-4 shadow-sm" style={{ background: 'rgba(255,255,255,0.9)' }}>
        <h1 className="mb-3">About</h1>
        <p className="lead mb-3">
          This section introduces the purpose of the site and the story behind the event.
        </p>
        <p>
          You can expand it later with mission details, organizers, history, or team information.
        </p>
      </div>
    </main>
  );
}

export default AboutPage;
