/**
 * Send a crash report to a Discord webhook.
 * NOTE: For CORS reasons this may require a server-side proxy in production.
 * Configure the webhook via `VITE_DISCORD_WEBHOOK_URL` or `saveConfig({discordWebhook: '...'})`.
 */
import config from '../config';

export async function sendCrashReport(payload: {title?:string;message:string;stack?:string}){
  const DISCORD_WEBHOOK_URL = config.getDiscordWebhook();
  if(!DISCORD_WEBHOOK_URL) {
    console.warn('Discord webhook URL not configured.');
    return {ok:false,reason:'webhook-not-configured'};
  }

  const body = {
    content: `Crash report: ${payload.title||'client'}`,
    embeds: [
      {
        title: payload.title || 'Client crash',
        description: payload.message,
        fields: payload.stack ? [{name:'stack',value:payload.stack.substring(0,1024)}] : undefined,
        timestamp: new Date().toISOString()
      }
    ]
  };

  try{
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    return {ok:res.ok,status:res.status};
  }catch(err:any){
    return {ok:false,reason:err.message};
  }
}
