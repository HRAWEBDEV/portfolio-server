type Status = 'error' | 'success';

function getResponse<D, M>({
 status = 'success',
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
