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
                    Back
                </button>

                <header className="winners-header">
                    <h1>{category.title}</h1>
                    <p>Top 6 winners for each year</p>
                </header>

                <section className="winner-years">
                    {isLoading && <p className="winners-message">Loading winners...</p>}
                    {!isLoading && error && <p className="winners-message text-danger">{error}</p>}
                    {!isLoading && !error && winnerYears.length === 0 && (
                        <p className="winners-message">No winners saved yet.</p>
                    )}
                    {!isLoading && !error && winnerYears.map((yearGroup) => (
                        <article className="winner-year" key={yearGroup.year}>
                            <h2>{yearGroup.year}</h2>
                            <ol className="winner-list">
                                {yearGroup.winners.map((winner) => (
                                    <li className="winner-item" key={winner.rank}>
                                        <span className="winner-rank">{winner.rank}</span>
                                        <span>
                                            <strong>{winner.name}</strong>
                                            <small>{winner.school}</small>
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </article>
                    ))}
                </section>

                <section className="future-winners">
                    <h2>Submit Winners</h2>
                    <form className="future-winners-form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="year">Year</label>
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

                        <div>
                            <label htmlFor="rank">Rank</label>
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

                        <div>
                            <label htmlFor="name">Winner Name</label>
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

                        <div>
                            <label htmlFor="school">School / Team</label>
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
                            Submit
                        </button>
                    </form>

                    {status && <p className="future-winners-status text-success">{status}</p>}
                </section>
            </div>
        </main>
    );
}

export default WinnersPage;
