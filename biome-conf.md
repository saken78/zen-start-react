Allows to pass a path to a JSON schema file.

We publish a JSON schema file for our `biome.json`/`biome.jsonc` files.

You can specify a relative path to the schema inside the `@biomejs/biome` NPM package if it is installed in the `node_modules` folder:

```
{  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json"}
```

If you have problems with resolving the physical file, you can use the one published on this site:

```
{  "$schema": "https://biomejs.dev/schemas/2.3.11/schema.json"}
```

A list of paths to other Biome configuration files. Biome resolves and applies the configuration settings from the files contained in the `extends` list, and eventually applies the options contained in this `biome.json`/`biome.jsonc` file.

The order of paths to extend goes from least relevant to most relevant.

Since v2, this option accepts a string that must match the value `"//"`, which can be used when setting up [monorepos](https://biomejs.dev/guides/big-projects#monorepo)

Whether this configuration should be treated as a root. By default, any configuration file is considered a root by default. When a configuration file is a “nested configuration”, it must set `"root": false`, otherwise an error is thrown.

This is required so Biome can orchestrate multiple files in CLI and editors at the same time.

> Default: `true`

A list of [glob patterns](https://biomejs.dev/reference/configuration/#glob-syntax-reference) of files to process.

If a folder matches a glob pattern, all files inside that folder will be processed.

The following example matches all files with a `.js` extension inside the `src` folder:

```
{  "files": {    "includes": ["src/**/*.js"]  }}
```

`*` is used to match _all files in a folder_, while `**` _recursively_ matches all files and subfolders in a folder. For more information on globs, see the [glob syntax reference](https://biomejs.dev/reference/configuration/#glob-syntax-reference)

`includes` also supports negated patterns, or exceptions. These are patterns that start with `!` and they can be used to instruct Biome to process all files _except_ those matching the negated pattern. When using a negated pattern, you should always specify `**` first to match all files and folders, otherwise the negated pattern will not match any files.

Note that exceptions are processed in order, allowing you to specify exceptions to exceptions.

Consider the following example:

```
{  "files": {    "includes": ["**", "!**/*.test.js", "**/special.test.js", "!test"]  }}
```

This example specifies that:

1.  All files inside all (sub)folders are processed, thanks to the `**` pattern…
2.  … _except_ when those files have a `.test.js` extension…
3.  … but the file `special.test.ts` _is_ still processed…
4.  … _except_ when it occurs in the folder named `test`, because _no_ files inside that folder are processed.

This means that:

-   `src/app.js` **is** processed.
-   `src/app.test.js` **is not** processed.
-   `src/special.test.js` **is** processed.
-   `test/special.test.js` **is not** processed.

Note that files inside `node_modules/` are ignored regardless of the `files.includes` setting.

#### Interaction with the scanner

[Section titled “Interaction with the scanner”](https://biomejs.dev/reference/configuration/#interaction-with-the-scanner)

Biome has a [scanner](https://biomejs.dev/internals/architecture/#scanner) that is responsible for discovering nested configuration files as well as `.gitignore` files. It can also index source files if one or more rules from the [project domain](https://biomejs.dev/linter/domains/#project) are enabled.

The scanner respects both `files.includes` and the ignored patterns from `.gitignore` files, but there are two exceptions to be aware of:

-   Special files such as `biome.json` and `.gitignore` take priority over any ignored patterns in `files.includes`.
-   If any rule from the project domain is enabled, the scanner will index source files _including their dependencies_. This means that files that are ignored as part of `files.includes` may still get indexed by the scanner, as long as there is another included file that imports those files. And this also means that `.d.ts` files and `package.json` manifests inside `node_modules/` may still get indexed too.

If you want to explicitly force some files to be ignored by the scanner, you can do so using a so-called _force-ignore pattern_. A force-ignore pattern looks like a regular negated pattern, but starts with a double exclamation mark (`!!`).

For example, you can tell Biome to never look inside any `dist/` folder using the following configuration:

```
{  "files": {    "includes": ["**", "!!**/dist"]  }}
```

We recommend using the force-ignore syntax for any folders that contain _output_ files, such as `build/` and `dist/`. For such folders, it is highly unlikely that indexing has any useful benefits. For folders containing generated files, we advise using regular ignore patterns so that type information can still be extracted from the files.

For nested `biome.json` files as well as `.gitignore` files that you wish to explicitly ignore, the force-ignore syntax must also be used.

### `files.ignoreUnknown`

[Section titled “files.ignoreUnknown”](https://biomejs.dev/reference/configuration/#filesignoreunknown)

If `true`, Biome won’t emit diagnostics if it encounters files that it can’t handle.

```
{  "files": {    "ignoreUnknown": true  }}
```

> Default: `false`

The maximum allowed size for source code files in bytes. Files above this limit will be ignored for performance reasons.

> Default: `1048576` (1024\*1024, 1MB)

### `files.experimentalScannerIgnores`

[Section titled “files.experimentalScannerIgnores”](https://biomejs.dev/reference/configuration/#filesexperimentalscannerignores)

An array of literal path segments that the scanner should ignore during the crawling. The ignored files won’t be indexed, which means that these files won’t be part of the module graph, and types won’t be inferred from them.

Set of properties to integrate Biome with a VCS (Version Control Software).

Whether Biome should integrate itself with the VCS client

> Default: `false`

The kind of client.

Values:

-   `"git"`

### `vcs.useIgnoreFile`

[Section titled “vcs.useIgnoreFile”](https://biomejs.dev/reference/configuration/#vcsuseignorefile)

Whether Biome should use the project’s VCS ignore files. When `true`, Biome will ignore the files specified in the VCS ignore files as well as those specified in `.ignore` files.

This feature supports nested ignore files too.

The root ignore file yields the same semantics as the root [`files.includes`](https://biomejs.dev/reference/configuration#filesincludes).

The folder where Biome should check for VCS files. By default, Biome will use the same folder where `biome.json` was found.

If Biome can’t find the configuration, it will attempt to use the current working directory. If no current working directory can’t be found, Biome won’t use the VCS integration, and a diagnostic will be emitted

### `vcs.defaultBranch`

[Section titled “vcs.defaultBranch”](https://biomejs.dev/reference/configuration/#vcsdefaultbranch)

The main branch of the project. Biome will use this branch when evaluating the changed files.

Enables Biome’s linter.

> Default: `true`

A list of [glob patterns](https://biomejs.dev/reference/configuration/#glob-syntax-reference) of files to lint.

The following example lints all files with a `.js` extension inside the `src` folder:

```
{  "linter": {    "includes": ["src/**/*.js"]  }}
```

`*` is used to match _all files in a folder_, while `**` _recursively_ matches all files and subfolders in a folder. For more information on globs, see the [glob syntax reference](https://biomejs.dev/reference/configuration/#glob-syntax-reference)

`includes` also supports negated patterns, or exceptions. These are patterns that start with `!` and they can be used to instruct Biome to process all files _except_ those matching the negated pattern.

Note that exceptions are processed in order, allowing you to specify exceptions to exceptions.

Consider the following example:

```
{  "linter": {    "includes": ["**", "!**/*.test.js", "**/special.test.js"]  }}
```

This example specifies that:

1.  All files inside all (sub)folders are linted, thanks to the `**` pattern…
2.  … _except_ when those files have a `.test.js` extension…
3.  … but the file `special.test.ts` _is_ still linted.

This means that:

-   `src/app.js` **is** linted.
-   `src/app.test.js` **is not** linted.
-   `src/special.test.js` \*_is_ linted.

Note that `linter.includes` is applied _after_ `files.includes`. This means that any file that is not matched by `files.includes` can no longer be matched `linter.includes`. This means the following example **doesn’t work**:

```
{  "files": {    "includes": "src/**"  },  "linter": {    // This matches nothing because there is no overlap with `files.includes`:    "includes": "scripts/**"  }}
```

If `linter.includes` is not specified, all files matched by [`files.includes`](https://biomejs.dev/reference/configuration/#filesincludes) are linted.

### `linter.rules.recommended`

[Section titled “linter.rules.recommended”](https://biomejs.dev/reference/configuration/#linterrulesrecommended)

Enables the recommended rules for all groups.

> Default: `true`

### `linter.rules.[group]`

[Section titled “linter.rules.\[group\]”](https://biomejs.dev/reference/configuration/#linterrulesgroup)

Options that influence the rules of a single group. Biome supports the following groups:

-   accessibility: Rules focused on preventing accessibility problems.
-   complexity: Rules that focus on inspecting complex code that could be simplified.
-   correctness: Rules that detect code that is guaranteed to be incorrect or useless.
-   nursery: New rules that are still under development. Nursery rules require explicit opt-in via configuration on stable versions because they may still have bugs or performance problems (even if they are marked as recommended). They are enabled by default on nightly builds, but as they are unstable their diagnostic severity may be set to either error or warning, depending on whether we intend for the rule to be recommended or not when it eventually gets stabilized. Nursery rules get promoted to other groups once they become stable or may be removed. Rules that belong to this group are not subject to semantic version.
-   performance: Rules catching ways your code could be written to run faster, or generally be more efficient.
-   security: Rules that detect potential security flaws.
-   style: Rules enforcing a consistent and idiomatic way of writing your code.
-   suspicious: Rules that detect code that is likely to be incorrect or useless.

Each group can accept, as a value, a string that represents the severity or an object where each rule can be configured.

When passing the severity, you can control the severity emitted by all the rules that belong to a group. For example, you can configure the `a11y` group to emit information diagnostics:

```
{  "linter": {    "rules": {      "a11y": "info"    }  }}
```

Here are the accepted values:

-   `"on"`: each rule that belongs to the group will emit a diagnostic with the default severity of the rule. Refer to the documentation of the rule, or use the `explain` command:
-   `"off"`: none of the rules that belong to the group will emit any diagnostics.
-   `"info"`: all rules that belong to the group will emit a [diagnostic with information severity](https://biomejs.dev/reference/diagnostics#information).
-   `"warn"`: all rules that belong to the group will emit a [diagnostic with warning severity](https://biomejs.dev/reference/diagnostics#warning).
-   `"error"`: all rules that belong to the group will emit a [diagnostic with error severity](https://biomejs.dev/reference/diagnostics#error).

### `linter.rules.[group].recommended`

[Section titled “linter.rules.\[group\].recommended”](https://biomejs.dev/reference/configuration/#linterrulesgrouprecommended)

Enables the recommended rules for a single group.

Example:

```
{  "linter": {    "enabled": true,    "rules": {      "nursery": {        "recommended": true      }    }  }}
```

Enables Biome’s assist.

> Default: `true`

A list of [glob patterns](https://biomejs.dev/reference/configuration/#glob-syntax-reference) of files to lint.

The following example analyzes all files with a `.js` extension inside the `src` folder:

```
{  "assist": {    "includes": ["src/**/*.js"]  }}
```

`*` is used to match _all files in a folder_, while `**` _recursively_ matches all files and subfolders in a folder. For more information on globs, see the [glob syntax reference](https://biomejs.dev/reference/configuration/#glob-syntax-reference)

`includes` also supports negated patterns, or exceptions. These are patterns that start with `!` and they can be used to instruct Biome to process all files _except_ those matching the negated pattern.

Note that exceptions are processed in order, allowing you to specify exceptions to exceptions.

Consider the following example:

```
{  "assist": {    "includes": ["**", "!**/*.test.js", "**/special.test.js"]  }}
```

This example specifies that:

1.  All files inside all (sub)folders are analyzed, thanks to the `**` pattern…
2.  … _except_ when those files have a `.test.js` extension…
3.  … but the file `special.test.ts` _is_ still analyzed.

This means that:

-   `src/app.js` **is** analysed.
-   `src/app.test.js` **is not** analyzed.
-   `src/special.test.js` \*_is_ analyzed.

Note that `assist.includes` is applied _after_ `files.includes`. This means that any file that is not matched by `files.includes` can no longer be matched `assist.includes`. This means the following example **doesn’t work**:

```
{  "files": {    "includes": "src/**"  },  "assist": {    // This matches nothing because there is no overlap with `files.includes`:    "includes": "scripts/**"  }}
```

If `assist.includes` is not specified, all files matched by [`files.includes`](https://biomejs.dev/reference/configuration/#filesincludes) are linted.

### `assist.actions.recommended`

[Section titled “assist.actions.recommended”](https://biomejs.dev/reference/configuration/#assistactionsrecommended)

Enables the recommended actions for all groups.

### `assist.actions.[group]`

[Section titled “assist.actions.\[group\]”](https://biomejs.dev/reference/configuration/#assistactionsgroup)

Options that influence the rules of a single group. Biome supports the following groups:

-   source: This group represents those actions that can be safely applied to a document upon saving. These actions are all generally safe, they typically don’t change the functionality of the program.

### `assist.actions.[group].recommended`

[Section titled “assist.actions.\[group\].recommended”](https://biomejs.dev/reference/configuration/#assistactionsgrouprecommended)

Enables the recommended rules for a single group.

Example:

```
{  "assist": {    "enabled": true,    "actions": {      "source": {        "recommended": true      }    }  }}
```

These options apply to all languages. There are additional language-specific formatting options below.

### `formatter.enabled`

[Section titled “formatter.enabled”](https://biomejs.dev/reference/configuration/#formatterenabled)

Enables Biome’s formatter.

> Default: `true`

### `formatter.includes`

[Section titled “formatter.includes”](https://biomejs.dev/reference/configuration/#formatterincludes)

A list of [glob patterns](https://biomejs.dev/reference/configuration/#glob-syntax-reference) of files to format.

The following example formats all files with a `.js` extension inside the `src` folder:

```
{  "formatter": {    "includes": ["src/**/*.js"]  }}
```

`*` is used to match _all files in a folder_, while `**` _recursively_ matches all files and subfolders in a folder. For more information on globs, see the [glob syntax reference](https://biomejs.dev/reference/configuration/#glob-syntax-reference)

`includes` also supports negated patterns, or exceptions. These are patterns that start with `!` and they can be used to instruct Biome to process all files _except_ those matching the negated pattern.

Note that exceptions are processed in order, allowing you to specify exceptions to exceptions.

Consider the following example:

```
{  "formatter": {    "includes": ["**", "!**/*.test.js", "**/special.test.js"]  }}
```

This example specifies that:

1.  All files inside all (sub)folders are formatted, thanks to the `**` pattern…
2.  … _except_ when those files have a `.test.js` extension…
3.  … but the file `special.test.ts` _is_ still formatted.

This means that:

-   `src/app.js` **is** formatted.
-   `src/app.test.js` **is not** formatted.
-   `src/special.test.js` **is** formatted.

Note that `formatter.includes` is applied _after_ `files.includes`. This means that any file that is not matched by `files.includes` can no longer be matched `formatter.includes`. This means the following example **doesn’t work**:

```
{  "files": {    "includes": "src/**"  },  "formatter": {    // This matches nothing because there is no overlap with `files.includes`:    "includes": "scripts/**"  }}
```

If `formatter.includes` is not specified, all files matched by [`files.includes`](https://biomejs.dev/reference/configuration/#filesincludes) are formatted.

### `formatter.formatWithErrors`

[Section titled “formatter.formatWithErrors”](https://biomejs.dev/reference/configuration/#formatterformatwitherrors)

Allows to format a document that has syntax errors.

```
{  "formatter": {    "formatWithErrors": true  }}
```

> Default: `false`

### `formatter.indentStyle`

[Section titled “formatter.indentStyle”](https://biomejs.dev/reference/configuration/#formatterindentstyle)

The style of the indentation. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `formatter.indentWidth`

[Section titled “formatter.indentWidth”](https://biomejs.dev/reference/configuration/#formatterindentwidth)

How big the indentation should be.

> Default: `2`

### `formatter.lineEnding`

[Section titled “formatter.lineEnding”](https://biomejs.dev/reference/configuration/#formatterlineending)

The type of line ending.

-   `"lf"`, Line Feed only (`\n`), common on Linux and macOS as well as inside git repos;
-   `"crlf"`, Carriage Return + Line Feed characters (`\r\n`), common on Windows;
-   `"cr"`, Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `formatter.lineWidth`

[Section titled “formatter.lineWidth”](https://biomejs.dev/reference/configuration/#formatterlinewidth)

The amount of characters that can be written on a single line..

> Default: `80`

### `formatter.attributePosition`

[Section titled “formatter.attributePosition”](https://biomejs.dev/reference/configuration/#formatterattributeposition)

The attribute position style in HTMLish languages.

-   `"auto"`, the attributes are automatically formatted, and they will collapse in multiple lines only when they hit certain criteria;
-   `"multiline"`, the attributes will collapse in multiple lines if more than 1 attribute is used.

> Default: `"auto"`

### `formatter.bracketSpacing`

[Section titled “formatter.bracketSpacing”](https://biomejs.dev/reference/configuration/#formatterbracketspacing)

Choose whether spaces should be added between brackets and inner values.

> Default: `true`

Whether to expand arrays and objects on multiple lines.

-   `"auto"`, object literals are formatted on multiple lines if the first property has a newline, and array literals are formatted on a single line if it fits in the line.
-   `"always"`, these literals are formatted on multiple lines, regardless of length of the list.
-   `"never"`, these literals are formatted on a single line if it fits in the line.

When formatting `package.json`, Biome will use `always` unless configured otherwise.

> Default: `"auto"`

### `formatter.useEditorconfig`

[Section titled “formatter.useEditorconfig”](https://biomejs.dev/reference/configuration/#formatteruseeditorconfig)

Whether Biome should use the `.editorconfig` file to determine the formatting options.

The config files `.editorconfig` and `biome.json` will follow the following rules:

-   Formatting settings in `biome.json` always take precedence over `.editorconfig` files.
-   `.editorconfig` files that exist higher up in the hierarchy than a `biome.json` file are already ignored. This is to avoid loading formatting settings from someone’s home directory into a project with a `biome.json` file.
-   Nested `.editorconfig` files aren’t supported currently.

> Default: `false`

These options apply only to JavaScript (and TypeScript) files.

### `javascript.parser.unsafeParameterDecoratorsEnabled`

[Section titled “javascript.parser.unsafeParameterDecoratorsEnabled”](https://biomejs.dev/reference/configuration/#javascriptparserunsafeparameterdecoratorsenabled)

Allows to support the unsafe/experimental parameter decorators.

```
{  "javascript": {    "parser": {      "unsafeParameterDecoratorsEnabled": true    }  }}
```

> Default: `false`

### `javascript.parser.jsxEverywhere`

[Section titled “javascript.parser.jsxEverywhere”](https://biomejs.dev/reference/configuration/#javascriptparserjsxeverywhere)

When set to `true`, allows to parse JSX syntax inside `.js` files. When set to `false`, Biome will raise diagnostics when it encounters JSX syntax inside `.js` files.

> Default: `true`

```
{  "javascript": {    "parser": {      "jsxEverywhere": false    }  }}
```

### `javascript.formatter.quoteStyle`

[Section titled “javascript.formatter.quoteStyle”](https://biomejs.dev/reference/configuration/#javascriptformatterquotestyle)

The type of quote used when representing string literals. It can be `"single"` or `"double"`.

> Default: `"double"`

```
{  "javascript": {    "formatter": {      "quoteStyle": "single"    }  }}
```

### `javascript.formatter.jsxQuoteStyle`

[Section titled “javascript.formatter.jsxQuoteStyle”](https://biomejs.dev/reference/configuration/#javascriptformatterjsxquotestyle)

The type of quote used when representing jsx string literals. It can be `"single"` or `"double"`.

> Default: `"double"`

```
{  "javascript": {    "formatter": {      "jsxQuoteStyle": "single"    }  }}
```

### `javascript.formatter.quoteProperties`

[Section titled “javascript.formatter.quoteProperties”](https://biomejs.dev/reference/configuration/#javascriptformatterquoteproperties)

When properties inside objects should be quoted. It can be `"asNeeded"` or `"preserve"`.

> Default: `"asNeeded"`

```
{  "javascript": {    "formatter": {      "quoteProperties": "preserve"    }  }}
```

### `javascript.formatter.trailingCommas`

[Section titled “javascript.formatter.trailingCommas”](https://biomejs.dev/reference/configuration/#javascriptformattertrailingcommas)

Print trailing commas wherever possible in multi-line comma-separated syntactic structures. Possible values:

-   `"all"`, the trailing comma is always added;
-   `"es5"`, the trailing comma is added only in places where it’s supported by older version of JavaScript;
-   `"none"`, trailing commas are never added.

> Default: `"all"`

### `javascript.formatter.semicolons`

[Section titled “javascript.formatter.semicolons”](https://biomejs.dev/reference/configuration/#javascriptformattersemicolons)

It configures where the formatter prints semicolons:

-   `"always"`, the semicolons is always added at the end of each statement;
-   `"asNeeded"`, the semicolons are added only in places where it’s needed, to protect from [ASI](https://en.wikibooks.org/wiki/JavaScript/Automatic_semicolon_insertion).

> Default: `"always"`

Example:

```
{  "javascript": {    "formatter": {      "semicolons": "asNeeded"    }  }}
```

### `javascript.formatter.arrowParentheses`

[Section titled “javascript.formatter.arrowParentheses”](https://biomejs.dev/reference/configuration/#javascriptformatterarrowparentheses)

Whether to add non-necessary parentheses to arrow functions:

-   `"always"`, the parentheses are always added;
-   `"asNeeded"`, the parentheses are added only when they are needed.

> Default: `"always"`

### `javascript.formatter.enabled`

[Section titled “javascript.formatter.enabled”](https://biomejs.dev/reference/configuration/#javascriptformatterenabled)

Enables Biome’s formatter for JavaScript (and its super languages) files.

> Default: `true`

### `javascript.formatter.indentStyle`

[Section titled “javascript.formatter.indentStyle”](https://biomejs.dev/reference/configuration/#javascriptformatterindentstyle)

The style of the indentation for JavaScript (and its super languages) files. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `javascript.formatter.indentWidth`

[Section titled “javascript.formatter.indentWidth”](https://biomejs.dev/reference/configuration/#javascriptformatterindentwidth)

How big the indentation should be for JavaScript (and its super languages) files.

> Default: `2`

### `javascript.formatter.lineEnding`

[Section titled “javascript.formatter.lineEnding”](https://biomejs.dev/reference/configuration/#javascriptformatterlineending)

The type of line ending for JavaScript (and its super languages) files.

-   `"lf"`, Line Feed only (`\n`), common on Linux and macOS as well as inside git repos;
-   `"crlf"`, Carriage Return + Line Feed characters (`\r\n`), common on Windows;
-   `"cr"`, Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `javascript.formatter.lineWidth`

[Section titled “javascript.formatter.lineWidth”](https://biomejs.dev/reference/configuration/#javascriptformatterlinewidth)

The amount of characters that can be written on a single line in JavaScript (and its super languages) files.

> Default: `80`

### `javascript.formatter.bracketSameLine`

[Section titled “javascript.formatter.bracketSameLine”](https://biomejs.dev/reference/configuration/#javascriptformatterbracketsameline)

Choose whether the ending `>` of a multi-line JSX element should be on the last attribute line or not

> Default: `false`

### `javascript.formatter.bracketSpacing`

[Section titled “javascript.formatter.bracketSpacing”](https://biomejs.dev/reference/configuration/#javascriptformatterbracketspacing)

Choose whether spaces should be added between brackets and inner values.

> Default: `true`

### `javascript.formatter.attributePosition`

[Section titled “javascript.formatter.attributePosition”](https://biomejs.dev/reference/configuration/#javascriptformatterattributeposition)

The attribute position style in jsx elements.

-   `"auto"`, do not enforce single attribute per line.
-   `"multiline"`, enforce single attribute per line.

> Default: `"auto"`

### `javascript.formatter.expand`

[Section titled “javascript.formatter.expand”](https://biomejs.dev/reference/configuration/#javascriptformatterexpand)

Whether to expand arrays and objects on multiple lines.

-   `"auto"`, object literals are formatted on multiple lines if the first property has a newline, and array literals are formatted on a single line if it fits in the line.
-   `"always"`, these literals are formatted on multiple lines, regardless of length of the list.
-   `"never"`, these literals are formatted on a single line if it fits in the line.

> Default: `"auto"`

### `javascript.formatter.operatorLinebreak`

[Section titled “javascript.formatter.operatorLinebreak”](https://biomejs.dev/reference/configuration/#javascriptformatteroperatorlinebreak)

When breaking binary expressions into multiple lines, whether to break them before or after the binary operator.

> Default: `"after"`.

-   `"after`: the operator is placed after the expression:
    
    ```
    if (  expressionOne &&  expressionTwo &&  expressionThree &&  expressionFour) {}
    ```
    
-   `"before`: the operator is placed before the expression:
    
    ```
    if (  expressionOne  && expressionTwo  && expressionThree  && expressionFour) {}
    ```
    

### `javascript.globals`

[Section titled “javascript.globals”](https://biomejs.dev/reference/configuration/#javascriptglobals)

A list of global names that Biome should ignore (analyzer, linter, etc.)

```
{  "javascript": {    "globals": ["$", "_", "externalVariable"]  }}
```

### `javascript.jsxRuntime`

[Section titled “javascript.jsxRuntime”](https://biomejs.dev/reference/configuration/#javascriptjsxruntime)

Indicates the type of runtime or transformation used for interpreting JSX.

-   `"transparent"` — Indicates a modern or native JSX environment, that doesn’t require special handling by Biome.
-   `"reactClassic"` — Indicates a classic React environment that requires the `React` import. Corresponds to the `react` value for the `jsx` option in TypeScript’s [`tsconfig.json`](https://www.typescriptlang.org/tsconfig#jsx).

```
{  "javascript": {    "jsxRuntime": "reactClassic"  }}
```

For more information about the old vs. new JSX runtime, please see: [https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html](https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)

> Default: `"transparent"`

### `javascript.linter.enabled`

[Section titled “javascript.linter.enabled”](https://biomejs.dev/reference/configuration/#javascriptlinterenabled)

Enables Biome’s linter for JavaScript (and its super languages) files.

> Default: `true`

```
{  "javascript": {    "linter": {      "enabled": false    }  }}
```

### `javascript.assist.enabled`

[Section titled “javascript.assist.enabled”](https://biomejs.dev/reference/configuration/#javascriptassistenabled)

Enables Biome’s assist for JavaScript (and its super languages) files.

> Default: `true`

```
{  "javascript": {    "assist": {      "enabled": false    }  }}
```

Options applied to the JSON files.

Enables the parsing of comments in JSON files.

```
{  "json": {    "parser": {      "allowComments": true    }  }}
```

### `json.parser.allowTrailingCommas`

[Section titled “json.parser.allowTrailingCommas”](https://biomejs.dev/reference/configuration/#jsonparserallowtrailingcommas)

Enables the parsing of trailing commas in JSON files.

```
{  "json": {    "parser": {      "allowTrailingCommas": true    }  }}
```

### `json.formatter.enabled`

[Section titled “json.formatter.enabled”](https://biomejs.dev/reference/configuration/#jsonformatterenabled)

Enables Biome’s formatter for JSON (and its super languages) files.

> Default: `true`

```
{  "json": {    "formatter": {      "enabled": false    }  }}
```

### `json.formatter.indentStyle`

[Section titled “json.formatter.indentStyle”](https://biomejs.dev/reference/configuration/#jsonformatterindentstyle)

The style of the indentation for JSON (and its super languages) files. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `json.formatter.indentWidth`

[Section titled “json.formatter.indentWidth”](https://biomejs.dev/reference/configuration/#jsonformatterindentwidth)

How big the indentation should be for JSON (and its super languages) files.

> Default: `2`

### `json.formatter.lineEnding`

[Section titled “json.formatter.lineEnding”](https://biomejs.dev/reference/configuration/#jsonformatterlineending)

The type of line ending for JSON (and its super languages) files.

-   `"lf"`, Line Feed only (`\n`), common on Linux and macOS as well as inside git repos;
-   `"crlf"`, Carriage Return + Line Feed characters (`\r\n`), common on Windows;
-   `"cr"`, Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `json.formatter.lineWidth`

[Section titled “json.formatter.lineWidth”](https://biomejs.dev/reference/configuration/#jsonformatterlinewidth)

The amount of characters that can be written on a single line in JSON (and its super languages) files.

> Default: `80`

### `json.formatter.trailingCommas`

[Section titled “json.formatter.trailingCommas”](https://biomejs.dev/reference/configuration/#jsonformattertrailingcommas)

Print trailing commas wherever possible in multi-line comma-separated syntactic structures.

Allowed values:

-   `"none"`: the trailing comma is removed;
-   `"all"`: the trailing comma is kept **and** preferred.

> Default: `"none"`

### `json.formatter.bracketSpacing`

[Section titled “json.formatter.bracketSpacing”](https://biomejs.dev/reference/configuration/#jsonformatterbracketspacing)

Choose whether spaces should be added between brackets and inner values.

> Default: `true`

### `json.formatter.expand`

[Section titled “json.formatter.expand”](https://biomejs.dev/reference/configuration/#jsonformatterexpand)

Whether to expand arrays and objects on multiple lines.

-   `"auto"`, object literals are formatted on multiple lines if the first property has a newline, and array literals are formatted on a single line if it fits in the line.
-   `"always"`, these literals are formatted on multiple lines, regardless of length of the list.
-   `"never"`, these literals are formatted on a single line if it fits in the line.

When formatting `package.json`, Biome will use `always` unless configured otherwise.

> Default: `"auto"`

### `json.linter.enabled`

[Section titled “json.linter.enabled”](https://biomejs.dev/reference/configuration/#jsonlinterenabled)

Enables Biome’s formatter for JSON (and its super languages) files.

> Default: `true`

```
{  "json": {    "linter": {      "enabled": false    }  }}
```

### `json.assist.enabled`

[Section titled “json.assist.enabled”](https://biomejs.dev/reference/configuration/#jsonassistenabled)

Enables Biome’s assist for JSON (and its super languages) files.

> Default: `true`

```
{  "json": {    "assist": {      "enabled": false    }  }}
```

Options applied to the CSS files.

### `css.parser.cssModules`

[Section titled “css.parser.cssModules”](https://biomejs.dev/reference/configuration/#cssparsercssmodules)

Enables parsing of [CSS modules](https://github.com/css-modules/css-modules)

> Default: `false`

### `css.parser.tailwindDirectives`

[Section titled “css.parser.tailwindDirectives”](https://biomejs.dev/reference/configuration/#cssparsertailwinddirectives)

Enables parsing of [Tailwind](https://tailwindcss.com/) specific syntax, like `@theme`, `@utility` and `@apply`.

> Default: `false`

### `css.formatter.enabled`

[Section titled “css.formatter.enabled”](https://biomejs.dev/reference/configuration/#cssformatterenabled)

Enables Biome’s formatter for CSS files.

> Default: `false`

```
{  "css": {    "formatter": {      "enabled": false    }  }}
```

### `css.formatter.indentStyle`

[Section titled “css.formatter.indentStyle”](https://biomejs.dev/reference/configuration/#cssformatterindentstyle)

The style of the indentation for CSS files. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `css.formatter.indentWidth`

[Section titled “css.formatter.indentWidth”](https://biomejs.dev/reference/configuration/#cssformatterindentwidth)

How big the indentation should be for CSS files.

> Default: `2`

```
{  "css": {    "formatter": {      "indentWidth": 2    }  }}
```

### `css.formatter.lineEnding`

[Section titled “css.formatter.lineEnding”](https://biomejs.dev/reference/configuration/#cssformatterlineending)

The type of line ending for CSS files.

-   `"lf"`, Line Feed only (`\n`), common on Linux and macOS as well as inside git repos;
-   `"crlf"`, Carriage Return + Line Feed characters (`\r\n`), common on Windows;
-   `"cr"`, Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `css.formatter.lineWidth`

[Section titled “css.formatter.lineWidth”](https://biomejs.dev/reference/configuration/#cssformatterlinewidth)

The amount of characters that can be written on a single line in CSS files.

> Default: `80`

### `css.formatter.quoteStyle`

[Section titled “css.formatter.quoteStyle”](https://biomejs.dev/reference/configuration/#cssformatterquotestyle)

The type of quote used when representing string literals. It can be `"single"` or `"double"`.

> Default: `"double"`

### `css.linter.enabled`

[Section titled “css.linter.enabled”](https://biomejs.dev/reference/configuration/#csslinterenabled)

Enables Biome’s linter for CSS files.

> Default: `true`

```
{  "css": {    "linter": {      "enabled": false    }  }}
```

### `css.assist.enabled`

[Section titled “css.assist.enabled”](https://biomejs.dev/reference/configuration/#cssassistenabled)

Enables Biome’s assist for CSS files.

> Default: `true`

```
{  "css": {    "assist": {      "enabled": false    }  }}
```

Options applied to the GraphQL files.

### `graphql.formatter.enabled`

[Section titled “graphql.formatter.enabled”](https://biomejs.dev/reference/configuration/#graphqlformatterenabled)

Enables Biome’s formatter for GraphQL files.

> Default: `false`

### `graphql.formatter.indentStyle`

[Section titled “graphql.formatter.indentStyle”](https://biomejs.dev/reference/configuration/#graphqlformatterindentstyle)

The style of the indentation for GraphQL files. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `graphql.formatter.indentWidth`

[Section titled “graphql.formatter.indentWidth”](https://biomejs.dev/reference/configuration/#graphqlformatterindentwidth)

How big the indentation should be for GraphQL files.

> Default: `2`

### `graphql.formatter.lineEnding`

[Section titled “graphql.formatter.lineEnding”](https://biomejs.dev/reference/configuration/#graphqlformatterlineending)

The type of line ending for GraphQL files.

-   `"lf"`, Line Feed only (`\n`), common on Linux and macOS as well as inside git repos;
-   `"crlf"`, Carriage Return + Line Feed characters (`\r\n`), common on Windows;
-   `"cr"`, Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `graphql.formatter.lineWidth`

[Section titled “graphql.formatter.lineWidth”](https://biomejs.dev/reference/configuration/#graphqlformatterlinewidth)

The amount of characters that can be written on a single line in GraphQL files.

> Default: `80`

### `graphql.formatter.quoteStyle`

[Section titled “graphql.formatter.quoteStyle”](https://biomejs.dev/reference/configuration/#graphqlformatterquotestyle)

The type of quote used when representing string literals. It can be `"single"` or `"double"`.

> Default: `"double"`

### `graphql.linter.enabled`

[Section titled “graphql.linter.enabled”](https://biomejs.dev/reference/configuration/#graphqllinterenabled)

Enables Biome’s linter for GraphQL files.

> Default: `true`

### `graphql.assist.enabled`

[Section titled “graphql.assist.enabled”](https://biomejs.dev/reference/configuration/#graphqlassistenabled)

Enables Biome’s assist for GraphQL files.

> Default: `true`

Options applied to the Grit files.

### `grit.formatter.enabled`

[Section titled “grit.formatter.enabled”](https://biomejs.dev/reference/configuration/#gritformatterenabled)

Enables Biome’s formatter for Grit files.

> Default: `false`

### `grit.formatter.indentStyle`

[Section titled “grit.formatter.indentStyle”](https://biomejs.dev/reference/configuration/#gritformatterindentstyle)

The style of the indentation for Grit files. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `grit.formatter.indentWidth`

[Section titled “grit.formatter.indentWidth”](https://biomejs.dev/reference/configuration/#gritformatterindentwidth)

How big the indentation should be for Grit files.

> Default: `2`

### `grit.formatter.lineEnding`

[Section titled “grit.formatter.lineEnding”](https://biomejs.dev/reference/configuration/#gritformatterlineending)

The type of line ending for Grit files.

-   `"lf"`, Line Feed only (`\n`), common on Linux and macOS as well as inside git repos;
-   `"crlf"`, Carriage Return + Line Feed characters (`\r\n`), common on Windows;
-   `"cr"`, Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `grit.formatter.lineWidth`

[Section titled “grit.formatter.lineWidth”](https://biomejs.dev/reference/configuration/#gritformatterlinewidth)

The amount of characters that can be written on a single line in Grit files.

> Default: `80`

### `grit.formatter.quoteStyle`

[Section titled “grit.formatter.quoteStyle”](https://biomejs.dev/reference/configuration/#gritformatterquotestyle)

The type of quote used when representing string literals. It can be `"single"` or `"double"`.

> Default: `"double"`

### `grit.linter.enabled`

[Section titled “grit.linter.enabled”](https://biomejs.dev/reference/configuration/#gritlinterenabled)

Enables Biome’s linter for Grit files.

> Default: `true`

```
{  "grit": {    "linter": {      "enabled": false    }  }}
```

### `grit.assist.enabled`

[Section titled “grit.assist.enabled”](https://biomejs.dev/reference/configuration/#gritassistenabled)

Enables Biome’s assist for Grit files.

> Default: `true`

```
{  "grit": {    "assist": {      "enabled": false    }  }}
```

### `html.experimentalFullSupportEnabled`

[Section titled “html.experimentalFullSupportEnabled”](https://biomejs.dev/reference/configuration/#htmlexperimentalfullsupportenabled)

When enabled, Biome enables full support for HTML-ish languages (Vue, Svelte, and Astro files). Parsing, formatting and linting of embedded languages inside these files are consistent.

When disabled, Biome will only extract the JavaScript/TypeScript parts of these files for analysis, while ignoring the rest of the content.

### `html.parser.interpolation`

[Section titled “html.parser.interpolation”](https://biomejs.dev/reference/configuration/#htmlparserinterpolation)

Enables the parsing of double text expressions such as `{{ expression }}` inside `.html` files.

> Default: `false`

### `html.formatter.enabled`

[Section titled “html.formatter.enabled”](https://biomejs.dev/reference/configuration/#htmlformatterenabled)

Enables Biome’s formatter for HTML files.

> Default: `false`

### `html.formatter.indentStyle`

[Section titled “html.formatter.indentStyle”](https://biomejs.dev/reference/configuration/#htmlformatterindentstyle)

The style of the indentation for HTML files. It can be `"tab"` or `"space"`.

> Default: `"tab"`

### `html.formatter.indentWidth`

[Section titled “html.formatter.indentWidth”](https://biomejs.dev/reference/configuration/#htmlformatterindentwidth)

How big the indentation should be for HTML files.

> Default: `2`

### `html.formatter.lineEnding`

[Section titled “html.formatter.lineEnding”](https://biomejs.dev/reference/configuration/#htmlformatterlineending)

The type of line ending for HTML files.

-   `"lf"`, Line Feed only (`\n`), common on Linux and macOS as well as inside git repos;
-   `"crlf"`, Carriage Return + Line Feed characters (`\r\n`), common on Windows;
-   `"cr"`, Carriage Return character only (`\r`), used very rarely.

> Default: `"lf"`

### `html.formatter.lineWidth`

[Section titled “html.formatter.lineWidth”](https://biomejs.dev/reference/configuration/#htmlformatterlinewidth)

The amount of characters that can be written on a single line in HTML files.

> Default: `80`

### `html.formatter.attributePosition`

[Section titled “html.formatter.attributePosition”](https://biomejs.dev/reference/configuration/#htmlformatterattributeposition)

The attribute position style in HTML elements.

-   `"auto"`, the attributes are automatically formatted, and they will collapse in multiple lines only when they hit certain criteria;
-   `"multiline"`, the attributes will collapse in multiple lines if more than 1 attribute is used.

> Default: `"auto"`

### `html.formatter.bracketSameLine`

[Section titled “html.formatter.bracketSameLine”](https://biomejs.dev/reference/configuration/#htmlformatterbracketsameline)

Whether to hug the closing bracket of multiline HTML tags to the end of the last line, rather than being alone on the following line.

> Default: `false`

### `html.formatter.whitespaceSensitivity`

[Section titled “html.formatter.whitespaceSensitivity”](https://biomejs.dev/reference/configuration/#htmlformatterwhitespacesensitivity)

Whether to account for whitespace sensitivity when formatting HTML (and its super languages).

> Default: “css”

-   `"css"`: The formatter considers whitespace significant for elements that have an “inline” display style by default in browser’s user agent style sheets.
    
-   `"strict"`: Leading and trailing whitespace in content is considered significant for all elements.
    
    The formatter should leave at least one whitespace character if whitespace is present. Otherwise, if there is no whitespace, it should not add any after `>` or before `<`. In other words, if there’s no whitespace, the text content should hug the tags.
    
    Example of text hugging the tags:
    
-   `"ignore"`: whitespace is considered insignificant. The formatter is free to remove or add whitespace as it sees fit.
    

### `html.formatter.indentScriptAndStyle`

[Section titled “html.formatter.indentScriptAndStyle”](https://biomejs.dev/reference/configuration/#htmlformatterindentscriptandstyle)

_Since 2.3: Only affects `.vue` and `.svelte` files_

Whether to indent the content of `<script>` and `<style>` tags for Vue and Svelte files. Currently, this does not apply to plain HTML files.

> Default: `false`

When true, the content of `<script>` and `<style>` tags will be indented by one level relative to the tags.

```
<script>import Bar from "./Bar.vue";  import Bar from "./Bar.vue";</script>
```

### `html.formatter.selfCloseVoidElements`

[Section titled “html.formatter.selfCloseVoidElements”](https://biomejs.dev/reference/configuration/#htmlformatterselfclosevoidelements)

Whether void elements should be self-closed. Defaults to never.

> Default: `"never"`

-   `"never"`: The slash `/` inside void elements is removed by the formatter.
-   `"always"`: The slash `/` inside void elements is always added.

### `html.linter.enabled`

[Section titled “html.linter.enabled”](https://biomejs.dev/reference/configuration/#htmllinterenabled)

Enables Biome’s linter for HTML files.

> Default: `true`

### `html.assist.enabled`

[Section titled “html.assist.enabled”](https://biomejs.dev/reference/configuration/#htmlassistenabled)

Enables Biome’s assist for HTML files.

> Default: `true`

A list of patterns.

Use this configuration to change the behaviour of the tools for certain files.

When a file is matched against an override pattern, the configuration specified in that pattern will be override the top-level configuration.

The order of the patterns matter. If a file _can_ match three patterns, only the first one is used.

### `overrides.<ITEM>.includes`

[Section titled “overrides.<ITEM>.includes”](https://biomejs.dev/reference/configuration/#overridesitemincludes)

A list of [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming)) of files for which to apply customised settings.

```
{  "overrides": [{    "includes": ["scripts/*.js"],    // settings that should only apply to the files specified in the includes field.  }]}
```

### `overrides.<ITEM>.formatter`

[Section titled “overrides.<ITEM>.formatter”](https://biomejs.dev/reference/configuration/#overridesitemformatter)

Includes the options of the [top level formatter](https://biomejs.dev/reference/configuration/#formatter) configuration, minus `ignore` and `include`.

For example, it’s possible to modify the formatter `lineWidth`, `indentStyle` for certain files that are included in the glob path `generated/**`:

```
{  "formatter": {    "lineWidth": 100  },  "overrides": [    {      "includes": ["generated/**"],      "formatter": {        "lineWidth": 160,        "indentStyle": "space"      }    }  ]}
```

### `overrides.<ITEM>.linter`

[Section titled “overrides.<ITEM>.linter”](https://biomejs.dev/reference/configuration/#overridesitemlinter)

Includes the options of the [top level linter](https://biomejs.dev/reference/configuration/#linter) configuration, minus `ignore` and `include`.

You can disable certain rules for certain glob paths, and disable the linter for other glob paths:

```
{  "linter": {    "enabled": true,    "rules": {      "recommended": true    }  },  "overrides": [    {      "includes": ["lib/**"],      "linter": {        "rules": {          "suspicious": {            "noDebugger": "off"          }        }      }    },    {      "includes": ["shims/**"],      "linter": {        "enabled": false      }    }  ]}
```

### `overrides.<ITEM>.javascript`

[Section titled “overrides.<ITEM>.javascript”](https://biomejs.dev/reference/configuration/#overridesitemjavascript)

Includes the options of the [top level javascript](https://biomejs.dev/reference/configuration/#javascript) configuration. Lets you override JavaScript-specific settings for certain files.

You can change the formatting behaviour of JavaScript files in certain folders:

```
{  "formatter": {    "lineWidth": 120  },  "javascript": {    "formatter": {      "quoteStyle": "single"    }  },  "overrides": [    {      "includes": ["lib/**"],      "javascript": {        "formatter": {          "quoteStyle": "double"        }      }    }  ]}
```

### `overrides.<ITEM>.json`

[Section titled “overrides.<ITEM>.json”](https://biomejs.dev/reference/configuration/#overridesitemjson)

Includes the options of the [top level json](https://biomejs.dev/reference/configuration/#json) configuration. Lets you override JSON-specific settings for certain files.

You can enable parsing features for certain JSON files:

```
{  "linter": {    "enabled": true,    "rules": {      "recommended": true    }  },  "overrides": [    {      "includes": [".vscode/**"],      "json": {        "parser": {          "allowComments": true,          "allowTrailingCommas": true        }      }    }  ]}
```

### `overrides.<ITEM>.[language]`

[Section titled “overrides.<ITEM>.\[language\]”](https://biomejs.dev/reference/configuration/#overridesitemlanguage)

Includes the options of the top level language configuration. Lets you override language-specific settings for certain files.

## Glob syntax reference

[Section titled “Glob syntax reference”](https://biomejs.dev/reference/configuration/#glob-syntax-reference)

Glob patterns are used to match paths of files and folders. Biome supports the following syntax in globs:

-   `*` matches zero or more characters. It cannot match the path separator `/`.
-   `**` recursively matches directories and files. This sequence must be used as an entire path component, so both `**a` and `b**` are invalid and will result in an error. A sequence of more than two consecutive `*` characters is also invalid.
-   `[...]` matches any character inside the brackets. Ranges of characters can also be specified, as ordered by Unicode, so e.g. `[0-9]` specifies any character between 0 and 9 inclusive.
-   `[!...]` is the negation of `[...]`, i.e. it matches any characters **not** in the brackets.
-   If the entire glob starts with `!`, it is a so-called negated pattern. This glob only matches if the path _doesn’t_ match the glob. Negated patterns cannot be used alone, they can only be used as _exception_ to a regular glob.
-   When determining whether a file is included or not, Biome considers the parent folders too. This means that if you want to _include_ all files in a folder, you need to use the `/**` suffix to match those files. But if you want to _ignore_ all files in a folder, you may do so without the `/**` suffix. We recommend ignoring folders without the trailing `/**`, to avoid needlessly traversing it, as well as to avoid the risk of Biome loading a `biome.json` or a `.gitignore` file from an ignored folder.

Some examples:

-   `dist/**` matches the `dist/` folder and all files inside it.
-   `!dist` ignores the `dist/` folder and all files inside it.
-   `**/test/**` matches all files under any folder named `test`, regardless of where they are. E.g. `dist/test`, `src/test`.
-   `**/*.js` matches all files ending with the extension `.js` in all folders.

Copyright (c) 2023-present Biome Developers and Contributors.
