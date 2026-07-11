import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import TEXT from "./Text.jsx";
import AI from "../../Images/images.jpeg";
import cybersecurity from "../../Images/cybersecurity.jpg";
import robotic from "../../Images/robotics.jpeg";
import STEM from "../../Images/STEM.jpg";
import { db } from '../../firebase';

function Home({ onSelectCategory }) {
    const cards = [
        {
            id: "ai",
            image: AI,
            icon: "🤖",
            title: TEXT.content.AI,
            description: "بيانات و تقارير الذكاء الاصطناعي ",
        },
        {
            id: "cybersecurity",
            image: cybersecurity,
            icon: "🛡️",
            title: TEXT.content.Cybersecurity,
            description: "Your content goes here.",
        },
        {
            id: "robots",
            image: robotic,
            icon: "🔧",
            title: TEXT.content.Robots,
            description: "Your content goes here.",
        },
        {
            id: "stem",
            image: STEM,
            icon: "🧪",
            title: TEXT.content.STEM,
            description: "Your content goes here.",
        },
        {
            id: "innovation",
            icon: "💡",
            title: "Card 5",
            description: "Your content goes here.",
        },
        {
            id: "science",
            icon: "📊",
            title: "Card 6",
            description: "Your content goes here.",
        },
    ];

    const [stats, setStats] = useState([
        { value: "0", label: "المسابقات", icon: "🏆" },
        { value: "0", label: "الطلاب", icon: "🎓" },
        { value: "0", label: "المجالات", icon: "🧭" },
        { value: "0", label: "المدارس", icon: "🏫" },
    ]);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'siteSettings', 'homeStats'), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setStats([
                    { value: data.competitions ?? '150+', label: 'المسابقات', icon: '🏆' },
                    { value: data.students ?? '12,000+', label: 'الطلاب', icon: '🎓' },
                    { value: data.categories ?? '11', label: 'المجالات', icon: '🧭' },
                    { value: data.schools ?? '204', label: 'المدارس', icon: '🏫' },
                ]);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <main className="content-section" id="home">
            <div className="container">
                <section className="hero-shell row g-4 align-items-center" style={{background: "linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.7))"}}>
                    <div className="col-lg-7 order-2 order-lg-1">
                        <div className="hero-copy text-lg-end text-center">
                            <span className="hero-badge">منصة حكومية داخلية</span>
                            <h1 className="hero-title">منصة إدارة مسابقات العلوم والتقنية والابتكار</h1>
                            <p className="hero-subtitle">
                                منصة داخلية موحدة لإدارة بيانات وتقارير ومعلومات مسابقات طلبة المدارس في مختلف المجالات العلمية والتقنية، بما يدعم متابعة البرامج واتخاذ القرار بكفاءة.
                            </p>
                            <div className="hero-actions justify-content-lg-end justify-content-center">
                                <button type="button" className="btn hero-btn hero-btn-primary">استعراض المسابقات</button>
                                <button type="button" className="btn hero-btn hero-btn-secondary">عرض التقارير</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 order-1 order-lg-2">
                        <div className="hero-illustration">
                            <div className="hero-illustration-card">
                                <div className="hero-illustration-top">
                                    <span className="hero-illustration-pill">STEM Intelligence</span>
                                    <span className="hero-illustration-pill hero-illustration-pill-alt">Live monitoring</span>
                                </div>
                                <div className="hero-illustration-grid">
                                    <div className="hero-illustration-panel panel-large">
                                        <span>البيانات</span>
                                        <strong>12K+</strong>
                                    </div>
                                    <div className="hero-illustration-panel">
                                        <span>التقارير</span>
                                        <strong>204</strong>
                                    </div>
                                    <div className="hero-illustration-panel">
                                        <span>المجالات</span>
                                        <strong>11</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="stats-grid row g-4 my-5">
                    {stats.map((stat) => (
                        <div className="col-6 col-lg-3" key={stat.label}>
                            <div className="stat-card">
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-number">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="section-heading text-end mb-4">
                    <h2>الأقسام الرئيسية</h2>
                    <p>تصفح أبرز المجالات العلمية والرقمية التي تدعم المنصة</p>
                </div>

                <div className="content-grid">
                    {cards.map((card) => (
                        <div className="card content-card" key={card.id}>
                            <div className="card-body">
                                <div className="content-card-icon">{card.icon}</div>
                                {card.image && <img src={card.image} alt="" className="rounded-2 content-card-image"/>}
                                <h2 className="card-title">{card.title}</h2>
                                <p className="card-text">{card.description}</p>
                                <button
                                    type="button"
                                    className="btn content-card-btn mt-auto"
                                    onClick={() => onSelectCategory(card)}
                                >
                                    استكشف
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Home
