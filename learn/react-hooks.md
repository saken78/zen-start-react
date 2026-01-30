# React Hooks: Panduan Lengkap

## Pendahuluan

React Hooks adalah fitur yang diperkenalkan di React 16.8 yang memungkinkan Anda menggunakan state dan fitur-fitur React lainnya tanpa menulis class component. Hooks memungkinkan Anda "mengaitkan" ke fitur-fitur React dari functional component.

## Alasan Mengapa Hooks Ada

Sebelum Hooks:
- Anda harus memilih antara functional dan class component
- Class component sulit dipahami karena `this` binding, lifecycle methods, dan kompleksitas dalam penanganan state

Dengan Hooks:
- Anda bisa menggunakan state dalam functional component
- Lebih mudah berbagi logika antar komponen
- Lebih mudah mengatur kompleksitas daripada render props dan higher-order components

## Hooks Dasar

### 1. useState

`useState` adalah Hook yang memungkinkan Anda menambahkan state ke functional component.

```tsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

**Catatan penting:**
- `useState` menerima nilai awal sebagai argumen
- Mengembalikan pasangan: nilai state saat ini dan fungsi untuk memperbarui nilai
- Penamaan: `[state, setState]` adalah konvensi

### 2. useEffect

`useEffect` memungkinkan Anda melakukan side effects dalam functional component. Ini menggantikan lifecycle methods seperti `componentDidMount`, `componentDidUpdate`, dan `componentWillUnmount`.

```tsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Side effect: fetch user data
    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    }

    fetchUser();
  }, [userId]); // Dependency array

  return (
    <div>
      {user ? <h1>{user.name}</h1> : <p>Loading...</p>}
    </div>
  );
}
```

**Jenis-jenis useEffect:**

1. **Tanpa dependency array** - berjalan setelah setiap render:
```tsx
useEffect(() => {
  // Runs after every render
});
```

2. **Dengan dependency array kosong** - berjalan sekali setelah mount:
```tsx
useEffect(() => {
  // Runs once after initial render
}, []);
```

3. **Dengan dependency array berisi variabel** - berjalan saat dependency berubah:
```tsx
useEffect(() => {
  // Runs when userId changes
}, [userId]);
```

### 3. useRef

`useRef` mengembalikan objek ref yang dapat digunakan untuk menyimpan nilai yang dapat berubah namun tidak menyebabkan re-render saat diubah.

```tsx
import React, { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

## Hooks Tambahan

### 4. useContext

`useContext` memungkinkan Anda mengakses React Context tanpa membuat wrapper component.

```tsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext<string>('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return <button style={{ backgroundColor: theme === 'dark' ? 'black' : 'white' }}>
    Toggle Theme
  </button>;
}
```

### 5. useReducer

`useReducer` adalah alternatif untuk `useState` yang cocok untuk state yang kompleks dengan logika yang kompleks.

```tsx
import React, { useReducer } from 'react';

interface State {
  count: number;
}

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET', payload: 0 })}>Reset</button>
    </div>
  );
}
```

## Hooks Optimisasi

### 6. useMemo

`useMemo` digunakan untuk meng-cache perhitungan yang mahal.

```tsx
import React, { useState, useMemo } from 'react';

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState('');

  // Fungsi yang mahal secara komputasi
  const expensiveValue = useMemo(() => {
    console.log('Calculating...');
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  }, [count]); // Re-calculate only when count changes

  return (
    <div>
      <p>Expensive calculation result: {expensiveValue}</p>
      <p>Count: {count}</p>
      <p>Other state: {otherState}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setOtherState('updated')}>Update other</button>
    </div>
  );
}
```

### 7. useCallback

`useCallback` digunakan untuk meng-cache fungsi, berguna saat passing fungsi ke komponen anak.

```tsx
import React, { useState, useCallback } from 'react';

interface ChildComponentProps {
  onClick: () => void;
}

const ChildComponent: React.FC<ChildComponentProps> = React.memo(({ onClick }) => {
  console.log('Child component rendered');
  return <button onClick={onClick}>Click me</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Tanpa useCallback, fungsi ini akan dibuat ulang setiap render
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // Dependencies for the callback

  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onClick={handleClick} />
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
    </div>
  );
}
```

## Custom Hooks

Custom Hooks adalah fungsi JavaScript yang nama fungsinya diawali dengan "use" dan memanggil Hook lainnya. Ini memungkinkan Anda membagi logika stateful antar komponen.

### Contoh Custom Hook: useCounter

```tsx
import { useState, useCallback } from 'react';

// Custom hook untuk counter
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

// Menggunakan custom hook
function Counter() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Contoh Custom Hook: useApi

```tsx
import { useState, useEffect } from 'react';

// Custom hook untuk mengambil data dari API
function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Menggunakan custom hook
function UserList() {
  const { data: users, loading, error } = useApi<User[]>('/api/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Aturan Hooks

1. **Hanya panggil Hooks di tingkat atas**: Jangan panggil Hooks di dalam loop, kondisi, atau fungsi bersarang.
2. **Hanya panggil Hooks dari functional component**: Jangan memanggil Hooks dari fungsi biasa JavaScript biasa. Panggil dari React functional component atau custom Hooks.

## Best Practices dengan Hooks

1. **Gunakan banyak hooks kecil daripada satu hook besar**
2. **Gunakan dependency array secara tepat**
3. **Gunakan useCallback untuk mencegah render ulang tidak perlu**
4. **Gunakan useMemo untuk meng-cache hasil perhitungan mahal**
5. **Buat custom hooks untuk berbagi logika stateful**

## Kesimpulan

React Hooks memberikan cara yang lebih elegan dan fungsional untuk menggunakan state dan lifecycle di React functional components. Dengan memahami dan menerapkan Hooks secara tepat, Anda dapat membuat komponen yang lebih bersih, reusable, dan mudah dipelihara.