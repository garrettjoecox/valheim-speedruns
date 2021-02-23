import { common } from 'server/middleware/common';

export default common().get((req, res) => {
  res.success({ data: { name: 'John Doe' } });
});
