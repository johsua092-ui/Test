# How to Get Session Keys/Tokens

## ChatGPT Session Token (Free - scrape your own account)

1. Open https://chatgpt.com in browser
2. Login to your account
3. Open DevTools (F12)
4. Go to Application/Storage tab
5. Click Cookies → https://chatgpt.com
6. Find `__Secure-next-auth.session-token` cookie
7. Copy the value
8. Paste to `.env` as `GPT_SESSION_TOKEN`

## GLM API Key (Free Official API)

1. Go to https://open.bigmodel.cn
2. Register account (free)
3. Get free API key (official, legal)
4. Paste to `.env` as `GLM_API_KEY`

**GLM is OFFICIAL and FREE:**
- GLM-4-Plus (free tier available)
- Legal, stable, won't die
- No scraping needed

## Models Supported:
- `gpt-4o`, `gpt-4`, `o1` (needs GPT session)
- `glm-4-plus`, `glm-4` (needs GLM key - FREE OFFICIAL)

**WARNING:**
- GPT scraping violates OpenAI ToS
- Account can be banned
- Session expires (need refresh)
- GLM is safer (official free API)
