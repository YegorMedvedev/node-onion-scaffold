export function transformElasticSearchLogData(logData: any) {
  return {
    "@timestamp": logData.timestamp ? logData.timestamp : new Date().toISOString(),
    message: logData.meta.text,
    correlationId: logData.meta.correlationId || null,
    accountId: logData.meta.accountId || null,
    severity: logData.level,
    data: logData.meta.data != null ? JSON.stringify(logData.meta.data) : null,
    env: logData.meta.env,
    service: logData.meta.service,
  };
}
