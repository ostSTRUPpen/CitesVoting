1.  Vytovřit svelte apliakci [ ]
    - která načte všechny citáty, zformátuje je, zobrazí na webu a uloží výsledky (plus přihlášení, limitování atdddd)
    - Každý bude muset mít JSON, kde se bude ukládat text a hlasování ve formátu {userName : points}, tak aby to zablokovalo hlasování daného uživatele
    1. CSS nahradit za SASS (SCSS)
    2. JS nahradit za TS
2.  Otestovat ji pomocí playwright [ ]
    - naučit se playwright
3.  Otestovat ji pomocí Vitetest [ ]
    -     naučit se vitetest
4.  Nahrát na web [ ]

5.  Logování ERRORů a http požadavků

# Detailní checklist

- [x] Vytvoření primitivního UI pro hlasování na citáty
- [x] Primitivní UI pro správu uživatelů
  - [x] CRUD operace v databázi
- [x] Ukládání hlasování do databáze
  - [x] samotné ukládání
  - [x] vázání na uživatele (bez autorizace)
- [x] Nahrávání citátů do databáze
  - [x] Formátování
  - [x] Komunikace s databází
  - [x] Úspěšné nahrání
- [x] Vyhodnocení jednotlivých citátů
- [x] Možnost je nějak jednodušše vytisknout (např plain text/formátované pdf/ atd...)
- [x] Přihlášení uživatele do systému
  - [x] Login a landing page
  - [x] Kontrola údajů
  - [ ] Uložení zařízení
  - [x] Zápis podstatných informací do store
  - [x] Ověřit funkčnost ukládání citátů ke správnému uživateli
- [ ] Vylepšení grafického rozhraní
  - [ ] SCSS
  - [x] Header, zobrazuje jméno uživatele a roli a navigační tlačítka (domů, hlasované, nové, odhlásit)
  - [ ] Footer, zobrazuje copyright
- [x] Zabezpečení jednotlivých URL adres podle pravomocí uživatele
- [ ] Testování
  - [ ] Pomocí Vite test
  - [ ] Pomocí playwright
  - [ ] Ručně
- [ ] Final touches
  - [ ] Logování požadavků a errorů (tak aby se k nim dalo dostat xd)
  - [ ] Projít všechny "any" TS typy a udělat vlastní, aby bylo vše type safe (i u errorů)
  - [ ] Readme
    - [ ] do .bat je potřeba napsat username a password a vložit správné URL
    - [ ] do .env v src složce je třeba vložit URI na databízi
    - [ ] Zjisit co je vlastně URI
    - [ ] Pro fungování python části je třeba vytvořit x.bat soubor, který bude volat importNewData.bat, ale předtím vytvoří proměnné usrname, pssword a databaseURL
      - [ ] též je nutný input.txt soubor, který hledá formater při formátování
      - [ ] Styl citátů v input.txt \*\*a\*\* => **a**, \*a\* => _a_, odděleno ";"
      - [ ] nejdříve formater, poté x.bat
  - [x] Přidat i python a .bat kód, tak aby to neexposnulo přihlašovací údaje a URL adresu
- [ ] nahrání na hosting
- [ ] Ruční testování
  - [ ] Funguje blokace adres
  - [ ] Funguje ukládání zařízení
  - [ ] Stránka se neposere kvůli cestování tam/zpět/reloadu
- [ ] Ukázkové a seznamovací video pro spolužáky
- [ ] Vymyslet jaké tam dát citáty

!!! Nutno upravit, aby pokud nejsou žádné obodované/neobodvané citáty, tak aby to něco napsalo a nevypsalo jen úplně všechny for fun
