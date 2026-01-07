module.exports = function(category) {
  switch ((category || '').toLowerCase()) {
    case 'complaint': return 0.85;
    case 'query': return 0.75;
    case 'feedback': return 0.80;
    case 'other': return 0.60;
    default: return 0.50;
  }
};

