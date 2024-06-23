async function fetchData() {
    const response = await fetch('https://ymanagement.mefi.workers.dev');
    const data = await response.json();
    displayData(data);
}

function displayData(data) {
    const versionsContainer = document.getElementById('versions');
    const changelogContainer = document.getElementById('changelog');

    for (const [key, value] of Object.entries(data)) {
        if (key !== 'Latest_Changelog') {
            const versionDiv = document.createElement('div');
            versionDiv.className = 'version';

            const versionTitle = document.createElement('span');
            versionTitle.textContent = key.replace(/_/g, ' ');
            versionDiv.appendChild(versionTitle);

            if (value.error) {
                versionDiv.appendChild(document.createTextNode(value.error));
            } else {
                const createLink = (text, url) => {
                    const link = document.createElement('a');
                    link.textContent = text;
                    link.href = url;
                    link.target = '_blank';
                    link.className = 'button-link';
                    return link;
                };

                const link1 = createLink('Download', value.Link_1);
                const link2 = createLink('Mirror', value.Link_2);
                const mirror = createLink('Mirror 2', value.Mirror);

                versionDiv.appendChild(link1);
                versionDiv.appendChild(document.createTextNode(' '));

                if (window.innerWidth >= 400) {
                    versionDiv.appendChild(link2);
                    versionDiv.appendChild(document.createTextNode(' '));
                }

                // versionDiv.appendChild(document.createTextNode('   '));
                // versionDiv.appendChild(mirror);
            }

            versionsContainer.appendChild(versionDiv);
        }
    }

    const latestChangelog = data.Latest_Changelog.Patched_Changelogs;
    changelogContainer.textContent = `${latestChangelog}`;
}

fetchData();