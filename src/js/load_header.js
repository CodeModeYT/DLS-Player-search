function loadHeader(gameVersion, titleText) {
    $(function () {
        $("#header").load(`/DLS-Player-search/src/template/header${gameVersion}.html`);
    });
}
