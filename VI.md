# Vim

## History

The vi (visual interface) editor was developed in 1976 by Bill Joy, a graduate student at UC Berkeley. 

Vim (vi improved) is a clone of vi, first released publicly in 1991.

vi uses the "home row" keys on the keyboard. This technique allows the developer to accomplish tasks without stopping to touch the mouse.

vi uses a series of "mapped keys" or shortcuts to speed the development process.


## vi modes

vi has 4 modes:

  - command mode
  - insert mode
  - last-line mode
  - visual mode

### command mode

Files opened in vi are in command mode by default. Command mode allows the developer to navigate and perform bulk operations on the file.

Navigate:

  - h j k l - Left, Down, Up, Right
  - w - Go to the next word
  - 0 - Go to the beginning of the current line
  - $ - Go to the end of the current line
  - G - Go to the end of the file
  - 1G - Go to the beginning of the file
  - Ctrl-F - Page down (forward)
  - Ctrl-B - Page up (back)

Manipulate:

  - yy - Copy current line
  - p - Paste (put) current line
  - dd - Delete current line (delete and copy)
  - x - Delete current character
  - r - Replace current character
  - cw - Change current word
  - \>\> - Shift line right
  - << - Shift line left
  - u - undo last modification
  - U - undo all modifications on current line

### insert mode

In insert mode, the developer can type words freely.

To enter insert mode, use the following:

  - i - Insert text at the current cursor position
  - a - Append text after the current cursor position
  - A - Append text after the end of the current line
  - o - Append text by adding a new line under the current line
  - O - Append text by adding a new line above the current line

To leave insert mode, press the escape (esc) button on the keyboard.

### last-line mode

  - :w - Save current file (write)
  - :q - Quit current file
  - :q! - Quit current file without saving
  - :wq - Save and quit current file
  - / - Search
  - :%s/search text/replace text/gc - Search and replace

### visual mode

  - v - Highlight text from current cursor position
  - V - Highlight entire line(s) from current line

Once lines are highlighted, command mode operations can be performed:

  - y - copy highlighted lines
  - c - change
  - d - delete
  - \> - shift right
  - < - shift left

### vi cheat sheet

https://vim.rtorr.com/
