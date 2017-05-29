# Unix

## History

Unix is an operating system developed in the 1970s by Bell Labs. Linux and Mac OS X (now macOS) are derived from Unix. Technically, tvOS, watchOS and Android are also Unix based operating systems.

To access the command line interface (CLI) of Unix, the developer runs a terminal application. Ubuntu comes with an application called Terminal, but it is recommend to use Terminator.
  

## Unix commands

### cd - change directory
```
cd Downloads
cd ..
cd ../..
```

### ls - list contents of a directory
```
ls
ls -l
ls -a
ls -ltr
ls -altr
```

### pwd - print (show) working directory
```
pwd
```

### touch - create an empty file
```
touch tmpfile.txt
```

### mkdir - create a directory
```
mkdir tmpdir
```

### cp - copy a file or directory
```
cp tmpfile.txt tmpdir
```

### mv - rename or move a file or directory
```
mv tmpdir tmpdir2
```

### rm - remove a file or directory
```
rm tmpfile.txt
rm -rf tmpdir2
```

### echo - print something to the console
```
echo "Hello from echo"
echo "Hello from echo" > hello.txt
```

### cat - print contents of a file
```
cat hello.txt
```

### less - "page" through a file
```
less hello.txt
```

### egrep - search within files
```
egrep -in 'hello' hello.txt
```

### find - find files
```
find . -name "\*.txt"
```

### vi - command line editor
```
vi hello.txt
```

### Unix/Linux Cheat Sheet

http://cheatsheetworld.com/programming/unix-linux-cheat-sheet/
