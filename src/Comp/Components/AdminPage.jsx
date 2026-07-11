import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function AdminPage({ onBackToHome }) {
  const [formData, setFormData] = useState({
    competitions: '',
    students: '',
    categories: '',
    schools: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadStats = async () => {
      try {
        const snapshot = await getDoc(doc(db, 'siteSettings', 'homeStats'));
        if (snapshot.exists()) {
          const data = snapshot.data();
          setFormData({
            competitions: data.competitions ?? '',
            students: data.students ?? '',
            categories: data.categories ?? '',
            schools: data.schools ?? '',
          });
        }
      } catch (error) {
        setMessage('تعذر تحميل البيانات من Firebase');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await setDoc(doc(db, 'siteSettings', 'homeStats'), formData, { merge: true });
      setMessage('تم حفظ التغييرات بنجاح');
    } catch (error) {
      setMessage('حدث خطأ أثناء الحفظ');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="content-section" id="admin">
      <div className="container">
        <section className="hero-shell admin-shell" dir="rtl">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
            <div className="text-lg-end text-center">
              <span className="hero-badge">لوحة الإدارة</span>
              <h1 className="hero-title mb-2">تعديل الإحصائيات في الصفحة الرئيسية</h1>
              <p className="hero-subtitle mb-0">
                غيّر القيم أدناه وسيظهر التحديث مباشرة على الصفحة الرئيسية.
              </p>
            </div>
            <button type="button" className="btn hero-btn hero-btn-secondary" onClick={onBackToHome}>
              العودة للرئيسية
            </button>
          </div>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="admin-field-label" htmlFor="competitions">المسابقات</label>
                <input id="competitions" name="competitions" className="form-control admin-input" value={formData.competitions} onChange={handleChange} placeholder="150+" />
              </div>
              <div className="col-md-6">
                <label className="admin-field-label" htmlFor="students">الطلاب</label>
                <input id="students" name="students" className="form-control admin-input" value={formData.students} onChange={handleChange} placeholder="12,000+" />
              </div>
              <div className="col-md-6">
                <label className="admin-field-label" htmlFor="categories">المجالات</label>
                <input id="categories" name="categories" className="form-control admin-input" value={formData.categories} onChange={handleChange} placeholder="11" />
              </div>
              <div className="col-md-6">
                <label className="admin-field-label" htmlFor="schools">المدارس</label>
                <input id="schools" name="schools" className="form-control admin-input" value={formData.schools} onChange={handleChange} placeholder="204" />
              </div>
            </div>

            <div className="admin-actions">
              <button type="submit" className="btn hero-btn hero-btn-primary" disabled={saving || loading}>
                {saving ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
              </button>
            </div>
          </form>

          {message ? <div className={`admin-status ${message.includes('نجاح') ? 'success' : ''}`}>{message}</div> : null}
        </section>
      </div>
    </main>
  );
}

export default AdminPage;
