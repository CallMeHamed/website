import React from 'react';

function AboutPage() {
  const cards = [
    {
      icon: '🚀',
      title: 'مسابقة شِل',
      description: 'مسابقة متخصصة في الابتكار التقني والأمن السيبراني والبرمجة.',
      details: 'مناسبة للطلاب والمواهب الرقمية.',
    },
    {
      icon: '⚙️',
      title: 'مسابقة ب.د.أ',
      description: 'برنامج لتطوير الطلاب في مجالات التكنولوجيا والهندسة.',
      details: 'يشمل تحديات عملية ودورات تدريبية.',
    },
    {
      icon: '🤖',
      title: 'First Global',
      description: 'مسابقة عالمية للروبوتات تضع الطلاب في تحديات دولية.',
      details: 'تعزز التعاون والابتكار في مجال الروبوت.',
    },
  ];

  return (
    <main className="container py-5" dir="rtl">
      <div className="p-4 rounded-4 shadow-sm" style={{ background: 'rgba(255,255,255,0.95)' }}>
        <h1 className="mb-4">المسابقات الأخرى</h1>
        <p className="lead mb-4">
          تصف هذه الصفحة أبرز المسابقات التي يمكن للطلاب المشاركة فيها إلى جانب المسابقات الوطنية.
        </p>

        <div className="content-grid">
          {cards.map((card) => (
            <article key={card.title} className="card content-card">
              <div className="card-body">
                <div className="content-card-icon">{card.icon}</div>
                <h2 className="card-title">{card.title}</h2>
                <p className="card-text">{card.description}</p>
                <p className="card-text" style={{ fontWeight: 700 }}>{card.details}</p>
                <button type="button" className="btn content-card-btn">عرض التفاصيل</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
