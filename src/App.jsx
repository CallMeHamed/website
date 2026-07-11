import './App.css'
import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import Header from './Comp/Components/Header'
import Home from './Comp/Components/Home'
import WinnersPage from './Comp/Components/WinnersPage'
import AboutPage from './Comp/Components/AboutPage'
import ServicesPage from './Comp/Components/ServicesPage'
import ContactPage from './Comp/Components/ContactPage'
import Footer from './Comp/Components/Footer'
import AdminPage from './Comp/Components/AdminPage'
import { auth } from './firebase'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [activePage, setActivePage] = useState('home')
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const [authBusy, setAuthBusy] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setAuthLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    setAuthBusy(true)
    setAuthError('')
    setAuthMessage('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setActivePage('admin')
    } catch (error) {
      setAuthError('فشل تسجيل الدخول. تأكد من البريد وكلمة المرور.')
    } finally {
      setAuthBusy(false)
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    setAuthBusy(true)
    setAuthError('')
    setAuthMessage('')

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setAuthMessage('تم إنشاء الحساب بنجاح. يمكنك الآن الدخول إلى لوحة الإدارة.')
      setIsRegisterMode(false)
      setPassword('')
    } catch (error) {
      setAuthError('تعذر إنشاء الحساب. تأكد من البريد وكلمة المرور أو أن التسجيل مفعل في Firebase.')
    } finally {
      setAuthBusy(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    setActivePage('home')
  }

  const renderContent = () => {
    if (selectedCategory) {
      return <WinnersPage category={selectedCategory} onBack={() => setSelectedCategory(null)} />
    }

    if (activePage === 'admin' && !user) {
      return (
        <main className="content-section" id="admin-login">
          <div className="container">
            <section className="hero-shell admin-shell" dir="rtl">
              <div className="text-center mb-4">
                <span className="hero-badge">وصول مسؤول</span>
                <h1 className="hero-title mb-2">{isRegisterMode ? 'إنشاء حساب إداري' : 'تسجيل الدخول إلى لوحة الإدارة'}</h1>
                <p className="hero-subtitle mb-0">{isRegisterMode ? 'أنشئ حسابًا جديدًا لإدارة المحتوى.' : 'يرجى إدخال بيانات الحساب المسجل في Firebase.'}</p>
              </div>

              <form className="admin-form" onSubmit={isRegisterMode ? handleRegister : handleLogin}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="admin-field-label" htmlFor="email">البريد الإلكتروني</label>
                    <input id="email" type="email" className="form-control admin-input" value={email} onChange={(event) => setEmail(event.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <label className="admin-field-label" htmlFor="password">كلمة المرور</label>
                    <input id="password" type="password" className="form-control admin-input" value={password} onChange={(event) => setPassword(event.target.value)} required />
                  </div>
                </div>

                <div className="admin-actions" style={{ justifyContent: 'space-between' }}>
                  <button type="button" className="btn hero-btn hero-btn-secondary" onClick={() => { setIsRegisterMode(!isRegisterMode); setAuthError(''); setAuthMessage(''); }}>
                    {isRegisterMode ? 'العودة لتسجيل الدخول' : 'إنشاء حساب جديد'}
                  </button>
                  <button type="submit" className="btn hero-btn hero-btn-primary" disabled={authBusy || authLoading}>
                    {authBusy ? (isRegisterMode ? 'جارٍ إنشاء الحساب...' : 'جارٍ تسجيل الدخول...') : (isRegisterMode ? 'إنشاء الحساب' : 'تسجيل الدخول')}
                  </button>
                </div>
              </form>

              {authError ? <div className="admin-status">{authError}</div> : null}
              {authMessage ? <div className="admin-status success">{authMessage}</div> : null}
            </section>
          </div>
        </main>
      )
    }

    switch (activePage) {
      case 'about':
        return <AboutPage />
      case 'services':
        return <ServicesPage />
      case 'contact':
        return <ContactPage />
      case 'admin':
        return <AdminPage onBackToHome={() => {
          setSelectedCategory(null)
          setActivePage('home')
        }} />
      default:
        return <Home onSelectCategory={setSelectedCategory} />
    }
  }

  return (
    <>
      <Header
        onHomeClick={() => {
          setSelectedCategory(null)
          setActivePage('home')
        }}
        onNavigate={setActivePage}
      />
      {renderContent()}
      <Footer />
    </>
  )
}

export default App
