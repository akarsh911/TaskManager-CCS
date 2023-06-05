// Make API call
fetch('../php/get_all_users.php')
    .then(response => response.json())
    .then(users => {
        const membersContainer = document.getElementById('members');

        // Loop through each user and create a card template
        users.forEach(user => {
            const card = document.createElement('div');
            card.classList.add('card', 'members1');

            const cardLeft = document.createElement('div');
            cardLeft.classList.add('card_left');

            const avatar = document.createElement('img');
            avatar.classList.add('card_avatar');
            avatar.src = user.avatar;
            cardLeft.appendChild(avatar);

            const nameBlock = document.createElement('div');
            nameBlock.classList.add('card_name_block');

            const name = document.createElement('div');
            name.classList.add('card_name');
            name.textContent = `${user.f_name} ${user.l_name}`;
            nameBlock.appendChild(name);

            const githubLink = document.createElement('a');
            githubLink.href = `https://github.com/${user.github}`;
            githubLink.textContent = `https://github.com/${user.github}`;
            const githubText = document.createElement('b1');
            githubText.textContent = 'Github: ';
            const githubContainer = document.createElement('div');
            githubContainer.appendChild(githubText);
            githubContainer.appendChild(githubLink);
            nameBlock.appendChild(githubContainer);

            cardLeft.appendChild(nameBlock);
            card.appendChild(cardLeft);

            const infoBlock = document.createElement('div');

            const position = document.createElement('div');
            const positionText = document.createElement('b1');
            positionText.textContent = 'Position: ';
            const positionSpan = document.createElement('span');
            positionSpan.textContent = user.role;
            position.appendChild(positionText);
            position.appendChild(positionSpan);
            infoBlock.appendChild(position);

            const joinedOn = document.createElement('div');
            const joinedOnText = document.createElement('b1');
            joinedOnText.textContent = 'Joined: ';
            const joinedOnSpan = document.createElement('span');
            joinedOnSpan.textContent = user.joined_on;
            joinedOn.appendChild(joinedOnText);
            joinedOn.appendChild(joinedOnSpan);
            infoBlock.appendChild(joinedOn);

            card.appendChild(infoBlock);

            const contactBlock = document.createElement('div');

            const email = document.createElement('div');
            const emailText = document.createElement('b1');
            emailText.textContent = 'Email: ';
            const emailSpan = document.createElement('span');
            emailSpan.textContent = user.email;
            email.appendChild(emailText);
            email.appendChild(emailSpan);
            contactBlock.appendChild(email);

            const phoneNumber = document.createElement('div');
            const phoneNumberText = document.createElement('b1');
            phoneNumberText.textContent = 'Phone Number: ';
            const phoneNumberSpan = document.createElement('span');
            phoneNumberSpan.textContent = user.ph_no;
            phoneNumber.appendChild(phoneNumberText);
            phoneNumber.appendChild(phoneNumberSpan);
            contactBlock.appendChild(phoneNumber);

            card.appendChild(contactBlock);

            membersContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
