# Konversi dari Class Component ke Functional Component

## Pendahuluan

Dalam tutorial ini, kita akan mengambil contoh dari komponen Clock yang saat ini menggunakan class component dan mengkonversinya ke functional component dengan React Hooks. Ini akan memberikan pemahaman praktis tentang perbedaan pendekatan dan bagaimana menerapkan konsep yang telah kita pelajari.

## Contoh Asli: Class Component

Mari kita lihat kembali komponen Clock yang telah Anda miliki di proyek:

```tsx
import { Component } from "react";

export class Clock extends Component {
  refs = {
    clock: ".clock-time",
    icon: ".clock-cion",
  };

  constructor() {
    super();
  }
}
```

Komponen ini belum lengkap, jadi kita akan membuat implementasi yang lebih realistis sebelum mengkonversinya. Berikut adalah versi lengkap dari class component Clock:

```tsx
import React, { Component } from 'react';

interface ClockState {
  time: Date;
}

class Clock extends Component<{}, ClockState> {
  private timerID: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }

  tick = () => {
    this.setState({
      time: new Date()
    });
  }

  render() {
    return (
      <div className="clock-container">
        <span className="clock-time">{this.state.time.toLocaleTimeString()}</span>
      </div>
    );
  }
}

export default Clock;
```

## Langkah 1: Identifikasi Bagian-Bagian Penting

Sebelum mengkonversi, identifikasi bagian-bagian penting dari class component:

1. **State**: `time` yang menyimpan objek Date
2. **Lifecycle Methods**: 
   - `componentDidMount` untuk memulai interval
   - `componentWillUnmount` untuk membersihkan interval
3. **Method**: `tick` untuk memperbarui waktu
4. **Render**: JSX untuk menampilkan waktu

## Langkah 2: Konversi ke Functional Component

Sekarang mari kita konversi ke functional component:

```tsx
import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timerID);
    };
  }, []); // Empty dependency array means this effect runs once after mount

  return (
    <div className="clock-container">
      <span className="clock-time">{time.toLocaleTimeString()}</span>
    </div>
  );
};

export default Clock;
```

## Perbandingan Langkah demi Langkah

### 1. Import Statement
**Class Component:**
```tsx
import React, { Component } from 'react';
```

**Functional Component:**
```tsx
import React, { useState, useEffect } from 'react';
```

### 2. Deklarasi Komponen
**Class Component:**
```tsx
class Clock extends Component<{}, ClockState> {
  // ...
}
```

**Functional Component:**
```tsx
const Clock: React.FC = () => {
  // ...
};
```

### 3. State Management
**Class Component:**
```tsx
// Di constructor
this.state = {
  time: new Date()
};

// Untuk update
this.setState({
  time: new Date()
});
```

**Functional Component:**
```tsx
const [time, setTime] = useState<Date>(new Date());

// Untuk update
setTime(new Date());
```

### 4. Lifecycle Management
**Class Component:**
```tsx
componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}

componentWillUnmount() {
  if (this.timerID) {
    clearInterval(this.timerID);
  }
}

tick = () => {
  this.setState({
    time: new Date()
  });
}
```

**Functional Component:**
```tsx
useEffect(() => {
  const timerID = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => {
    clearInterval(timerID);
  };
}, []);
```

## Studi Kasus: Konversi Lebih Kompleks

Mari kita lihat contoh yang lebih kompleks dengan props dan state yang lebih banyak:

### Class Component:
```tsx
import React, { Component } from 'react';

interface TimerProps {
  initialTime: number;
  onTimerEnd: () => void;
}

interface TimerState {
  seconds: number;
  isRunning: boolean;
}

class Timer extends Component<TimerProps, TimerState> {
  private timerID: NodeJS.Timeout | null = null;

  constructor(props: TimerProps) {
    super(props);
    this.state = {
      seconds: props.initialTime,
      isRunning: false
    };
  }

  componentDidMount() {
    if (this.state.isRunning) {
      this.startTimer();
    }
  }

  componentDidUpdate(prevProps: TimerProps, prevState: TimerState) {
    if (prevState.seconds !== 0 && this.state.seconds === 0) {
      this.props.onTimerEnd();
    }
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

  startTimer = () => {
    this.setState({ isRunning: true });
    
    this.timerID = setInterval(() => {
      this.setState(prevState => {
        if (prevState.seconds > 0) {
          return { seconds: prevState.seconds - 1 };
        } else {
          this.stopTimer();
          return { seconds: 0, isRunning: false };
        }
      });
    }, 1000);
  }

  stopTimer = () => {
    this.setState({ isRunning: false });
    if (this.timerID) {
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }

  resetTimer = () => {
    this.stopTimer();
    this.setState({ seconds: this.props.initialTime });
  }

  render() {
    return (
      <div>
        <h2>Time Left: {this.state.seconds}s</h2>
        <button onClick={this.startTimer} disabled={this.state.isRunning}>
          Start
        </button>
        <button onClick={this.stopTimer} disabled={!this.state.isRunning}>
          Stop
        </button>
        <button onClick={this.resetTimer}>
          Reset
        </button>
      </div>
    );
  }
}
```

### Functional Component:
```tsx
import React, { useState, useEffect, useCallback } from 'react';

interface TimerProps {
  initialTime: number;
  onTimerEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimerEnd }) => {
  const [seconds, setSeconds] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (seconds === 0 && isRunning) {
      stopTimer();
      onTimerEnd();
    }
  }, [seconds, isRunning, stopTimer, onTimerEnd]);

  useEffect(() => {
    let timerID: NodeJS.Timeout | null = null;

    if (isRunning) {
      timerID = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            stopTimer();
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      if (timerID) {
        clearInterval(timerID);
      }
    };
  }, [isRunning, stopTimer]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(initialTime);
  };

  return (
    <div>
      <h2>Time Left: {seconds}s</h2>
      <button onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
};
```

## Tips untuk Konversi

### 1. Gunakan `useCallback` untuk fungsi handler
Jika Anda memiliki fungsi yang dilewatkan ke komponen anak, gunakan `useCallback` untuk mencegah render ulang yang tidak perlu:

```tsx
const handleClick = useCallback(() => {
  // Handler logic
}, [dependency]);
```

### 2. Gunakan `useMemo` untuk perhitungan yang mahal
Untuk perhitungan yang mahal, gunakan `useMemo`:

```tsx
const expensiveValue = useMemo(() => {
  // Perhitungan mahal
  return result;
}, [dependency]);
```

### 3. Urutan Hooks
Pastikan untuk selalu memanggil Hooks dalam urutan yang sama di setiap render. Jangan letakkan Hooks dalam kondisi atau loop.

### 4. Dependency Arrays
Selalu pertimbangkan dependency array dalam `useEffect`, `useCallback`, dan `useMemo`. Tanpa dependency array, effect akan dijalankan setiap render.

## Kesimpulan

Konversi dari class component ke functional component melibatkan:

1. Mengganti `this.state` dengan `useState`
2. Mengganti lifecycle methods dengan `useEffect`
3. Mengganti method-class dengan fungsi biasa
4. Mengganti `this.setState` dengan setter dari `useState`

Functional component dengan Hooks memberikan pendekatan yang lebih ringkas dan fungsional untuk mengelola state dan lifecycle dalam React.