# Biome Configuration Guide - Zen Start React

Dokumentasi lengkap untuk Biome configuration di project ini.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Struktur Konfigurasi](#struktur-konfigurasi)
3. [Rule Groups](#rule-groups)
4. [Suppressing Rules](#suppressing-rules)
5. [Assist Actions](#assist-actions)
6. [Overrides per File Type](#overrides-per-file-type)
7. [Commands](#commands)
8. [Best Practices](#best-practices)

---

## Overview

Biome adalah formatter dan linter yang cepat untuk JavaScript, TypeScript, JSON, CSS, dan HTML. Configuration ini dirancang untuk:

- ✅ **Production-ready**: Menangkap bugs dan security issues
- 🎨 **Code Quality**: Enforce consistent coding standards
- ⚡ **Performance**: Optimasi dan efficiency checks
- ♿ **Accessibility**: WCAG compliance untuk HTML/JSX
- 🔒 **Security**: Detect potential vulnerabilities

---

## Struktur Konfigurasi

### 1. **Files Configuration**

```json
"files": {
  "includes": ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", ...],
  "excludes": ["node_modules/**", "dist/**", "build/**", ...]
}
```

- **includes**: File patterns yang akan diproses
- **excludes**: File patterns yang akan diabaikan
- **ignoreUnknown**: Jangan error untuk file unknown formats
- **maxSize**: Maximum file size (default: 1MB)

### 2. **VCS Integration**

```json
"vcs": {
  "enabled": true,
  "clientKind": "git",
  "useIgnoreFile": true,
  "defaultBranch": "main"
}
```

Mengintegrasikan dengan Git untuk:
- Respek `.gitignore`
- Lint hanya changed files
- Track default branch

### 3. **Formatter Configuration**

Global formatting settings:
- `indentStyle`: `"space"` (2 spaces)
- `lineWidth`: `100` characters
- `lineEnding`: `"lf"` (Unix style)
- `bracketSpacing`: `true` (add spaces in objects)

### 4. **Language-Specific Settings**

#### JavaScript/TypeScript

```json
"javascript": {
  "formatter": {
    "quoteStyle": "single",       // Use 'string' not "string"
    "trailingCommas": "all",      // Add trailing commas everywhere
    "semicolons": "always",       // Always add semicolons
    "arrowParentheses": "always"  // (x) => not x =>
  },
  "globals": [...]  // Browser & Node APIs
}
```

#### JSON

```json
"json": {
  "parser": {
    "allowComments": true,        // // comments in JSON
    "allowTrailingCommas": true   // Trailing commas
  }
}
```

#### CSS

```json
"css": {
  "parser": {
    "cssModules": false,
    "tailwindDirectives": true,   // Support @apply, @theme, etc.
    "cssCustomProperties": true
  }
}
```

---

## Rule Groups

Biome memiliki 8 rule groups. Setiap group bisa dikonfigurasi dengan severity:
- `"on"` - Gunakan default severity
- `"off"` - Disable rule
- `"error"` - Threat sebagai error
- `"warn"` - Threat sebagai warning
- `"info"` - Threat sebagai info

### 1. **a11y (Accessibility)**

Rules untuk accessibility standards:

```
✓ noAriaHiddenOnFocusable     - ARIA hidden tidak boleh di focusable elements
✓ noAriaRole                   - Gunakan ARIA roles yang valid saja
✓ noAutofocus                  - Hindari autofocus attribute
✓ noImplicitButtonType         - <button> harus punya explicit type
```

**Status**: `"recommended": true, "error"`

### 2. **complexity (Code Complexity)**

Deteksi dan simplify complex code:

```
✓ noExcessiveComplexity        - Max complexity: 20
✓ noForEach                    - Gunakan for-of/map instead of forEach
✓ noParameterAssign            - Jangan assign ke parameters
✓ useSimplifiedLogicExpression - Simplify logic (a || a → a)
```

**Status**: Mostly `"error"`, `noForEach: "off"`

### 3. **correctness (Bug Prevention)**

Fundamental correctness:

```
✓ noConstAssign                 - Jangan assign ke const
✓ noUnreachable                 - Detect unreachable code
✓ noUnusedVariables             - Flag unused variables
✓ useExhaustiveDependencies     - React deps array completeness
✓ useExhaustiveSwitch           - Switch must have default case
```

**Status**: All `"error"`

### 4. **nursery (Experimental Rules)**

New rules still in development:

```
⚠️  noDoneCallback               - Jest callback → promise/async
⚠️  noSkippedTests              - Flag skipped tests (.only, .skip)
⚠️  noExplicitAny               - TypeScript: avoid any (warn)
```

**Status**: `"recommended": true` (but may be unstable)

### 5. **performance (Optimization)**

Performance best practices:

```
✓ noAccumulatingSpread          - Don't spread in loops
✓ noDelete                       - Use undefined instead of delete
✓ noBarrelFile                   - Avoid barrel exports (off by default)
```

**Status**: Mostly `"error"`

### 6. **security (Security Issues)**

Potential security vulnerabilities:

```
✓ noDangerouslySetInnerHtml     - React: warn on innerHTML
✓ noDangerouslySetInnerHtmlWithChildren - Children + innerHTML (error)
✓ noGlobalEval                   - No eval() usage
```

**Status**: All `"error"` or `"warn"`

### 7. **style (Code Style)**

Consistent code style:

```
✓ useConst                      - Prefer const over let
✓ useFragmentSyntax             - Use <></> instead of <Fragment>
✓ useSelfClosingElements        - <MyComponent /> not <MyComponent>
✓ useShorthandArrayType         - Type[] not Array<Type>
✓ noVar                         - No var, use let/const
```

**Status**: Most `"error"`, some `"off"`

### 8. **suspicious (Potentially Wrong Code)**

Likely bugs:

```
✓ noDebugger                    - Remove debugger statements
✓ noConsoleLog                  - Warn on console.log (off in tests)
✓ noDoubleEquals                - Use === not ==
✓ noDuplicateObjectKeys         - Detect duplicate object keys
✓ noFallthroughSwitchClause     - Add break in switch
```

**Status**: Most `"error"`, `noConsoleLog: "warn"`

---

## Suppressing Rules

### Syntax

Gunakan comment khusus untuk suppress rules:

```javascript
// biome-ignore <category>/<rule>: <reason>
```

### 1. **Inline Suppression** (Single Line)

Suppress untuk baris berikutnya saja:

```javascript
// biome-ignore lint/suspicious/noDebugger: temporary debugging
debugger; // ✅ Suppressed

debugger; // ❌ Will error
```

### 2. **Top-level Suppression** (Whole File)

Suppress untuk seluruh file:

```javascript
// biome-ignore-all lint/suspicious/noConsoleLog: monitoring script

console.log('App started');  // ✅ Suppressed
console.log('Data loaded');  // ✅ Suppressed
```

### 3. **Range Suppression** (Block)

Suppress untuk range tertentu:

```javascript
// biome-ignore-start lint/suspicious/noDebugger
debugger;        // ✅ Suppressed
debugger;        // ✅ Suppressed
// biome-ignore-end lint/suspicious/noDebugger

debugger;        // ❌ Will error
```

### 4. **Multiple Rules**

Suppress multiple rules sekaligus:

```javascript
// biome-ignore lint/suspicious/noDebugger: temp
// biome-ignore lint/suspicious/noConsoleLog: logging
debugger;
console.log('test');
```

### Common Suppressions Examples

#### React Component dengan console.log

```typescript
// biome-ignore lint/suspicious/noConsoleLog: debugging performance
useEffect(() => {
  console.log('Component mounted');
}, []);
```

#### Testing dengan debugger

```typescript
// biome-ignore lint/suspicious/noDebugger: debugging test failure
it('should handle error', () => {
  debugger;
  expect(fn()).toThrow();
});
```

#### Temporary bypass untuk dangerous HTML

```typescript
// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized by DOMPurify
return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
```

#### Multiple suppressions in range

```typescript
// biome-ignore-start lint/correctness/noUnusedVariables
// biome-ignore-start lint/suspicious/noConsoleLog
function tempDebugFunction() {
  const tempVar = 'unused';
  console.log('temp debug');
}
// biome-ignore-end lint/correctness/noUnusedVariables
// biome-ignore-end lint/suspicious/noConsoleLog
```

---

## Assist Actions

Automatic code improvements yang bisa diterapkan dengan `biome format --assist`:

### Available Actions

#### 1. **organizeImports**

Automatically sort dan organize imports:

**Before**:
```javascript
import { Button } from './button';
import { useState } from 'react';
import { Card } from './card';
import type { Props } from './types';
```

**After**:
```javascript
import { useState } from 'react';
import type { Props } from './types';
import { Button } from './button';
import { Card } from './card';
```

**Usage**:
```bash
npx biome format --assist src/
```

#### 2. **fixOrganizeImports**

Apply organized imports automatically.

#### 3. **useSortedAttributes** (off)

Sort JSX attributes alphabetically:
```javascript
// Before
<Component z={1} a={2} m={3} />

// After
<Component a={2} m={3} z={1} />
```

Currently **disabled** in config.

#### 4. **useSortedKeys** (off)

Sort object keys:
```javascript
// Before
{ z: 1, a: 2, m: 3 }

// After
{ a: 2, m: 3, z: 1 }
```

Currently **disabled** in config.

---

## Overrides per File Type

Config memiliki special rules untuk different file patterns:

### 1. **Config Files**

```json
"includes": ["**/*.config.{js,ts}", "**/vite.config.*", "**/next.config.*"]
```

- Gunakan double quotes
- `noDefaultExport: "off"` (config files harus export default)

### 2. **Test Files**

```json
"includes": ["**/*.test.*", "**/*.spec.*", "**/test/**", "**/__tests__/**"]
```

Rules yang di-relax untuk testing:
- `noConsoleLog: "off"` - Console allowed in tests
- `noDebugger: "off"` - Debugging allowed
- `noUnusedVariables: "off"` - Test utilities might seem unused
- `noExcessiveComplexity: "off"` - Complex test scenarios OK

### 3. **Type Definition Files (.d.ts)**

```json
"includes": ["**/*.d.ts"]
```

Relax rules untuk type defs:
- `noVar: "off"` - Allow var in d.ts
- `noNamespace: "off"` - Namespaces allowed
- `noEmptyInterface: "off"` - Empty interfaces OK
- `noExplicitAny: "off"` - Any type allowed

### 4. **Component Files**

```json
"includes": ["src/components/**/*.{js,jsx,ts,tsx}"]
```

Strict rules untuk components:
- `useExhaustiveDependencies: "error"` - React deps must be complete

### 5. **Hooks Files**

```json
"includes": ["src/hooks/**/*.{js,jsx,ts,tsx}"]
```

- `useExhaustiveDependencies: "error"`
- `noUnusedVariables: "warn"` (more lenient than components)

### 6. **Utility/Helper Files**

```json
"includes": ["src/utils/**", "src/lib/**", "src/helpers/**"]
```

- `noDefaultExport: "error"` - Named exports only for utilities

---

## Commands

### Format Code

```bash
# Format dengan biome
npx @biomejs/biome format .

# Format dengan assist actions
npx @biomejs/biome format --assist .

# Format specific file
npx @biomejs/biome format src/App.tsx

# Check without changes
npx @biomejs/biome format --check src/
```

### Lint Code

```bash
# Run linter
npx @biomejs/biome lint .

# Lint dengan safe fixes applied
npx @biomejs/biome lint --write .

# Lint dengan unsafe fixes (requires review)
npx @biomejs/biome lint --write --unsafe .

# Check specific rule
npx @biomejs/biome lint --only=style/useConst .
```

### Check Configuration

```bash
# Validate biome.json
npx @biomejs/biome check --config-path biome.json

# Show all linter rules
npx @biomejs/biome lint --explain=lint/correctness/noUnusedVariables
```

---

## Best Practices

### 1. **Suppression Best Practices**

✅ **DO**:
- Selalu sertakan alasan mengapa rule di-suppress
- Gunakan inline suppression untuk kasus isolasi
- Review suppressions secara berkala
- Gunakan range suppressions untuk related code blocks

❌ **DON'T**:
- Suppress rules tanpa alasan
- Suppress dengan `// biome-ignore-all` di top-level kecuali sangat perlu
- Suppress generic categories - suppress rules spesifik

### 2. **Configuration Philosophy**

- **Strict di Production**: Error severity untuk bugs
- **Lenient di Tests**: Allow debugging tools, console logs
- **Flexible di Config Files**: Allow non-standard patterns
- **Role-based**: Different rules untuk different file types

### 3. **Workflow Integration**

```bash
# Sebelum commit
npm run lint:check    # Check all files
npm run lint:write    # Auto-fix issues

# Pre-commit hook
npm run biome:check   # In husky pre-commit

# CI/CD Pipeline
npm run biome:ci      # Strict checking
```

### 4. **Team Guidelines**

1. **Code Review Focus**:
   - Review suppressions dalam PR
   - Tanyakan alasan suppression
   - Encourage removing suppressions

2. **Incremental Adoption**:
   - Enable rules gradually
   - Fix warnings sebelum errors
   - Communicate rule changes

3. **Documentation**:
   - Document custom suppressions
   - Keep team aligned dengan config
   - Regular sync on linter changes

---

## Troubleshooting

### Rule tidak berfungsi?

Cek:
1. Rule enabled di group config
2. File matches includes pattern
3. Tidak di-disable di overrides
4. Supported untuk file type

### Too many errors?

```bash
# Run only warnings (not errors)
npx @biomejs/biome lint --only=style/ .

# Run specific group
npx @biomejs/biome lint --only=complexity/ .
```

### Performance slow?

```bash
# Check large files
npx @biomejs/biome lint . --stats

# Exclude large folders
# Update "excludes" in biome.json
```

### Conflict dengan tool lain?

- Disable Prettier (Biome handles formatting)
- Disable ESLint (Biome handles linting)
- Migrate slowly, rule by rule

---

## Resources

- [Biome Documentation](https://biomejs.dev)
- [Linter Rules](https://biomejs.dev/linter/)
- [Formatter Guide](https://biomejs.dev/formatter/)
- [Configuration Reference](https://biomejs.dev/reference/configuration/)

---

Generated: 2026-01-30
