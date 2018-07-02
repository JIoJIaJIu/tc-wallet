const Eos = require('tcjs');

export default function eos(connection) {
  return Eos(connection);
}
