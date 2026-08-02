import { useEffect, useMemo, useState } from "react";
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../firebase";

function WinnersPage({ category, onBack }) {
    const [winners, setWinners] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    const [form, setForm] = useState({
        year: "",
        name: "",
        school: "",
        rank: "",
    });

    useEffect(() => {
        setIsLoading(true);
        setError("");

        const winnersQuery = query(
            collection(db, "winners"),
            where("categoryId", "==", category.id)
        );

        const unsubscribe = onSnapshot(
            winnersQuery,
            (snapshot) => {
                const winnerRows = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setWinners(winnerRows);
                setIsLoading(false);
            },
            () => {
                setError("Could not load winners from Firebase.");
                setIsLoading(false);
            }
        );

        return unsubscribe;
    }, [category.id]);

    const winnerYears = useMemo(() => {
        const groupedWinners = winners.reduce((groups, winner) => {
            const year = Number(winner.year);

            if (!groups[year]) {
                groups[year] = [];
            }

            groups[year].push(winner);
            return groups;
        }, {});

        return Object.entries(groupedWinners)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, yearWinners]) => ({
                year,
                winners: yearWinners
                    .sort((winnerA, winnerB) => Number(winnerA.rank) - Number(winnerB.rank))
                    .slice(0, 6),
            }));
    }, [winners]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus("");
        setError("");

        try {
            await addDoc(collection(db, "winners"), {
                categoryId: category.id,
                categoryTitle: category.title,
                year: Number(form.year),
                rank: Number(form.rank),
                name: form.name,
                school: form.school,
                createdAt: serverTimestamp(),
            });

            setForm({
                year: "",
                name: "",
                school: "",
                rank: "",
            });
            setStatus("Winner submitted to Firebase.");
        } catch {
            setError("Could not submit winner to Firebase.");
        }
    };

    return (
        <main className="winners-page">
            <div className="container">
                <button className="btn btn-outline-secondary winners-back" type="button" onClick={onBack}>
                    العودة
                </button>

                <header className="winners-header">
                    <h1>{category.title}</h1>
                    <p>عرض الفائزين في جدول منسّق وفقًا للسنة والمركز</p>
                </header>

                {isLoading && <p className="winners-message">جارٍ تحميل النتائج...</p>}
                {!isLoading && error && <p className="winners-message text-danger">{error}</p>}
                {!isLoading && !error && winnerYears.length === 0 && (
                    <p className="winners-message">لا توجد نتائج محفوظة حتى الآن.</p>
                )}

                {!isLoading && !error && winnerYears.map((yearGroup) => (
                    <article className="winner-year" key={yearGroup.year}>
                        <h2>عام {yearGroup.year}</h2>
                        <table className="winner-table">
                            <caption>الفائزون الأفضل</caption>
                            <thead>
                                <tr>
                                    <th>الترتيب</th>
                                    <th>اسم الطالب</th>
                                    <th>المدرسة / الفريق</th>
                                </tr>
                            </thead>
                            <tbody>
                                {yearGroup.winners.map((winner) => (
                                    <tr key={`${yearGroup.year}-${winner.id}`}>
                                        <td>{winner.rank}</td>
                                        <td>{winner.name}</td>
                                        <td>{winner.school}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </article>
                ))}

                <section className="future-winners">
                    <h2>إضافة فائز</h2>
                    <form className="future-winners-form" onSubmit={handleSubmit}>
                        <div className="winner-form-group">
                            <label htmlFor="year">السنة</label>
                            <input
                                className="form-control"
                                id="year"
                                name="year"
                                type="number"
                                value={form.year}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="winner-form-group">
                            <label htmlFor="rank">الرتبة</label>
                            <input
                                className="form-control"
                                id="rank"
                                name="rank"
                                type="number"
                                min="1"
                                max="6"
                                value={form.rank}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="winner-form-group">
                            <label htmlFor="name">اسم الفائز</label>
                            <input
                                className="form-control"
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="winner-form-group">
                            <label htmlFor="school">المدرسة / الفريق</label>
                            <input
                                className="form-control"
                                id="school"
                                name="school"
                                type="text"
                                value={form.school}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button className="btn btn-primary" type="submit">
                            حفظ الفائز
                        </button>
                    </form>

                    {status && <p className="future-winners-status text-success">{status}</p>}
                </section>
            </div>
        </main>
    );
}

export default WinnersPage;
