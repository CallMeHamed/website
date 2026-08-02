import { useEffect, useRef, useState } from 'react';
import AI from '../../Images/images.jpeg';
import cybersecurity from '../../Images/cybersecurity.jpg';
import robotic from '../../Images/robotics.jpeg';
import STEM from '../../Images/STEM.jpg';

const featureCards = [
  {
    title: 'تحليلات الذكاء الاصطناعي',
    description: 'لوحة بيانات ذكية تُظهر اتجاهات الأداء والنتائج في الوقت الحقيقي.',
    icon: '🤖',
    image: AI,
  },
  {
    title: 'التقارير والإحصاءات',
    description: 'مخططات وتقارير سلسة تساعد على فهم الأداء والنتائج بسرعة.',
    icon: '📊',
    image: cybersecurity,
  },
  {
    title: 'مسابقات الطلاب',
    description: 'تحديثات فورية عن المنافسات، الفرق، والمراكز المتميزة.',
    icon: '🏆',
    image: robotic,
  },
  {
    title: 'لوحة تحكم ذكية',
    description: 'واجهة إدارة متكاملة تجمع البيانات، الإعدادات، والإعلامات في مكان واحد.',
    icon: '🧭',
    image: STEM,
  },
];

function FeatureShowcase() {
  const containerRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY / 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePointerMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty('--tilt-x', `${y * 10}deg`);
    card.style.setProperty('--tilt-y', `${x * 10}deg`);
  };

  const handlePointerLeave = (event) => {
    const card = event.currentTarget;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };

  const slides = [...featureCards, ...featureCards];

  return (
    <section
      className="feature-showcase"
      ref={containerRef}
      style={{ transform: `translate3d(0, ${scrollOffset}px, 0)` }}
    >
      <div className="feature-showcase-shell">
        <div className="feature-carousel">
          <div className="feature-track">
            {slides.map((card, index) => (
              <article
                key={`${card.title}-${index}`}
                className="feature-card"
                onMouseMove={handlePointerMove}
                onMouseLeave={handlePointerLeave}
              >
                <img src={card.image} alt={card.title} loading="lazy" className="feature-card-image" />
                <div className="feature-card-overlay" />
                <div className="feature-card-content">
                  <div className="feature-card-pulse" />
                  <span className="feature-card-icon">{card.icon}</span>
                  <h3 className="feature-card-title">{card.title}</h3>
                  <p className="feature-card-text">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureShowcase;
