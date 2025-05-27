import { useState } from 'react';
import axios from 'axios';
import styles from './CadastroUsuario.module.css';

export default function CadastroUsuario() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/users', form);
      alert('Usuário cadastrado com sucesso!');
      setForm({ name: '', email: '', password: '' });
    } catch (error) {
      alert('Erro ao cadastrar usuário.');
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <div className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor">
            <path d="M5 20c1.5-2 4-3 7-3s5.5 1 7 3M12 12a4 4 0 100-8 4 4 0 000 8z" />
          </svg>
        </div>
        <h2 className={styles.title}>Criar conta</h2>
        <p className={styles.subtitle}>
          Comece agora a organizar seus investimentos.
        </p>

        <label className={styles.label}>Nome</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="João da Silva"
          required
          className={styles.input}
        />

        <label className={styles.label}>E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="joao@email.com"
          required
          className={styles.input}
        />

        <label className={styles.label}>Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>
    </div>
  );
}
