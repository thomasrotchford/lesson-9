
const tabs = document.querySelectorAll('[role="tab"]');

function activateTab(selectedTab) {
    tabs.forEach(function(tab) {
        const isSelected = tab === selectedTab;

        tab.setAttribute('aria-selected', isSelected);
        tab.tabIndex = isSelected ? 0 : -1;

        const panel = document.getElementById(
            tab.getAttribute('aria-controls')
        );

        panel.hidden = !isSelected;
    });
}

tabs.forEach(function(tab, index) {
    tab.addEventListener('click', function() {
        activateTab(tab);
    });

    tab.addEventListener('keydown', function(event) {
        let newIndex = index;

        if (event.key === 'ArrowRight') {
            newIndex = (index + 1) % tabs.length;
        } else if (event.key === 'ArrowLeft') {
            newIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === 'Home') {
            newIndex = 0;
        } else if (event.key === 'End') {
            newIndex = tabs.length - 1;
        } else {
            return;
        }

        event.preventDefault();
        tabs[newIndex].focus();
        activateTab(tabs[newIndex]);
    });
});

