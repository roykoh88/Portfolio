const fs = require('fs');
const cp = require('child_process');

function escapeNonAscii(s) {
  return s.replace(/[\u0080-\uFFFF]/g, (ch) => {
    return '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0');
  });
}

function fromGit(path) {
  return cp.execSync(`git show HEAD:${path}`, { encoding: 'utf8' });
}

function applyCommonFixes(s) {
  const oldHint = '학원명을 클릭 하시면 수료증을 확인 하실 수 있습니다.';
  const newHint = '교육기관명을 클릭하시면 수료증을 확인하실 수 있습니다.';

  s = s.split(oldHint).join(newHint);
  s = s.split("certBootcampDoc: '학원 수료증'").join("certBootcampDoc: '교육기관 수료증'");
  s = s.split("academy: '학원 프로젝트'").join("academy: '교육기관 프로젝트'");
  return s;
}

const targets = ['react-app/src/i18n/messages.js', 'static-i18n.js'];

for (const p of targets) {
  let s = fromGit(p);
  s = applyCommonFixes(s);
  s = escapeNonAscii(s);
  fs.writeFileSync(p, s, { encoding: 'utf8' });
  // eslint-disable-next-line no-console
  console.log('wrote', p, 'len', s.length);
}

