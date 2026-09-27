import {useEffect, useState} from 'react';

const UserSearch = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const fetchUsers = (query, signal) => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`, { signal })
      .then((response) => {
        if (response.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later.');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch users. Please try again.');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data.items);
        setLoading(false);
        setSearched(true);
      })
      .catch((error) => {
        // A newer search cancelled this one, so leave its state alone
        if (error.name === 'AbortError') return;
        if (error instanceof TypeError) {
          setError('Network error. Please check your internet connection.');
        } else {
          setError(error.message);
        }
        setUsers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!searchTerm) {
      setUsers([]);
      setError(null);
      setSearched(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      fetchUsers(searchTerm, controller.signal);
    }, 300);

    // Cancel both the pending timeout and any request still in flight
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchTerm]);

  return (
    <div>
      <h2>Github User Search</h2>
      <input 
        placeholder="Enter user name..."
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && searched && users.length === 0 && (
        <p>No users found.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <ul className="list">
          {users.map((user) => (
            <li key={user.id}>
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                width="50"
                height="50"
              />
              <span>{user.login}</span>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
    );
};

export default UserSearch;