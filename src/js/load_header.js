function loadHeader(gameVersion, primaryTitleText, secondaryTitleText) {
    document.getElementById('header').innerHTML = `
    <img src="/DLS-Player-search/Data/system_images/DLS${gameVersion}_logo.png" height="80px" style="margin-bottom: 10px;" onclick="location.href = '/DLS-Player-search/index.html';">
    <h1 style="padding-left: 20px; display: inline;">${primaryTitleText}</h1>
    <h1 style="padding-left: 25px; display: inline; color: rgba(255, 255, 255, 0.432)">${secondaryTitleText}</h1>
    `
}
