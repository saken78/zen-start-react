# Best Practices dalam Pengembangan React dengan TypeScript

## Pendahuluan

Menggabungkan React dengan TypeScript memberikan kekuatan tambahan berupa type safety yang membantu mencegah banyak kesalahan umum dalam pengembangan aplikasi. Artikel ini akan membahas praktik terbaik untuk mengembangkan aplikasi React dengan TypeScript.

## 1. Definisi Tipe Props

### Gunakan Interface daripada Type Alias untuk Props

Interface lebih fleksibel karena dapat diperluas dan digabungkan:

```tsx
// ✅ Baik: Gunakan interface untuk props
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  isActive: boolean;
  onClick: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, isActive, onClick }) => {
  return (
    <div className={`user-card ${isActive ? 'active' : ''}`}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onClick(user.id)}>Select</button>
    </div>
  );
};
```

### Gunakan Partial untuk Props Opsional

Ketika membuat komponen dengan banyak prop opsional:

```tsx
interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

// Gunakan Partial untuk membuat semua prop opsional
const defaultProps: Partial<FormFieldProps> = {
  required: false,
  placeholder: ''
};

const FormField: React.FC<FormFieldProps> = (props) => {
  const { label, value, onChange, placeholder = '', error, required = false } = props;
  // ...
};
```

## 2. Tipe untuk Event Handlers

Definisikan tipe yang tepat untuk event handlers:

```tsx
interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

// Untuk input handlers
const Input: React.FC = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Proses value
  };

  return <input onChange={handleChange} />;
};
```

## 3. Penggunaan Generics dalam Components

Gunakan generics untuk membuat komponen yang fleksibel:

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Penggunaan
const users = [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }];
<List 
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>;
```

## 4. Penggunaan React.FC dengan Bijak

Beberapa pengembang menyarankan untuk tidak selalu menggunakan React.FC:

```tsx
// ✅ Cara yang direkomendasikan
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};

// ❌ Kurang ideal - tidak menambahkan nilai signifikan
const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
```

React.FC menambahkan tipe implisit untuk `children` dan `propTypes`, yang tidak selalu diinginkan.

## 5. Tipe Return dari Hooks

Definisikan tipe return secara eksplisit untuk hooks khususnya custom hooks:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
}

// Custom hook dengan tipe return yang jelas
function useUser(userId: string): {
  user: User | null;
  loading: boolean;
  error: string | null;
} {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading, error };
}
```

## 6. Type Assertion dan Type Guards

Gunakan type assertion dan type guards secara hati-hati:

```tsx
// ✅ Type guard
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

const processData = (data: unknown) => {
  if (isString(data)) {
    // Sekarang TypeScript tahu data adalah string
    return data.toUpperCase();
  }
  return '';
};

// ✅ Type assertion saat diperlukan
const element = document.getElementById('my-element') as HTMLElement;
```

## 7. Penggunaan Utility Types

Manfaatkan utility types dari TypeScript:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
}

// Gunakan Pick untuk subset dari interface
interface UserSummary {
  name: string;
  email: string;
}

// Atau gunakan Pick langsung
type UserSummary2 = Pick<User, 'name' | 'email'>;

// Gunakan Omit untuk menghilangkan beberapa field
type CreateUserPayload = Omit<User, 'id' | 'createdAt'>;

// Gunakan Partial untuk membuat semua field opsional
type UserUpdatePayload = Partial<User>;

// Gunakan Required untuk membuat semua field wajib
type MandatoryUser = Required<Pick<User, 'name' | 'email'>>;
```

## 8. Error Boundaries

Gunakan error boundaries untuk menangani kesalahan di dalam komponen React:

```tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong: {this.state.error?.message}</h1>;
    }

    return this.props.children;
  }
}
```

## 9. Pengelolaan State dengan useReducer

Untuk state yang kompleks, gunakan useReducer:

```tsx
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: { id: string; text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'SET_FILTER'; payload: 'ALL' | 'ACTIVE' | 'COMPLETED' };

interface TodoState {
  todos: Todo[];
  filter: 'ALL' | 'ACTIVE' | 'COMPLETED';
}

const initialTodoState: TodoState = {
  todos: [],
  filter: 'ALL'
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: action.payload.id, text: action.payload.text, completed: false }
        ]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

const TodoApp: React.FC = () => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  return (
    <div>
      {/* Implementasi komponen */}
    </div>
  );
};
```

## 10. Penggunaan Strict Mode dan Linting

Aktifkan strict mode di TypeScript dan gunakan ESLint dengan konfigurasi yang tepat:

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 11. Pattern untuk Conditional Rendering

Gunakan pattern yang aman untuk conditional rendering:

```tsx
// ✅ Baik: Gunakan operator ternary atau logical &&
const MyComponent: React.FC<{ user: User | null }> = ({ user }) => {
  return (
    <div>
      {user ? <h1>Welcome, {user.name}</h1> : <p>Please log in</p>}
      {user?.email && <p>Email: {user.email}</p>}
    </div>
  );
};

// ✅ Baik: Gunakan function helper untuk conditional rendering kompleks
const renderContent = (user: User | null) => {
  if (!user) return <p>Please log in</p>;
  if (!user.isActive) return <p>Your account is inactive</p>;
  return <h1>Welcome, {user.name}</h1>;
};

const MyComponent: React.FC<{ user: User | null }> = ({ user }) => {
  return <div>{renderContent(user)}</div>;
};
```

## 12. Testing dengan TypeScript

Gunakan testing library dengan dukungan TypeScript:

```tsx
// Contoh dengan React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button component', () => {
  it('renders correctly with children', () => {
    render(<Button onClick={jest.fn()}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
```

## Kesimpulan

Menggabungkan React dengan TypeScript memberikan banyak manfaat dalam hal keamanan tipe dan pengalaman pengembangan. Dengan mengikuti best practices ini, Anda dapat membuat aplikasi yang lebih robust, maintainable, dan scalable. Kuncinya adalah konsistensi dalam penerapan tipe dan pendekatan pengembangan yang baik.