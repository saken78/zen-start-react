# Panduan Lengkap Keybinding Zed Editor

Dokumen ini menyajikan semua keybinding dari file konfigurasi Zed `~/.config/zed/keymap.json` dalam format yang mudah dipelajari dan direferensikan.

## Daftar Isi
- [Navigasi](#navigasi)
- [Editing](#editing)
- [Manajemen File](#manajemen-file)
- [Panel dan Tampilan](#panel-dan-tampilan)
- [Mode Vim](#mode-vim)
- [Terminal](#terminal)
- [Diagnostics dan Git](#diagnostics-dan-git)
- [Asisten AI](#asisten-ai)
- [Struktur JSON Asli](#struktur-json-asli)

## Navigasi

| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `ctrl-shift-h` | `workspace::SwapPaneLeft` | Workspace |
| `ctrl-shift-l` | `workspace::SwapPaneRight` | Workspace |
| `ctrl-shift-k` | `workspace::SwapPaneUp` | Workspace |
| `ctrl-shift-j` | `workspace::SwapPaneDown` | Workspace |
| `s l` | `workspace::ActivatePaneRight` | Editor, Normal Mode |
| `s h` | `workspace::ActivatePaneLeft` | Editor, Normal Mode |
| `s k` | `workspace::ActivatePaneUp` | Editor, Normal Mode |
| `s j` | `workspace::ActivatePaneDown` | Editor, Normal Mode |

## Editing

| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `ctrl-d` | `editor::SelectNext` | Editor |
| `g l` | `vim::SelectNext` | Vim Control |
| `g L` | `vim::SelectPrevious` | Vim Control |
| `g a` | `editor::SelectAllMatches` | Vim Control |
| `space f` | `editor::Format` | Editor, Normal Mode |

## Manajemen File

| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `space p f` | `file_finder::Toggle` | Empty Pane, Shared Screen, Editor, Normal Mode |
| `space f p` | `projects::OpenRecent` | Empty Pane, Shared Screen |
| `space c` | `pane::CloseActiveItem` | Editor, Normal Mode |
| `ctrl-f4` | `pane::CloseActiveItem` | Pane |

## Panel dan Tampilan

| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `s v` | `pane::SplitRight` | Editor, Normal Mode |
| `s s` | `pane::SplitDown` | Editor, Normal Mode |
| `space h` | `pane::ActivatePreviousItem` | Editor, Normal Mode |
| `space l` | `pane::ActivateNextItem` | Editor, Normal Mode |
| `ctrl-w i` | `terminal_panel::ToggleFocus` | Workspace, Vim Control, etc. |
| `ctrl-w p` | `agent::ToggleFocus` | Workspace, Vim Control, etc. |
| `ctrl-w o` | `project_panel::ToggleFocus` | Workspace, Vim Control, etc. |
| `ctrl-w k` | `terminal_panel::ToggleFocus` | Terminal |
| `ctrl-w l` | `workspace::ToggleRightDock` | Editor, Normal Mode, Empty Pane |
| `ctrl-w h` | `workspace::ToggleLeftDock` | Editor, Normal Mode |
| `ctrl-w j` | `workspace::ToggleBottomDock` | Editor, Normal Mode |

## Mode Vim

### Mode Insert
| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `ctrl-x ctrl-o` | `editor::ShowCompletions` | Vim Insert Mode |
| `ctrl-x ctrl-a` | `assistant::InlineAssist` | Vim Insert Mode |
| `ctrl-x ctrl-c` | `editor::ShowEditPrediction` | Vim Insert Mode |
| `j k` | `vim::NormalBefore` | Vim Insert Mode |

### Mode Normal
| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `space e` | `editor::Hover` | Editor, Normal Mode |
| `space m` | `tab_switcher::Toggle` | Editor, Normal Mode |
| `space p s` | `pane::DeploySearch` | Editor, Normal Mode |

### Mode Visual
| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `g c` | `editor::ToggleComments` | Editor, Vim Visual Mode |

### Mode Normal dan Visual
| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `space m p` | `markdown::OpenPreview` | Editor, Normal/Visual Mode |
| `space m P` | `markdown::OpenPreviewToTheSide` | Editor, Normal/Visual Mode |
| `space g h d` | `editor::ToggleSelectedDiffHunks` | Editor, Normal/Visual Mode |
| `space g h r` | `git::Restore` | Editor, Normal/Visual Mode |

## Terminal

| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `ctrl-w k` | `terminal_panel::ToggleFocus` | Terminal |

## Diagnostics dan Git

### Diagnostics
| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `[ e` | `editor::GoToDiagnostic` | Editor, Normal Mode |
| `] e` | `editor::GoToPreviousDiagnostic` | Editor, Normal Mode |

### Git
| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `[ g` | `editor::GoToHunk` | Editor, Normal Mode |
| `] g` | `editor::GoToPreviousHunk` | Editor, Normal Mode |

## Asisten AI

| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `ctrl-x ctrl-a` | `assistant::InlineAssist` | Vim Insert Mode |
| `ctrl-x ctrl-c` | `editor::ShowEditPrediction` | Vim Insert Mode |

## Keybinding Umum (Tanpa Context Spesifik)

| Key Combination | Command/Action | Context |
|-----------------|----------------|---------|
| `ctrl-w` | `null` | Pane |
| `g s` | `outline::Toggle` | Vim Control |
| `g i` | `editor::ToggleCodeActions` | Vim Control |
| `g d` | `editor::OpenExcerpts` | Vim Control |
| `g c` | `editor::ToggleComments` | Vim Control |
| `g f` | `project_symbols::Toggle` | Vim Control |
| `space p e` | `diagnostics::Deploy` | Vim Control |

## Struktur JSON Asli

Berikut adalah struktur JSON asli dari file keymap.json:

```json
[
  {
    "context": "vim_mode == insert",
    "bindings": {
      "ctrl-x ctrl-o": "editor::ShowCompletions",
      "ctrl-x ctrl-a": "assistant::InlineAssist",
      "ctrl-x ctrl-c": "editor::ShowEditPrediction"
    }
  },
  {
    "context": "ProjectPanel && not_editing",
    "bindings": {
      "s h": "workspace::ActivatePaneLeft"
    }
  },
  {
    "context": "Workspace",
    "use_key_equivalents": true,
    "bindings": {
      "ctrl-w i": "terminal_panel::ToggleFocus",
      "ctrl-w p": "agent::ToggleFocus",
      "ctrl-w o": "project_panel::ToggleFocus"
    }
  },
  {
    "context": "(VimControl || (!Editor && !Terminal))",
    "use_key_equivalents": true,
    "bindings": {
      "ctrl-w i": "terminal_panel::ToggleFocus",
      "ctrl-w p": "agent::ToggleFocus",
      "ctrl-w o": "project_panel::ToggleFocus"
    }
  },
  {
    "context": "VimControl && !menu",
    "bindings": {
      "g s": "outline::Toggle",
      "g i": "editor::ToggleCodeActions",
      "g d": "editor::OpenExcerpts",
      "g c": ["editor::ToggleComments", { "advance_downwards": false }]
    }
  },
  {
    "context": "Editor && VimControl && !VimWaiting && !menu",
    "bindings": {
      "g l": "vim::SelectNext",
      "g L": "vim::SelectPrevious",
      "g a": "editor::SelectAllMatches",
      "g shift-a": "editor::FindAllReferences",
      "g f": "project_symbols::Toggle",
      "space p e": "diagnostics::Deploy"
    }
  },
  {
    "context": "Editor && (vim_mode == normal || vim_mode == visual) && !VimWaiting && !menu",
    "bindings": {
      "space m p": "markdown::OpenPreview",
      "space m P": "markdown::OpenPreviewToTheSide",
      "space g h d": "editor::ToggleSelectedDiffHunks",
      "space g h r": "git::Restore"
    }
  },
  {
    "context": "Editor && vim_mode == normal && !VimWaiting && !menu",
    "bindings": {
      "space e": "editor::Hover",
      "s v": "pane::SplitRight",
      "s s": "pane::SplitDown",
      "s l": "workspace::ActivatePaneRight",
      "s h": "workspace::ActivatePaneLeft",
      "s k": "workspace::ActivatePaneUp",
      "s j": "workspace::ActivatePaneDown",
      "space h": "pane::ActivatePreviousItem",
      "space l": "pane::ActivateNextItem",
      "space c": "pane::CloseActiveItem",
      "space p f": "file_finder::Toggle",
      "space p s": "pane::DeploySearch",
      "space f": "editor::Format",
      "space m": "tab_switcher::Toggle",
      "ctrl-w l": "workspace::ToggleRightDock",
      "ctrl-w h": "workspace::ToggleLeftDock",
      "ctrl-w j": "workspace::ToggleBottomDock",
      "[ e": "editor::GoToDiagnostic",
      "] e": "editor::GoToPreviousDiagnostic",
      "[ g": "editor::GoToHunk",
      "] g": "editor::GoToPreviousHunk"
    }
  },
  {
    "context": "Terminal",
    "use_key_equivalents": true,
    "bindings": {
      "ctrl-w k": "terminal_panel::ToggleFocus"
    }
  },
  {
    "context": "EmptyPane || SharedScreen",
    "bindings": {
      "space p f": "file_finder::Toggle",
      "space f p": "projects::OpenRecent",
      "ctrl-w l": "workspace::ToggleRightDock"
    }
  },
  {
    "context": "Editor && vim_mode == visual && !VimWaiting && !menu",
    "bindings": {
      "g c": "editor::ToggleComments"
    }
  },
  {
    "context": "Editor && vim_mode == insert",
    "bindings": {
      "j k": "vim::NormalBefore"
    }
  },
  {
    "context": "((VimControl && !menu) || (!Editor && !Terminal))",
    "bindings": {
      "ctrl-w shift-h": "workspace::MovePaneLeft"
    }
  },
  {
    "context": "Pane",
    "bindings": {
      "ctrl-w": null,
      "ctrl-f4": "pane::CloseActiveItem"
    }
  },
  {
    "context": "Workspace",
    "bindings": {
      "ctrl-shift-h": "workspace::SwapPaneLeft",
      "ctrl-shift-l": "workspace::SwapPaneRight",
      "ctrl-shift-k": "workspace::SwapPaneUp",
      "ctrl-shift-j": "workspace::SwapPaneDown"
    }
  },
  {
    "context": "Editor",
    "bindings": {
      "ctrl-d": "editor::SelectNext"
    }
  }
]
```

## Catatan Tambahan

- Beberapa keybinding memiliki komentar di dalam file asli yang menunjukkan penggunaan spesifik atau alternatif.
- `use_key_equivalents` digunakan untuk mengaktifkan penggunaan kombinasi tombol standar.
- Keybinding `g c` memiliki konfigurasi berbeda untuk mode normal dan visual.
- Beberapa keybinding menggunakan notasi array seperti `["editor::ToggleComments", { "advance_downwards": false }]` untuk menyertakan opsi tambahan.