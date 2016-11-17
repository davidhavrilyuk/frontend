function Search(text, search) {
    this.text = text;
    this.sear = search;
}

var prot = {
    simpleSearch: function () {
            var  change = "<spam style='background: red' class='p1'>" + this.sear + "</spam>";
            var div = document.getElementById('div');
            div.innerHTML = '';
            var texte = document.createElement('p');
            var res = this.text.replace( new RegExp( this.sear, "g" ), change);
            texte.innerHTML = res;
            div.appendChild(texte);
    },

    complexSearch: function () {
        var st = this.text.match(this.sear).index,
            fin = this.text.match(this.sear).index + this.sear.length,
            val = this.text.substring(st - 1, st),
            val1 = this.text.substring(fin, fin + 1);
        var div = document.getElementById('div');
            div.innerHTML = '';
        if (val == ' ' && val1 == ' ' || val1 == '.' || val1 == ',') {
            var  change = "<spam style='background: red' class='p1'>" + this.sear + "</spam>";
            var texte = document.createElement('p');
            var res = this.text.replace( new RegExp( this.sear, "g" ), change);
            texte.innerHTML = res;
            div.appendChild(texte);
        }
   },

    AutoCorrect: function () {
            var change = '';
            for (var i = 0; i < this.sear.length; i++) {
                change += '*'
            }

            var div = document.getElementById('div');
            div.innerHTML = '';
            var texte = document.createElement('p');
            var res = this.text.replace( new RegExp( this.sear, "g" ), change);
            texte.innerHTML = res;
            div.appendChild(texte);
        }
    };

document.getElementById('simpleSearch').onclick = function () {
    var text = document.getElementById('text').value;
    var sear = document.getElementById('search').value;
    var search = new Search(text, sear);
    search.__proto__ = prot;
    search.simpleSearch();
    console.log(search)
};

document.getElementById('complexSearch').onclick = function () {
    var text = document.getElementById('text').value;
    var sear = document.getElementById('search').value;
    var search = new Search(text, sear);
    search.__proto__ = prot;
    search.complexSearch()
};

document.getElementById('AutoCorrect').onclick = function () {
    var text = document.getElementById('text').value;
    var sear = document.getElementById('search').value;
    var search = new Search(text, sear);
    search.__proto__ = prot;
    search.AutoCorrect()
};
