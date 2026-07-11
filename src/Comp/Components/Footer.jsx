import '../../App.css'
import Logo from '../../Images/logo.png'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row gy-4 align-items-start">
          <div className="col-lg-4 text-lg-end text-center">
            <div className="footer-brand">
              <img src={Logo} alt="Logo" />
              <div>
                <h5 className="mb-1">وزارة التربية</h5>
                <p className="mb-0">منصة داخلية موحدة</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 text-center">
            <p className="mb-2">© 2026 جميع الحقوق محفوظة</p>
            <p className="mb-0">الدعم الفني: support@ministry.gov</p>
          </div>

          <div className="col-lg-4 text-lg-start text-center">
            <div className="site-footer-links">
              <a href="#home" className="site-footer-link">الرئيسية</a>
              <a href="#about" className="site-footer-link">سياسة الخصوصية</a>
              <a href="#contact" className="site-footer-link">تواصل معنا</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
