import React from 'react';

function ContactPage() {
  const cards = [
    {
      icon: '✉️',
      title: 'البريد الإلكتروني',
      description: 'تواصل معنا عبر البريد الإلكتروني للدعم الفني والمعلومات.',
    },
    {
      icon: '📞',
      title: 'الهاتف',
      description: 'اتصل برقم الدعم للحصول على مساعدة فورية.',
    },
    {
      icon: '📍',
      title: 'الموقع',
      description: 'العنوان والموقع الجغرافي لمكاتب الوزارة والمركز.',
    },
  ];

  return (
    <main className="container py-5" dir="rtl">
      <div className="p-4 rounded-4 shadow-sm" style={{ background: 'rgba(255,255,255,0.95)' }}>
        <h1 className="mb-4">تواصل معنا</h1>
        <p className="lead mb-4">
          اختر وسيلة الاتصال المناسبة لك للتواصل مع فريق الدعم أو إدارة البرامج.
        </p>

        <div className="content-grid">
          {cards.map((card) => (
            <article key={card.title} className="card content-card">
              <div className="card-body">
                <div className="content-card-icon">{card.icon}</div>
                <h2 className="card-title">{card.title}</h2>
                <p className="card-text">{card.description}</p>
                <button type="button" className="btn content-card-btn">عرض التفاصيل</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
