// NOUL TESTAMENT ANUAL, fara weekend-uri
const date = new Date("2024-01-01T10:00:00");
const nextYearDate = new Date("2025-01-01");

const start = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
`;
const end = `END:VCALENDAR`;
const parts = `Matei 1
Matei 2-3
Matei 4
Matei 5
Matei 6
Matei 7
Matei 8
Matei 9
Matei 10
Matei 11
Matei 12
Matei 13
Matei 14
Matei 15
Matei 16
Matei 17
Matei 18
Matei 19
Matei 20
Matei 21
Matei 22
Matei 23
Matei 24
Matei 25
Matei 26
Matei 27
Matei 28
Fapte 1
Fapte 2
Fapte 3
Fapte 4
Fapte 5
Fapte 6
Fapte 7
Fapte 8
Fapte 9
Fapte 10
Fapte 11
Fapte 12
Fapte 13
Fapte 14
Fapte 15
Fapte 16
Fapte 17
Fapte 18
Fapte 19
Fapte 20
Fapte 21
Fapte 22
Fapte 23
Fapte 24
Fapte 25
Fapte 26
Fapte 27
Fapte 28
1 Corinteni 1
1 Corinteni 2-3
1 Corinteni 4
1 Corinteni 5-6
1 Corinteni 7
1 Corinteni 8
1 Corinteni 9
1 Corinteni 10
1 Corinteni 11
1 Corinteni 12-13
1 Corinteni 14
1 Corinteni 15
1 Corinteni 16
2 Corinteni 1-2
2 Corinteni 3-4
2 Corinteni 5
2 Corinteni 6-7
2 Corinteni 8
2 Corinteni 9-10
2 Corinteni 11
2 Corinteni 12
2 Corinteni 13

Marcu 1
Marcu 2
Marcu 3
Marcu 4
Marcu 5
Marcu 6
Marcu 7
Marcu 8
Marcu 9
Marcu 10
Marcu 11
Marcu 12
Marcu 13
Marcu 14
Marcu 15
Marcu 16
Romani 1
Romani 2
Romani 3
Romani 4
Romani 5-6
Romani 7
Romani 8
Romani 9
Romani 10
Romani 11
Romani 12
Romani 13-14
Romani 15
Romani 16
Luca 1
Luca 2
Luca 3
Luca 4
Luca 5
Luca 6
Luca 7
Luca 8
Luca 9
Luca 10
Luca 11
Luca 12
Luca 13
Luca 14
Luca 15
Luca 16
Luca 17
Luca 18
Luca 19
Luca 20
Luca 21
Luca 22
Luca 23
Luca 24
Galateni 1
Galateni 2
Galateni 3
Galateni 4
Galateni 5-6
Filimon
Evrei 1
Evrei 2
Evrei 3-4
Evrei 5-6
Evrei 7
Evrei 8
Evrei 9
Evrei 10
Evrei 11
Evrei 12
Evrei 13
Efeseni 1
Efeseni 2-3
Efeseni 4
Efeseni 5
Efeseni 6
Filipeni 1
Filipeni 2-3
Filipeni 4
Ioan 1
Ioan 2
Ioan 3
Ioan 4
Ioan 5
Ioan 6
Ioan 7
Ioan 8
Ioan 9
Ioan 10
Ioan 11
Ioan 12
Ioan 13
Ioan 14
Ioan 15
Ioan 16
Ioan 17
Ioan 18
Ioan 19
Ioan 20
Ioan 21
1 Ioan 1-2
1 Ioan 3
1 Ioan 4
1 Ioan 5
2 Ioan
3 Ioan
Coloseni 1
Coloseni 2-3
Coloseni 4
Iacov 1
Iacov 2-3
Iacov 4-5
1 Tesaloniceni 1-2
1 Tesaloniceni 3-4
1 Tesaloniceni 5
2 Tesaloniceni 1
2 Tesaloniceni 2-3
1 Petru 1
1 Petru 2
1 Petru 3-4
1 Petru 5
Tit 1
Tit 2-3
2 Petru 1-2
2 Petru 3
1 Timotei 1-2
1 Timotei 3-4
1 Timotei 5
1 Timotei 6
2 Timotei 1
2 Timotei 2-3
2 Timotei 4
Iuda
Apocalipsa 1
Apocalipsa 2
Apocalipsa 3
Apocalipsa 4-5
Apocalipsa 6
Apocalipsa 7-8
Apocalipsa 9
Apocalipsa 10-11
Apocalipsa 12
Apocalipsa 13
Apocalipsa 14-15
Apocalipsa 16
Apocalipsa 17
Apocalipsa 18
Apocalipsa 19-20
Apocalipsa 21
Apocalipsa 22`;

let generated = start;

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

let passageIndex = 0;
const passages = parts
  .split("\n")
  .map((x) => x.trim())
  .filter(Boolean);

function add(date: Date) {
  const passage = passages[passageIndex];

  if (!passage) {
    return;
  }

  const dateStringStart = date.toISOString().split("T")[0].replace(/-/g, "");
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);
  const dateStringEnd = endDate.toISOString().split("T")[0].replace(/-/g, "");

  const str = `BEGIN:VEVENT
DTSTART;VALUE=DATE:${dateStringStart}
DTEND;VALUE=DATE:${dateStringEnd}
SUMMARY:${passage}
END:VEVENT`;
  generated += str;
  generated += `\n`;

  passageIndex++;
}

let current = date;
while (current < nextYearDate) {
  if (!isWeekend(current)) {
    add(current);
  }
  current = new Date(current);

  // add 1 day to current date
  current.setDate(current.getDate() + 1);
}

generated += end;

Bun.write("NT-anual.ics", generated);

console.log("Fisierul NT-anual.ics a fost creat cu succes!");
