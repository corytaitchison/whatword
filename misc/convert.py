# http://www.gwicks.net/dictionaries.htm

import csv

with open('words.txt', 'r') as f:
    dat = f.read().splitlines()

with open('words5.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerows([[f'"{x}"' for x in dat if len(x) == 5]])