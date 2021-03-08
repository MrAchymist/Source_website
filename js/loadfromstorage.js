var ImagesZones = document.getElementById('images-zone');
var ChannelsZones = document.getElementById('channels-zone');

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
    /*
    let SauceList = [];

    let SauceObj = {};
    let SauceTwo = {};
    SauceObj.Source = 'https://www.pixiv.net/en/artworks/88120231';
    SauceObj.Info = 'https://i.pximg.net/img-master/img/2021/02/28/21/00/41/88120231_p0_master1200.jpg';
    SauceTwo.Info = 'https://media.discordapp.net/attachments/810657774387200050/817222527217827920/84240506_p0_master1200.png';
    SauceTwo.Source = 'https://www.pixiv.net/en/artworks/84240506';

    SauceList.push(SauceObj);
    SauceList.push(SauceTwo);

    for(let i = 0; i < SauceList.length; i++) {
        ImagesZones.appendChild(CreateImageElement(SauceList[i]));
    }
    */
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
    let CatElem = CreateElem('channel', 'text', 'channel-link', {innerText: category});
    CatElem.addEventListener('click', LoadCategory);

    return CatElem;
}

function LoadCategory()
{
    let http = new XMLHttpRequest();
    http.open("GET", "php/getCategoryJson.php?category=" + this.innerText);
    http.onreadystatechange = function ()
    {
        if (this.readyState === 4 && this.status === 200) {
            LoadImages(JSON.parse(this.responseText));
        }
    }
    http.send(null);
}

function LoadImages(json, elem) {
    ImagesZones.innerHTML = '';
    
    for (let info in json["Images"]) {
        ImagesZones.appendChild(CreateImageElement(json["Images"][info]));
        ImagesZones.appendChild(document.createElement('br'));
    }
}