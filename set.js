
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0s0MDRMd3JjNjNCbXJKL0FJWUNIY1BGNmRVK0pFL3JJNUlOVnJBL2EzMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQW9lWTVaYzg5NFRjclI5dloxMTZDaUNLUWk3bFIyMUpTLzJCWlQ2RXlUQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1QTBjdFBBUGYyL283b1VUR1lZUW4xVzJyVFVLYXVENUdYUXJpUlFwa1dZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkeGlmcUpuSVF5dXVLS2tWL1pJbjUwbmh3MElZNFlFUnZaTXBlYmJmdkUwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1EN3kxSXE4eHNMZzZJN21iNU1Mc0xHV2RXaW81YUZxTW9RK2hvLzNJRjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik03TzUvbEFHUUJBYlJiN3FuK292eUt0WGlQdkN3bk1wbWxLZ0JoUk5IaUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU1pRmIwNERhWlUrZk5MbDZ5NWNRSk1QY01IUy9qbEpuNS9yd043VkJtST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWJsYXNsSXJxT1l5dVNzR1htVmNvcHhxVFZEVDA3SlFpbWtRb1VZaGRWMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndsU0hJWTZBRnhiUGV6RkZyOFlUUE5DWDlTcURLbGQxaFpINkdyeDA3eldDWFpxOTZ4Y0k3UStXQ2QwRFNsVG1ObEJwdjdvZnhwRDloeHUvVFFNSmlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzgsImFkdlNlY3JldEtleSI6InpLMkVxejBPUTNQS0VlMzE4b3RuK3Nzd0N2M05oT2ttaTZQQ29jS1RMZ2s9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNTA5MzI0NjQ2NTNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNUY2MEMyQzUxNjZGNUE0NDYxQzg5NkNENkZCQzlFNDkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDMxMzMyOH0seyJrZXkiOnsicmVtb3RlSmlkIjoiNTA5MzI0NjQ2NTNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiN0QyQ0Q0NUM4NTE0OEQwOUE0OEFGMDAxMTA2QUY4NzEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDMxMzMyOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiNTA5MzI0NjQ2NTNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjRENkU0QTBDOEU2QjU2NkI3ODlFRUZCRkU0NzZDQUIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MDMxMzM3M31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiM1hWMjFITkciLCJtZSI6eyJpZCI6IjUwOTMyNDY0NjUzOjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2QjOqdmyDwnZCL8J2QlPCdkILwnZCI8J2Qi/CdkIXwnZCE8J2QkeGthCAgTU/wnZCRTvCdkIhH8J2QklTwnZqr8J2QkSDjgI/wnZCC8J2Qh/Cdmq/wnZCK8J2QgCIsImxpZCI6IjI4ODg0MjkyNjEyMjUzOjNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKSEgrTlVFRU4zU3pzSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJVZWdlNzlmR2lKT0VLM28zKy96bmdSKzJ5N2tZb0ZJaTZyUXJjZVBmRUI4PSIsImFjY291bnRTaWduYXR1cmUiOiJPUkVjUlZQcmkwSVNaWnhyWm4zQ3JwcCtvOVViVGdaQnlYd0UyR2szSEc3cVlPZ1pxZzZpWEl3V0V6MGFkTUxMeElzbzVqbkZ3MnBhME9YNlphZGlEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTVVtN2lVMW9GL29ZWVdnZ0lheEJ5Rk81NFJCNE1pUkVhWUE1bXJzbHYrWkxjdGhZL0s4MWdPMm5LdmxQc1ZpRGtxQlpnenVWa2NoekhoRG52MS9RaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI1MDkzMjQ2NDY1MzozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZIb0h1L1h4b2lUaEN0Nk4vdjg1NEVmdHN1NUdLQlNJdXEwSzNIajN4QWYifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MDMxMzMyMywibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJc3cifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𓆩𝐌r 𝐋𝐔𝐂𝐈𝐋𝐅𝐄𝐑᭄  MO𝐑N𝐈G𝐒T𝚫𝐑 』",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "50932464653",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BWB-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/ygvlzy.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
