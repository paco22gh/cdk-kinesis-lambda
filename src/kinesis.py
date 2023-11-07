import logging
import json
import base64

def handler(event, context):
  logger = logging.getLogger()
  logger.setLevel(logging.INFO)
  logger.info(event['Records'])
  b64payload = event['Records'][0]['kinesis']['data']
  #logger.info(event['Records'][0]['kinesis']['data'])
  payload = base64.b64decode(b64payload).decode('utf-8')
  payloadjson = json.loads(payload)
  logger.info(payloadjson)
  logger.info(payloadjson['CustomerEndpoint']['Address'])
  logger.info(payloadjson['CustomerEndpoint']['Address'])
  logger.info(payloadjson['InitiationMethod'])