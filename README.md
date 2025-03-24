# Hebrew Schedule - Kiryat Ata

This website was developed to help my father in creating a monthly schedule of Jewish halachic times for Kiryat Ata. My father publishes a monthly schedule of halachic times, and to make his job easier, I built a website that allows him to select the dates he wants to get information about and print the schedule. The website is currently tailored specifically for the city of **Kiryat Ata**.

The website is built using **React** and **TypeScript**, and is hosted on **Netlify**.

## Description
The website displays information about halachic times (such as candle lighting, havdalah, parasha, daf yomi, etc.) based on a date selected by the user. Every time a user selects a date, the website will show the relevant information for that specific date and allow them to print it for distribution.

The project was created to make it easier for my father, who needs to prepare and distribute the halachic schedule every month for Kiryat Ata. The website allows him to easily select the dates and retrieve the information automatically, instead of preparing the schedule manually.

**Note:** Currently, the website is tailored for Kiryat Ata only.

### Technologies Used:
- **React**: A JavaScript library for building dynamic user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types for better code quality and easier debugging.
- **Netlify**: A platform for hosting static websites.

### Main Features:
The user can select any date and see the following information:

- **Hebrew Date**: The Hebrew date for the selected day.
- **Is Shabbat?**: A flag indicating whether the selected day is Shabbat.
- **Holiday**: If the selected day is a Jewish holiday (e.g., Pesach, Sukkot, etc.).
- **Parasha**: The parasha for the selected week.
- **Candle Lighting**: The time for lighting the Shabbat candles.
- **Havdalah**: The time for Havdalah at the end of Shabbat.
- **Dafyomi**: The Daf Yomi for the day.
- **Store Lock**: The time for store closures before Shabbat.
- **Haftarah**: The Haftarah for the selected week.
- **Omer Count**: The omer count, if relevant.

#### Example Data:
```json
{
  "date": "2025-01-31",
  "expected": {
    "hebrewDate": "ב׳ בִּשְׁבָט תשפ״ה",
    "isShabbat": false,
    "holiday": null,
    "parasha": "בֹּא",
    "candleLighting": "2025-01-31T16:42:00+02:00",
    "havdala": "2025-02-01T17:51:00+02:00",
    "dafyomi": "סנהדרין דף מ״ה",
    "storeLock": "2025-01-31T14:32:00.000Z",
    "haftarah": "(ירמיהו מו:יג–כח)",
    "omerCount": null
  }
}
```

### Installation and Local Setup

If you'd like to run the website locally, follow these steps:


1. Clone the repository:

    ```bash
    git clone https://github.com/Evyatar-Hazan/hebrew-schedule.git
    ```

2. Install dependencies: Install all the necessary dependencies for the React project:

    ```bash
    npm install 
    ```
3. Start the local development server: After the installation, you can start the development server:

    ```bash
    npm start 
    ```

The website will be available at http://localhost:3000.

### Deployment

The website is hosted on Netlify, so there is no need to worry about setting up a server. The website is automatically deployed every time you push changes to the repository.

To view the live website, visit: https://hebrew-schedule.netlify.app/.

### Contributions

If you'd like to contribute or improve the website, feel free to open issues or pull requests on GitHub with your suggestions or enhancements.