import coredis 

r = coredis.Redis(host='broker', port=6379, decode_responses=True)
p = r.pubsub()

async def get_id_by_token(token: str) -> int:
    await r.publish("tokens", token)
    return 1
