export const setVotingCacheForEvent = (eventId, tracks = [], step = 1) => {
  localStorage.setItem('votingCache', JSON.stringify({
    tracks,
    step,
    eventId,
  }));
};

export const getVotingCacheForEvent = (eventId) => {
  const votingCache = JSON.parse(localStorage.getItem('votingCache'));
  return votingCache && votingCache.eventId === Number(eventId) ? votingCache : null;
};

export const removeVotingCache = () => {
  const votingCache = localStorage.getItem('votingCache');
  localStorage.removeItem('votingCache');
  return !!votingCache;
};
