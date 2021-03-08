function IsValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (err) {
        return false;
    }
}

function GetJsonSection(json, path) {
    if (!IsValidJson(json)) {
        return undefined;
    }
    let parsedjson = JSON.parse(json);
    let temporary = parsedjson;

    let pathParts = path.split('/');

    pathParts.forEach(element => {
        temporary = temporary[element];
        if (temporary === undefined) {
            return undefined;
        }
    });

    return temporary;
}

function CheckJsoncompletion(json, categories) {
    for (var x in categories) {
        if (GetJsonSection(json, x) === undefined) {
            return false;
        }
    }
    return true;
}

function IsEmptyOrUndefined(check) {
    if (check === "" || check === undefined) {
        return true;
    } else {
        return false;
    }
}

/* HTML Editing Utilities */
function CreateElem(Name, Elem, Class, ParamList = {}) {
    let NewElem = document.createElement(Elem);
    NewElem.id = Name;
    NewElem.className = Class;

    for (let param in ParamList) {
        NewElem[param] = ParamList[param];
    }

    return NewElem;
}

function CreateZone(zone, elemlist) {
    let LastBr;

    elemlist.forEach(element => {
        zone.insertAdjacentElement('beforeend', element);
        LastBr = zone.insertAdjacentElement('beforeend', document.createElement('br'));
    });

    LastBr.remove();
}

/* Format utilities */
function Capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
}