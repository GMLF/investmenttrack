import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', form);
      alert(res.data.message);
      // Aqui você pode armazenar token ou redirecionar para dashboard futuramente
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao fazer login');
      setForm({ email: '', password: '' });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2 className={styles.title}>Login</h2>

        <label className={styles.label}>E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <label className={styles.label}>Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        <p className={styles.footerText}>
          Não tem uma conta? <Link to="/cadastro" className={styles.link}>Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}
