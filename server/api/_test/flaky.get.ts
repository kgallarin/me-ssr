let attemptCount = 0;

export default defineEventHandler((event) => {
  const query = getQuery(event);

  if (query.reset === '1') {
    attemptCount = 0;
    return { reset: true };
  }

  attemptCount += 1;
  const failTimes = Number(query.failTimes ?? 2);
  const statusToReturn = Number(query.status ?? 503);

  if (attemptCount <= failTimes) {
    setResponseStatus(event, statusToReturn);
    if (statusToReturn === 429) {
      setResponseHeader(event, 'Retry-After', 1);
    }
    return {
      message: `Simulated failure #${attemptCount}`,
      attempt: attemptCount,
    };
  }

  // Inside server/api/_test/flaky.get.ts
  if (query.mode === '422') {
    setResponseStatus(event, 422);
    return {
      message: 'Validation failed on field',
      errors: { email: ['Email is invalid'] },
    };
  }

  if (query.mode === '401') {
    setResponseStatus(event, 401);
    return {
      data: { message: 'Session expired' },
    };
  }

  const completedAttempt = attemptCount;
  attemptCount = 0;

  return {
    data: {
      items: [{ id: '1', label: 'Recovered after retry' }],
    },
    meta: { attemptsUsed: completedAttempt },
  };
});
