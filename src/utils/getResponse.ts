type Status = 'failed' | 'succeeded';

function getResponse<D, M>({
 status = 'succeeded',
 data,
 message,
}: {
 status?: Status;
 data?: D;
 message?: M;
}) {
 return {
  status,
  data,
  message,
 };
}

export { type Status, getResponse };
