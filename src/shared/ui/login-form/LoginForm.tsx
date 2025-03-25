import React, { useState, FormEvent, FC } from "react";
import { useUnit } from "effector-react";

import { loginUser } from "../../../app/store/userStore";

import "./login-form.style.css";

export const LoginForm: FC = () => {
  const login = useUnit(loginUser);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Авторизация</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Введите E-Mail"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Введите пароль"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Войти
        </button>
      </form>
    </div>
  );
};
