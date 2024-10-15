import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout';

interface Props {
  onLogin: () => void
}
const Register = ({ onLogin }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter()

  const handleRegister: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://fewvlearns-kimy.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
      });
      if (response.ok) {
        alert('Registration successful!');
        onLogin();
        router.push('/login');
      } else {
        alert('Error registering user');
      }
    } catch (error) {
      alert('Error registering user');
    }
  };

  return (
    <div className="flex items-center justify-center px-8 py-32">
      <form onSubmit={handleRegister} className="bg-[#001313] shadow-green-300 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-gray-100 mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-200 mb-2" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <button
          type="submit"
          className="w-full hover:bg-green-300 border border-green-300 text-white hover:text-gray-9 text-gray-80000 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

Register.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Register;