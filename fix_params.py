import os
import glob

files = [
    'Assets/btd3/index.html',
    'Assets/hole.io/index.html',
    'Assets/fishing.io/index.html',
    'Assets/jelly-truck/index.html',
    'Assets/hangman/index.html'
]

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    if '&¶ms&¶msparams' in content:
        content = content.replace('&¶ms&¶msparams', '&&params')
        with open(f, 'w') as file:
            file.write(content)
        print(f"Fixed {f}")
    elif '&¶ms' in content:
        content = content.replace('&¶ms', '&&params')
        with open(f, 'w') as file:
            file.write(content)
        print(f"Fixed {f}")
