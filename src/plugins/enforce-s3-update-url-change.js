const { version } = require('../../package.json');
const semver = require('semver');

const MUST_UPDATE_TO_VERSION = '0.3.18';

function enforceS3UpdateUrlChange() {
  console.log(`MES version: v${version}. Need at least v${MUST_UPDATE_TO_VERSION}`);

  if (semver.gte(version, MUST_UPDATE_TO_VERSION)) {
    console.log('No upgrade is required');
    return;
  }

  alert(
    `Sorry to disturb! You need to manually upgrade MES.\nYou will now be sent to a website with instructions`
  );

  window.location.href = 'https://github.com/abrkn/mes/blob/master/UPGRADE.md#upgrade-guide';
}

module.exports = enforceS3UpdateUrlChange;
