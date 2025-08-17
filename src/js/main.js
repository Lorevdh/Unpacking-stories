document.addEventListener('DOMContentLoaded', function() {
    const characters = {
        leila: {
            name: 'Leila',
            items: [
                { name: 'Wedding photo', dialogueKey: 'leila_photo' },
                { name: 'Spice tin', dialogueKey: 'leila_spice' },
                { name: 'Notebook', dialogueKey: 'leila_notebook' }
            ]
        },
        thiago: {
            name: 'Thiago',
            items: [
                { name: 'Toy', dialogueKey: 'thiago_toy' },
                { name: 'Photo', dialogueKey: 'thiago_photo' },
                { name: 'Mango', dialogueKey: 'thiago_mango' }
            ]
        },
        priya: {
            name: 'Priya',
            items: [
                { name: 'Wedding photo', dialogueKey: 'priya_photo' },
                { name: 'Spice tin', dialogueKey: 'priya_spice' },
                { name: 'Notebook', dialogueKey: 'priya_notebook' }
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

    // Show items when a character box is selected
    characterSelectionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const selectedCharacter = characters[e.target.id.replace('Box', '').toLowerCase()];
            showItems(selectedCharacter);
        });
    });

    function showItems(character) {
    itemListDiv.innerHTML = '';
    dialogueDiv.textContent = '';
    dialogueDiv.classList.add('hidden'); // Verberg dialoog bij nieuwe selectie

    character.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item.name;
        itemDiv.classList.add('item');
        itemDiv.addEventListener('click', () => showDialogue(item.dialogueKey));
        itemListDiv.appendChild(itemDiv);
    });

    itemSelectionDiv.classList.remove('hidden'); // Toon itemlijst
}

function showDialogue(dialogueKey) {
    dialogueDiv.textContent = i18n.en[dialogueKey];
    dialogueDiv.classList.remove('hidden'); // Toon dialoog
}
});
