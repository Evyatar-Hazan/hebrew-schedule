import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  @media print {
    /* הגדרת דף A4 רוחבי */
    @page {
      size: A4 landscape;
      margin: 10mm;
    }

    body {
      margin: 0;
      padding: 0;
    }

    /* מוודא שהתוכן לא נשבר */
    .print-content {
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    /* הגדרת הטבלה */
    table {
      width: 100%;
      table-layout: fixed; /* מונע גלישה של הטבלה */
      border-collapse: collapse;
      page-break-inside: avoid; /* מונע שבירת עמוד בתוך הטבלה */
    }

    /* הגדרת שורות בתוך הטבלה */
    tr {
      page-break-inside: avoid; /* מונע שבירת עמוד בתוך השורה */
    }

    th, td {
      padding: 5px;
      text-align: center;
      word-wrap: break-word;
      font-size: 10px; /* שים לב להקטין את הגודל אם צריך */
    }

    /* מניעת גלישה בתוך תאים */
    td {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* הסתרת כפתור ההדפסה */
    button {
      display: none;
    }

    /* טיפול בטבלה הפנימית בשורה השנייה */
    .inner-table-wrapper {
      width: 100%;
      max-width: 100%;  /* מונע שהטבלה הפנימית תצא מגבולות העמוד */
      overflow: hidden;
      display: block; /* מבטיח שהתוכן לא ייצא מעבר לגבולות */
    }

    .inner-table-wrapper table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      page-break-inside: avoid; /* מונע שבירת עמוד בתוך הטבלה הפנימית */
    }

    /* הגדרת שורות ותאים בטבלה הפנימית */
    .inner-table-wrapper th, .inner-table-wrapper td {
      padding: 5px;
      text-align: center;
      font-size: 9px;
    }
  }
`;
