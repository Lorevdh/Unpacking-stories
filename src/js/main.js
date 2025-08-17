document.addEventListener('DOMContentLoaded', () => {
  // ---- i18n laden ----
  let i18n = { en: {} };

  async function loadI18n() {
    try {
      // Als je het via een script tag zet (window.i18nData), gebruik die eerst
      if (window.i18nData) {
        i18n = window.i18nData;
        return;
      }
      const res = await fetch('locales/en.json', { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      i18n = await res.json();
    } catch (err) {
      console.warn('Kon locales/en.json niet laden. Vallen terug op lege i18n.', err);
      i18n = { en: {} };
    }
  }

  // Handige helper
  const t = (key) => (i18n.en && i18n.en[key]) || null;

  // ---- Characters + Items (keys gematcht met en.json) ----
  const characters = {
    leila: {
      name: 'Leila',
      origin: 'Morocco',
      items: [
        { name: 'Mint bundle',    dialogueKey: 'leila_mint',       img: 'assets/images/leila-mint.png',       x: 60,  y: 50  },
        { name: 'Tajine pot',     dialogueKey: 'leila_tajine',     img: 'assets/images/leila-tajine.png',     x: 220, y: 50  },
        { name: 'Necklace',       dialogueKey: 'leila_necklace',   img: 'assets/images/leila-necklace.png',   x: 120, y: 150 },
        { name: 'French novel',   dialogueKey: 'leila_novel',      img: 'assets/images/leila-novel.png',      x: 60,  y: 230 },
        { name: 'Seashells',      dialogueKey: 'leila_seashells',  img: 'assets/images/leila-seashells.png',  x: 220, y: 210, small: true }
      ]
    },
    thiago: {
      name: 'Thiago',
      origin: 'Brazil',
      items: [
        { name: 'Toy car',        dialogueKey: 'thiago_toy',       img: 'assets/images/thiago-toy.png',        x: 70,  y: 60  },
        { name: 'Football',       dialogueKey: 'thiago_football',  img: 'assets/images/thiago-football.png',   x: 220, y: 60  },
        { name: 'Mango',          dialogueKey: 'thiago_mango',     img: 'assets/images/thiago-mango.png',      x: 150, y: 140 },
        { name: 'Samba whistle',  dialogueKey: 'thiago_whistle',   img: 'assets/images/thiago-samba-whistle.png', x: 60, y: 230 },
        { name: 'Flip-flops',     dialogueKey: 'thiago_flipflops', img: 'assets/images/thiago-flip-flops.png', x: 220, y: 220 }
      ]
    },
    priya: {
      name: 'Priya',
      origin: 'India',
      items: [
        { name: 'Wedding photo',  dialogueKey: 'priya_photo',      img: 'assets/images/priya-photo.png',       x: 60,  y: 60  },
        { name: 'Spice tin',      dialogueKey: 'priya_spice',      img: 'assets/images/priya-spicetin.png',    x: 220, y: 60  },
        { name: 'Notebook',       dialogueKey: 'priya_notebook',   img: 'assets/images/priya-notebook.png',    x: 150, y: 150 },
        { name: 'Cassette tape',  dialogueKey: 'priya_cassette',   img: 'assets/images/priya-cassette.png',    x: 60,  y: 230 },
        { name: 'Brass lamp',     dialogueKey: 'priya_lamp',       img: 'assets/images/priya-brass-lamp.png',  x: 220, y: 230 }
      ]
    }
  };

  // ---- DOM refs ----
  const characterSelectionButtons = document.querySelectorAll('#characterSelection button');
  const itemListDiv   = document.getElementById('itemList');
  const dialogueDiv   = document.getElementById('dialogue');
  const itemSelectionDiv = document.getElementById('itemSelection');
  const guessSection  = document.getElementById('guessSection');
  const guessPrompt   = document.getElementById('guessPrompt');

  let currentCharacter = null;

  // Alles pas activeren nadat i18n geladen is
  init();

  async function init() {
    await loadI18n();
    characterSelectionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const selectedKey = e.target.id.replace('Box', '').toLowerCase();
        currentCharacter = characters[selectedKey];
        showItems(currentCharacter);
      });
    });
  }

  function showItems(character) {
    itemListDiv.innerHTML = '';
    dialogueDiv.textContent = '';
    dialogueDiv.classList.add('hidden');

    const boxWidth  = itemListDiv.offsetWidth;
    const boxHeight = itemListDiv.offsetHeight;

    // Binnenste vierkant (50% van de box, gecentreerd)
    const innerBoxSize = Math.min(boxWidth, boxHeight) * 0.50;
    const innerX = (boxWidth  - innerBoxSize) / 2;
    const innerY = (boxHeight - innerBoxSize) / 2;

    const scaleX = innerBoxSize / 300;
    const scaleY = innerBoxSize / 300;

    const offsetX = -40;
    const offsetY = -40;

    let loadedCount = 0;
    const total = character.items.length;

    character.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('item');

      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.name;
      img.classList.add('item-image');
      if (item.small) img.classList.add('item-small');

      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) {
          // Alles geladen → posities zetten
          Array.from(itemListDiv.children).forEach((div, i) => {
            const it = character.items[i];
            div.style.left = (innerX + (it.x * scaleX) + offsetX) + 'px';
            div.style.top  = (innerY + (it.y * scaleY) + offsetY) + 'px';
          });
        }
      };

      img.addEventListener('click', () => showDialogue(item.dialogueKey));
      itemDiv.appendChild(img);
      itemListDiv.appendChild(itemDiv);
    });

    guessPrompt.textContent = t('guess_title') || 'Where do you think I’m from?';
    guessSection.classList.remove('hidden');
    itemSelectionDiv.classList.remove('hidden');
  }

  function showDialogue(dialogueKey) {
    const text = t(dialogueKey) || `(${dialogueKey})`;
    dialogueDiv.textContent = text;
    dialogueDiv.classList.remove('hidden');
  }

  // Guess knoppen
  document.querySelectorAll('.guess-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!currentCharacter) return;
      const chosen = btn.getAttribute('data-country');
      const msg = (chosen === currentCharacter.origin)
        ? (t('guess_correct') || "Yes, that’s right! I’m from {country}.")
        : (t('guses_wrong')   || "Not quite. I’m actually from {country}.");
      dialogueDiv.textContent = msg.replace('{country}', currentCharacter.origin);
      dialogueDiv.classList.remove('hidden');
    });
  });
});
