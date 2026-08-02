import React from 'react';

function ServicesPage() {
  const cards = [
    {
      icon: '📝',
      title: 'الاختبارات',
      description: 'عرض جدول الاختبارات، المواعيد، وأنواع الامتحانات المتاحة.',
    },
    {
      icon: '📚',
      title: 'السجلات',
      description: 'توثيق النتائج وأرشفة الأداء الأكاديمي والتنافسي.',
    },
    {
      icon: '🏫',
      title: 'الفصول',
      description: 'إدارة الفصول التدريبية والمحاضرات التحضيرية للمشاركين.',
    },
  ];

  return (
    <main className="container py-5" dir="rtl">
      <div className="p-4 rounded-4 shadow-sm" style={{ background: 'rgba(255,255,255,0.95)' }}>
        <h1 className="mb-4">الأولمبياد</h1>
        <p className="lead mb-4">
          تقدم هذه الصفحة معلومات حول الفعاليات الأولمبية والدعم التعليمي والتدريبي.
        </p>

        <div className="content-grid">
          {cards.map((card) => (
            <article key={card.title} className="card content-card">
              <div className="card-body">
                <div className="content-card-icon">{card.icon}</div>
                <h2 className="card-title">{card.title}</h2>
                <p className="card-text">{card.description}</p>
                <button type="button" className="btn content-card-btn">المزيد</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ServicesPage;
