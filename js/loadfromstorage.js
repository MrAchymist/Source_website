var ImagesZones = document.getElementById('images-zone');
var ChannelsZones = document.getElementById('channels-zone');
var CurrentOpenCategory = '';

function LoadFromStorage()
{
    let availableChannels = [];

    let http = new XMLHttpRequest();
    http.open("GET", "php/getcategories.php");
    http.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200) {
            JSON.parse(this.responseText).forEach(e => {
                availableChannels.push(e);
            });
            
            for (let i = 0; i < availableChannels.length; i++) {
                ChannelsZones.appendChild(CreateCategorieInfo(availableChannels[i]));
                ChannelsZones.appendChild(document.createElement('br'));
            }
        }
    }
    http.send(null);
}

function CreateImageElement(infos)
{
    let LinkElem = CreateElem('image-dose', 'a', 'image-link', {href: infos.Sauce});
    let ImagePart = CreateElem('image-part', 'img', 'image-view', {src: infos.Image});

    LinkElem.appendChild(ImagePart);
    return LinkElem;
}

function CreateCategorieInfo(category)
{
    let CatElem = CreateElem('channel', 'text', 'channel-link', {innerText: Capitalize(category)});
    CatElem.addEventListener('click', LoadCategory);

    return CatElem;
}

function LoadCategory()
{
    let CategoryButton = this;

    if (CurrentOpenCategory !== '' && CategoryButton.innerText.includes(CurrentOpenCategory)) {
        ImagesZones.innerHTML = '';
        CurrentOpenCategory = '';

        CollapseCategory();
        return;
    }

    let http = new XMLHttpRequest();
    http.open("GET", "php/getCategoryJson.php?category=" + this.innerText.toLowerCase());
    http.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200) {
            LoadImages(JSON.parse(this.responseText), CategoryButton);
        }
    }
    http.send(null);
}

function LoadImages(json, elem) {
    if (CurrentOpenCategory !== '') {
        CollapseCategory();
    }
    ImagesZones.innerHTML = '';
    CurrentOpenCategory = elem.innerText;

    elem.innerText = '- ' + elem.innerText;

    console.log(json["Images"].length);
    for (let i = json["Images"].length - 1; i >= 0; i--) {
        ImagesZones.appendChild(CreateImageElement(json["Images"][i]));
        ImagesZones.appendChild(document.createElement('br'));
    }
}

function CollapseCategory() {
    let Categories = document.getElementsByClassName('channel-link');

    for (let i = 0; i < Categories.length; i++) {
        if (Categories[i].innerText.includes('-')) {
            Categories[i].innerText = Categories[i].innerText.slice(2);
        }
    }
}