import { useState } from 'react';
import { Input, Button, Form } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(import.meta.env.VITE_AGORA_TOKEN_SERVER + '/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.error || 'Signup failed');
        return;
      }

      setSuccessMsg('Signup successful. Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setErrorMsg('Something went wrong.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Form onSubmit={handleSignup}>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Join Nano Portfolio Dashboard</h1>

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
          {successMsg && <p className="text-sm text-green-500">{successMsg}</p>}

          <Button type="submit" color="primary" fullWidth>
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
