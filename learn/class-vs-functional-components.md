# Class Components vs Functional Components dalam React

## Pendahuluan

Sejak awal React, pengembangan komponen bisa dilakukan dengan dua pendekatan utama: class components dan functional components. Seiring waktu, pendekatan functional components dengan React Hooks menjadi pilihan utama karena fleksibilitas dan kemudahan penggunaannya.

## Class Components

Class components adalah komponen React yang dibuat menggunakan sintaks JavaScript class. Ini adalah pendekatan awal dalam pembuatan komponen React.

### Struktur Dasar

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Welcome to React!'
    };
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  render() {
    return <h1>{this.state.message}</h1>;
  }
}
```

### Karakteristik Class Components

1. **Harus Extends dari Component**: Class harus extends dari React.Component
2. **State Management**: Menggunakan `this.state` dan `this.setState()` untuk manajemen state
3. **Lifecycle Methods**: Menggunakan metode seperti `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`
4. **this Binding**: Perlu bind event handlers atau menggunakan arrow function

### Lifecycle Methods pada Class Components

- `constructor()`: Diinisialisasi ketika komponen dibuat
- `componentDidMount()`: Dijalankan setelah komponen dirender pertama kali
- `componentDidUpdate()`: Dijalankan setelah pembaruan komponen
- `componentWillUnmount()`: Dijalankan sebelum komponen dihancurkan
- `shouldComponentUpdate()`: Menentukan apakah komponen harus dire-render ulang

## Functional Components

Functional components adalah fungsi JavaScript sederhana yang mengembalikan JSX. Sejak React 16.8, mereka bisa memiliki state dan lifecycle dengan bantuan Hooks.

### Struktur Dasar

```jsx
import React, { useState, useEffect } from 'react';

function Welcome() {
  const [message, setMessage] = useState('Welcome to React!');

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return <h1>{message}</h1>;
}
```

### Karakteristik Functional Components

1. **Fungsi Biasa**: Tidak perlu extends dari apapun
2. **Hooks**: Menggunakan React Hooks untuk manajemen state dan efek samping
3. **Lebih Ringkas**: Kode lebih ringkas dan mudah dibaca
4. **Mudah Testing**: Lebih mudah diuji karena merupakan fungsi biasa

## Perbandingan Detail

### 1. Manajemen State

**Class Component:**
```jsx
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}
```

**Functional Component:**
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### 2. Side Effects (Lifecycle)

**Class Component:**
```jsx
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  async componentDidMount() {
    const response = await fetch(`/api/users/${this.props.userId}`);
    const user = await response.json();
    this.setState({ user });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      // Update user data
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    // Cleanup resources
  }

  fetchUser = async () => {
    const response = await fetch(`/api/users/${this.props.userId}`);
    const user = await response.json();
    this.setState({ user });
  }

  render() {
    return <div>{this.state.user?.name}</div>;
  }
}
```

**Functional Component:**
```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    };

    fetchUser();
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

### 3. Context Consumer

**Class Component:**
```jsx
import React, { Component } from 'react';
import { ThemeContext } from './ThemeContext';

class ThemedButton extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    return <button style={{ background: theme.background }}>Themed Button</button>;
  }
}
```

**Functional Component:**
```jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button style={{ background: theme.background }}>Themed Button</button>;
}
```

## Kelebihan dan Kekurangan

### Class Components

**Kelebihan:**
- Sudah lama digunakan, banyak dokumentasi
- Cocok untuk komponen kompleks dengan banyak state
- Lebih familiar bagi developer OOP

**Kekurangan:**
- Sintaks lebih kompleks
- Harus memahami `this` binding
- Tidak bisa menggunakan Hooks

### Functional Components

**Kelebihan:**
- Sintaks lebih sederhana
- Mudah dipahami dan ditest
- Dukungan penuh terhadap Hooks
- Performa lebih baik dalam banyak kasus
- Mudah untuk optimasi (memoization)

**Kekurangan:**
- Butuh pemahaman tentang closure dalam JavaScript
- Sedikit lebih rumit untuk beberapa pola desain klasik

## Kesimpulan

Functional components dengan React Hooks adalah pendekatan modern dan disarankan dalam pengembangan React saat ini. Meskipun class components masih didukung, functional components menawarkan cara yang lebih elegan dan efisien untuk membangun aplikasi React.

Untuk pengembangan baru, sangat disarankan menggunakan functional components karena:
1. Lebih ringkas dan mudah dibaca
2. Lebih mudah diuji
3. Dukungan komunitas yang lebih besar
4. Fitur terbaru React fokus pada Hooks