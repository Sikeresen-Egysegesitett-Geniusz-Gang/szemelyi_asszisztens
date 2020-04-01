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

link1 = "http://elvira.mav-start.hu/elvira.dll/x/uf?iehack=%3F&ed=5E831FFD&mikor=-1&isz=0&language=1&k=&ref=&retur=&nyit=&_charset_=UTF-8&vparam=&i="
indul = args.indulas
link2 = "&e="
erkez = args.erkezes
link3 = "&v=&d="
datum = args.ido
link4 = "&u=1156&go=Menetrend"

source = requests.get( link1 + indul + link2 + erkez + link3 + datum + link4 ).text
soup = BeautifulSoup(source,'lxml')
file_name = indul+"-"+erkez+"-"+datum+".csv"
csv_file = open("elvira_data\\"+file_name, 'w')
csv_writer =  csv.writer(csv_file)
csv_writer.writerow(['Indulas','Erkezes','Atszallas','Idotartam','Osszes Km'])


helyadat = soup.find_all("div", class_="xformcontrol2")
helyindul = helyadat[0].input['value']
helyerkez = helyadat[1].input['value']
timetable = soup.find("div", class_="rtf").tbody
tablerow = timetable.find_all("tr", {"style" : re.compile(r".*")})
datanums = 0
for usefuldatarows in range(0, len(tablerow), 2):
    usefuldatas = tablerow[usefuldatarows].find_all('td')
    ind = usefuldatas[1].text.strip()
    erk = usefuldatas[2].text.strip()
    atsz = usefuldatas[3].text.strip()
    ido = usefuldatas[4].text.strip()
    km = usefuldatas[5].text.strip()
    if ' ' not in ind :
        ind = str(ind) +' '+helyindul
    if ' ' not in erk:
        erk = str(erk) +' '+helyerkez 
    csv_writer.writerow([ind,erk,atsz,ido,km])
    datanums = datanums + 1
print("record num: "+str(datanums))
csv_file.close()