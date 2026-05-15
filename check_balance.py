import sys
content = open('frontend/src/pages/GamePage.tsx').read()
stack = []
i = 0
o_p, c_p = 0, 0
o_b, c_b = 0, 0
o_s, c_s = 0, 0

while i < len(content):
    c = content[i]
    if content[i:i+2] == '//':
        i = content.find('\n', i)
        if i == -1: break
    elif content[i:i+2] == '/*':
        i = content.find('*/', i)
        if i == -1: break
        i += 2
    elif c in "\"'`":
        end = content.find(c, i + 1)
        while end != -1 and content[end-1] == '\\':
            end = content.find(c, end + 1)
        if end == -1: break
        i = end + 1
    elif c == '(': o_p += 1; i += 1
    elif c == ')': c_p += 1; i += 1
    elif c == '{': o_b += 1; i += 1
    elif c == '}': c_b += 1; i += 1
    elif c == '[': o_s += 1; i += 1
    elif c == ']': c_s += 1; i += 1
    else:
        i += 1

print(f'Parentheses: {o_p} / {c_p}')
print(f'Braces: {o_b} / {c_b}')
print(f'Brackets: {o_s} / {c_s}')
