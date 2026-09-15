import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import "./index.css";

// Eslatma: bu loyiha react-router-dom'dan foydalanadi.
// Agar o'rnatilmagan bo'lsa: npm install react-router-dom

const API = "https://jsonplaceholder.typicode.com";

/* ---------------- NavBar ---------------- */

function NavBar() {
  return (
    <header className="nav">
      <nav className="nav-links">
        <Link to="/posts">Posts</Link>
        <Link to="/users">Users</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <Link to="/login" className="nav-login-btn">
        Login
      </Link>
    </header>
  );
}

/* ---------------- Posts list ---------------- */

function Posts() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(`${API}/posts`)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section className="page-section">
      <h1 className="page-title">Posts</h1>

      {status === "loading" && <p className="state-msg">Loading posts…</p>}
      {status === "error" && (
        <p className="state-msg state-msg--error">Couldn't load posts.</p>
      )}

      {status === "ready" && (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`} className="post-link">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ---------------- Single post ---------------- */

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    fetch(`${API}/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  return (
    <section className="page-section">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← back
      </button>

      {status === "loading" && <p className="state-msg">Loading…</p>}
      {status === "error" && (
        <p className="state-msg state-msg--error">Post topilmadi.</p>
      )}

      {status === "ready" && post && (
        <article className="post-detail">
          <span className="post-detail-id">Post #{post.id}</span>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </article>
      )}
    </section>
  );
}

/* ---------------- Users ---------------- */

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(`${API}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section className="page-section">
      <h1 className="page-title">Users</h1>

      {status === "loading" && <p className="state-msg">Loading users…</p>}
      {status === "error" && (
        <p className="state-msg state-msg--error">Couldn't load users.</p>
      )}

      {status === "ready" && (
        <ul className="user-list">
          {users.map((u) => (
            <li key={u.id} className="user-row">
              <span className="user-name">{u.name}</span>
              <span className="user-email">{u.email}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/* ---------------- Cart ---------------- */

function Cart() {
  return (
    <section className="page-section">
      <h1 className="page-title">Cart</h1>
      <div className="empty-cart">
        <p>Savatingiz hozircha bo'sh.</p>
        <Link to="/posts" className="link-accent">
          Postlarga qaytish
        </Link>
      </div>
    </section>
  );
}

/* ---------------- Login ---------------- */

function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = "Emailni kiriting";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Email noto'g'ri";
    if (!form.password) next.password = "Parolni kiriting";
    else if (form.password.length < 6) next.password = "Kamida 6 ta belgi";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    // Backend bo'lmagani uchun, real so'rovni shu yerga almashtiring
    // (masalan: fetch('/api/login', { method: 'POST', body: ... }))
    setTimeout(() => setStatus("success"), 1100);
  };

  return (
    <section className="login-page">
      <div className="login-card">
        {status === "success" ? (
          <div className="login-success">
            <div className="success-icon">✓</div>
            <h2>Xush kelibsiz!</h2>
            <p>Siz muvaffaqiyatli tizimga kirdingiz.</p>
            <Link to="/posts" className="submit-btn submit-btn--link">
              Postlarga o'tish
            </Link>
          </div>
        ) : (
          <>
            <h1>Kirish</h1>
            <p className="login-sub">Davom etish uchun hisobingizga kiring</p>

            <form onSubmit={handleSubmit} noValidate>
              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="siz@example.com"
                />
                {errors.email && <small className="field-error">{errors.email}</small>}
              </label>

              <label className="field">
                <span>Parol</span>
                <div className="password-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="toggle-pass"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? "Yashirish" : "Ko'rsatish"}
                  </button>
                </div>
                {errors.password && (
                  <small className="field-error">{errors.password}</small>
                )}
              </label>

              <div className="field-row">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(e) =>
                      setForm({ ...form, remember: e.target.checked })
                    }
                  />
                  Eslab qolish
                </label>
                <a href="#" className="link-muted">
                  Parolni unutdingizmi?
                </a>
              </div>

              <button type="submit" className="submit-btn" disabled={status === "loading"}>
                {status === "loading" ? "Tekshirilmoqda…" : "Kirish"}
              </button>

              <p className="login-footer">
                Hisobingiz yo'qmi?{" "}
                <a href="#" className="link-accent">
                  Ro'yxatdan o'tish
                </a>
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------------- App ---------------- */

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}