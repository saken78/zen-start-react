# TypeScript Dasar untuk Pengembangan React

## Apa itu TypeScript?

TypeScript adalah superset dari JavaScript yang menambahkan sistem tipedata statis. Ini dikembangkan oleh Microsoft dan dirancang untuk membantu pengembang membangun aplikasi yang skalabel dan mudah dipelihara.

## Keuntungan Menggunakan TypeScript

1. **Deteksi Kesalahan Lebih Awal**: Kesalahan tipe data dapat dideteksi pada tahap kompilasi
2. **Pengembangan yang Lebih Aman**: Fitur autocompletion dan navigasi kode yang lebih baik
3. **Skalabilitas**: Mempermudah pengelolaan kode dalam proyek besar
4. **Dokumentasi Kode**: Tipe data bertindak sebagai dokumentasi alami

## Tipe Data Dasar

### Primitive Types
- `number` - untuk angka (integer dan float)
- `string` - untuk teks
- `boolean` - untuk nilai true/false
- `undefined` - untuk nilai yang belum diinisialisasi
- `null` - untuk nilai null
- `symbol` - untuk simbol unik
- `bigint` - untuk angka besar

```typescript
let age: number = 25;
let name: string = "John Doe";
let isActive: boolean = true;
```

### Array Types
```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["apple", "banana", "orange"];

// Atau menggunakan generic
let numbers2: Array<number> = [1, 2, 3, 4, 5];
```

### Tuple Types
Tuple memungkinkan Anda untuk menyatakan array dengan panjang tetap dan tipe data tertentu untuk setiap posisi.

```typescript
let person: [string, number] = ["John", 30]; // [nama, umur]
```

### Enum Types
Enum adalah cara untuk memberi nama pada serangkaian konstanta numerik.

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// Atau dengan nilai kustom
enum Status {Pending = "PENDING", Success = "SUCCESS", Error = "ERROR"}
let status: Status = Status.Pending;
```

### Any Type
Gunakan `any` ketika Anda tidak tahu tipe data yang tepat atau saat migrasi dari JavaScript.

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, pasti boolean
```

### Void Type
Biasanya digunakan untuk fungsi yang tidak mengembalikan nilai.

```typescript
function warnUser(): void {
    console.log("This is my warning message");
}
```

### Null dan Undefined
Secara default, `null` dan `undefined` dapat diassign ke tipe data apapun.

```typescript
let u: undefined = undefined;
let n: null = null;
```

## Interface dan Type Aliases

### Interface
Interface digunakan untuk mendeskripsikan bentuk objek.

```typescript
interface User {
    name: string;
    age: number;
    email?: string; // properti opsional
}

function greetUser(user: User) {
    console.log(`Hello, ${user.name}`);
}
```

### Type Alias
Type alias adalah alternatif untuk interface.

```typescript
type Point = {
    x: number;
    y: number;
};

type ID = string | number; // union type
```

## Union Types
Union types memungkinkan sebuah variabel memiliki lebih dari satu tipe.

```typescript
function printId(id: number | string) {
    console.log(`ID: ${id}`);
}
```

## Generics
Generics memungkinkan Anda membuat komponen yang dapat bekerja dengan berbagai tipe data.

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString"); // T akan menjadi string
let output2 = identity<number>(100); // T akan menjadi number
```

## Classes
TypeScript mendukung paradigma pemrograman berbasis objek.

```typescript
class Student {
    fullName: string;
    
    constructor(
        public firstName: string,
        public middleInitial: string,
        public lastName: string
    ) {
        this.fullName = `${firstName} ${middleInitial} ${lastName}`;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return `Hello, ${person.firstName} ${person.lastName}`;
}

let user = new Student("Jane", "M.", "User");
console.log(greeter(user));
```

## Modules
TypeScript mendukung sistem modul ES6.

```typescript
// math.ts
export function add(x: number, y: number): number {
    return x + y;
}

export interface CalcResult {
    result: number;
    operation: string;
}

// main.ts
import { add } from './math';

console.log(add(2, 3)); // 5
```

## Kesimpulan
TypeScript menawarkan keamanan tipe data yang tidak tersedia di JavaScript biasa, membuat kode lebih dapat diprediksi dan lebih mudah dipelihara. Penerapan TypeScript dalam pengembangan React sangat dianjurkan untuk proyek yang skalabel.