import { L } from '../../../lib/abpUtility';

const rules = {
  name: [{ required: true, message: L('ThisFieldIsRequired') }],
  capacity: [{ required: true, message: L('ThisFieldIsRequired') }],
  department: [{ required: true, message: L('ThisFieldIsRequired') }],
  // emailAddress: [
  //   { required: true, message: L('ThisFieldIsRequired') },
  //   {
  //     type: 'email',
  //     message: 'The input is not valid E-mail!',
  //   },
  // ],
};

export default rules;
