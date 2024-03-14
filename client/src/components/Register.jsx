import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) =>
      axios.post('/api/users/register', data).then((res) => res.data),
    onSuccess: (data) => {
      // console.log(data);
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] });

      localStorage.setItem('note_token', JSON.stringify(data.token));

      navigate('/');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      username,
      email,
      password,
    });
  };

  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
            Register
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-lg rounded-lg border"
          >
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Username
                </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
              </div>

              {mutation.isError ? (
                <div className="p-2 rounded border border-red-400 bg-red-200">
                  {mutation.error.response.data.msg || mutation.error.message}{' '}
                </div>
              ) : null}

              <button
                disabled={mutation.isPending}
                type="submit"
                className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
              >
                {mutation.isPending ? 'Registering...' : 'Register'}
              </button>
            </div>

            <div className="flex items-center justify-center bg-gray-100 p-4">
              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
