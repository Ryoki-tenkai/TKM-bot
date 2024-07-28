const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUh2RVQrcTBUYUZja2tBVk1DVSt4NE5kRy9VYngxdkd4UHRtaWp4N0QyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYzRjS3hjZnBVNUYyakxYdy93MUhiNGZ0akx2QjRVcmd5UmY2dU5ZZGlCUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRU1PKzRoMmk0dXFHN3p3bTdiN3VaMVhMQVpKYlVDRmhkUlpLbEczNEVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGN1JwTzJRT1pzSFZSbTdiSXhOMUdBeTcrenNyWTJLRmJqT2NkeU9iOUU0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktGUkgzaXNmR3NWajFkcmdXdExOZ3B0ejFSL2RjR0h4Y3YzdWFRcHZKbjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNCeUJ2NktYcHJ6dDB5N3J5alk4RXV1WCtOTUQzZVlQMjMwNzdVNUNEV2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV00yYzV5Z1dMOWJYbFNzdXZiS0FGYzFlaXZZVmd6ZGcyVTErZlBuTDJHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjdCRXB3WEd1K2tHbFVVamppRFJhUlBYQmVjSWovTjRDNEt3UlRETGpCWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpVTGpmQ3JCZ1YrV1k5UDF6OUhqR2VpVXAzQVdNcVo0emhxWUJacWxSN0tmaTRMZU5tUiszSDJNNWtoMm5UcDlhVGlVM2w3UXhseFJ5S0tLcGRJaENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDQsImFkdlNlY3JldEtleSI6InR6L29lZUVUWUFJQSs4UWdjTkpHZ0FRRGQ2akVTSFBpdmxTK0RpcWpKems9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImxyRFVXSncwUk9lZzh3MXJieWFVM2ciLCJwaG9uZUlkIjoiOWUwODBlODUtZDc1My00MjRiLTlmMWItZWEwYzE4ZWIwYzgxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFKbXAxdWRhYVFPNFc0ekZHRTBPY3JINVV5az0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwWnJXQkZiRUtVWlJJVjlBRFo4emNucGs0WVk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUlkyVjFWSlYiLCJtZSI6eyJpZCI6IjIzNzY5NTQ1MDcyMjoyMUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHZRcWFVREVPYUpsYlVHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiY2E5NVlUVVF6SUVGYUxVQjRoTVdncWpWYzFPVjF5dGs3NGpQeVM2Nmt3VT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiazFRZWdta0FTOHRYcFBDaEZkNkNDaDEza2tTSWVFQS9EMUhLcnRIY054ZlpZaXNRZVJ2dlJUWnFQZHVIL2Z5a1N3cVE0UzBTazAxYkRGZXp4NWIvQnc9PSIsImRldmljZVNpZ25hdHVyZSI6Ik1rdGhJZmxQVzJjWVY0V3JKaWdCZ2pqazVQOGtEMnA1b1kxbEIwQm9iZ09OMkhKMnFqdGZydjg0UDhqYStuWkxuNFBrblZIWkdGQzdxQWdZMmg5aERnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3Njk1NDUwNzIyOjIxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhHdmVXRTFFTXlCQldpMUFlSVRGb0tvMVhOVGxkY3JaTytJejhrdXVwTUYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjIxMDcxMjN9',
    PREFIXE: process.env.PREFIX || "!",
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
