import sys
from bs4 import BeautifulSoup
import requests
import re
import csv
import argparse

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("indulas", help="ind")
    parser.add_argument("erkezes", help="erk")
    parser.add_argument("ido", help="ido")
    args = parser.parse_args()

link1 = "http://elvira.mav-start.hu/elvira.dll/x/uf?iehack=%3F&ed=5E5E6229&mikor=-1&isz=0&language=1&k=&ref=&retur=&nyit=&_charset_=UTF-8&vparam=&i="
indul = args.indulas
link2 = "&e="
erkez = args.erkezes
link3 = "&v=&d="
datum = args.ido
link4 = "&u=1156&go=Menetrend"

source = requests.get( link1 + indul + link2 + erkez + link3 + datum + link4 ).text
soup = BeautifulSoup(source,'lxml')
csv_file = open('elvira_data.csv', 'w')
csv_writer =  csv.writer(csv_file)
csv_writer.writerow(['Indulas','Erkezes','Atszallas','Idotartam','Osszes Km'])
helyadat = soup.find_all("div", class_="xformcontrol2")
helyindul = helyadat[0].input['value'].encode('utf-8')
helyerkez = helyadat[1].input['value'].encode('utf-8')
timetable = soup.find("div", class_="rtf").tbody
tablerow = timetable.find_all("tr", {"style" : re.compile(r".*")})
datanums = 0
for usefuldatarows in range(0, len(tablerow), 2):
    usefuldatas = tablerow[usefuldatarows].find_all('td')
    ind = usefuldatas[1].text.encode('utf-8').strip()
    erk = usefuldatas[2].text.encode('utf-8').strip()
    atsz = usefuldatas[3].text.encode('utf-8').strip()
    ido = usefuldatas[4].text.encode('utf-8').strip()
    km = usefuldatas[5].text.encode('utf-8').strip()
    if ' ' not in ind:
        ind = ind +' '+helyindul
    if ' ' not in erk:
        erk = erk +' '+helyerkez 
    csv_writer.writerow([ind,erk,atsz,ido,km])
    datanums = datanums + 1
print("record num: "+str(datanums))
csv_file.close()