const https = require('https');
const fs = require('fs');
const path = require('path');

const SOUNDS = [
  {
    name: 'gentle-chime.mp3',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-gentle-bell-chime-926.mp3'
  },
  {
    name: 'nature-birds.mp3',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-morning-birds-2472.mp3'
  },
  {
    name: 'meditation-bowl.mp3',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-tibetan-bowl-meditation-sound-2308.mp3'
  },
  {
    name: 'soft-bell.mp3',
    url: 'https://assets.mixkit.co/sfx/preview/mixkit-soft-bell-tone-2358.mp3'
  }
];

const soundsDir = path.join(__dirname, '..', 'public', 'sounds');

// 确保目录存在
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

// 下载文件
const downloadFile = (url, filename) => {
  return new Promise((resolve, reject) => {
    const dest = path.join(soundsDir, filename);
    const file = fs.createWriteStream(dest);

    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

// 下载所有音效
async function downloadAllSounds() {
  try {
    for (const sound of SOUNDS) {
      await downloadFile(sound.url, sound.name);
    }
    console.log('All sounds downloaded successfully!');
  } catch (error) {
    console.error('Error downloading sounds:', error);
  }
}

downloadAllSounds(); 