import Point from './point';

export default function() {
  var logger = document.getElementById('log');
  logger.innerHTML += '<br />Attached point: ' + new Point((Math.random() * 100)>>0, (Math.random() * 100)>>0);
};
