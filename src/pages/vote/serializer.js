export default function (data) {
  return {
    data: {
      ...data,
      resource: {
        event_track_votes_attributes: data.resource,
      },
    },
  };
}
