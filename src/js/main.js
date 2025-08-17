document.addEventListener('DOMContentLoaded', function() {
    const characters = {
        leila: {
            name: 'Leila',
            items: [
                { name: 'Wedding photo', dialogueKey: 'leila_photo', img: 'assets/images/leila-photo.png', x: 50, y: 60 },
                { name: 'Spice tin', dialogueKey: 'leila_spice', img: 'assets/images/leila-spice.png', x: 230, y: 80 },
                { name: 'Notebook', dialogueKey: 'leila_notebook', img: 'assets/images/leila-notebook.png', x: 120, y: 220 }
            ]
        },
        thiago: {
            name: 'Thiago',
            items: [
                { name: 'Toy', dialogueKey: 'thiago_toy', img: 'assets/images/thiago-toy.png', x: 80, y: 70 },
                { name: 'Photo', dialogueKey: 'thiago_photo', img: 'assets/images/thiago-photo.png', x: 220, y: 60 },
                { name: 'Mango', dialogueKey: 'thiago_mango', img: 'assets/images/thiago-mango.png', x: 150, y: 230 }
            ]
        },
        priya: {
            name: 'Priya',
            items: [
                { name: 'Wedding photo', dialogueKey: 'priya_photo', img: 'assets/images/priya-photo.png', x: 40, y: 80 },
                { name: 'Spice tin', dialogueKey: 'priya_spice', img: 'assets/images/priya-spice.png', x: 220, y: 100 },
                { name: 'Notebook', dialogueKey: 'priya_notebook', img: 'assets/images/priya-notebook.png', x: 130, y: 220 }
            ]
        }
    };

    const i18n = {
        "en": {
            "leila_photo": "We didn’t take many photos that day. I still regret it.",
            "leila_spice": "Masala chai is a ritual. No two mornings taste the same.",
            "leila_notebook": "When I was young, I wrote stories about birds that couldn’t fly.",
            "thiago_toy": "It smells like the garage where my dad fixed bikes.",
            "thiago_photo": "I miss that summer. It felt like magic.",
            "thiago_mango": "Oh no. Not again.",
            "priya_photo": "We didn’t take many photos that day. I still regret it.",
            "priya_spice": "Chai, like my grandmother made it, is my therapy.",
            "priya_notebook": "I still write stories about the birds. It’s a habit."
        }
    };

    const characterSelectionButtons = document.querySelectorAll('#characterSelection button');
    const itemListDiv = document.getElementById('itemList');
    const dialogueDiv = document.getElementById('dialogue');
    const itemSelectionDiv = document.getElementById('itemSelection');

    // Show items when a character is selected
    characterSelectionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedCharacter = characters[e.target.id.replace('Box', '').toLowerCase()];
            showItems(selectedCharacter);
        });
    });

    function showItems(character) {
        itemListDiv.innerHTML = '';
        dialogueDiv.textContent = '';
        dialogueDiv.classList.add('hidden'); 

        character.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.style.left = item.x + "px";
            itemDiv.style.top = item.y + "px";

            const img = document.createElement('img');
            img.src = item.img;
            img.alt = item.name;
            img.classList.add('item-image');

            img.addEventListener('click', () => showDialogue(item.dialogueKey));

            itemDiv.appendChild(img);
            itemListDiv.appendChild(itemDiv);
        });

        itemSelectionDiv.classList.remove('hidden'); 
    }

    function showDialogue(dialogueKey) {
        dialogueDiv.textContent = i18n.en[dialogueKey];
        dialogueDiv.classList.remove('hidden'); // Toon dialoog
    }
});
