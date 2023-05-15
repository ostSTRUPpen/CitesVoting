# Made by ostSTRUPpen
import json

# Odstranění \n na prvním řádku každého citátu
def modify_list(list_to_modify):
    for i in range(len(list_to_modify)):
        if list_to_modify[i][0] == '\n':
            list_to_modify[i] = list_to_modify[i][1:]


input_file_object = open('input.txt', 'r', encoding="utf8")
input_text_raw = input_file_object.read()
input_text = input_text_raw.split(';')
modify_list(input_text)

json_text = '['
json_end = ']'

textType = input("Druh citátu: (ucitel/zak/mix)")


def format(text, type):
    return f'{{"text": "{text}", "citeType": "{type}", "votes": [{{"name": "start", "value": 5}}]}},'


for text in input_text:
    text = text.replace("\n", "<br/>")
    while "**" in text:
        text = text.replace("**", "<strong>", 1).replace("**", "</strong>", 1)
    while "*" in text:
        text = text.replace("*", "<i>", 1).replace("*", "</i>", 1)

    json_text += format(text, textType)


json_text = json_text[:-1]
json_text += json_end


with open("output.json", "w", encoding='utf=8') as outfile:
    outfile.write(json_text)

input_file_object.close()
