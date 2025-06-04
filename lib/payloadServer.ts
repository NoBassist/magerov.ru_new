// Singleton-хелпер, чтобы Local API инициализировался один раз
import { getPayload } from 'payload';
import config from '@/payload.config';

let payloadSingleton: Awaited<ReturnType<typeof getPayload>> | null = null;

export async function getPayloadServer() {
  if (!payloadSingleton) {
    payloadSingleton = await getPayload({ config });
  }
  return payloadSingleton;
}