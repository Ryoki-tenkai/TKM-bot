const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0NyQ2F5MFZsU2pibVZKUWgyU0dOTENaQm9NRGVnN0pGMzVTYXFnSGZuYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYndTQU9HTCtydEpNMHM1N3lqZ3F4bVFWTVRTUTZFYk5oRTM5RGsrbm5Hbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvQzhGbkhKNzZLbW9oY0w3cDhlY09QejZZRDNnQ2QwUzZyYklib2Vid2wwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNd2tIcW5udmpRN1k5aUV1ZGJIREpHTzVuc1RWYXZ5YmlZWVF6N0twTUhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtMSFNFWkl5aW5FWE5JRVZsaHdUMjdLNmxlaUY3Q0NJZThRRWJKdWlYa2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjF0NlRJUEdMM3dGNTh6Z0xSNVhxT29CYXdxdGpIWTI2U0tvVFpiS1I2eFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0dNcDYyRWxBcGJ4dk1mOStUcnlkVDcxWnZEbC9qY1dQRE1ROXJmdmVtWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNnBxQU9BMHJVajhnc2tGR1Nuczh2TzBhV3JWUUJYSExjME1HVnBoT0JnYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRlam53SEZwNmRUeXcyVnFlUzBMQnFUZ29SQWVuRERlRHcxMlBtdzJOZW56Q3ZicnVHSnN5Y3hOVnIyZXp6L3lUL1JmWFNjZzFqaXYxNUJ1eGhXckF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTgsImFkdlNlY3JldEtleSI6ImtleTg3SmNhcGZmK2Vac0FhcTM3MHdlbnhGcVQxSEJXSi9pZ3BwUERET3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlJveVdTa1lPVFl1VGxlaEFOaHhDaEEiLCJwaG9uZUlkIjoiODUyMDk5YzctM2IyZi00YTg3LWEyMTMtODYxMWNkZDYyODRhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBPcStZYlRpNDBxT1E3dU9wZGVyd1BCZ2R3WT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrNkRjemZhWWMwTXRCSmpEaGIybHFMdVZ4TUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWTRLM01SSkQiLCJtZSI6eyJpZCI6IjIzNzY5NTQ1MDcyMjoyM0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHpRcWFVREVOaTFyclVHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiY2E5NVlUVVF6SUVGYUxVQjRoTVdncWpWYzFPVjF5dGs3NGpQeVM2Nmt3VT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZ2puMDFjUGN3WmR3S3NSMXJJV0hHdjlzTlRLbEdybUhPN1FTdVNwU24xSHdqY2pZUUg4bDB3UTFXdGNpZUhwRWp4cmw5VXd0UGgyVkkwaHRNeE5zQWc9PSIsImRldmljZVNpZ25hdHVyZSI6IjRxSHJZWXpFQ1A1a0NwWFVTTXNBZVZOaWtxMEJsVjBnbTFiQnVtU2RsNmNVd1BoUTZKaU16NGdidWNEYkQ4NnI3cENxeTBZVXB6S0UzM0d0TWVzRUJnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3Njk1NDUwNzIyOjIzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhHdmVXRTFFTXlCQldpMUFlSVRGb0tvMVhOVGxkY3JaTytJejhrdXVwTUYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI1MjIzNDB9',
    PREFIXE: process.env.PREFIX || "°",
    OWNER_NAME: process.env.OWNER_NAME || "Atlas Flame 🔥🐉",
    NUMERO_OWNER : process.env.OWNER_NUM || "237695450722",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TEKNA',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
